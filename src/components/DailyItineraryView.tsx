import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Car, Utensils, Sparkles, ShoppingBag, 
  ChevronLeft, ChevronRight, CheckCircle2, BookmarkCheck,
  AlertCircle, Info, StickyNote, Sun, Bus, Smartphone, MessageCircle
} from 'lucide-react';
import { ITINERARY, ItineraryDay } from '../data/tripData';

interface DailyItineraryViewProps {
  onSelectParkAttractions?: (parkCode: string) => void;
  onOpenUberCalc?: (destinationName: string) => void;
  onOpenSupermarkets?: () => void;
}

export const DailyItineraryView: React.FC<DailyItineraryViewProps> = ({ 
  onSelectParkAttractions,
  onOpenUberCalc,
  onOpenSupermarkets
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(2); // Default to Day 2 (first park: Universal IOA)
  const [filterType, setFilterType] = useState<'all' | 'park' | 'shopping'>('all');
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});
  const [editingNote, setEditingNote] = useState<boolean>(false);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');

  // Load notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('orlando2027_day_notes');
      if (saved) {
        setUserNotes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const activeDay: ItineraryDay = ITINERARY.find(d => d.dayNumber === selectedDayNumber) || ITINERARY[0];
  const isDay12PrivateCombi = activeDay.dayNumber === 12;

  const handleSaveNote = () => {
    const updated = { ...userNotes, [selectedDayNumber]: currentNoteText };
    setUserNotes(updated);
    localStorage.setItem('orlando2027_day_notes', JSON.stringify(updated));
    setEditingNote(false);
  };

  const handleStartEditNote = () => {
    setCurrentNoteText(userNotes[selectedDayNumber] || '');
    setEditingNote(true);
  };

  const filteredDays = ITINERARY.filter(day => {
    if (filterType === 'park') return day.type === 'park';
    if (filterType === 'shopping') return day.type === 'shopping';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Philosophy */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Itinerario Optimizado · 12 Días (19 al 30 de Enero 2027)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Ritmo Balanceado: Parques Intensos intercalados con Descanso y Compras
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Diseñado para que los 5 adultos no se agoten físicamente, mientras que los 6 adolescentes de 13 a 15 años disfrutan al máximo de las montañas rusas más extremas de Orlando. Distancias calculadas en kilómetros (km) desde Celebration Suites.
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (12)
            </button>
            <button
              onClick={() => setFilterType('park')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterType === 'park' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parques (7)
            </button>
            <button
              onClick={() => setFilterType('shopping')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterType === 'shopping' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compras & Relax (3)
            </button>
          </div>
        </div>

        {/* Horizontal Carousel of Days */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredDays.map(day => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const isPark = day.type === 'park';
            const isShopping = day.type === 'shopping';

            return (
              <button
                key={day.dayNumber}
                onClick={() => {
                  setSelectedDayNumber(day.dayNumber);
                  setEditingNote(false);
                }}
                className={`flex flex-col text-left px-3.5 py-2.5 rounded-xl border transition-all shrink-0 min-w-[130px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-blue-700' : 'text-slate-500'
                  }`}>
                    Día {day.dayNumber}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    isPark ? 'bg-blue-100 text-blue-800' : isShopping ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isPark ? 'Parque' : isShopping ? 'Compras' : 'Viaje'}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1 whitespace-nowrap">
                  {day.dateStr}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[115px] mt-0.5">
                  {day.parkName || day.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Day Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Day Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                <span>Día {activeDay.dayNumber} de 12</span>
                <span>·</span>
                <span>{activeDay.dayOfWeek} {activeDay.dateFull}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {activeDay.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
                {activeDay.highlight}
              </p>
            </div>

            {/* Day Nav Actions & WhatsApp Share */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const appUrl = window.location.href.split('#')[0];
                  const text = [
                    `📅 *PLAN DÍA ${activeDay.dayNumber}: ${activeDay.dateStr}*`,
                    `📍 *Destino:* ${activeDay.title}`,
                    `✨ *Foco:* ${activeDay.highlight}`,
                    `🚗 *Salida UberXL:* ${activeDay.uberRecommendation.departureTime} hacia ${activeDay.uberRecommendation.destination} (~${activeDay.uberRecommendation.distanceKm} km)`,
                    activeDay.quickServiceRecommendation ? `🍔 *Almuerzo sugerido:* ${activeDay.quickServiceRecommendation.name}` : '',
                    ``,
                    `📲 Abrir App: ${appUrl}`,
                  ].filter(Boolean).join('\n');
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
                title="Enviar el plan de este día al grupo de WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <button
                disabled={selectedDayNumber === 1}
                onClick={() => setSelectedDayNumber(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Día anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold px-2 text-slate-300 font-mono tabular-nums">
                {selectedDayNumber} / 12
              </span>
              <button
                disabled={selectedDayNumber === 12}
                onClick={() => setSelectedDayNumber(prev => Math.min(12, prev + 1))}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Día siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Transportation Logistics Strip for Today */}
        {isDay12PrivateCombi ? (
          <div className="p-4 sm:p-5 bg-indigo-50/80 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Combi / Trafic Privada ya Contratada (Sin Uber)
                  </span>
                  <span className="text-[11px] text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded font-semibold">
                    Salida: 11:00 hs
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-1">
                  <strong>Trayecto interurbano:</strong> Celebration Suites ➔ Hotel Seacoast (Miami Beach, {activeDay.uberRecommendation.distanceKm} km por Florida's Turnpike).
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong>Parada técnica en ruta:</strong> Fort Drum Service Plaza (km 190, mitad de camino) para estirar las piernas y almorzar.
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 bg-white text-indigo-800 border border-indigo-200 rounded-lg text-xs font-semibold shrink-0">
              Vehículo privado contratado ✓
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 bg-emerald-50/70 border-b border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Logística 2x UberXL recomendada (10 Pasajeros)
                  </span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                    Salida: {activeDay.uberRecommendation.departureTime} hs
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-1">
                  <strong>Destino:</strong> {activeDay.uberRecommendation.destination} ({activeDay.uberRecommendation.distanceKm} km · ~{activeDay.uberRecommendation.estMinutes} min desde Celebration Suites).
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong>Zona exacta de descenso (Drop-off):</strong> {activeDay.uberRecommendation.recommendedDropoff}
                </p>
              </div>
            </div>

            {onOpenUberCalc && (
              <button
                onClick={() => onOpenUberCalc(activeDay.uberRecommendation.destination)}
                className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors shrink-0 whitespace-nowrap self-start md:self-center"
              >
                Ver calculadora y zonas Drop-off
              </button>
            )}
          </div>
        )}

        {/* Dual Focus Column: Teens vs Adults */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
          {/* Teens Focus */}
          <div className="p-5 bg-amber-50/40">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Foco Adrenalina (5 Adolescentes · 13 a 15 años)</span>
            </div>
            <ul className="space-y-1.5">
              {activeDay.teenFocus.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Adults / Whole Group Focus */}
          <div className="p-5 bg-blue-50/40">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Foco Simuladores & Confort (5 Adultos y Grupo Completo)</span>
            </div>
            <ul className="space-y-1.5">
              {activeDay.adultFocus.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Timeline of the Day */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Cronograma Horario Sugerido
            </h4>
            <span className="text-xs text-slate-500">
              Horarios planificados para evitar las demoras de las filas más largas
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {activeDay.schedule.map((item, idx) => {
              const isRide = item.type === 'ride';
              const isFood = item.type === 'food';
              const isTransport = item.type === 'transport';
              const isShopping = item.type === 'shopping';

              return (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                    isRide ? 'bg-blue-600' : isFood ? 'bg-amber-500' : isTransport ? 'bg-emerald-500' : isShopping ? 'bg-purple-600' : 'bg-slate-400'
                  }`} />

                  <div className="bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-xl border border-slate-200/80 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs tabular-nums">
                        {item.time} hs
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 capitalize">
                        {item.type || 'Paso'}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-900 mt-1.5">
                      {item.activity}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 mt-1 bg-white/60 p-2 rounded border border-slate-200/60 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item.notes}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Service Highlight & Group Dining */}
        {activeDay.quickServiceRecommendation && (
          <div className="px-6 pb-6">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>Restaurante Quick Service Recomendado (Con Mobile Order para 10)</span>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {activeDay.quickServiceRecommendation.location}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {activeDay.quickServiceRecommendation.name}
              </div>
              <p className="text-xs text-slate-700 mt-1">
                <strong>Especialidad:</strong> {activeDay.quickServiceRecommendation.specialty}
              </p>
              <p className="text-xs text-amber-900 mt-1 font-medium bg-white/70 p-2 rounded border border-amber-200/60">
                💡 <strong>Por qué es ideal para nuestro grupo de 10:</strong> {activeDay.quickServiceRecommendation.whyFor10Pax}
              </p>
            </div>
          </div>
        )}

        {/* Footer Notes & Dining Tip */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Gastronomía & Snacks para 10 Personas</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeDay.mealsTip}
              </p>
            </div>

            {onOpenSupermarkets && (
              <button
                onClick={onOpenSupermarkets}
                className="mt-3 text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ver opciones de Walmart Supercenter para aprovisionar snacks</span>
              </button>
            )}
          </div>

          {/* User Notes Card */}
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <StickyNote className="w-4 h-4 text-purple-600" />
                <span>Notas del Grupo para este Día</span>
              </div>
              {!editingNote && (
                <button
                  onClick={handleStartEditNote}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                >
                  {userNotes[selectedDayNumber] ? 'Editar Nota' : '+ Agregar Nota'}
                </button>
              )}
            </div>

            {editingNote ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={currentNoteText}
                  onChange={e => setCurrentNoteText(e.target.value)}
                  placeholder="Ej: Celia compra las botellas de agua; Renato y Máximo piden la fila virtual..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingNote(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {userNotes[selectedDayNumber] || 'Sin notas personalizadas todavía. Haz clic en "Agregar Nota" para registrar recordatorios de reservas o compras.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
