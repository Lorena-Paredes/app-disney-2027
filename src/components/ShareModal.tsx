import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  Share2, MessageCircle, Copy, Check, QrCode, 
  Smartphone, Apple, Download, Users, ExternalLink, 
  Car, Calendar, ShoppingBag, X, Sparkles, Send, ShieldCheck
} from 'lucide-react';
import { TRAVELERS, ITINERARY, UBER_ROUTES } from '../data/tripData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  activeTab = 'itinerary',
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [installTab, setInstallTab] = useState<'iphone' | 'android'>('iphone');
  const [activeShareSection, setActiveShareSection] = useState<'general' | 'day' | 'uber' | 'shopping'>('general');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(2);

  const appUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';

  // Generate QR Code
  useEffect(() => {
    if (appUrl) {
      QRCode.toDataURL(appUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('Error generating QR:', err));
    }
  }, [appUrl]);

  if (!isOpen) return null;

  const handleCopyLink = (textToCopy = appUrl, sectionKey?: string) => {
    navigator.clipboard.writeText(textToCopy);
    if (sectionKey) {
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 2500);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Orlando 2027 · Guía e Itinerario',
          text: 'Acá está la Web App interactiva de nuestro viaje a Orlando 2027 (Celebration Suites, 11 pasajeros):',
          url: appUrl,
        });
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  // WhatsApp Messages
  const generateGeneralWhatsAppMessage = () => {
    const text = [
      `✈️ *ORLANDO 2027 · WEB APP DEL VIAJE*`,
      `📍 *Alojamiento:* Celebration Suites (Orlando) & Seacoast Suites on Miami Beach`,
      `🗓️ *Fechas:* 19 de Enero al 2 de Febrero 2027 (15 días)`,
      `👥 *Grupo:* 11 personas (5 adultos + 6 chicos de 13 a 15 años)`,
      `🚗 *Logística:* 2x UberXL sincronizados + Traslado Orlando ➔ Miami contratado en paquete`,
      ``,
      `📱 *La Web App incluye:*`,
      `• Itinerario día por día (7 parques c/ Epic Universe, Miami Beach, Sawgrass Mills y regreso Copa)`,
      `• Atracciones de adrenalina vs adultos con tiempos de fila`,
      `• Calculador de rutas y división de costos 2x UberXL`,
      `• ✅ NBA Orlando Magic vs. Bulls (28 Ene) + ✅ FIFA Women's Champions Cup (31 Ene)`,
      `• Guía de compras: Outlets, Nike Clearance y tecnología Apple/Best Buy`,
      `• Notas de voz grabables para no olvidar nada`,
      ``,
      `📲 *Abrir la Web App en tu celular:*`,
      `${appUrl}`,
    ].join('\n');
    return encodeURIComponent(text);
  };

  const generateDayWhatsAppMessage = (dayNum: number) => {
    const day = ITINERARY.find(d => d.dayNumber === dayNum) || ITINERARY[1];
    const text = [
      `📅 *PLAN DEL DÍA ${day.dayNumber}: ${day.dateStr}*`,
      `📍 *Destino:* ${day.title}`,
      `✨ *Foco:* ${day.highlight}`,
      `🚗 *Salida 2x UberXL:* ${day.uberRecommendation.departureTime} hacia ${day.uberRecommendation.destination} (~${day.uberRecommendation.distanceKm} km)`,
      day.quickServiceRecommendation ? `🍔 *Almuerzo recomendado:* ${day.quickServiceRecommendation.name} (${day.quickServiceRecommendation.location})` : '',
      ``,
      `📲 *Ver detalle completo en la Web App:*`,
      `${appUrl}`,
    ].filter(Boolean).join('\n');
    return encodeURIComponent(text);
  };

  const generateUberWhatsAppMessage = () => {
    const text = [
      `🚗 *LOGÍSTICA TRASLADOS 2x UBERXL (11 PERSONAS)*`,
      `📍 *Punto de partida:* Lobby de Celebration Suites (Kissimmee)`,
      `👥 *Auto 1 (5 pax):* Lorena, Celia, Juan, Renato, Máximo`,
      `👥 *Auto 2 (6 pax):* Carolina, Fofi, Tuto, José, Josefina, Luisina`,
      `💡 *Regla de oro:* Pedir ambos autos con 1 minuto de diferencia para llegar juntos a los parques.`,
      `🚐 *30 de Enero (07:00 hs):* Traslado Orlando ➔ Miami ya contratado en el paquete hacia Seacoast Suites (5101 Collins Ave).`,
      `⚽ *31 de Enero:* 2x UberXL al Nu Stadium para FIFA Women's Champions Cup (solo bolsos transparentes).`,
      `✈️ *2 de Febrero (07:15 hs):* 2x UberXL desde Seacoast Suites al Aeropuerto de Miami (MIA, 20 km).`,
      ``,
      `📲 *Calculador de rutas y costos:*`,
      `${appUrl}`,
    ].join('\n');
    return encodeURIComponent(text);
  };

  const generateShoppingWhatsAppMessage = () => {
    const text = [
      `🛍️ *GUÍA DE COMPRAS ORLANDO 2027*`,
      `⚽ *Botines de fútbol:* Nike Clearance Store & Adidas en Vineland Outlets + Dick's Sporting Goods`,
      `💻 *Tecnología:* Best Buy Millenia & Apple Store Mall at Millenia (iPhone, iPad, notebooks)`,
      `🛒 *Supermercado:* Walmart Supercenter Vineland Rd (a 4.8 km de Celebration Suites)`,
      ``,
      `📲 *Ver mapa y mejores horarios en la Web App:*`,
      `${appUrl}`,
    ].join('\n');
    return encodeURIComponent(text);
  };

  const sendDirectToWhatsApp = (encodedMsg: string) => {
    window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, '_blank');
  };

  const adults = TRAVELERS.filter(t => t.role === 'adult');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Compartir Web App con el Grupo</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  WhatsApp
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Enlace privado para que los demás adultos del grupo abran y guarden la app en sus celulares.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Private URL Quick Copy Bar */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Enlace Privado de la Web App
              </div>
              <div className="text-xs font-mono font-medium text-slate-800 truncate" title={appUrl}>
                {appUrl}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopyLink(appUrl)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Enlace</span>
                </>
              )}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="p-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                title="Compartir nativamente"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* WhatsApp Main Broadcast Button */}
        <div className="mt-4">
          <button
            onClick={() => sendDirectToWhatsApp(generateGeneralWhatsAppMessage())}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/20 transition-transform active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Enviar Invitación Completa al Grupo de WhatsApp</span>
          </button>
        </div>

        {/* Direct Send to Specific Adults */}
        <div className="mt-5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Enviar a los Adultos Coordinadores</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {adults.map(adult => (
              <button
                key={adult.id}
                onClick={() => {
                  const personalMsg = encodeURIComponent(
                    `👋 ¡Hola ${adult.name}! Acá tenés la Web App del viaje a Orlando 2027:\n${appUrl}\nGuardala en tu celular para ver el itinerario día por día, los 2x UberXL y las notas de voz.`
                  );
                  sendDirectToWhatsApp(personalMsg);
                }}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-950">{adult.name}</div>
                  <div className="text-[10px] text-slate-500">{adult.relation}</div>
                </div>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Share Specific Content Section */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Compartir Sección Específica</span>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveShareSection('day')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  activeShareSection === 'day' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Plan del Día
              </button>
              <button
                onClick={() => setActiveShareSection('uber')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  activeShareSection === 'uber' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                UberXL
              </button>
              <button
                onClick={() => setActiveShareSection('shopping')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  activeShareSection === 'shopping' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Compras
              </button>
            </div>
          </div>

          {activeShareSection === 'day' && (
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-amber-950">Elegir qué día enviar:</span>
                <select
                  value={selectedDayNum}
                  onChange={e => setSelectedDayNum(Number(e.target.value))}
                  className="px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-xl font-medium text-slate-800"
                >
                  {ITINERARY.map(d => (
                    <option key={d.dayNumber} value={d.dayNumber}>
                      Día {d.dayNumber}: {d.dateStr} ({d.title.slice(0, 25)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => sendDirectToWhatsApp(generateDayWhatsAppMessage(selectedDayNum))}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enviar Día {selectedDayNum} x WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {activeShareSection === 'uber' && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between gap-3">
              <div className="text-xs text-emerald-950">
                <span className="font-bold">Distribución y reglas de los 2x UberXL</span>
                <p className="text-[11px] text-emerald-800">Auto 1 (5 pax) y Auto 2 (6 pax) con horarios de salida para 11 personas.</p>
              </div>
              <button
                onClick={() => sendDirectToWhatsApp(generateUberWhatsAppMessage())}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar Logística Uber</span>
              </button>
            </div>
          )}

          {activeShareSection === 'shopping' && (
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex items-center justify-between gap-3">
              <div className="text-xs text-purple-950">
                <span className="font-bold">Guía de Outlets, Botines Nike y Tecnología</span>
                <p className="text-[11px] text-purple-800">Direcciones y horarios de Vineland, Millenia y Walmart.</p>
              </div>
              <button
                onClick={() => sendDirectToWhatsApp(generateShoppingWhatsAppMessage())}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar Guía Compras</span>
              </button>
            </div>
          )}
        </div>

        {/* QR Code & Mobile Installation Guide */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {/* QR Code Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <QrCode className="w-4 h-4 text-slate-700" />
              <span>Escanear con la Cámara del Celular</span>
            </div>
            
            {qrDataUrl ? (
              <div className="bg-white p-2.5 rounded-2xl shadow-xs border border-slate-200">
                <img src={qrDataUrl} alt="QR Code Orlando 2027" className="w-36 h-36 mx-auto" />
              </div>
            ) : (
              <div className="w-36 h-36 bg-slate-200 animate-pulse rounded-2xl" />
            )}

            <p className="text-[11px] text-slate-500 mt-2">
              Ideal para que los adultos sentados en Celebration Suites apunten con su celular y abran la app al instante.
            </p>
          </div>

          {/* Add to Home Screen / PWA instructions */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Guardar en Pantalla de Inicio (Web App)</span>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setInstallTab('iphone')}
                className={`flex items-center gap-1 text-xs font-semibold pb-1 transition-colors border-b-2 -mb-2.5 ${
                  installTab === 'iphone'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iPhone (Safari)</span>
              </button>

              <button
                onClick={() => setInstallTab('android')}
                className={`flex items-center gap-1 text-xs font-semibold pb-1 transition-colors border-b-2 -mb-2.5 ${
                  installTab === 'android'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android (Chrome)</span>
              </button>
            </div>

            {installTab === 'iphone' ? (
              <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1">
                <li>Abrí el enlace en el navegador <strong>Safari</strong> de tu iPhone.</li>
                <li>Tocá el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba).</li>
                <li>Buscá y tocá <strong>"Agregar a pantalla de inicio"</strong>.</li>
                <li>¡Listo! Queda instalada con su propio icono sin ocupar espacio.</li>
              </ol>
            ) : (
              <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1">
                <li>Abrí el enlace en <strong>Google Chrome</strong> en tu celular.</li>
                <li>Tocá los tres puntos <strong>(⋮)</strong> arriba a la derecha.</li>
                <li>Seleccioná <strong>"Instalar aplicación"</strong> o "Agregar a inicio".</li>
                <li>Confirmá y ya tenés el acceso directo listo como una app nativa.</li>
              </ol>
            )}
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Orlando 2027 · Celebration Suites · 11 Pasajeros
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
