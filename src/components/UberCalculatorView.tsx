import React, { useState } from 'react';
import { 
  Car, Clock, DollarSign, Users, MapPin, 
  ArrowRight, ShieldCheck, AlertTriangle, Navigation, Info, CheckCircle, Bus, MessageCircle
} from 'lucide-react';
import { UBER_ROUTES, UberRoute } from '../data/tripData';

export const UberCalculatorView: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(UBER_ROUTES[0].id);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [surgeMultiplier, setSurgeMultiplier] = useState<number>(1.0); // 1.0 = normal, 1.25 = ligera tarifa dinámica

  const activeRoute = UBER_ROUTES.find(r => r.id === selectedRouteId) || UBER_ROUTES[0];

  // Pricing math (Tabular figures)
  const baseCostPerCar = activeRoute.estCostPerUberXL * surgeMultiplier;
  const tipPerCar = baseCostPerCar * (tipPercent / 100);
  const totalPerCar = baseCostPerCar + tipPerCar;

  const totalFor2Cars = totalPerCar * 2;
  const costPerPerson = totalFor2Cars / 11;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <Car className="w-3.5 h-3.5" />
              <span>Logística de Traslados · 11 Pasajeros en 2x UberXL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Calculador de Rutas, Tiempos y Costos desde Celebration Suites
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Mover a 11 personas sin alquilar auto ahorra costos de estacionamiento ($30/día por auto en parques) y evita estrés de manejo. Utilicen 2 vehículos UberXL (hasta 6 pasajeros cada uno) pedidos en simultáneo (Auto 1 con 5 pax y Auto 2 con 6 pax). Distancias en kilómetros (km).
            </p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-emerald-950">Ahorro en Estacionamiento</div>
              <div className="text-emerald-800">
                Ahorran <strong>~$60 USD diarios</strong> en parkings de parques
              </div>
            </div>
          </div>
        </div>

        {/* Private Combi Notice for Orlando - Miami */}
        <div className="mt-4 p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3 text-xs">
          <Bus className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-950">
              Traslado Orlando ➔ Miami (Sábado 30 de Enero · Salida 07:00 hs):
            </span>
            <p className="text-indigo-900 mt-0.5">
              El traslado Orlando ➔ Miami <strong>ya está contratado en el paquete</strong> hacia <strong>Seacoast Suites on Miami Beach</strong> (5101 Collins Ave, deptos Deluxe de 1 y 2 dormitorios con salida directa a la playa, ~380 km). Salida puntual a las <strong>07:00 hs</strong> desde Celebration Suites.
            </p>
          </div>
        </div>

        {/* Route Selector Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Seleccionar Destino desde Celebration Suites (en Kilómetros):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {UBER_ROUTES.map(route => {
              const isSelected = route.id === selectedRouteId;
              return (
                <button
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-600 text-slate-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{route.destinationName}</span>
                  <span className="font-mono text-[11px] text-slate-500 mt-1 tabular-nums">
                    ~{route.drivingMinutesNormal} min · {route.distanceKm} km
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Calculation & Route Details Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Route Card & Logistics Details (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Ruta Seleccionada
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeRoute.destinationName}
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-bold tabular-nums">
                  {activeRoute.distanceKm} km
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-bold tabular-nums">
                  {activeRoute.drivingMinutesNormal} a {activeRoute.drivingMinutesPeak} min
                </span>
              </div>
            </div>

            {/* Travel Time & Traffic Analysis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Tránsito Fluido / Tarde</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {activeRoute.drivingMinutesNormal} min
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Tiempo normal de viaje fuera de los horarios pico de apertura.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Hora Pico Matutina (07:30 a 08:30)</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-950 font-mono tabular-nums">
                  {activeRoute.drivingMinutesPeak} min
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Calcular este tiempo si van hacia el Rope Drop (apertura).
                </p>
              </div>
            </div>

            {/* Drop-off & Meeting Point Advice */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>Zona Exacta de Descenso (Drop-off):</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {activeRoute.dropoffAdvice}
                </p>
                <div className="mt-2 text-[11px] font-mono text-blue-800 bg-white/70 p-2 rounded border border-blue-200/60">
                  📍 <strong>Referencia en GPS/App:</strong> {activeRoute.exactZoneCoordinates}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 text-xs space-y-1">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Coordinación de los 2 Autos (Car Sync Tips):</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {activeRoute.carSyncTips}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Drop-off and Pick-up Guide across Disney & Universal */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-600" />
              Guía de Zonas Exactas de Drop-off y Pick-up en Parques
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">🏰 Magic Kingdom · Solo en TTC</div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Descenso:</strong> Transportation and Ticket Center (TTC) Rideshare Loop. Ningún Uber puede entrar al frente del castillo.<br />
                  <strong>Acceso al parque:</strong> Desde el TTC se toma el <em>Express Monorail</em> o el gran <em>Ferryboat</em> (20-25 min extras).<br />
                  <strong>Regreso:</strong> Tomar el Monorriel o Ferry de regreso al TTC y pedir los 2 UberXL allí para los 11 viajeros.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-amber-900">🎢 Universal (Islands & Studios) · Piso 5</div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Descenso:</strong> Nivel 5 (Piso 5) de la mega estructura de estacionamiento de CityWalk.<br />
                  <strong>Acceso:</strong> Se baja en escaleras mecánicas hacia la seguridad central de CityWalk.<br />
                  <strong>Regreso:</strong> ⚠️ <em>¡Regla de Oro!</em> Subir al Piso 5 ANTES de pedir los UberXL en la app, para que el auto no llegue mientras aún bajan por CityWalk.
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-1 md:col-span-2">
                <div className="font-bold text-indigo-950">🌌 Universal Epic Universe · Campus Independiente (Epic Blvd)</div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>¡Atención Logística!</strong> Epic Universe está a <strong>20.5 km</strong> de Celebration Suites en un campus nuevo (NO en CityWalk ni Piso 5).<br />
                  <strong>Descenso y Pick-up:</strong> Loop exclusivo de Rideshare frente al portal <em>Chronos Gate</em> sobre Epic Blvd. A pocos metros de la seguridad principal.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">🎬 Disney's Hollywood Studios</div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Descenso y Pick-up:</strong> Loop exclusivo a solo 150 metros (2 min a pie) de los molinetes de entrada.<br />
                  <strong>Regreso tras Fantasmic:</strong> Salir con ritmo para no quedar atrapados en la ola de pedidos en la puerta.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-900">🦁 Disney's Animal Kingdom</div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Descenso y Pick-up:</strong> El parque más rápido y accesible desde Celebration Suites (10.9 km, ~12 min).<br />
                  <strong>Loop peatonal:</strong> A solo 100 metros del arco de entrada principal.
                </p>
              </div>
            </div>
          </div>

          {/* 5-Step Protocol Guide for the 11 Travelers */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Protocolo Práctico para los 2 UberXL (11 Viajeros)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">1. Dos Teléfonos Distintos</span>
                <p className="text-slate-600">
                  Una sola cuenta de Uber o Lyft no puede pedir 2 vehículos UberXL simultáneamente. <strong>Lorena</strong> pide el Auto 1 y <strong>Carolina o Fofi</strong> pide el Auto 2 desde sus propios celulares.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">2. División Fija de Grupos (5 + 6 pax)</span>
                <p className="text-slate-600">
                  • <strong>Auto 1 (5 pax):</strong> Lorena, Celia, Juan, Renato, Máximo<br />
                  • <strong>Auto 2 (6 pax):</strong> Carolina, Fofi, Tuto, José, Josefina, Luisina<br />
                  Al tener grupos fijos y definidos, nadie se pierde ni duda a qué auto subir.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">3. Solicitud Sincronizada</span>
                <p className="text-slate-600">
                  Esperar a que los 11 estén listos con zapatillas y mochilas en el lobby de Celebration Suites antes de pedir. Tardan en promedio 4 a 8 minutos en llegar.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">4. Alerta Magic Kingdom (TTC)</span>
                <p className="text-slate-600">
                  Solo los buses de Disney y Minnie Vans llegan al castillo. Uber siempre los deja en el TTC (Transportation and Ticket Center). Desde allí se toma el Ferry o Monorriel sin costo extra.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cost Calculator Box */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sticky top-24">
            <h4 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Estimador de Tarifas</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                2x UberXL
              </span>
            </h4>

            {/* Interactive Modifiers */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Propina al conductor (Tip):</span>
                  <span className="font-mono text-emerald-700 font-bold">{tipPercent}%</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                  {[10, 15, 18, 20].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setTipPercent(pct)}
                      className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                        tipPercent === pct
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Simulación de Demanda / Tarifa Dinámica:</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {surgeMultiplier === 1.0 ? 'Normal (1.0x)' : surgeMultiplier === 1.25 ? 'Moderada (1.25x)' : 'Alta Salida (1.5x)'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                  {[
                    { label: 'Normal', val: 1.0 },
                    { label: 'Moderada', val: 1.25 },
                    { label: 'Pico Cierre', val: 1.5 }
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => setSurgeMultiplier(item.val)}
                      className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                        surgeMultiplier === item.val
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tarifa estimada por UberXL:</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ~${baseCostPerCar.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Propina sugerida ({tipPercent}%):</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ~${tipPerCar.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                <span>Total estimado por 1 UberXL:</span>
                <span className="font-mono text-emerald-700 tabular-nums">
                  ${totalPerCar.toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Total Highlight for the 11 People */}
            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white space-y-3">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Total para los 2 UberXL (11 personas)
                </div>
                <div className="text-3xl font-extrabold text-amber-400 font-mono mt-0.5 tabular-nums">
                  ${totalFor2Cars.toFixed(2)} <span className="text-sm font-sans text-slate-300">USD</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">Costo individual por tramo:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                  ${costPerPerson.toFixed(2)} USD / pers.
                </span>
              </div>

              {/* Direct WhatsApp Share of Uber Route */}
              <button
                onClick={() => {
                  const appUrl = window.location.href.split('#')[0];
                  const msg = [
                    `🚗 *ESTIMADO TRASLADO 2x UBERXL (11 PERSONAS)*`,
                    `📍 *Destino:* ${activeRoute.destinationName}`,
                    `📏 *Distancia:* ${activeRoute.distanceKm} km (~${activeRoute.drivingMinutesNormal} min)`,
                    `💵 *Total 2x UberXL (con propina):* $${totalFor2Cars.toFixed(2)} USD`,
                    `👤 *Por persona (11 pax):* $${costPerPerson.toFixed(2)} USD`,
                    `📌 *Descenso:* ${activeRoute.dropoffAdvice.slice(0, 100)}...`,
                    ``,
                    `📲 Ver rutas y mapas en la Web App: ${appUrl}`,
                  ].join('\n');
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="Enviar costo de Uber de hoy al grupo de WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Enviar División a WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              *Tarifas calculadas en base a promedios reales de UberXL entre Celebration Suites y los parques de Orlando. Lyft XL suele tener precios muy similares; recomendamos tener ambas apps instaladas para comparar en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
