import React, { useState } from 'react';
import { Map as MapIcon, Navigation, Compass } from 'lucide-react';

export const InteractiveMapsView = () => {
  const [activeMap, setActiveMap] = useState<'disney' | 'universal' | 'miami'>('disney');

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Selector de Mapas */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        <button
          onClick={() => setActiveMap('disney')}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${activeMap === 'disney' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Walt Disney World
        </button>
        <button
          onClick={() => setActiveMap('universal')}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${activeMap === 'universal' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Universal Orlando
        </button>
        <button
          onClick={() => setActiveMap('miami')}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${activeMap === 'miami' ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Miami & Outlets
        </button>
      </div>

      {/* Contenedor del Mapa */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <MapIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">
              {activeMap === 'disney' && 'Mapa de Parques Disney'}
              {activeMap === 'universal' && 'Mapa de Universal Studios'}
              {activeMap === 'miami' && 'Mapa de Puntos en Miami'}
            </h2>
            <p className="text-sm text-slate-500">Visualización interactiva</p>
          </div>
        </div>

        {/* Espacio del mapa interactivo recuperado */}
        <div className="w-full h-[400px] bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
          <Compass className="w-10 h-10 mb-3 text-slate-400 animate-pulse" />
          <p className="font-medium text-slate-700">El mapa interactivo se cargará aquí.</p>
          <p className="text-sm mt-1 text-slate-500">Recuperamos la estructura de mapas que tenías en la versión de Vercel.</p>
        </div>
        
        <div className="mt-4 flex items-start gap-3 text-sm text-slate-600 bg-amber-50 p-3.5 rounded-xl border border-amber-100">
          <Navigation className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>Recordá cargar esta pantalla con WiFi en el hotel antes de salir para que los mapas queden cacheados y funcionen sin consumir tus datos móviles en los parques.</p>
        </div>
      </div>
    </div>
  );
};