import React, { useState } from 'react';
import { 
  Calendar, Sparkles, Car, ShoppingBag, CloudSun,
  Mic, MessageCircle, Share2, Utensils, Plus, Check,
  Map, Trophy, BellRing
} from 'lucide-react';
import { Header, AppTab } from './components/Header';
import { DailyItineraryView } from './components/DailyItineraryView';
import { AttractionsRadarView } from './components/AttractionsRadarView';
import { UberCalculatorView } from './components/UberCalculatorView';
import { ShoppingTechGuideView } from './components/ShoppingTechGuideView';
import { WeatherPackingView } from './components/WeatherPackingView';
import { VoiceNotesView } from './components/VoiceNotesView';
import { QuickServiceModal } from './components/QuickServiceModal';
import { ShareModal } from './components/ShareModal';
import { QuickVoiceModal } from './components/QuickVoiceModal';

// --- NUEVOS COMPONENTES A CREAR ---
import { MiamiSportsView } from './components/MiamiSportsView';
import { InteractiveMapsView } from './components/InteractiveMapsView';
import { CouponsAlertModal } from './components/CouponsAlertModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('itinerary');
  const [shoppingSubTab, setShoppingSubTab] = useState<'cleats' | 'tech' | 'supermarkets' | 'destinations' | 'coupons'>('cleats');
  
  // Modals state
  const [showQuickServiceModal, setShowQuickServiceModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showQuickVoiceModal, setShowQuickVoiceModal] = useState<boolean>(false);
  const [showCouponsModal, setShowCouponsModal] = useState<boolean>(false);

  const handleOpenSupermarkets = () => {
    setShoppingSubTab('supermarkets');
    setActiveTab('shopping');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900 pb-24 lg:pb-8">
      {/* Top Header */}
      <Header 
        activeTab={activeTab as AppTab} 
        setActiveTab={setActiveTab as any} 
        onOpenQuickService={() => setShowQuickServiceModal(true)}
        onOpenShareModal={() => setShowShareModal(true)}
        onOpenQuickVoice={() => setShowQuickVoiceModal(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
        {activeTab === 'itinerary' && (
          <DailyItineraryView
            onSelectParkAttractions={() => setActiveTab('attractions')}
            onOpenUberCalc={() => setActiveTab('uber')}
            onOpenSupermarkets={handleOpenSupermarkets}
          />
        )}

        {activeTab === 'attractions' && (
          <AttractionsRadarView />
        )}

        {activeTab === 'maps' && (
          <InteractiveMapsView />
        )}

        {activeTab === 'sports' && (
          <MiamiSportsView />
        )}

        {activeTab === 'uber' && (
          <UberCalculatorView />
        )}

        {activeTab === 'shopping' && (
          <ShoppingTechGuideView initialTab={shoppingSubTab} />
        )}

        {activeTab === 'notes' && (
          <VoiceNotesView 
            onOpenShareModal={() => setShowShareModal(true)}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherPackingView />
        )}
      </main>

      {/* Modales Existentes */}
      <QuickServiceModal
        isOpen={showQuickServiceModal}
        onClose={() => setShowQuickServiceModal(false)}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        activeTab={activeTab}
      />

      <QuickVoiceModal
        isOpen={showQuickVoiceModal}
        onClose={() => setShowQuickVoiceModal(false)}
        onOpenNotesView={() => setActiveTab('notes')}
      />

      {/* NUEVO: Modal de Alerta de Cupones de Outlets */}
      <CouponsAlertModal
        isOpen={showCouponsModal}
        onClose={() => setShowCouponsModal(false)}
        onNavigateToShopping={() => {
          setShowCouponsModal(false);
          setShoppingSubTab('coupons');
          setActiveTab('shopping');
        }}
      />

      {/* Botones Flotantes (FAB) para Mobile */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3">
        {/* Botón de Advertencia de Cupones */}
        <button
          onClick={() => setShowCouponsModal(true)}
          className="w-13 h-13 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/40 transition-transform active:scale-95"
          title="Alertas de Cupones"
          aria-label="Alertas de Cupones"
        >
          <BellRing className="w-6 h-6 animate-pulse" />
        </button>

        {/* Botón de Notas de Voz */}
        <button
          onClick={() => setShowQuickVoiceModal(true)}
          className="w-13 h-13 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 transition-transform active:scale-95"
          title="Grabar nota de voz rápida"
          aria-label="Grabar nota de voz"
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop / Standard Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Orlando 2027</span>
            <span>·</span>
            <span>Celebration Suites (Kissimmee, FL)</span>
            <span>·</span>
            <span>19 al 30 de Enero</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">Distancias en Kilómetros (km)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <button onClick={() => setActiveTab('itinerary')} className="hover:text-blue-600 transition-colors">Itinerario</button>
            <button onClick={() => setActiveTab('attractions')} className="hover:text-blue-600 transition-colors">Atracciones</button>
            <button onClick={() => setActiveTab('maps')} className="hover:text-blue-600 transition-colors font-semibold">Mapas</button>
            <button onClick={() => setActiveTab('sports')} className="hover:text-blue-600 transition-colors font-semibold">NBA Kia Center</button>
            <button onClick={() => setActiveTab('uber')} className="hover:text-blue-600 transition-colors">UberXL (2 Autos)</button>
            <button 
              onClick={() => {
                setShoppingSubTab('cleats');
                setActiveTab('shopping');
              }} 
              className="hover:text-blue-600 transition-colors"
            >
              Compras & Walmart
            </button>
            <button onClick={() => setActiveTab('notes')} className="hover:text-rose-600 font-semibold transition-colors flex items-center gap-1 text-rose-700">
              <Mic className="w-3.5 h-3.5" /> Notas de Voz
            </button>
            <button onClick={() => setShowCouponsModal(true)} className="hover:text-amber-600 font-bold transition-colors flex items-center gap-1 text-amber-600">
              <BellRing className="w-3.5 h-3.5" /> Alertas Cupones
            </button>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            11 Pasajeros · 5 Adultos & 6 Adolescentes · Combi a Miami
          </div>
        </div>
      </footer>

      {/* Fixed Mobile Bottom Tab Bar (Scrollable para acomodar todos los íconos) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 flex overflow-x-auto items-center h-16 px-2 safe-area-pb shadow-lg gap-6 hide-scrollbar">
        <button onClick={() => setActiveTab('itinerary')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'itinerary' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">Itinerario</span>
        </button>

        <button onClick={() => setActiveTab('attractions')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'attractions' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Sparkles className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">Parques</span>
        </button>

        <button onClick={() => setActiveTab('maps')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'maps' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Map className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">Mapas</span>
        </button>

        <button onClick={() => setActiveTab('sports')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'sports' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Trophy className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">NBA Magic</span>
        </button>

        <button onClick={() => setActiveTab('notes')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'notes' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Mic className="w-5 h-5 text-rose-500" />
          <span className="text-[9px] mt-0.5 tracking-tight">Notas</span>
        </button>

        <button onClick={() => setActiveTab('uber')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'uber' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <Car className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">UberXL</span>
        </button>

        <button onClick={() => { setShoppingSubTab('cleats'); setActiveTab('shopping'); }} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors ${activeTab === 'shopping' ? 'text-purple-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">Compras</span>
        </button>

        <button onClick={() => setActiveTab('weather')} className={`flex-shrink-0 flex flex-col items-center justify-center py-1 min-w-[50px] transition-colors mr-2 ${activeTab === 'weather' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
          <CloudSun className="w-5 h-5" />
          <span className="text-[9px] mt-0.5 tracking-tight">Clima</span>
        </button>
      </nav>
    </div>
  );
}