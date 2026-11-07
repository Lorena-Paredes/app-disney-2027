import React, { useState, useEffect } from 'react';
import { 
  CloudSun, Sun, Moon, Thermometer, Wind, Umbrella, 
  CheckCircle2, Circle, Sparkles, Layers, ShieldCheck, Shirt, MessageCircle
} from 'lucide-react';
import { HISTORICAL_WEATHER_ORLANDO_JANUARY } from '../data/tripData';

export const WeatherPackingView: React.FC = () => {
  const [checklistItems, setChecklistItems] = useState(HISTORICAL_WEATHER_ORLANDO_JANUARY.packingChecklist);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  // Load packing checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('orlando2027_packing_checklist');
      if (saved) {
        const parsed = JSON.parse(saved);
        setChecklistItems(prev => prev.map(item => ({
          ...item,
          checked: !!parsed[item.id]
        })));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleCheck = (id: string) => {
    const updated = checklistItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklistItems(updated);

    const storageMap = updated.reduce((acc, curr) => {
      acc[curr.id] = curr.checked;
      return acc;
    }, {} as Record<string, boolean>);

    localStorage.setItem('orlando2027_packing_checklist', JSON.stringify(storageMap));
  };

  const completedCount = checklistItems.filter(i => i.checked).length;
  const progressPct = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
              <CloudSun className="w-3.5 h-3.5" />
              <span>Promedios Históricos y Pronóstico de Enero · Orlando</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Clima en Orlando a Finales de Enero y Estrategia de Ropa por Capas
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Enero es uno de los mejores meses para visitar Orlando: baja humedad, pocas lluvias, tardes primaverales deliciosas (22°C) y mañanas/noches frescas (10°C a 12°C) con frentes fríos ocasionales.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center">
            <button
              onClick={() => setTempUnit('C')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                tempUnit === 'C' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °C (Celsius)
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                tempUnit === 'F' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °F (Fahrenheit)
            </button>

            <button
              onClick={() => {
                const appUrl = window.location.href.split('#')[0];
                const msg = [
                  `🌤️ *CLIMA & QUÉ LLEVAR A ORLANDO (ENERO 2027)*`,
                  `🌡️ *Tardes:* 22°C a 23°C (remera y zapatillas cómodas).`,
                  `🌙 *Mañanas & Noches:* 10°C a 12°C (campera liviana o buzo en la mochila).`,
                  `🧥 *Estrategia:* Vestirse por capas (layering).`,
                  `🎒 *Checklist:* Mochila liviana, protector solar, zapatillas running con 2 pares por persona.`,
                  ``,
                  `📲 Ver checklist completo en la Web App: ${appUrl}`,
                ].join('\n');
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center gap-1 transition-colors whitespace-nowrap shadow-xs ml-1"
              title="Compartir recomendaciones de clima y valija en WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl">
            <div className="flex items-center justify-between text-xs text-sky-800 font-semibold mb-1">
              <span>Máxima Diaria Promedio</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {tempUnit === 'C' ? '22°C - 23°C' : '72°F - 74°F'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Entre las 13:00 y las 16:00 hs (soleado y agradable)
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
            <div className="flex items-center justify-between text-xs text-blue-800 font-semibold mb-1">
              <span>Mínima Nocturna Promedio</span>
              <Moon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {tempUnit === 'C' ? '10°C - 11°C' : '50°F - 52°F'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Madrugadas y cierre de parques (requiere abrigo)
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <div className="flex items-center justify-between text-xs text-indigo-800 font-semibold mb-1">
              <span>Frentes Fríos Posibles</span>
              <Wind className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {tempUnit === 'C' ? '6°C - 8°C' : '43°F - 46°F'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Vientos del norte que pueden durar 1 o 2 días
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
              <span>Lluvias en Enero</span>
              <Umbrella className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              Muy Bajas
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Solo 2.2 pulgadas en todo el mes (temporada seca)
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Temperature Curve */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-amber-500" />
          Comportamiento Térmico Típico a lo largo del Día en Parques
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          La amplitud térmica diaria suele rondar los 12°C de diferencia entre la salida del hotel y el mediodía.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {HISTORICAL_WEATHER_ORLANDO_JANUARY.hourlyCurve.map((h, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-600 tabular-nums">
                {h.hour}
              </span>
              <div className="my-2">
                <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {tempUnit === 'C' ? `${h.tempC}°C` : `${h.tempF}°F`}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                {h.feel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The Onion Strategy (Layering) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              La Estrategia del "Efecto Cebolla" (Cómo Vestirse en Enero)
            </h3>
            <p className="text-xs text-slate-500">
              Clave indispensable para no pasar frío a las 08:00 AM ni sufrir calor a las 14:00 PM
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Shirt className="w-4 h-4 text-purple-600" />
              <span>Capa 1: Base Transpirable</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Remera de manga corta (algodón suave o dry-fit deportivo). Al mediodía la temperatura subirá a 22°C con sol pleno, y es la ropa que quedará a la vista en las fotos.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Capa 2: Aislamiento Térmico</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Buzo con capucha (hoodie) o campera deportiva de algodón/polar liviano. Indispensable para las primeras 2 horas de la mañana y para atarse a la cintura o guardar en la mochila cuando caliente el sol.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-sky-600" />
              <span>Capa 3: Rompevientos</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Campera rompevientos ultraliviana (estilo Uniqlo o deportiva plegable). Las montañas rusas a 100 km/h y los shows de noche frente a los lagos (Epcot Luminous o Fantasmic!) tienen brisas muy frescas.
            </p>
          </div>
        </div>

        {/* Footwear Advice */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Regla de Oro del Calzado: 20.000 Pasos por Día</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            En los parques de Disney y Universal se camina un promedio de <strong>15 a 18 kilómetros por día</strong>. <strong>¡Nunca estrenen zapatillas el primer día de parque!</strong> Lleven zapatillas deportivas con suela blanda y amortiguación ya amoldadas al pie. Si compran botines o zapatillas nuevas en los Outlets, úsenlas en días de compras o paseo relajado antes de llevarlas a una jornada completa de parque.
          </p>
        </div>
      </div>

      {/* Interactive Packing Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Checklist de Empaque para las 10 Personas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Artículos esenciales para que nada falte al armar las valijas antes de salir.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sky-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
              {completedCount} / {checklistItems.length} ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Checklist Rows */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {checklistItems.map(item => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                item.checked
                  ? 'bg-sky-50/40 border-sky-200 text-slate-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.checked ? (
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <div className="flex-1">
                <span className={`font-medium ${item.checked ? 'line-through text-slate-400' : ''}`}>
                  {item.item}
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400 mt-0.5 tracking-wider">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
