import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { 
  Map as MapIcon, Navigation, Compass, ExternalLink, MapPin, 
  Car, Clock, Sparkles, MessageCircle, Share2, Layers, CheckCircle2,
  Info, ShieldCheck, ArrowRight, Zap, Flame, Users, Search,
  RefreshCw, Radio, Check
} from 'lucide-react';
import { 
  PARK_MAPS_DATA, ParkMapInfo, ParkRideLocation, 
  RideCategory, RideIntensity 
} from '../data/parkRidesMapData';
import { useLiveWaitTimes } from '../utils/useLiveWaitTimes';

export const InteractiveMapsView: React.FC = () => {
  const [selectedParkId, setSelectedParkId] = useState<string>('magic-kingdom');
  const [brandFilter, setBrandFilter] = useState<'all' | 'disney' | 'universal' | 'miami'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | RideCategory>('all');
  const [intensityFilter, setIntensityFilter] = useState<'all' | RideIntensity>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const activePark = useMemo(() => {
    return PARK_MAPS_DATA.find(p => p.id === selectedParkId) || PARK_MAPS_DATA[0];
  }, [selectedParkId]);

  // Hook for live wait times from ThemeParks.wiki
  const { waitTimes, isLoading: isWaitTimesLoading, isLiveConnected, lastFetchTime, refresh: refreshWaitTimes } = useLiveWaitTimes(activePark.wikiEntityId);

  // Map DOM and Leaflet instance references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Helper to get ride wait time
  const getRideWaitTime = (ride: ParkRideLocation): { minutes: number; isLive: boolean; status: string } => {
    const key = (ride.themeParksWikiName || ride.name).toLowerCase().trim();
    if (waitTimes[key]) {
      return {
        minutes: waitTimes[key].waitTime,
        isLive: waitTimes[key].isLive,
        status: waitTimes[key].status,
      };
    }
    // Partial search in live data
    const foundKey = Object.keys(waitTimes).find(k => k.includes(ride.name.toLowerCase()) || ride.name.toLowerCase().includes(k));
    if (foundKey && waitTimes[foundKey]) {
      return {
        minutes: waitTimes[foundKey].waitTime,
        isLive: waitTimes[foundKey].isLive,
        status: waitTimes[foundKey].status,
      };
    }
    return {
      minutes: ride.defaultWaitMinutes,
      isLive: false,
      status: 'OPERATING',
    };
  };

  // Filtered rides in current park
  const filteredRides = useMemo(() => {
    return activePark.rides.filter(ride => {
      if (categoryFilter !== 'all' && ride.category !== categoryFilter) return false;
      if (intensityFilter !== 'all' && ride.intensity !== intensityFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = ride.name.toLowerCase().includes(q);
        const matchLand = ride.land.toLowerCase().includes(q);
        const matchDesc = ride.description.toLowerCase().includes(q);
        if (!matchName && !matchLand && !matchDesc) return false;
      }
      return true;
    });
  }, [activePark, categoryFilter, intensityFilter, searchQuery]);

  // Initialize or re-center Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create new Leaflet Map instance
      const map = L.map(mapContainerRef.current, {
        center: activePark.center,
        zoom: activePark.defaultZoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Zoom control on top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add CartoDB Voyager tiles (Clear, high-contrast, theme-park friendly)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      // Re-center on selected park
      mapInstanceRef.current.setView(activePark.center, activePark.defaultZoom, {
        animate: true,
      });
    }

    // Delayed size invalidation for proper rendering in flex/grid layouts
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, [activePark]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers on the map whenever park, rides or waitTimes change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // 1. Add Drop-Off UberXL Marker
    if (activePark.uberDropoff) {
      const dropIconHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 border-2 border-white transform transition-transform group-hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4m-11-9h14l-1.5 5h-11L5 8zm0 0L3 14h18l-2-6"></path></svg>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-emerald-700 rotate-45"></div>
          <span class="mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-slate-900 text-emerald-400 border border-emerald-500 whitespace-nowrap shadow-xs">
            UberXL
          </span>
        </div>
      `;

      const uberIcon = L.divIcon({
        html: dropIconHtml,
        className: 'custom-uber-marker',
        iconSize: [42, 54],
        iconAnchor: [21, 50],
        popupAnchor: [0, -50],
      });

      const dropMarker = L.marker([activePark.uberDropoff.lat, activePark.uberDropoff.lng], { icon: uberIcon }).addTo(map);

      const dropPopupContent = `
        <div class="p-4 bg-white rounded-2xl font-sans max-w-xs text-slate-800">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="p-1 rounded-lg bg-emerald-100 text-emerald-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4m-11-9h14l-1.5 5h-11L5 8zm0 0L3 14h18l-2-6"></path></svg>
            </span>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Zona 2x UberXL</span>
          </div>
          <h4 class="font-extrabold text-sm text-slate-900">${activePark.uberDropoff.name}</h4>
          <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${activePark.uberDropoff.notes}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${activePark.uberDropoff.lat},${activePark.uberDropoff.lng}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center justify-center w-full gap-1 py-1.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors">
            <span>Ruta al Drop-off en Google Maps</span>
          </a>
        </div>
      `;

      dropMarker.bindPopup(dropPopupContent);
      markersRef.current['uber-dropoff'] = dropMarker;
    }

    // 2. Add Ride Markers
    activePark.rides.forEach(ride => {
      const waitInfo = getRideWaitTime(ride);

      // Category colors & icons
      let pinGradient = 'from-blue-600 to-indigo-700';
      let iconEmoji = '🎮';
      if (ride.category === 'coaster') {
        pinGradient = 'from-rose-600 to-amber-600';
        iconEmoji = '🎢';
      } else if (ride.category === 'simulator') {
        pinGradient = 'from-indigo-600 to-purple-700';
        iconEmoji = '🕹️';
      } else {
        pinGradient = 'from-sky-500 to-blue-600';
        iconEmoji = '👨‍👩‍👧‍👦';
      }

      const isHighAdrenaline = ride.intensity === 'high';
      const waitDisplay = waitInfo.status === 'CLOSED' ? 'Cerrado' : waitInfo.minutes > 0 ? `${waitInfo.minutes}m` : 'Baja';

      const markerHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br ${pinGradient} text-white flex items-center justify-center shadow-lg border-2 border-white transform transition-transform group-hover:scale-110 ${isHighAdrenaline ? 'shadow-rose-600/40 ring-2 ring-rose-400/50' : 'shadow-slate-600/30'}">
            <span class="text-base select-none">${iconEmoji}</span>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
          <span class="mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${waitInfo.isLive ? 'bg-slate-900 text-emerald-300 border border-emerald-500' : 'bg-slate-800 text-amber-300 border border-amber-500'} whitespace-nowrap shadow-xs">
            ${waitDisplay}
          </span>
        </div>
      `;

      const rideIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-ride-marker',
        iconSize: [44, 56],
        iconAnchor: [22, 52],
        popupAnchor: [0, -52],
      });

      const marker = L.marker([ride.lat, ride.lng], { icon: rideIcon }).addTo(map);

      // Popup card content
      const categoryLabel = ride.category === 'coaster' ? 'Montaña Rusa' : ride.category === 'simulator' ? 'Simulador' : 'Paseo Familiar';
      const intensityLabel = ride.intensity === 'high' ? 'Alta Adrenalina' : ride.intensity === 'medium' ? 'Moderada' : 'Suave';
      const intensityColor = ride.intensity === 'high' ? 'bg-rose-100 text-rose-800 border-rose-200' : ride.intensity === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-800 border-blue-200';

      const popupHtml = `
        <div class="p-4 bg-white rounded-2xl font-sans max-w-sm text-slate-800">
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">${ride.land}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${intensityColor}">
              ${intensityLabel}
            </span>
          </div>

          <h4 class="font-extrabold text-base text-slate-900 mt-2 leading-tight">${ride.name}</h4>

          <div class="flex items-center gap-3 my-2.5">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200">
              <span class="text-xs">⏱️</span>
              <span class="text-xs font-mono font-bold text-slate-900">${waitInfo.minutes} min</span>
              <span class="text-[9px] ${waitInfo.isLive ? 'text-emerald-600 font-bold' : 'text-slate-500'}">(${waitInfo.isLive ? 'En vivo' : 'Promedio'})</span>
            </div>

            <div class="flex items-center gap-1 text-xs font-bold text-amber-600">
              <span>⭐</span>
              <span>${ride.adrenalineScore}/5 Adrenalina</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">${ride.description}</p>

          <div class="mt-2.5 p-2 bg-blue-50/80 rounded-xl text-[11px] text-blue-900 border border-blue-100">
            <strong>Consejo para los 10:</strong> ${ride.groupTip}
          </div>

          ${ride.minHeightCm ? `<div class="mt-1 text-[10px] text-slate-400">📏 Altura mínima requerida: <strong>${ride.minHeightCm} cm</strong></div>` : ''}

          <div class="mt-3.5 pt-2 border-t border-slate-100 flex items-center gap-2">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${ride.lat},${ride.lng}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs text-center transition-colors">
              Cómo llegar (GPS)
            </a>
            <a href="https://maps.apple.com/?q=${encodeURIComponent(ride.name)}&ll=${ride.lat},${ride.lng}" target="_blank" rel="noopener noreferrer" class="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors">
              Apple Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedRideId(ride.id);
      });

      markersRef.current[ride.id] = marker;
    });
  }, [activePark, waitTimes]);

  // Handler to smoothly fly to ride and open its popup when clicked in list
  const handleSelectRide = (ride: ParkRideLocation) => {
    setSelectedRideId(ride.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([ride.lat, ride.lng], 18, {
        duration: 1.0,
      });

      setTimeout(() => {
        const marker = markersRef.current[ride.id];
        if (marker) {
          marker.openPopup();
        }
      }, 900);
    }
  };

  // Handler for drop-off Uber click
  const handleSelectUberDropoff = () => {
    setSelectedRideId('uber-dropoff');
    const map = mapInstanceRef.current;
    if (map && activePark.uberDropoff) {
      map.flyTo([activePark.uberDropoff.lat, activePark.uberDropoff.lng], 17, {
        duration: 1.0,
      });
      setTimeout(() => {
        const marker = markersRef.current['uber-dropoff'];
        if (marker) {
          marker.openPopup();
        }
      }, 900);
    }
  };

  const filteredParks = PARK_MAPS_DATA.filter(p => {
    if (brandFilter === 'all') return true;
    return p.brand === brandFilter;
  });

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <MapIcon className="w-3.5 h-3.5" />
              <span>Mapa con Coordenadas Exactas & Tiempos en Vivo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Ubicación de Cada Juego dentro de los Parques
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Pines interactivos con la ubicación exacta de montañas rusas, simuladores y paseos familiares. Tocá cualquier juego de la lista para hacer zoom inmediato en el plano o tocá los pines en el mapa para ver tiempos de espera y consejos del grupo.
            </p>
          </div>

          {/* Park Brand Filter & Live Status */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setBrandFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  brandFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos (7)
              </button>
              <button
                onClick={() => setBrandFilter('disney')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  brandFilter === 'disney' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Disney (4)
              </button>
              <button
                onClick={() => setBrandFilter('universal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  brandFilter === 'universal' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Universal (2)
              </button>
              <button
                onClick={() => setBrandFilter('miami')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  brandFilter === 'miami' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Miami NBA
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel Selector de Parques */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredParks.map(park => {
            const isSelected = park.id === selectedParkId;
            return (
              <button
                key={park.id}
                onClick={() => {
                  setSelectedParkId(park.id);
                  setSelectedRideId(null);
                }}
                className={`flex flex-col text-left px-3.5 py-2.5 rounded-xl border transition-all shrink-0 min-w-[170px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    park.brand === 'disney' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    park.brand === 'universal' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
                    'bg-orange-100 text-orange-800 border-orange-200'
                  }`}>
                    {park.brand === 'disney' ? 'Disney World' : park.brand === 'universal' ? 'Universal' : 'Miami'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {park.rides.length} puntos
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                  {park.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {park.shortName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Leaflet Map (Left) & Filterable Ride List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: MAPA INTERACTIVO LEAFLET (7 Columnas) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Top Bar of Map: Park Title, Live indicator & Refresh */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {activePark.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Explorá los pines sobre los senderos del parque
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Live Connection Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`} />
                <span className="text-[11px] font-semibold text-slate-700">
                  {isLiveConnected ? 'Filas en vivo (ThemeParks.wiki)' : 'Promedio Enero'}
                </span>
                <button
                  onClick={refreshWaitTimes}
                  disabled={isWaitTimesLoading}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Actualizar tiempos de espera"
                >
                  <RefreshCw className={`w-3 h-3 ${isWaitTimesLoading ? 'animate-spin text-blue-600' : ''}`} />
                </button>
              </div>

              {/* UberXL Dropoff quick jump button */}
              {activePark.uberDropoff && (
                <button
                  onClick={handleSelectUberDropoff}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  title="Ver punto de descenso UberXL"
                >
                  <Car className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Punto Uber</span>
                </button>
              )}
            </div>
          </div>

          {/* Leaflet Map DOM Container */}
          <div className="relative w-full h-[420px] sm:h-[500px] bg-slate-100">
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Map Legend Overlay in bottom left */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-md border border-slate-200 text-[10px] space-y-1 max-w-[200px]">
              <div className="font-bold text-slate-800">Leyenda del mapa:</div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>🎢 Montaña Rusa (Alta Adrenalina)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span>🕹️ Simulador Inmersivo</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>👨‍👩‍👧‍👦 Paseo Familiar / Dark Ride</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>🚗 Descenso 2x UberXL</span>
              </div>
            </div>
          </div>

          {/* Bottom GPS Quick Action Bar */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activePark.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir Parque en Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={`https://maps.apple.com/?q=${encodeURIComponent(activePark.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                <span>Apple Maps</span>
              </a>
            </div>

            <button
              onClick={() => {
                const text = `🗺️ *MAPA DE ${activePark.name.toUpperCase()}*\n📍 Atracciones principales y drop-off de los 2x UberXL:\n${window.location.href}`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: LISTA CATEGORIZADA DE JUEGOS (5 Columnas) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Panel de Filtros & Búsqueda de Juegos */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar juego (ej: TRON, Hagrid, VelociCoaster)..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Categorías Principales (Tipo de Juego) */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Tipo de Atracción:
              </div>
              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    categoryFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setCategoryFilter('coaster')}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    categoryFilter === 'coaster' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🎢 Coasters
                </button>
                <button
                  onClick={() => setCategoryFilter('simulator')}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    categoryFilter === 'simulator' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🕹️ Simulador
                </button>
                <button
                  onClick={() => setCategoryFilter('family')}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    categoryFilter === 'family' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  👨‍👩‍👧‍👦 Familia
                </button>
              </div>
            </div>

            {/* Nivel de Intensidad */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Nivel de Intensidad:
              </div>
              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => setIntensityFilter('all')}
                  className={`py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                    intensityFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setIntensityFilter('high')}
                  className={`py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                    intensityFilter === 'high' ? 'bg-rose-100 text-rose-800 border-rose-300 font-bold' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🔥 Alta
                </button>
                <button
                  onClick={() => setIntensityFilter('medium')}
                  className={`py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                    intensityFilter === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ⚡ Moderada
                </button>
                <button
                  onClick={() => setIntensityFilter('gentle')}
                  className={`py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                    intensityFilter === 'gentle' ? 'bg-blue-100 text-blue-800 border-blue-300 font-bold' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🌱 Suave
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta de UberXL Dropoff destacada */}
          {activePark.uberDropoff && (
            <div 
              onClick={handleSelectUberDropoff}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedRideId === 'uber-dropoff' ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-emerald-200 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-950">{activePark.uberDropoff.name}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">2x UberXL</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{activePark.uberDropoff.notes}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          )}

          {/* Lista de Juegos con scroll */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredRides.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                No se encontraron atracciones con los filtros seleccionados.
              </div>
            ) : (
              filteredRides.map(ride => {
                const waitInfo = getRideWaitTime(ride);
                const isSelected = selectedRideId === ride.id;

                const categoryBadge = ride.category === 'coaster' ? '🎢 Coaster' : ride.category === 'simulator' ? '🕹️ Simulador' : '👨‍👩‍👧‍👦 Familiar';
                const intensityBg = ride.intensity === 'high' ? 'bg-rose-100 text-rose-800 border-rose-200' : ride.intensity === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-800 border-blue-200';
                const intensityText = ride.intensity === 'high' ? 'Alta Adrenalina' : ride.intensity === 'medium' ? 'Moderada' : 'Suave';

                return (
                  <div
                    key={ride.id}
                    onClick={() => handleSelectRide(ride)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20 bg-blue-50/20'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {ride.land}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${intensityBg}`}>
                            {intensityText}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {ride.name}
                        </h4>
                      </div>

                      {/* Wait Time Pill */}
                      <div className="flex flex-col items-end shrink-0">
                        <div className={`px-2.5 py-1 rounded-xl font-mono text-xs font-bold border ${
                          waitInfo.status === 'CLOSED'
                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                            : waitInfo.minutes > 60
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : waitInfo.minutes > 30
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {waitInfo.status === 'CLOSED' ? 'Cerrado' : `${waitInfo.minutes} min`}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-0.5">
                          {waitInfo.isLive ? '🟢 En vivo' : 'Promedio'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {ride.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        <span>⭐ <strong>{ride.adrenalineScore}/5</strong></span>
                        {ride.minHeightCm && <span>· 📏 <strong>{ride.minHeightCm}cm</strong></span>}
                        {ride.hasSingleRider && <span className="text-purple-700 font-bold">· Single Rider</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${ride.lat},${ride.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <span>Cómo llegar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};