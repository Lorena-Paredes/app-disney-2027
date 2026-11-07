import React from 'react';
import { Trophy, Ticket, MapPin, CalendarClock, Car } from 'lucide-react';

export const MiamiSportsView = () => {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Tarjeta NBA - Miami Heat */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -z-10" />
        
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-orange-100 rounded-xl shadow-inner">
            <Trophy className="w-7 h-7 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Miami Heat (NBA)</h2>
            <p className="text-sm font-medium text-slate-500">Kaseya Center</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Ticket className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-700">Entradas Grupo (10 personas)</p>
              <p className="text-sm text-slate-600 mt-0.5">Pendiente definir fecha exacta del partido y rival cuando salga el fixture de Enero 2027.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <Car className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-700">Logística de Traslado</p>
              <p className="text-sm text-slate-600 mt-0.5">Coordinar llegada en la combi contratada o solicitar 2 vehículos UberXL desde el hotel en Miami.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Inter Miami */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -z-10" />
        
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-pink-100 rounded-xl shadow-inner">
            <MapPin className="w-7 h-7 text-pink-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Inter Miami CF</h2>
            <p className="text-sm font-medium text-slate-500">Chase Stadium / Freedom Park</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <CalendarClock className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-700">Tour del Estadio y Museo</p>
              <p className="text-sm text-slate-600 mt-0.5">Reservar cupos para el recorrido de las instalaciones. Actividad principal para Renato, Máximo y los demás chicos del grupo.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};