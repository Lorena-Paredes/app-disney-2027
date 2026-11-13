import React, { useState } from 'react';
import { 
  Trophy, Ticket, MapPin, CalendarClock, Car, 
  ExternalLink, CheckCircle2, MessageCircle, Flame, 
  Sparkles, Users, Navigation, ShoppingBag, ArrowRight,
  AlertTriangle, CreditCard, Ban, ShieldAlert, Clock,
  Calendar, Check, Info, ChevronRight
} from 'lucide-react';

export interface NBAMatch {
  id: string;
  opponent: string;
  opponentCity: string;
  opponentColor: string;
  dateStr: string; // e.g. "Viernes 22 de Enero 2027"
  dateShort: string; // "Vie 22 Ene"
  timeOrlando: string; // "19:00 hs (EST)"
  timeArgentina: string; // "21:00 hs (ARG)"
  dayOfTrip: string; // "Día 4 del itinerario"
  rivalStars: string;
  magicStars: string;
  headline: string;
  confirmedTickets?: boolean;
  ticketmasterUrl: string;
  seatgeekUrl: string;
}

export const ORLANDO_MAGIC_GAMES: NBAMatch[] = [
  {
    id: 'game-bulls',
    opponent: 'Chicago Bulls',
    opponentCity: 'Chicago',
    opponentColor: 'bg-red-600',
    dateStr: 'Jueves 28 de Enero de 2027',
    dateShort: 'Jue 28 Ene',
    timeOrlando: '19:00 hs (EST)',
    timeArgentina: '21:00 hs (ARG)',
    dayOfTrip: 'Día 10 de nuestro itinerario (Jueves · ¡Partido Confirmado!)',
    rivalStars: 'Josh Giddey, Coby White, Matas Buzelis',
    magicStars: 'Paolo Banchero, Franz Wagner, Jalen Suggs',
    headline: '¡PARTIDO CONFIRMADO DEL VIAJE! Mañana tranquila en Kissimmee/Outlets y salida en 2x UberXL a las 16:45 hs para vivir la NBA en vivo en el Kia Center.',
    confirmedTickets: true,
    ticketmasterUrl: 'https://www.ticketmaster.com/orlando-magic-tickets/artist/805988',
    seatgeekUrl: 'https://seatgeek.com/orlando-magic-tickets',
  },
  {
    id: 'game-celtics',
    opponent: 'Boston Celtics',
    opponentCity: 'Boston',
    opponentColor: 'bg-emerald-600',
    dateStr: 'Viernes 22 de Enero de 2027',
    dateShort: 'Vie 22 Ene',
    timeOrlando: '19:00 hs (EST)',
    timeArgentina: '21:00 hs (ARG)',
    dayOfTrip: 'Día 4 de nuestro itinerario (Viernes)',
    rivalStars: 'Jayson Tatum, Jaylen Brown',
    magicStars: 'Paolo Banchero, Franz Wagner, Jalen Suggs',
    headline: 'Duelo de Conferencia Este ante los vigentes campeones. Clima de playoffs en el Kia Center.',
    ticketmasterUrl: 'https://www.ticketmaster.com/orlando-magic-tickets/artist/805988',
    seatgeekUrl: 'https://seatgeek.com/orlando-magic-tickets',
  },
  {
    id: 'game-cavs',
    opponent: 'Cleveland Cavaliers',
    opponentCity: 'Cleveland',
    opponentColor: 'bg-amber-700',
    dateStr: 'Domingo 24 de Enero de 2027',
    dateShort: 'Dom 24 Ene',
    timeOrlando: '18:00 hs (EST)',
    timeArgentina: '20:00 hs (ARG)',
    dayOfTrip: 'Día 6 de nuestro itinerario (Domingo)',
    rivalStars: 'Donovan Mitchell, Evan Mobley, Darius Garland',
    magicStars: 'Paolo Banchero, Wendell Carter Jr.',
    headline: 'Horario temprano de domingo ideal para los chicos de 13 y 15 años. Gran batalla defensiva.',
    ticketmasterUrl: 'https://www.ticketmaster.com/orlando-magic-tickets/artist/805988',
    seatgeekUrl: 'https://seatgeek.com/orlando-magic-tickets',
  },
  {
    id: 'game-sixers',
    opponent: 'Philadelphia 76ers',
    opponentCity: 'Philadelphia',
    opponentColor: 'bg-blue-600',
    dateStr: 'Viernes 29 de Enero de 2027',
    dateShort: 'Vie 29 Ene',
    timeOrlando: '19:00 hs (EST)',
    timeArgentina: '21:00 hs (ARG)',
    dayOfTrip: 'Día 11 de nuestro itinerario (Última noche en Orlando)',
    rivalStars: 'Joel Embiid, Tyrese Maxey, Paul George',
    magicStars: 'Paolo Banchero, Franz Wagner',
    headline: 'Noche de despedida de Orlando antes del viaje a Miami. Espectáculo total ante estrellas de la NBA.',
    ticketmasterUrl: 'https://www.ticketmaster.com/orlando-magic-tickets/artist/805988',
    seatgeekUrl: 'https://seatgeek.com/orlando-magic-tickets',
  },
];

export const MiamiSportsView: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>('game-bulls');
  const [showInterMiami, setShowInterMiami] = useState<boolean>(false);

  const activeGame = ORLANDO_MAGIC_GAMES.find(g => g.id === selectedGameId) || ORLANDO_MAGIC_GAMES[0];

  const handleShareGameWhatsApp = (game: NBAMatch) => {
    const text = [
      `🏀 *ORLANDO MAGIC (NBA) · ${game.confirmedTickets ? '✅ ¡ENTRADAS LISTAS!' : 'PARTIDO'}*`,
      `🏟️ *Sede:* Kia Center (Downtown Orlando - 400 W Church St)`,
      `🆚 *Rival:* Orlando Magic vs. ${game.opponent}`,
      `📅 *Fecha:* ${game.dateStr}`,
      `⏰ *Horario:* ${game.timeOrlando} (19:00 hs Orlando) / ${game.timeArgentina}`,
      `🚗 *Alerta 2x UberXL:* Pedir a las 16:45 hs desde Celebration Suites (~35 km por I-4 Este)`,
      `👥 *Grupo (11 pax):* 5 adultos y 6 chicos (Renato, Tuto, José, Máximo, Josefina y Luisina)`,
      ``,
      `⚠️ *REGLAS OBLIGATORIAS DEL KIA CENTER:*`,
      `• Solo bolsos muy chicos de hasta 4.5" x 6.5" (sin mochilas de parque).`,
      `• 100% cashless: NO aceptan efectivo (solo tarjeta o Apple/Google Pay).`,
      ``,
      `🎟️ Consultar entradas oficiales en Ticketmaster:`,
      `${game.ticketmasterUrl}`,
      `🌐 Web oficial del Kia Center: https://www.kiacenter.com/events/category/sports`,
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Banner Principal / Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/60 via-indigo-50/40 to-transparent rounded-bl-full -z-10 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1.5">
              <span className="p-1 rounded-md bg-blue-100 text-blue-800">
                <Trophy className="w-3.5 h-3.5" />
              </span>
              <span>NBA en Orlando · Temporada 2026/2027</span>
              <span>·</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                11 Pasajeros (5 Adultos + 6 Chicos)
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Orlando Magic en el Kia Center
            </h1>
            
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Vivir la experiencia de un partido oficial de la NBA en vivo en el <strong>Kia Center</strong>, el moderno estadio de los Orlando Magic en el Downtown de Orlando (400 W Church St). A unos <strong>35 km de Celebration Suites</strong> (~35 a 42 minutos en los 2 vehículos Uber XL; pedir a las <strong>16:45 hs</strong> para evitar la hora pico de la I-4 Este).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <a
              href="https://www.kiacenter.com/events/category/sports"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>Web Oficial Kia Center</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href="https://www.ticketmaster.com/orlando-magic-tickets/artist/805988"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Ticket className="w-3.5 h-3.5 text-blue-400" />
              <span>Ticketmaster Magic</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Datos Logísticos Rápidos desde Celebration Suites */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">Distancia</span>
            <span className="font-extrabold text-base text-slate-900 font-mono">~35 km</span>
            <span className="text-[11px] text-slate-500 block">Por I-4 East / Express</span>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">Pedir 2x UberXL</span>
            <span className="font-extrabold text-base text-slate-900 font-mono">16:45 hs</span>
            <span className="text-[11px] text-slate-500 block">Evita pico I-4 Este</span>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Logística Grupo</span>
            <span className="font-extrabold text-base text-slate-900 font-mono">2x Uber XL</span>
            <span className="text-[11px] text-slate-500 block">5 en Auto 1 · 6 en Auto 2</span>
          </div>

          <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Ubicación Estadio</span>
            <span className="font-extrabold text-base text-slate-900 truncate block">400 W Church St</span>
            <span className="text-[11px] text-slate-500 block">Downtown Orlando</span>
          </div>
        </div>
      </div>

      {/* AVISOS IMPORTANTES: REGLAS ESTRICTAS DEL KIA CENTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Aviso 1: Política de Bolsos */}
        <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900">Regla Estricta de Bolsos (Bag Policy)</h3>
              <p className="text-[11px] text-amber-800">Solo se permiten carteras muy chicas</p>
            </div>
          </div>

          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              • <strong>Medida máxima permitida:</strong> Bolsos de mano, sobres o clutches de hasta <strong>4.5 pulgadas x 6.5 pulgadas</strong> (11.4 cm x 16.5 cm).
            </p>
            <p className="text-rose-700 font-bold">
              • PROHIBIDAS mochilas de cualquier tipo, morrales, mochilas de los parques temáticos y riñoneras grandes.
            </p>
            <p className="text-slate-600">
              💡 <em>Consejo para los 11:</em> Ir al estadio únicamente con celulares, billeteras delgadas y documentos en los bolsillos. No lleven mochilas para no tener que pagar lockers externos.
            </p>
          </div>
        </div>

        {/* Aviso 2: 100% Cashless */}
        <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900">Estadio 100% Sin Efectivo (Cashless)</h3>
              <p className="text-[11px] text-emerald-800">NO se aceptan billetes en locales ni barras</p>
            </div>
          </div>

          <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
            <p>
              • <strong>Medios de pago aceptados:</strong> Tarjetas de débito o crédito (Visa, Mastercard, Amex) y pagos con el celular (Apple Pay y Google Pay).
            </p>
            <p>
              • Los puestos de comida rápida, hamburguesas, gaseosas y la tienda oficial del Magic funcionan <strong>únicamente de manera digital</strong>.
            </p>
            <p className="text-slate-600">
              💡 <em>Cajeros inversos (Reverse ATM):</em> Si algún chico lleva dólares billete, hay máquinas en los pasillos que cargan el efectivo en una tarjeta prepaga sin comisión, pero es mucho más cómodo pagar con tarjeta o celular.
            </p>
          </div>
        </div>

      </div>

      {/* SECCIÓN INTERACTIVA: FIXTURE DE PARTIDOS DURANTE NUESTRA ESTADÍA (19 AL 30 DE ENERO) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Calendario en el Kia Center
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                19 al 31 de Enero 2027
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Partidos Confirmados Durante Nuestra Estadía
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Seleccioná un partido para ver rivales estelares, horarios y enlaces de entradas oficiales.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Sede: <strong>Kia Center, Orlando, FL</strong>
          </div>
        </div>

        {/* Selector de Partidos en Píldoras Horizontales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ORLANDO_MAGIC_GAMES.map(game => {
            const isSelected = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? game.confirmedTickets
                      ? 'border-green-600 bg-green-50/80 ring-2 ring-green-500 shadow-xs'
                      : 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600 shadow-xs'
                    : game.confirmedTickets
                    ? 'border-green-400 bg-green-50/40 hover:bg-green-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>{game.dateShort}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${game.opponentColor}`} />
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                  vs. {game.opponent}
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-0.5 font-mono">
                  {game.timeOrlando.split(' ')[0]} EST
                </div>
                {game.confirmedTickets && (
                  <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-extrabold shadow-2xs">
                    ✅ ¡Entradas listas!
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tarjeta Detallada del Partido Activo */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-600/30 via-indigo-600/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {activeGame.confirmedTickets && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500 text-white shadow-md shadow-green-500/30">
                    ✅ ¡Entradas listas!
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider">
                  NBA en Vivo
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeGame.dayOfTrip}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Orlando Magic vs. {activeGame.opponent}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {activeGame.headline}
              </p>
            </div>

            {/* Cuadro de Horarios en Vivo */}
            <div className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-2xl text-center sm:text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {activeGame.dateStr}
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono mt-0.5 text-white">
                {activeGame.timeArgentina}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {activeGame.timeOrlando} (Hora local en Orlando)
              </div>
            </div>
          </div>

          {/* Duelo de Figuras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                Figuras del Orlando Magic 🪄
              </span>
              <span className="font-extrabold text-sm text-white block">
                {activeGame.magicStars}
              </span>
              <span className="text-slate-400 text-[11px] mt-1 block">
                Paolo Banchero (All-Star) y el juego dinámico de los Magic en su cancha.
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                Estrellas del Rival ⚡
              </span>
              <span className="font-extrabold text-sm text-white block">
                {activeGame.rivalStars}
              </span>
              <span className="text-slate-400 text-[11px] mt-1 block">
                Uno de los duelos más atractivos del fixture de la Conferencia Este de la NBA.
              </span>
            </div>
          </div>

          {/* Botones de Consulta y Compra Oficial */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={activeGame.ticketmasterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                <span>Consultar Entradas en Ticketmaster</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://www.kiacenter.com/events/category/sports"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors border border-slate-700"
              >
                <span>Web del Kia Center</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={activeGame.seatgeekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors border border-slate-700"
              >
                <span>SeatGeek</span>
              </a>
            </div>

            <button
              onClick={() => handleShareGameWhatsApp(activeGame)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
              title="Compartir partido con los adultos en WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Compartir x WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* DETALLES DE VISITA AL KIA CENTER & TRASLADOS DESDE CELEBRATION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-600" />
          <span>Cómo Llegar y Moverse en los 2 Uber XL (11 Personas)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Ruta y Descenso (Drop-off)</span>
            </span>
            <p className="text-slate-600">
              • <strong>Recorrido:</strong> Desde Celebration Suites por I-4 East / I-4 Express hacia Downtown Orlando (Salida 82B hacia South St / Anderson St). Unos <strong>35 km</strong> (~35 a 42 minutos). Pedir los 2 Uber XL a las <strong>16:45 hs</strong> para evitar la hora pico y llegar al precalentamiento.
            </p>
            <p className="text-slate-600">
              • <strong>Zona de descenso para los 2 UberXL:</strong> <em>Hughey Ave & W Church St</em>, justo al pie de la estación Church Street Station, frente al atrio principal del estadio.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Distribución de los 11 Pasajeros</span>
            </span>
            <p className="text-slate-600">
              • <strong>Auto 1 (5 personas):</strong> Lorena, Renato, Máximo, Celia y Juan.
            </p>
            <p className="text-slate-600">
              • <strong>Auto 2 (6 personas):</strong> Carolina, Fofi, Tuto, Luisina, Josefina y José.
            </p>
            <p className="text-indigo-700 font-semibold">
              Al pedir 2 UberXL (capacidad hasta 6 pasajeros c/u), los 11 van cómodos sin necesidad de alquilar autos ni pagar estacionamientos caros ($35+ en Downtown).
            </p>
          </div>
        </div>

        {/* Tienda Oficial & Gastronomía */}
        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 text-xs flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-950">
              Tienda Oficial Orlando Magic Team Shop & Comidas en Church St:
            </p>
            <p className="text-slate-700 mt-0.5 leading-relaxed">
              En el atrio del Kia Center está la mega tienda oficial del equipo con camisetas Nike oficiales de Paolo Banchero y Franz Wagner, gorras y remeras. Afuera, sobre <strong>Church Street</strong>, hay restaurantes y bares temáticos para almorzar o cenar antes de ingresar.
            </p>
          </div>
        </div>
      </div>

      {/* EVENTO CONFIRMADO EN MIAMI: FIFA WOMEN'S CHAMPIONS CUP 2027 (Domingo 31 de Enero) */}
      <div className="bg-white rounded-3xl border-2 border-green-400 shadow-xs overflow-hidden">
        <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white text-green-700 text-xs font-black shadow-sm">
              ✅ ¡Entradas listas!
            </span>
            <span className="text-xs sm:text-sm font-extrabold">
              ⚽ Domingo 31 de Enero · FIFA Women's Champions Cup 2027 (Fase Final)
            </span>
          </div>
          <span className="text-[11px] font-bold bg-green-950/30 border border-white/30 px-2.5 py-1 rounded-lg">
            Estadio Inter Miami CF (Nu Stadium)
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Doble Jornada Internacional en el Nu Stadium (Inter Miami CF)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Con la misma entrada disfrutamos ambos partidos de la Fase Final en Miami: <strong>15:30 hs Partido por el 3° puesto</strong> y <strong>18:30 hs Gran Final</strong>.
              </p>
            </div>

            <button
              onClick={() => setShowInterMiami(!showInterMiami)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>{showInterMiami ? 'Ocultar Logística Nu Stadium' : 'Ver Horarios & Clear Bag Policy'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showInterMiami ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Partido 1 · 3° Puesto</span>
              <span className="font-black text-base text-slate-900 font-mono">15:30 hs</span>
              <span className="text-[11px] text-slate-600 block">Incluido en la entrada</span>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Partido 2 · Gran Final</span>
              <span className="font-black text-base text-slate-900 font-mono">18:30 hs</span>
              <span className="text-[11px] text-slate-600 block">Ceremonia de campeonas</span>
            </div>
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-indigo-800 block">Traslado & Bolsos</span>
              <span className="font-black text-sm text-slate-900">2x UberXL · Clear Bag</span>
              <span className="text-[11px] text-slate-600 block">Solo bolsos transparentes</span>
            </div>
          </div>

          {showInterMiami && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700 animate-in fade-in">
              <div className="font-bold text-slate-900">
                Tips de Experto para los 11 viajeros en el Nu Stadium:
              </div>
              <p>
                • <strong>2x UberXL con tiempo (~13:45 hs desde Miami Beach):</strong> en jornadas dobles FIFA el tránsito en las adyacencias se carga rápido; llegar con margen asegura pasar seguridad tranquilos antes de las 15:30 hs.
              </p>
              <p>
                • <strong>Clear Bag Policy obligatoria:</strong> únicamente permiten bolsos 100% transparentes (máx. 12" x 6" x 12") o carteras sobre pequeñas. Prohibidas mochilas y bolsos opacos.
              </p>
              <p>
                • <strong>Entradas en Wallet + Powerbank:</strong> llevar los tickets descargados en el wallet del celular y batería portátil dentro del bolso transparente para cubrir toda la jornada de 15:30 a 21:00 hs.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};