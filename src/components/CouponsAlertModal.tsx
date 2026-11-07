import React from 'react';
import { AlertTriangle, Tag, X } from 'lucide-react';

interface CouponsAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CouponsAlertModal = ({ isOpen, onClose }: CouponsAlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-amber-50">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold">Alerta de Cupones y Outlets</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-amber-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-amber-700" />
          </button>
        </div>
        
        {/* Contenido */}
        <div className="p-5 space-y-4">
          <div className="flex gap-3">
            <Tag className="w-6 h-6 text-rose-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Descuentos Extra (Nike, Adidas, etc.)</p>
              <p className="text-sm text-slate-600 mt-1">
                Acordate de registrarte en las webs de Dolphin Mall, Sawgrass Mills y los Premium Outlets antes de viajar. Muchas marcas deportivas exigen escanear un código QR desde su propia app para aplicar el 10% o 20% de descuento adicional en caja.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-sm text-slate-600">
            <p><strong>Tip para el grupo (10 pasajeros):</strong> Al ser tantos, si juntan las compras de indumentaria deportiva o calzado en un solo ticket grande, es mucho más fácil alcanzar los montos mínimos que exigen los cupones más fuertes.</p>
          </div>
        </div>

        {/* Botón de cierre */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl font-medium text-sm hover:bg-slate-700 transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};