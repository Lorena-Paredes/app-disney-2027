import React from 'react';
import { 
  Trophy, Ticket, MapPin, CalendarClock, Car, 
  ExternalLink, CheckCircle2, MessageCircle, Flame, 
  Sparkles, Users, Navigation, ShoppingBag, ArrowRight
} from 'lucide-react';

export const MiamiSportsView: React.FC = () => {
  const handleShareGameWhatsApp = () => {
    const text = [
      `🏀 *PARTIDO NBA CONFIRMADO · MIAMI HEAT vs. PHILADELPHIA 76ers*`,
      `📅 *Fecha:* Sábado 30 de Enero de 2027`,
      `⏰ *Hora:* 14:30 hs (Hora Argentina) / 12:30 PM (Hora Miami)`,
      `📍 *Estadio:* Kaseya Center (601 Biscayne Blvd, Downtown Miami)`,
      `✅ *Estado:* Confirmado`,
      `👥 *Para los 10:* Coincide justo con la llegada a Miami en combi por la mañana.`,
      ``,
      `🎟️ Consultar entradas oficiales: https://www.ticketmaster.com/miami-heat-tickets/artist/805966`,
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareInterWhatsApp = () => {
    const text = [
      `⚽ *INTER MIAMI CF · TOUR DE ESTADIO & TIENDA*`,
      `📍 *Estadio:* Chase Stadium (Fort Lauderdale) / Miami Freedom Park`,
      `🎯 *Para los chicos:* Renato, Máximo, Augusto, José y Luisina`,
      `👕 *Visita:* Vestuarios, cancha, sala de trofeos y tienda oficial de camisetas`,
      ``,
      `🎟️ Consultar tours oficiales: https://www.intermiamicf.com/tickets/`,
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Banner Principal de Deportes en Miami */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Eventos Deportivos · Sábado 30 Ene al Martes 2 Feb 2027</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Deportes en Miami: NBA & Inter Miami
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Al concluir los días de parques en Orlando y viajar en combi hacia Miami el sábado 30 de enero, los 5 adultos y los 5 adolescentes podrán presenciar el espectáculo de la NBA en vivo y visitar el estadio del Inter Miami.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Partido NBA Confirmado</span>
            </span>
          </div>
        </div>
      </div>

      {/* TARJETA PRINCIPAL: NBA - MIAMI HEAT VS PHILADELPHIA 76ERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 relative overflow-hidden">
        {/* Fondo decorativo estilizado */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-100/60 via-rose-50/40 to-transparent rounded-bl-full -z-10 pointer-events-none" />
        
        {/* Encabezado del Partido */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-rose-600 text-white rounded-2xl shadow-md shadow-orange-500/20">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
                  National Basketball Association (NBA)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Confirmado
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Miami Heat vs. Philadelphia 76ers
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Kaseya Center · 601 Biscayne Blvd, Downtown Miami frente a Bayside</span>
              </p>
            </div>
          </div>

          {/* Horarios Destacados */}
          <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-center sm:text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Sábado 30 de Enero 2027
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono mt-0.5">
              14:30 hs <span className="text-xs font-normal text-slate-300">ARG</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              12:30 PM (Hora local Miami / EST)
            </div>
          </div>
        </div>

        {/* Duelo de Figuras y Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100">
            <div className="text-xs font-bold text-orange-950 uppercase tracking-wider mb-1">
              Local: Miami Heat 🏀
            </div>
            <div className="text-sm font-bold text-slate-900">
              Jimmy Butler & Bam Adebayo
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Tricampeones de la NBA, con la energía característica del Kaseya Center frente a la Bahía de Biscayne.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-1">
              Visitante: Philadelphia 76ers ⚡
            </div>
            <div className="text-sm font-bold text-slate-900">
              Joel Embiid & Tyrese Maxey
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Uno de los rivales históricos de conferencia Este más atractivos de la liga.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
              Sincronización con el Viaje 🚐
            </div>
            <div className="text-sm font-bold text-slate-900">
              Llegada en Combi desde Orlando
            </div>
            <p className="text-xs text-slate-600 mt-1">
              El grupo sale temprano de Celebration Suites el 30 de enero; la hora del juego a las 12:30 PM (14:30 ARG) calza perfecto para almorzar en Bayside y disfrutar del partido.
            </p>
          </div>
        </div>

        {/* Pasos Logísticos para los 10 Integrantes */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <Car className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-xs sm:text-sm">Logística y Traslado (10 Personas)</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Al llegar con la combi contratada a Miami, se puede coordinar el descenso de los pasajeros directamente en el <strong>Kaseya Center</strong> o dejar el equipaje en el <strong>Hotel Seacoast (Miami Beach)</strong> y tomar 2 vehículos UberXL (15 a 20 min por I-195) hasta la puerta de Biscayne Blvd.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <ShoppingBag className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-xs sm:text-sm">Bayside Marketplace & Tienda Oficial Miami Heat</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                El centro comercial a cielo abierto <strong>Bayside Marketplace</strong> está ubicado cruzando la calle (100 metros a pie). Allí hay locales oficiales de indumentaria de la NBA y opciones variadas de comida rápida para que los 10 coman cómodamente antes del inicio del juego.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de Acción: Entradas y WhatsApp */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.ticketmaster.com/miami-heat-tickets/artist/805966"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Consultar Entradas Oficiales (Ticketmaster / NBA)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href="https://seatgeek.com/miami-heat-tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
              title="Comparar precios y sectores en SeatGeek"
            >
              <span>Ver en SeatGeek</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>

          <button
            onClick={handleShareGameWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            title="Enviar datos del partido al grupo de WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Compartir Partido x WhatsApp</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN INTER MIAMI CF: CHASE STADIUM Y TOUR DE MUSEO */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-100/60 via-purple-50/40 to-transparent rounded-bl-full -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl shadow-md shadow-pink-500/20">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-600">
                Major League Soccer (MLS) & Experiencia Turística
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Inter Miami CF · Estadio & Tour
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Chase Stadium (Fort Lauderdale) & Futuro Freedom Park</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200 self-start sm:self-center">
            Actividad Top para los Chicos ⚽
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Tour Oficial del Estadio y Vestuarios</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recorrido por las instalaciones de Chase Stadium: acceso al vestuario local, banco de suplentes de Lionel Messi, túnel de salida al campo de juego y sala de conferencias de prensa. Ideal para Renato, Máximo, Augusto, José y Luisina.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span>Tienda Oficial adidas Inter Miami</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mega-store con todas las equipaciones oficiales del Inter Miami (titular rosa y suplente negra), botines de fútbol adidas con suelas para césped, indumentaria de entrenamiento y merchandising exclusivo no disponible en outlets.
            </p>
          </div>
        </div>

        {/* Botones Inter Miami */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.intermiamicf.com/tickets/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Ticket className="w-4 h-4 text-pink-400" />
              <span>Consultar Tours y Tickets Inter Miami</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Chase+Stadium,+Fort+Lauderdale,+FL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-600" />
              <span>Ver Ubicación en GPS</span>
            </a>
          </div>

          <button
            onClick={handleShareInterWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            title="Enviar info de Inter Miami al grupo de WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Compartir Inter Miami x WhatsApp</span>
          </button>
        </div>
      </div>

    </div>
  );
};