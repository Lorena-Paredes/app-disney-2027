import React, { useState } from 'react';
import { 
  ShoppingBag, Laptop, Smartphone, ShieldCheck, MapPin, 
  ExternalLink, Sparkles, Tag, HelpCircle, Check, ArrowRight,
  ShoppingCart, Clock, PackageCheck, AlertCircle, MessageCircle
} from 'lucide-react';
import { SHOPPING_SPOTS, ShoppingSpot, SUPERMARKETS, SupermarketOption } from '../data/tripData';

interface ShoppingTechGuideViewProps {
  initialTab?: 'cleats' | 'tech' | 'supermarkets' | 'destinations' | 'coupons';
}

export const ShoppingTechGuideView: React.FC<ShoppingTechGuideViewProps> = ({ 
  initialTab = 'cleats' 
}) => {
  const [activeTab, setActiveTab] = useState<'cleats' | 'tech' | 'supermarkets' | 'destinations'>(
    initialTab === 'coupons' ? 'destinations' : initialTab
  );
  const [selectedUsSize, setSelectedUsSize] = useState<string>('9.5');

  // Shoe size conversion table (US vs Argentina / EUR vs CM)
  const sizeChart: Record<string, { arg: string; eur: string; cm: string }> = {
    '7.0': { arg: '38.5', eur: '40.0', cm: '25.0' },
    '7.5': { arg: '39.0', eur: '40.5', cm: '25.5' },
    '8.0': { arg: '40.0', eur: '41.0', cm: '26.0' },
    '8.5': { arg: '40.5', eur: '42.0', cm: '26.5' },
    '9.0': { arg: '41.0', eur: '42.5', cm: '27.0' },
    '9.5': { arg: '42.0', eur: '43.0', cm: '27.5' },
    '10.0': { arg: '42.5', eur: '44.0', cm: '28.0' },
    '10.5': { arg: '43.0', eur: '44.5', cm: '28.5' },
    '11.0': { arg: '44.0', eur: '45.0', cm: '29.0' },
    '11.5': { arg: '44.5', eur: '45.5', cm: '29.5' },
    '12.0': { arg: '45.0', eur: '46.0', cm: '30.0' },
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Guía de Compras Estratégica · Orlando</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Botines Oficiales (Nike/Adidas), Tecnología (Apple/Best Buy) y Supermercados Walmart
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Organizada en torno a las prioridades del grupo: conseguir el mejor calzado para los 5 adolescentes, comprar notebooks/celulares con garantía oficial, y localizar los Walmart Supercenter más cercanos a Celebration Suites para abastecimiento rápido de agua y snacks. Distancias en kilómetros (km).
            </p>
          </div>

          {/* Quick Segmented Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center overflow-x-auto">
            <button
              onClick={() => setActiveTab('cleats')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cleats' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚽ Botines & Deportes
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'tech' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💻 Tecnología & Apple
            </button>
            <button
              onClick={() => setActiveTab('supermarkets')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'supermarkets' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛒 Walmart & Alimentos
            </button>
            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'destinations' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏢 Outlets & Malls
            </button>

            <button
              onClick={() => {
                const appUrl = window.location.href.split('#')[0];
                const msg = [
                  `🛍️ *GUÍA DE COMPRAS - ORLANDO 2027*`,
                  `⚽ *Botines:* Nike Clearance Vineland & Dick's Sporting Goods`,
                  `💻 *Tecnología:* Best Buy Millenia & Apple Store`,
                  `🛒 *Supermercado:* Walmart Supercenter Vineland Rd (4.8 km de Celebration)`,
                  ``,
                  `📲 Abrir Guía de Compras: ${appUrl}`,
                ].join('\n');
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center gap-1 transition-colors whitespace-nowrap shadow-xs ml-1"
              title="Compartir tiendas y outlets en WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SOCCER CLEATS & SPORTS APPAREL */}
      {activeTab === 'cleats' && (
        <div className="space-y-6">
          {/* Cleats Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                El Secreto del "Hash Wall" de Nike
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Tanto en <strong>International Premium Outlets</strong> como en <strong>Vineland</strong>, caminen directo al fondo de la tienda Nike. Allí está la pared con cajas sin tapa (últimos pares únicos) con <strong>30% a 50% de descuento adicional</strong> sobre el precio de outlet.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Adidas Outlet (Predator / X / Copa)
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Adidas suele ofrecer la promoción <strong>"Buy One, Get One 50% Off"</strong> en calzado. Al ser 5 chicos que calzan talles similares, comprar 4 o 5 pares juntos reduce el costo por botín de forma drástica.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Dick's Sporting Goods (Florida Mall)
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Si buscan los modelos de gama alta profesional (Nike Mercurial Elite o Phantom GX que usan los jugadores profesionales), en los outlets a veces hay pocos talles. En Dick's del Florida Mall tienen stock completo de gama alta.
              </p>
            </div>
          </div>

          {/* Interactive Shoe Size Converter */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Conversor de Talles de Botines (USA ➔ Argentina / Europa / Centímetros)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Los botines en EE.UU. vienen identificados exclusivamente en talle US (Men's).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Talle US:</span>
                <select
                  value={selectedUsSize}
                  onChange={e => setSelectedUsSize(e.target.value)}
                  className="bg-slate-100 border border-slate-300 font-mono font-bold text-slate-900 text-xs rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-500"
                >
                  {Object.keys(sizeChart).map(size => (
                    <option key={size} value={size}>
                      US {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <div className="text-[11px] font-bold text-purple-700 uppercase">Talle en EE.UU.</div>
                <div className="text-2xl font-extrabold text-purple-950 font-mono mt-1">
                  US {selectedUsSize}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-700 uppercase">Equivalente Argentina</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                  Arg {sizeChart[selectedUsSize]?.arg}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-700 uppercase">Equivalente Europa</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                  EUR {sizeChart[selectedUsSize]?.eur}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold text-slate-700 uppercase">Largo del Pie</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                  {sizeChart[selectedUsSize]?.cm} cm
                </div>
              </div>
            </div>

            {/* Sole Types Guide */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Guía de Tipos de Suelas (Importante para evitar lesiones en canchas locales):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">FG (Firm Ground)</div>
                  <p className="text-slate-600">
                    Tapones cónicos o laminados fijos. Ideal para césped natural seco o de buena calidad. No recomendado para sintético duro.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">AG (Artificial Grass)</div>
                  <p className="text-slate-600">
                    Muchos tapones circulares más cortos y huecos. El mejor tipo para las canchas de pasto sintético modernas con caucho negro.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">TF (Turf / Multitaco)</div>
                  <p className="text-slate-600">
                    Suela de goma con decenas de micropuntos. La más versátil para fútbol 5, sintético desgastado y entrenamientos diarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECH & COMPUTERS (BEST BUY & APPLE) */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Guía Práctica para Comprar Notebooks, Computadoras y Celulares
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Aspectos clave de compatibilidad, teclado, enchufes y garantías para que los adultos y chicos compren con total tranquilidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Apple Store Tips */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>MacBooks en Apple Store (Florida Mall / Millenia)</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>
                    <strong>Teclado en Español:</strong> Los MacBooks en exhibición tienen teclado en inglés (sin tecla "Ñ" impresa). Sin embargo, pueden solicitar en el mostrador o por la web oficial con 24-48 hs de antelación el modelo con <em>"Spanish Keyboard"</em>.
                  </li>
                  <li>
                    <strong>Configuración de software:</strong> Aunque el teclado físico sea en inglés, en macOS se configura en 1 segundo como "Español - ISO" o "Estados Unidos Internacional" y presionando Option+N sale la letra "ñ" al instante.
                  </li>
                  <li>
                    <strong>Garantía AppleCare:</strong> Las MacBooks, iPads y accesorios tienen garantía oficial mundial de 1 año con soporte directo en distribuidores oficiales autorizados en Argentina.
                  </li>
                </ul>
              </div>

              {/* Best Buy Tips */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Laptop className="w-4 h-4 text-purple-600" />
                  <span>Notebooks Gamer y Windows en Best Buy</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>
                    <strong>Sección "Open-Box":</strong> Pregunten siempre al vendedor por las computadoras "Open-Box Excellent". Son equipos devueltos en período de 14 días que tienen hasta $200-$300 USD de rebaja con garantía completa de fábrica.
                  </li>
                  <li>
                    <strong>Marcas recomendadas para gaming (teens):</strong> Asus ROG Zephyrus / TUF, Lenovo Legion y HP Omen. Suelen tener precios entre un 40% y 50% menores que en Sudamérica.
                  </li>
                  <li>
                    <strong>Voltaje Universal:</strong> Todas las fuentes de notebooks y cargadores de iPhone/Android son <strong>100V-240V bivoltaje</strong>. Funcionan perfecto en Argentina; solo necesitarán el adaptador de patas planas a redondas (cuesta $2 USD).
                  </li>
                </ul>
              </div>

              {/* Smartphones Unlocked */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Celulares (iPhone / Samsung Unlocked)</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>
                    <strong>Siempre pedir "Unlocked / No-Contract":</strong> Nunca compren versiones atadas a planes de Verizon, AT&T o T-Mobile. En Apple Store pidan "Connect to any carrier later (Unlocked)".
                  </li>
                  <li>
                    <strong>iPhones en EE.UU. (eSIM Only):</strong> A partir del iPhone 14 en adelante, los modelos vendidos en EE.UU. no tienen ranura para chip plástico físico (usan únicamente chip digital eSIM). Las principales compañías de Argentina ya soportan eSIM sin problema.
                  </li>
                </ul>
              </div>

              {/* Gadgets for the trip */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Gadgets Imprescindibles para los Parques</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>
                    <strong>Powerbanks (Baterías portátiles Anker):</strong> En Best Buy consiguen baterías de 10.000 mAh por ~$20-$25 USD. Las apps oficiales de Disney y Universal con GPS agotan la batería del celular hacia las 15:00 hs.
                  </li>
                  <li>
                    <strong>Cables reforzados y protectores de pantalla:</strong> Para evitar roturas en las mochilas o en las montañas rusas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPERMARKETS & WALMART SUPERCENTERS */}
      {activeTab === 'supermarkets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Supermercados Cercanos a Celebration Suites y Parques
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Aprovisionarse en Walmart Supercenter ahorra hasta un 70% del presupuesto gastronómico en agua, frutas, desayunos y snacks para las mochilas de los 10 integrantes.
                </p>
              </div>
            </div>

            {/* Supermarket Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {SUPERMARKETS.map(market => (
                <div 
                  key={market.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        {market.chain} Supercenter
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                        {market.distanceFromCelebrationKm} km · ~{market.driveTimeMin} min
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-2">
                      {market.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{market.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Horario: {market.openHours}</span>
                    </div>

                    <p className="text-xs text-slate-700 mt-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <strong>Ventaja estratégica:</strong> {market.strategicAdvantage}
                    </p>

                    <div className="mt-3">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Compras recomendadas para 10 personas:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">
                        {market.topItemsFor10Pax.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>Celebration Suites ➔ Supermercado</span>
                    <span className="font-semibold text-emerald-700">~6 a 9 min en Uber</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Shopping Strategy Tip for 10 Pax */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-emerald-700" />
                <span>Consejo Práctico para los 5 Adultos (Compras de Aprovisionamiento):</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                No hace falta mover a los 10 integrantes al supermercado. Recomendamos que <strong>2 de los adultos</strong> vayan en 1 solo auto Uber estándar (costo ~$6 a $8 USD) al <strong>Walmart Supercenter #5214 de Vine St</strong> (a solo 4.5 km del hotel) la noche de llegada (Día 1). Compren 2 packs grandes de agua mineral de 40 botellas, galletitas, frutas y desayunos para la semana. ¡Tienen cocina completa y heladera grande en los suites para guardar todo!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SHOPPING DESTINATIONS & DETAILS */}
      {activeTab === 'destinations' && (
        <div className="space-y-4">
          {SHOPPING_SPOTS.map(spot => (
            <div key={spot.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      {spot.type === 'outlet' ? 'Premium Outlet' : spot.type === 'mall' ? 'Shopping Center' : 'Electrónica'}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-700 font-bold font-mono">
                      {spot.distFromCelebrationKm} km (~{spot.distFromCelebrationMin} min) desde Celebration Suites
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {spot.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-center">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate max-w-xs">{spot.address}</span>
                </div>
              </div>

              {/* Key Stores List */}
              <div className="mt-4 space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Locales Clave para el Grupo:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {spot.keyStores.map((st, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="font-bold text-slate-900 text-sm">{st.storeName}</div>
                      <div className="text-purple-700 font-semibold text-[11px]">{st.specialty}</div>
                      <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                        {st.groupTip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for this destination */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-slate-800">Consejos prácticos:</span>
                <ul className="mt-1 space-y-1 list-disc pl-4 text-slate-600">
                  {spot.generalTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
