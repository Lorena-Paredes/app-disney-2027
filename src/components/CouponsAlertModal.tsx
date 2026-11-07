import React from 'react';
import { AlertTriangle, Tag, X, ExternalLink, ArrowRight, ShoppingBag } from 'lucide-react';

interface CouponsAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShopping?: () => void;
}

export const CouponsAlertModal: React.FC<CouponsAlertModalProps> = ({ 
  isOpen, 
  onClose,
  onNavigateToShopping 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-amber-50">
          <div className="flex items-center gap-2 text-amber-800 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3>Alerta de Cupones y Outlets</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-amber-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Contenido */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          <div className="flex gap-3">
            <Tag className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Descuentos Extra (Nike, Adidas, Outlets)</p>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Acordate de registrarte en los clubes VIP de <strong>Orlando International Premium Outlets</strong>, <strong>Vineland Premium Outlets</strong>, <strong>Dolphin Mall</strong> y <strong>Sawgrass Mills</strong> antes de viajar. Muchas marcas deportivas exigen escanear un código QR desde su propia app para aplicar el 10% o 20% de descuento adicional en caja.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">💡 Tip de compra para el grupo de 10:</p>
            <p className="leading-relaxed">
              Al ser 10 personas, si juntan las compras de botines o indumentaria deportiva en un solo ticket grande de caja, es muy fácil superar los $100 o $150 USD y activar los cupones de mayor descuento.
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
          {onNavigateToShopping && (
            <button
              onClick={onNavigateToShopping}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ver Guía de Compras</span>
            </button>
          )}

          <button 
            onClick={onClose}
            className="ml-auto px-5 py-2 bg-slate-800 text-white rounded-xl font-semibold text-xs hover:bg-slate-700 transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};