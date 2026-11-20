import React, { useState, useEffect } from 'react';
import { 
  Zap, Sparkles, CheckCircle2, Circle, Search, 
  Ruler, Clock, Flame, ShieldAlert, Award, Compass, Eye, MessageCircle
} from 'lucide-react';
import { ATTRACTIONS, Attraction } from '../data/tripData';

export const AttractionsRadarView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'teens' | 'group'>('all');
  const [selectedPark, setSelectedPark] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkedAttractions, setCheckedAttractions] = useState<Record<string, boolean>>({});

  // Load completed rides from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('orlando2027_checked_attractions');
      if (saved) {
        setCheckedAttractions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedAttractions, [id]: !checkedAttractions[id] };
    setCheckedAttractions(updated);
    localStorage.setItem('orlando2027_checked_attractions', JSON.stringify(updated));
  };

  const completedCount = Object.values(checkedAttractions).filter(Boolean).length;
  const totalCount = ATTRACTIONS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Parks list for filtering
  const parksList = Array.from(new Set(ATTRACTIONS.map(a => a.parkShort)));

  const filteredAttractions = ATTRACTIONS.filter(ride => {
    // Category filter
    if (selectedCategory === 'teens' && ride.targetAudience !== 'teens') return false;
    if (selectedCategory === 'group' && ride.targetAudience !== 'all') return false;

    // Park filter
    if (selectedPark !== 'all' && ride.parkShort !== selectedPark) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = ride.name.toLowerCase().includes(q);
      const matchPark = ride.park.toLowerCase().includes(q);
      const matchLand = ride.land.toLowerCase().includes(q);
      if (!matchName && !matchPark && !matchLand) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Radar de Atracciones · Bloque Disney (20–23 Ene) & Bloque Universal c/ Agustina (25–27 Ene)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Alertas de Adrenalina para los 7 Chicos vs Simuladores High-Tech para los 12 Viajeros
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Ordenadas cronológicamente parque por parque para Renato, Tuto, José, Máximo, Josefina, Luisina y Bruno (más los 5 adultos). Tocá un día en las alertas para filtrar directo ese parque.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-900 text-white p-4 rounded-xl shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Check-in de Atracciones</span>
              <span className="font-mono font-bold text-amber-400 tabular-nums">
                {completedCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex justify-between items-center">
              <span>{progressPercent}% Completadas</span>
              <button
                onClick={() => {
                  const appUrl = window.location.href.split('#')[0];
                  const msg = [
                    `🎢 *AVANCE DE ATRACCIONES · ORLANDO 2027 (12 VIAJEROS)*`,
                    `✅ Llevamos completadas *${completedCount} de ${totalCount} atracciones* (${progressPercent}% del desafío).`,
                    `🏰 *Disney (20–23 Ene):* Cosmic Rewind (20), Rise/Tower/Rock'n'Roller (21), TRON/Space Mtn (22), Avatar/Everest (23).`,
                    `🎢 *Universal c/ Agustina (25–27 Ene):* VelociCoaster/Hagrid/Hulk (25), Gringotts/Mummy/Rockit (26), Stardust Racers/Monsters/Mario Kart (27).`,
                    ``,
                    `📲 Ver lista completa y marcar atracciones: ${appUrl}`,
                  ].join('\n');
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                title="Compartir avance en WhatsApp"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alertas de Atracciones Recomendadas para los 7 Chicos en Orden Cronológico Exacto */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Alertas Recomendadas para los 7 Chicos (Orden Exacto de Parques)</span>
            </div>
            {selectedPark !== 'all' && (
              <button
                onClick={() => setSelectedPark('all')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
              >
                Ver todos los parques
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2">
            {[
              { parkShort: 'EPCOT', date: '20 Ene', block: 'Disney 1/4', topRides: 'Cosmic Rewind · Test Track', theme: 'disney' },
              { parkShort: 'Hollywood Studios', date: '21 Ene', block: 'Disney 2/4', topRides: 'Tower of Terror · Rock \'n\' Roller · Rise', theme: 'disney' },
              { parkShort: 'Magic Kingdom', date: '22 Ene', block: 'Disney 3/4', topRides: 'TRON Lightcycle · Space Mountain', theme: 'disney' },
              { parkShort: 'Animal Kingdom', date: '23 Ene', block: 'Disney 4/4', topRides: 'Avatar Flight · Expedition Everest', theme: 'disney' },
              { parkShort: 'Islands of Adventure', date: '25 Ene', block: 'Univ. 1/3 c/ Agus', topRides: 'VelociCoaster · Hagrid\'s · Hulk', theme: 'universal' },
              { parkShort: 'Universal Studios', date: '26 Ene', block: 'Univ. 2/3 c/ Agus', topRides: 'Mummy · Rip Ride Rockit · Gringotts', theme: 'universal' },
              { parkShort: 'Epic Universe', date: '27 Ene', block: 'Univ. 3/3 c/ Agus', topRides: 'Stardust Racers · Monsters · Werewolf', theme: 'universal' },
            ].map(alert => {
              const isSelected = selectedPark === alert.parkShort;
              return (
                <button
                  key={alert.parkShort}
                  onClick={() => setSelectedPark(isSelected ? 'all' : alert.parkShort)}
                  className={`text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? alert.theme === 'disney'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : alert.theme === 'disney'
                      ? 'bg-blue-50/50 border-blue-200 hover:bg-blue-100/70 text-slate-900'
                      : 'bg-indigo-50/50 border-indigo-200 hover:bg-indigo-100/70 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-[10px] font-bold">
                    <span className={isSelected ? 'text-white' : alert.theme === 'disney' ? 'text-blue-700' : 'text-indigo-700'}>
                      {alert.date}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                      {alert.block}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold mt-1 truncate">
                    {alert.parkShort}
                  </div>
                  <div className={`text-[10px] mt-0.5 leading-snug line-clamp-2 ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                    ⚡ {alert.topRides}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({ATTRACTIONS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('teens')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'teens' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Top Adrenalina Teens (13-15 años)
            </button>
            <button
              onClick={() => setSelectedCategory('group')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'group' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Simuladores High-Tech (Todo el Grupo)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o parque..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sub-Filter by Park */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 whitespace-nowrap">Parque:</span>
          <button
            onClick={() => setSelectedPark('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              selectedPark === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos los Parques
          </button>
          {parksList.map(park => (
            <button
              key={park}
              onClick={() => setSelectedPark(park)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                selectedPark === park ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {park}
            </button>
          ))}
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAttractions.map(ride => {
          const isChecked = !!checkedAttractions[ride.id];
          const isTeenHighAdrenaline = ride.targetAudience === 'teens';

          return (
            <div
              key={ride.id}
              className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                isChecked
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs ring-1 ring-emerald-400'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header row: Park & Land badge + Check-in button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span className="font-bold text-slate-800">{ride.parkShort}</span>
                      {ride.visitDayLabel && (
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          ride.visitDayLabel.includes('Disney')
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {ride.visitDayLabel}
                        </span>
                      )}
                      <span>·</span>
                      <span>{ride.land}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {ride.name}
                    </h3>
                  </div>

                  {/* Toggle Check-in Button */}
                  <button
                    onClick={() => toggleCheck(ride.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      isChecked
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isChecked ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>¡Subida!</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Marcar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Badges strip: Category, Adrenaline, Tech, Height */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                  <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    isTeenHighAdrenaline
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isTeenHighAdrenaline ? '⚡ Adrenalina Teens' : '✨ Simulador / Todo el Grupo'}
                  </span>

                  {/* Adrenaline Rating */}
                  <div className="flex items-center gap-0.5 text-amber-600 font-mono text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Flame className="w-3 h-3" />
                    <span>Adrenalina {ride.adrenalineLevel}/5</span>
                  </div>

                  {/* Tech Rating */}
                  <div className="flex items-center gap-0.5 text-blue-600 font-mono text-[11px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    <Sparkles className="w-3 h-3" />
                    <span>Tecnología {ride.techImmersionLevel}/5</span>
                  </div>

                  {/* Minimum Height */}
                  {ride.minHeightCm > 0 ? (
                    <div className="flex items-center gap-1 text-slate-600 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                      <Ruler className="w-3 h-3 text-slate-400" />
                      <span>Mín: {ride.minHeightCm} cm ({ride.minHeightInches}")</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Cualquier altura
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {ride.description}
                </p>

                {/* Group Fit Rationale */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Para nuestro grupo de 12:</span>
                  </div>
                  <p className="text-slate-600">
                    {ride.whyForGroup}
                  </p>
                </div>
              </div>

              {/* Footer Strategy / Queue Tips */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-700">{ride.queueStrategy}</span>
                </div>
                {ride.hasSingleRider && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                    Single Rider ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
