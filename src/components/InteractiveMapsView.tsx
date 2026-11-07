import React, { useState } from 'react';
import { 
  Map as MapIcon, Navigation, Compass, ExternalLink, MapPin, 
  Car, Clock, Sparkles, MessageCircle, Share2, Layers, CheckCircle2,
  Info, ShieldCheck, ArrowRight
} from 'lucide-react';

export interface MapDestination {
  id: string;
  name: string;
  category: 'universal' | 'disney' | 'miami';
  parkBrand: 'Universal' | 'Disney' | 'NBA Miami';
  address: string;
  distanceKmFromCelebration: number | string;
  driveTimeMin: string;
  dropoffLocation: string;
  dropoffTips: string;
  topAttractions: string[];
  googleMapsQuery: string;
  embedQuery: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

export const MAP_DESTINATIONS: MapDestination[] = [
  {
    id: 'universal-studios',
    name: 'Universal Studios Florida',
    category: 'universal',
    parkBrand: 'Universal',
    address: '6000 Universal Blvd, Orlando, FL 32819',
    distanceKmFromCelebration: 21.7,
    driveTimeMin: '22 a 28 min',
    dropoffLocation: 'Piso 5 de la mega-estructura de CityWalk (Rideshare Hub)',
    dropoffTips: 'Los 2 UberXL suben directo al Piso 5. Bajar por las escaleras mecánicas hacia la seguridad general de CityWalk.',
    topAttractions: [
      'Harry Potter and the Escape from Gringotts (Diagon Alley)',
      'Revenge of the Mummy (Montaña rusa bajo techo)',
      'Hollywood Rip Ride Rockit (Subida vertical a 90°)',
      'Transformers: The Ride 3D',
      'MEN IN BLACK: Alien Attack'
    ],
    googleMapsQuery: 'Universal Studios Florida, 6000 Universal Blvd, Orlando, FL 32819',
    embedQuery: 'Universal+Studios+Florida,+Orlando,+FL',
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    badgeText: 'Universal',
  },
  {
    id: 'islands-of-adventure',
    name: "Universal's Islands of Adventure",
    category: 'universal',
    parkBrand: 'Universal',
    address: '6000 Universal Blvd, Orlando, FL 32819',
    distanceKmFromCelebration: 21.7,
    driveTimeMin: '22 a 28 min',
    dropoffLocation: 'Piso 5 de la mega-estructura de CityWalk (Rideshare Hub)',
    dropoffTips: 'Salida 7:15 AM desde Celebration Suites para Rope Drop hacia Hagrid’s Motorbike Adventure.',
    topAttractions: [
      'Jurassic World VelociCoaster (La montaña rusa más extrema)',
      "Hagrid's Magical Creatures Motorbike Adventure",
      'The Incredible Hulk Coaster (Lanzamiento acelerado)',
      'Harry Potter and the Forbidden Journey (Castillo de Hogwarts)',
      'Doctor Doom’s Fearfall'
    ],
    googleMapsQuery: "Universal's Islands of Adventure, Orlando, FL 32819",
    embedQuery: "Universal's+Islands+of+Adventure,+Orlando,+FL",
    accentColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeText: 'Universal',
  },
  {
    id: 'magic-kingdom',
    name: 'Magic Kingdom (Walt Disney World)',
    category: 'disney',
    parkBrand: 'Disney',
    address: 'Transportation and Ticket Center (TTC), 1183 Seven Seas Dr, Lake Buena Vista, FL 32830',
    distanceKmFromCelebration: 14.8,
    driveTimeMin: '16 a 22 min (+20 min Monorail/Ferry)',
    dropoffLocation: 'Transportation & Ticket Center (TTC) - Rideshare Loop',
    dropoffTips: '⚠️ Regla de oro: Ningún Uber entra al castillo. Te deja en el TTC y desde allí los 10 toman el Monorail Express o Ferryboat gratis.',
    topAttractions: [
      'TRON Lightcycle / Run (Moto futurista a alta velocidad)',
      'Space Mountain (Montaña rusa en la oscuridad absoluta)',
      'Big Thunder Mountain Railroad (Tren minero veloz)',
      'Seven Dwarfs Mine Train',
      'Show de fuegos artificiales Happily Ever After en el Castillo'
    ],
    googleMapsQuery: 'Transportation and Ticket Center, Lake Buena Vista, FL 32830',
    embedQuery: 'Transportation+and+Ticket+Center,+Magic+Kingdom,+Orlando,+FL',
    accentColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    badgeText: 'Disney World',
  },
  {
    id: 'epcot',
    name: "Disney's EPCOT",
    category: 'disney',
    parkBrand: 'Disney',
    address: '200 Epcot Center Dr, Lake Buena Vista, FL 32830',
    distanceKmFromCelebration: 12.5,
    driveTimeMin: '14 a 18 min',
    dropoffLocation: 'Rideshare Drop-off junto al estacionamiento principal (Loop EPCOT)',
    dropoffTips: 'A solo 200 metros de la entrada bajo la gran geosfera Spaceship Earth. Acceso muy rápido y fluido.',
    topAttractions: [
      'Guardians of the Galaxy: Cosmic Rewind (Coaster con giro 360° y música)',
      'Test Track (Pista de pruebas a 105 km/h)',
      'Soarin’ Around the World (Vuelo en parapente virtual)',
      'Mission: SPACE (Simulador centrífugo de la NASA)',
      'World Showcase (Pabellones internacionales)'
    ],
    googleMapsQuery: "EPCOT, 200 Epcot Center Dr, Lake Buena Vista, FL 32830",
    embedQuery: "EPCOT,+Walt+Disney+World,+Orlando,+FL",
    accentColor: 'sky',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    badgeText: 'Disney World',
  },
  {
    id: 'hollywood-studios',
    name: "Disney's Hollywood Studios",
    category: 'disney',
    parkBrand: 'Disney',
    address: '351 S Studio Dr, Lake Buena Vista, FL 32830',
    distanceKmFromCelebration: 9.6,
    driveTimeMin: '11 a 15 min',
    dropoffLocation: 'Loop exclusivo de Uber a solo 150m de los molinetes principales',
    dropoffTips: 'Uno de los descensos más cómodos de Disney. No requiere monorriel ni ferry; se entra caminando en 2 minutos.',
    topAttractions: [
      'Star Wars: Rise of the Resistance (La experiencia más inmersiva del mundo)',
      'The Twilight Zone Tower of Terror (Caída libre en elevador)',
      'Rock ’n’ Roller Coaster starring Aerosmith (0 a 92 km/h en 2.8s)',
      'Millennium Falcon: Smugglers Run (Piloto del Halcón Milenario)',
      'Slinky Dog Dash (Toy Story Land)'
    ],
    googleMapsQuery: "Disney's Hollywood Studios, Orlando, FL 32830",
    embedQuery: "Disney's+Hollywood+Studios,+Orlando,+FL",
    accentColor: 'rose',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    badgeText: 'Disney World',
  },
  {
    id: 'animal-kingdom',
    name: "Disney's Animal Kingdom",
    category: 'disney',
    parkBrand: 'Disney',
    address: '2901 Osceola Pkwy, Lake Buena Vista, FL 32830',
    distanceKmFromCelebration: 10.9,
    driveTimeMin: '12 a 16 min',
    dropoffLocation: 'Loop de Rideshare a 100m del arco de bienvenida principal',
    dropoffTips: 'El parque más cercano y de menor congestión vial desde Celebration Suites. Ruta directa por Osceola Parkway.',
    topAttractions: [
      'Avatar Flight of Passage (Volar sobre un Banshee en Pandora - Top 1)',
      'Expedition Everest - Legend of the Forbidden Mountain (Coaster en reversa)',
      'Kilimanjaro Safaris (Safari real con animales de África)',
      'DINOSAUR (Viaje prehistórico en rover 4x4)',
      'Festival of the Lion King (Show musical acrobático)'
    ],
    googleMapsQuery: "Disney's Animal Kingdom Theme Park, Orlando, FL",
    embedQuery: "Disney's+Animal+Kingdom+Theme+Park,+Orlando,+FL",
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeText: 'Disney World',
  },
  {
    id: 'kaseya-center',
    name: 'Kaseya Center · Miami Heat (NBA)',
    category: 'miami',
    parkBrand: 'NBA Miami',
    address: '601 Biscayne Blvd, Miami, FL 33132 (Downtown Miami frente a Bayside)',
    distanceKmFromCelebration: '380 km (Orlando ➔ Miami) / 15 min desde Hotel Seacoast',
    driveTimeMin: '15 min en Uber desde Hotel Seacoast / Combi interurbana 3h 30m',
    dropoffLocation: 'Biscayne Blvd / PortMiami Tunnel Loop frente a Bayside Marketplace',
    dropoffTips: 'Llegada en combi el sábado 30 de enero para el partido confirmado Miami Heat vs. Philadelphia 76ers (14:30 hs ARG / 12:30 PM local). Bayside está cruzando la calle para almorzar.',
    topAttractions: [
      'Partido NBA: Miami Heat vs. Philadelphia 76ers (Sáb 30 Ene 2027)',
      'Arena Kaseya Center frente a la Bahía de Biscayne',
      'Tienda Oficial Miami Heat Store (Camisetas y gorras)',
      'Bayside Marketplace (Muelle, tiendas y restaurantes frente al agua)',
      'Metromover gratuito de Downtown Miami'
    ],
    googleMapsQuery: 'Kaseya Center, 601 Biscayne Blvd, Miami, FL 33132',
    embedQuery: 'Kaseya+Center,+Biscayne+Boulevard,+Miami,+FL',
    accentColor: 'orange',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    badgeText: 'Miami NBA',
  },
];

export const InteractiveMapsView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('universal-studios');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'universal' | 'disney' | 'miami'>('all');

  const activeDest = MAP_DESTINATIONS.find(d => d.id === selectedId) || MAP_DESTINATIONS[0];

  const filteredDestinations = MAP_DESTINATIONS.filter(d => {
    if (categoryFilter === 'all') return true;
    return d.category === categoryFilter;
  });

  const handleShareWhatsApp = (dest: MapDestination) => {
    const text = [
      `📍 *MAPA Y UBICACIÓN: ${dest.name.toUpperCase()}*`,
      `🏢 *Dirección:* ${dest.address}`,
      `🚗 *Distancia:* ${typeof dest.distanceKmFromCelebration === 'number' ? `${dest.distanceKmFromCelebration} km` : dest.distanceKmFromCelebration}`,
      `⏱️ *Tiempo estimado:* ${dest.driveTimeMin}`,
      `📌 *Drop-off UberXL:* ${dest.dropoffLocation}`,
      `💡 *Consejo:* ${dest.dropoffTips}`,
      ``,
      `🗺️ Abrir en Google Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.googleMapsQuery)}`,
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Cabecera / Hero */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <MapIcon className="w-3.5 h-3.5" />
              <span>Mapas Funcionales & Zonas de Drop-Off</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Mapas Interactivos de Parques y Kaseya Center
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Explorá la vista en vivo de Google Maps para cada uno de los 6 parques temáticos de Orlando y el estadio de la NBA en Miami. Con indicaciones exactas para el descenso de los 2 vehículos UberXL y botones de navegación directa hacia Google Maps y Apple Maps.
            </p>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center overflow-x-auto">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (7)
            </button>
            <button
              onClick={() => setCategoryFilter('universal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'universal' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Universal (2)
            </button>
            <button
              onClick={() => setCategoryFilter('disney')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'disney' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Disney (4)
            </button>
            <button
              onClick={() => setCategoryFilter('miami')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === 'miami' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Miami NBA (1)
            </button>
          </div>
        </div>

        {/* Carrusel Selector de Destinos */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredDestinations.map(dest => {
            const isSelected = dest.id === selectedId;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedId(dest.id)}
                className={`flex flex-col text-left px-3.5 py-2.5 rounded-xl border transition-all shrink-0 min-w-[170px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${dest.badgeBg}`}>
                    {dest.badgeText}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {typeof dest.distanceKmFromCelebration === 'number' ? `${dest.distanceKmFromCelebration} km` : 'Miami'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                  {dest.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {dest.driveTimeMin}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenedor Principal: Mapa Interactivo y Datos Logísticos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Columna Izquierda: Mapa Funcional Iframe de Google Maps (7 Columnas en Desktop) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {activeDest.name}
                </h3>
                <p className="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md">
                  {activeDest.address}
                </p>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeDest.badgeBg}`}>
              {activeDest.badgeText}
            </span>
          </div>

          {/* Iframe Funcional de Google Maps Embed sin claves ni bloqueos */}
          <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-100">
            <iframe
              title={`Mapa de ${activeDest.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${activeDest.embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full"
            />
          </div>

          {/* Barra de Acciones Directas con target="_blank" */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeDest.googleMapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir en Google Maps (GPS)</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={`https://maps.apple.com/?q=${encodeURIComponent(activeDest.googleMapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-xs transition-colors"
                title="Abrir en Apple Maps (iPhone)"
              >
                <span>Apple Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

            <button
              onClick={() => handleShareWhatsApp(activeDest)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-xs transition-colors"
              title="Compartir ubicación en el grupo de WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Columna Derecha: Tarjetas de Información Logística y Atracciones (5 Columnas) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Tarjeta de Traslado y Drop-Off para UberXL */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Logística de Acceso (2x UberXL)</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                10 Pasajeros
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Distancia</span>
                <span className="font-bold text-slate-900 text-sm font-mono">
                  {typeof activeDest.distanceKmFromCelebration === 'number' ? `${activeDest.distanceKmFromCelebration} km` : '380 km'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {activeDest.category === 'miami' ? 'Desde Orlando' : 'Desde Celebration'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tiempo en Auto</span>
                <span className="font-bold text-slate-900 text-sm font-mono">
                  {activeDest.driveTimeMin.split(' ')[0]} min
                </span>
                <span className="text-[10px] text-slate-500 block">Tránsito normal</span>
              </div>
            </div>

            {/* Zona Exacta de Descenso */}
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Punto Exacto de Descenso (Drop-Off):</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {activeDest.dropoffLocation}
              </p>
            </div>

            {/* Consejo Táctico */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Recomendación Práctica para el Grupo:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeDest.dropoffTips}
              </p>
            </div>

            {/* Botón de Cómo Llegar directo desde el hotel */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=Celebration+Suites,+Kissimmee,+FL&destination=${encodeURIComponent(activeDest.googleMapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
            >
              <Car className="w-3.5 h-3.5 text-slate-600" />
              <span>Ver Ruta y Tráfico en Vivo desde Celebration Suites</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>

          {/* Atracciones Clave en esta Ubicación */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Puntos Clave / Atracciones en este Destino</span>
            </div>

            <ul className="space-y-2 text-xs">
              {activeDest.topAttractions.map((attraction, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100/80">
                  <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 font-medium leading-tight pt-0.5">
                    {attraction}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Nota de Ayuda sin conexión */}
      <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl text-xs text-slate-600 flex items-start gap-3">
        <Compass className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">
            Tip para ahorrar datos móviles en los parques:
          </p>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Podés descargar en la app de Google Maps de tu teléfono el mapa del área de <strong>Orlando y Kissimmee</strong> como "Mapa sin conexión" (Offline Map) usando el WiFi de Celebration Suites. De esa manera, el GPS y las rutas funcionarán sin gastar paquetes de roaming ni roaming internacional durante el día.
          </p>
        </div>
      </div>

    </div>
  );
};