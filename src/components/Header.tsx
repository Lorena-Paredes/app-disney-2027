import React, { useState } from 'react';
import { 
  Calendar, Users, MapPin, Printer, Compass, Sparkles, 
  ShoppingBag, Car, CloudSun, Utensils, Mic, MessageCircle, Share2,
  Map as MapIcon, Trophy
} from 'lucide-react';
import { TRAVELERS } from '../data/tripData';

export type AppTab = 'itinerary' | 'attractions' | 'maps' | 'sports' | 'uber' | 'shopping' | 'notes' | 'weather';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenQuickService?: () => void;
  onOpenShareModal?: () => void;
  onOpenQuickVoice?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickService,
  onOpenShareModal,
  onOpenQuickVoice
}) => {
  const [showTravelersModal, setShowTravelersModal] = useState(false);

  const adults = TRAVELERS.filter(t => t.role === 'adult');
  const teens = TRAVELERS.filter(t => t.role === 'teen');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-4 to 8 */}
          <div className="flex items-center justify-between gap-4 lg:gap-8 h-16">
            {/* Zone 1: Brand title */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setActiveTab('itinerary')}
                className="flex items-center gap-2 group text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
                    Orlando 2027
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                    19 al 30 de Enero · 11 Pasajeros
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links for Desktop & Tablet */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'itinerary'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Itinerario
              </button>

              <button
                onClick={() => setActiveTab('attractions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'attractions'
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Atracciones
              </button>

              <button
                onClick={() => setActiveTab('maps')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'maps'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                Mapas
              </button>

              <button
                onClick={() => setActiveTab('sports')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'sports'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                NBA Kia Center
              </button>

              <button
                onClick={() => setActiveTab('uber')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'uber'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                UberXL (2 Autos)
              </button>

              <button
                onClick={() => setActiveTab('shopping')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'shopping'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Compras & Outlets
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'notes'
                    ? 'bg-rose-50 text-rose-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-rose-500" />
                Notas de Voz
              </button>

              <button
                onClick={() => setActiveTab('weather')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'weather'
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CloudSun className="w-3.5 h-3.5" />
                Clima & Ropa
              </button>
            </nav>

            {/* Zone 3: Primary Actions (WhatsApp Share, Quick Mic, Travelers) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* WhatsApp Share Button */}
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap"
                  title="Compartir enlace privado y plan con los adultos en WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">Compartir</span>
                </button>
              )}

              {/* Quick Voice Record Button */}
              {onOpenQuickVoice && (
                <button
                  onClick={onOpenQuickVoice}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors whitespace-nowrap"
                  title="Grabar un recordatorio de voz rápido"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                  <span>Grabar Audio</span>
                </button>
              )}

              {onOpenQuickService && (
                <button
                  onClick={onOpenQuickService}
                  className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
                  title="Lugares de comida rápida con Mobile Order para 11"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  <span>Comida Rápida</span>
                </button>
              )}

              <button
                onClick={() => setShowTravelersModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
                title="Ver lista de los 11 integrantes"
              >
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">11 Viajeros</span>
                <span className="sm:hidden">11 Pax</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Header Pill Bar for Quick Navigation */}
        <div className="lg:hidden flex items-center overflow-x-auto border-t border-slate-200 px-3 py-2 gap-2 scrollbar-none bg-slate-50">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'itinerary' ? 'bg-white text-blue-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            Itinerario
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'attractions' ? 'bg-white text-amber-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            Atracciones
          </button>
          <button
            onClick={() => setActiveTab('maps')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
              activeTab === 'maps' ? 'bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            <MapIcon className="w-3 h-3 text-indigo-600" />
            <span>Mapas</span>
          </button>
          <button
            onClick={() => setActiveTab('sports')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
              activeTab === 'sports' ? 'bg-white text-blue-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            <Trophy className="w-3 h-3 text-blue-600" />
            <span>NBA Kia Center</span>
          </button>
          <button
            onClick={() => setActiveTab('uber')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'uber' ? 'bg-white text-emerald-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            UberXL (2 Autos)
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'shopping' ? 'bg-white text-purple-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            Compras
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
              activeTab === 'notes' ? 'bg-rose-600 text-white shadow-xs font-bold' : 'text-rose-700 bg-rose-50 border border-rose-200'
            }`}
          >
            <Mic className="w-3 h-3" />
            <span>Notas de Voz</span>
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'weather' ? 'bg-white text-sky-700 shadow-xs border border-slate-200 font-bold' : 'text-slate-600'
            }`}
          >
            Clima & Ropa
          </button>
        </div>
      </header>

      {/* Info Strip */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-slate-300">Base:</span>
            <span className="font-semibold text-white">Celebration Suites (Kissimmee)</span>
            <span className="text-slate-400 hidden md:inline">· 11 Pasajeros · Distancias en km</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-300 overflow-x-auto scrollbar-none">
            <span>
              <strong className="text-white">4 Días</strong> Disney
            </span>
            <span>·</span>
            <span>
              <strong className="text-white">3 Días</strong> Universal
            </span>
            <span>·</span>
            <span>
              <strong className="text-white">3 Días</strong> Outlets
            </span>
            <span>·</span>
            <span className="text-indigo-300 font-medium">
              Combi a Miami (30 Ene)
            </span>
          </div>
        </div>
      </div>

      {/* Travelers Modal */}
      {showTravelersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Grupo de Viaje (11 Personas)</h3>
                <p className="text-xs text-slate-500">Celebration Suites · 19 al 30 de Enero 2027</p>
              </div>
              <button
                onClick={() => setShowTravelersModal(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                  5 Adultos Coordinadores
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {adults.map(adult => (
                    <div key={adult.id} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs">
                      <div className="font-bold text-slate-900">{adult.name}</div>
                      <div className="text-slate-600 text-[11px]">{adult.relation}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                  6 Adolescentes (Renato, Tuto, José, Máximo, Josefina y Luisina)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {teens.map(teen => (
                    <div key={teen.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 text-xs">
                      <div className="font-bold text-slate-900">{teen.name} ({teen.age} años)</div>
                      <div className="text-slate-600 text-[11px]">{teen.relation}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-900">Distribución de Vehículos para 2x UberXL:</div>
                <p>• <strong>Auto 1 (5 pax):</strong> Lorena, Celia, Juan, Renato, Máximo</p>
                <p>• <strong>Auto 2 (6 pax):</strong> Carolina, Fofi, Tuto, José, Josefina, Luisina</p>
                <div className="mt-2 pt-1.5 border-t border-slate-200 text-[11px] text-slate-600">
                  🏠 <strong>Hospedaje de Josefina:</strong> Ya resuelto, va en el departamento junto con la familia de Caro, Fofi, Tuto y Luisina.
                </div>
                <p className="text-indigo-700 font-semibold pt-1">
                  • <strong>Traslado Orlando ➔ Miami (30 Ene):</strong> Combi/Trafic privada ya contratada para los 11 con equipaje.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTravelersModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
