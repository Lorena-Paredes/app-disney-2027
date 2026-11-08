import React, { useState } from 'react';
import { Utensils, Smartphone, Users, Wind, CheckCircle, Info, X } from 'lucide-react';
import { QUICK_SERVICE_GUIDE, QuickServiceRestaurant } from '../data/tripData';

interface QuickServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickServiceModal: React.FC<QuickServiceModalProps> = ({ isOpen, onClose }) => {
  const [selectedPark, setSelectedPark] = useState<string>('all');

  if (!isOpen) return null;

  const parksList = Array.from(new Set(QUICK_SERVICE_GUIDE.map(r => r.park)));

  const filtered = QUICK_SERVICE_GUIDE.filter(r => {
    if (selectedPark !== 'all' && r.park !== selectedPark) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl border border-slate-200 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Utensils className="w-3.5 h-3.5" />
              <span>Guía Gastronómica de Parques</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Restaurantes Quick Service (Comida Rápida con Mobile Order) para 11 Personas
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Seleccionados específicamente por su gran capacidad de mesas contiguas bajo techo, aire acondicionado potente y soporte de pedidos móviles desde la app para no perder 45 minutos haciendo fila.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg font-bold shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter by Park */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 shrink-0 text-xs">
          <button
            onClick={() => setSelectedPark('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              selectedPark === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos los Parques ({QUICK_SERVICE_GUIDE.length})
          </button>
          {parksList.map(park => (
            <button
              key={park}
              onClick={() => setSelectedPark(park)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedPark === park
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {park}
            </button>
          ))}
        </div>

        {/* Strategy Alert Box for 10 People */}
        <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 shrink-0">
          <div className="font-bold flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-amber-700" />
            <span>Estrategia de Mobile Order para un grupo de 10:</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            1. En la app oficial de Disney (My Disney Experience) o Universal, <strong>1 o 2 adultos</strong> cargan el pedido de los 10 con 20 minutos de anticipación mientras caminan hacia el restaurante.<br />
            2. Al aproximarse, presionan <em>"I'm Here, Prepare My Food"</em>.<br />
            3. Mientras la comida se prepara, 2 personas del grupo entran al salón climatizado a conseguir y juntar mesas para los 10. ¡Esto evita el caos y ahorra más de media hora!
          </p>
        </div>

        {/* Scrollable Restaurant Cards */}
        <div className="mt-4 overflow-y-auto space-y-4 pr-1">
          {filtered.map(rest => (
            <div key={rest.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    {rest.park} · {rest.land}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {rest.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  {rest.mobileOrderAvailable && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      Mobile Order Disponible
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <div className="font-semibold text-slate-900">Tipo de Comida:</div>
                  <div className="text-slate-600 mt-0.5">{rest.cuisine}</div>

                  <div className="font-semibold text-slate-900 mt-2">Platos recomendados:</div>
                  <div className="text-slate-700 font-medium mt-0.5">{rest.recommendedDishes}</div>
                </div>

                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-blue-600" />
                    <span>Capacidad y Climatización:</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">{rest.seatingCapacity}</div>

                  <div className="font-semibold text-amber-900 mt-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>Ventaja para nuestro grupo de 11:</span>
                  </div>
                  <div className="text-slate-700 mt-0.5 leading-relaxed bg-white p-2 rounded border border-slate-200/70">
                    {rest.highlightsFor10Pax}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
