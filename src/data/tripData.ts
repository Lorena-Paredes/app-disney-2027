/**
 * Base de datos completa del viaje a Orlando 2027
 * Grupo de 12 personas (5 adultos + 7 adolescentes)
 * Alojamiento: Celebration Suites (Kissimmee) & Seacoast Suites (Miami Beach)
 * Fechas: 19 de Enero al 2 de Febrero 2027 (15 días)
 * Unidades: Kilómetros (km), grados Celsius / Fahrenheit
 */

export interface Traveler {
  id: string;
  name: string;
  role: 'adult' | 'teen';
  age?: number;
  relation: string;
  department: 1 | 2 | 3;
}

export interface ItineraryDay {
  dayNumber: number;
  dateStr: string; // e.g. "Mar 19 Ene"
  dayOfWeek: string;
  dateFull: string;
  type: 'park' | 'shopping' | 'sports' | 'travel' | 'rest';
  title: string;
  parkName?: string;
  parkCode?: 'universal_ioa' | 'universal_studios' | 'universal_epic' | 'disney_hs' | 'disney_ak' | 'disney_epcot' | 'disney_mk' | 'universal_repeat';
  highlight: string;
  schedule: {
    time: string;
    activity: string;
    notes?: string;
    type?: 'transport' | 'ride' | 'food' | 'shopping' | 'tip';
  }[];
  teenFocus: string[];
  adultFocus: string[];
  uberRecommendation: {
    departureTime: string;
    destination: string;
    estMinutes: number;
    distanceKm: number;
    recommendedDropoff: string;
    returnTip: string;
  };
  mealsTip: string;
  statusBadge?: string;
  eventShortLabel?: string;
  bannerHeadline?: string;
  bannerTransportNote?: string;
  logisticAlert?: {
    title: string;
    message: string;
    departureTime: string;
  };
  expertTips?: string[];
  ticketBlock?: {
    blockLabel: string;
    passName: string;
    validityWindow: string;
    companionNote?: string;
    theme: 'disney' | 'universal' | 'rest';
  };
  quickServiceRecommendation?: {
    name: string;
    location: string;
    specialty: string;
    whyFor10Pax: string;
  };
}

export interface Attraction {
  id: string;
  name: string;
  park: 'Universal Islands of Adventure' | 'Universal Studios Florida' | 'Universal Epic Universe' | "Disney's Hollywood Studios" | "Disney's Animal Kingdom" | "Disney's EPCOT" | "Disney's Magic Kingdom";
  parkShort: string;
  visitDayLabel?: string;
  land: string;
  category: 'rollercoaster' | 'simulator' | 'dark_ride' | 'water_thrill' | 'show';
  targetAudience: 'teens' | 'all'; // 'teens' = foco adrenalina 13-15; 'all' = imperdible todo el grupo
  adrenalineLevel: 1 | 2 | 3 | 4 | 5; // 5 = máxima adrenalina
  techImmersionLevel: 1 | 2 | 3 | 4 | 5; // 5 = simulación / tecnología puntera
  minHeightCm: number;
  minHeightInches: number;
  description: string;
  whyForGroup: string;
  queueStrategy: string;
  hasSingleRider: boolean;
  virtualQueueOrLL: string;
}

export interface UberRoute {
  id: string;
  destinationName: string;
  category: 'disney' | 'universal' | 'shopping' | 'supermarket' | 'airport';
  distanceKm: number;
  drivingMinutesNormal: number;
  drivingMinutesPeak: number;
  estCostPerUberXL: number; // USD por UberXL (hasta 6 pasajeros)
  pickupAdvice: string;
  dropoffAdvice: string;
  carSyncTips: string;
  exactZoneCoordinates: string;
}

export interface SupermarketOption {
  id: string;
  name: string;
  chain: 'Walmart' | 'Target';
  address: string;
  distanceFromCelebrationKm: number;
  driveTimeMin: number;
  strategicAdvantage: string;
  topItemsFor10Pax: string[];
  openHours: string;
}

export interface QuickServiceRestaurant {
  id: string;
  name: string;
  park: string;
  land: string;
  cuisine: string;
  seatingCapacity: string;
  mobileOrderAvailable: boolean;
  highlightsFor10Pax: string;
  recommendedDishes: string;
}

export interface ShoppingSpot {
  id: string;
  name: string;
  type: 'outlet' | 'mall' | 'electronics';
  address: string;
  distFromCelebrationKm: number;
  distFromCelebrationMin: number;
  keyStores: {
    storeName: string;
    specialty: string;
    groupTip: string;
  }[];
  generalTips: string[];
}

export const TRAVELERS: Traveler[] = [
  { id: '1', name: 'Lorena', role: 'adult', relation: 'Mamá coordinadora · Depto 2', department: 2 },
  { id: '2', name: 'Celia', role: 'adult', relation: 'Madrina de Renato · Depto 2', department: 2 },
  { id: '3', name: 'Carolina', role: 'adult', relation: 'Mamá · Depto 1', department: 1 },
  { id: '4', name: 'Fofi', role: 'adult', relation: 'Papá · Depto 1', department: 1 },
  { id: '5', name: 'Juan', role: 'adult', relation: 'Papá · Depto 3', department: 3 },
  { id: '6', name: 'Renato', role: 'teen', age: 15, relation: 'Adolescente (15 años) · Depto 2', department: 2 },
  { id: '7', name: 'Tuto', role: 'teen', age: 15, relation: 'Adolescente (15 años) · Depto 1', department: 1 },
  { id: '8', name: 'José', role: 'teen', age: 15, relation: 'Adolescente (15 años) · Depto 3', department: 3 },
  { id: '9', name: 'Máximo', role: 'teen', age: 15, relation: 'Sobrino (15 años) · Depto 2', department: 2 },
  { id: '10', name: 'Josefina', role: 'teen', age: 15, relation: 'Adolescente (15 años) · Depto 1', department: 1 },
  { id: '11', name: 'Luisina', role: 'teen', age: 13, relation: 'Adolescente (13 años) · Depto 1', department: 1 },
  { id: '12', name: 'Bruno', role: 'teen', age: 15, relation: 'Adolescente (15 años) · Depto 3', department: 3 },
];

export const SUPERMARKETS: SupermarketOption[] = [
  {
    id: 'walmart-vine-5214',
    name: 'Walmart Supercenter #5214 (Vine St)',
    chain: 'Walmart',
    address: '4444 W Vine St, Kissimmee, FL 34746',
    distanceFromCelebrationKm: 4.5,
    driveTimeMin: 6,
    strategicAdvantage: 'El más cercano a Celebration Suites. Ideal para la llegada del Día 1 y reabastecimiento rápido de agua y desayunos.',
    topItemsFor10Pax: [
      'Packs de 24/40 botellas de agua mineral (permitidas en todos los parques)',
      'Barritas de cereal, galletitas, frutos secos y snacks sellados para mochilas',
      'Leche, cereales, pan lactal, jamón y queso para desayunos en el departamento',
      'Protector solar en spray (Banana Boat / Coppertone) a 1/3 del precio de los parques'
    ],
    openHours: '06:00 AM a 23:00 PM (todos los días)'
  },
  {
    id: 'walmart-vineland-817',
    name: 'Walmart Supercenter #817 (Vineland Rd)',
    chain: 'Walmart',
    address: '3250 Vineland Rd, Kissimmee, FL 34746',
    distanceFromCelebrationKm: 6.8,
    driveTimeMin: 8,
    strategicAdvantage: 'Ubicación clave hacia el norte, sobre la ruta que conecta con Disney Springs y los Vineland Premium Outlets.',
    topItemsFor10Pax: [
      'Sección gigante de panadería fresca y frutas (bananas y manzanas para energía)',
      'Pilotos y ponchos de lluvia descartables económicos para llevar en mochilas',
      'Helados y bebidas para las noches de descanso'
    ],
    openHours: '06:00 AM a 23:00 PM'
  },
  {
    id: 'walmart-lake-wilson-5420',
    name: 'Walmart Supercenter #5420 (Lake Wilson Rd)',
    chain: 'Walmart',
    address: '2855 N Old Lake Wilson Rd, Kissimmee, FL 34747',
    distanceFromCelebrationKm: 7.5,
    driveTimeMin: 9,
    strategicAdvantage: 'En el corredor directo hacia Disney\'s Animal Kingdom y Disney\'s Hollywood Studios por el acceso oeste.',
    topItemsFor10Pax: [
      'Gran sector de merchandising oficial de Disney y Universal con licencia a precios de supermercado ($10-$15 USD vs $40 USD en parques)',
      'Baterías portátiles (Powerbanks), cables USB-C y adaptadores de enchufe'
    ],
    openHours: '06:00 AM a 23:00 PM'
  },
  {
    id: 'walmart-turkey-lake-4332',
    name: 'Walmart Supercenter #4332 (Turkey Lake Rd)',
    chain: 'Walmart',
    address: '8990 Turkey Lake Rd, Orlando, FL 32819',
    distanceFromCelebrationKm: 18.5,
    driveTimeMin: 20,
    strategicAdvantage: 'Pegado a Universal Orlando e International Drive. Perfecto si al salir de Universal necesitan provisiones de camino al hotel.',
    topItemsFor10Pax: [
      'Excelente surtido de comidas listas para llevar (pollo al spiedo entero por ~$6 USD)',
      'Snacks y bebidas frías para el regreso'
    ],
    openHours: '06:00 AM a 23:00 PM'
  },
  {
    id: 'target-rolling-oaks',
    name: 'Super Target (Rolling Oaks)',
    chain: 'Target',
    address: '3200 Rolling Oaks Blvd, Kissimmee, FL 34747',
    distanceFromCelebrationKm: 9.2,
    driveTimeMin: 11,
    strategicAdvantage: 'Alternativa premium muy espaciosa y ordenada. Excelente selección de indumentaria básica, farmacia y comidas orgánicas.',
    topItemsFor10Pax: [
      'Golosinas y chocolates importados para los chicos',
      'Ropa interior deportiva y medias de recambio',
      'Sector de tecnología con accesorios Apple y Anker'
    ],
    openHours: '08:00 AM a 22:00 PM'
  }
];

export const QUICK_SERVICE_GUIDE: QuickServiceRestaurant[] = [
  {
    id: 'columbia-harbour',
    name: 'Columbia Harbour House',
    park: "Disney's Magic Kingdom",
    land: 'Liberty Square',
    cuisine: 'Pescado frito, langostinos, pollo crujiente, sándwiches y ensaladas frescas',
    seatingCapacity: 'Muy amplia (Planta alta secreta gigante con aire acondicionado)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'El segundo piso suele estar semivacío y tiene mesas grandes donde pueden sentarse los 12 juntos en un ambiente silencioso con aire acondicionado ideal para descansar piernas.',
    recommendedDishes: 'Trio Platter (langostinos, pollo y pescado con papas) y Lobster Roll.'
  },
  {
    id: 'pecos-bill',
    name: 'Pecos Bill Tall Tale Inn and Cafe',
    park: "Disney's Magic Kingdom",
    land: 'Frontierland',
    cuisine: 'Tex-Mex: fajitas, carnitas bowls, tacos y hamburguesas',
    seatingCapacity: 'Enorme (múltiples salones techados con mesas extensas)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Ubicación perfecta entre Pirates of the Caribbean y Big Thunder Mountain. Permite pedir por Mobile Order para 12 personas sin demoras.',
    recommendedDishes: 'Fajita Platter y Pork Carnitas Rice Bowl.'
  },
  {
    id: 'abc-commissary',
    name: 'ABC Commissary',
    park: "Disney's Hollywood Studios",
    land: 'Commissary Lane',
    cuisine: 'Bowls de cerdo estilo cubano, tacos de camarón, poke bowls y sándwiches gourmet',
    seatingCapacity: 'Muy amplia (100% techada con clima controlado excelente)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Uno de los mejores Quick Service de Hollywood Studios. Mesas cuadradas y cabinas donde entran 12 cómodos. Refill de gaseosas libre en máquina dispensadora.',
    recommendedDishes: 'Pork Carnitas Bowl, Shrimp Tacos y Buffalo Chicken Grilled Cheese.'
  },
  {
    id: 'satuli-canteen',
    name: "Satu'li Canteen",
    park: "Disney's Animal Kingdom",
    land: 'Pandora - The World of Avatar',
    cuisine: 'Bowls saludables personalizados (carne asada, pollo marinado, tofu, granos y chimichurri)',
    seatingCapacity: 'Grande (amplio salón interior inspirado en la base RDA y terraza techada)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Reconocida como la mejor comida rápida de todo Walt Disney World. Comida nutritiva y liviana para aguantar la caminata del parque.',
    recommendedDishes: 'Combination Bowl (Beef & Chicken con base de papas o arroz) y Cheeseburger Steamed Pods.'
  },
  {
    id: 'connections-eatery',
    name: 'Connections Eatery',
    park: "Disney's EPCOT",
    land: 'World Celebration',
    cuisine: 'Hamburguesas gourmet internacionales, pizza napolitana, ensaladas y postres de waffle',
    seatingCapacity: 'Gigantesca (el salón más moderno y amplio de EPCOT)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Muchísimas mesas largas, ventanales luminosos, aire acondicionado impecable y enchufes/puertos USB en los asientos para recargar celulares mientras almuerzan.',
    recommendedDishes: 'French Bistro Burger, General Tso Chicken Salad y Liege Waffle.'
  },
  {
    id: 'three-broomsticks',
    name: 'Three Broomsticks (Las Tres Escobas)',
    park: 'Universal Islands of Adventure',
    land: 'The Wizarding World of Harry Potter - Hogsmeade',
    cuisine: 'Tabernas británicas: costillitas BBQ, medio pollo ahumado, mazorcas de maíz y papas asadas',
    seatingCapacity: 'Muy espacioso (mesas comunales rústicas de madera estilo Hogwarts)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'El "The Great Feast" es una fuente gigantesca familiar diseñada para grupos de 4 a 6 personas. Pidiendo 2 o 3 fuentes comen los 12 con abundancia y a precio muy conveniente.',
    recommendedDishes: 'The Great Feast Platter y Butterbeer Frozen de postre.'
  },
  {
    id: 'leaky-cauldron',
    name: 'Leaky Cauldron (El Caldero Chorreante)',
    park: 'Universal Studios Florida',
    land: 'The Wizarding World of Harry Potter - Diagon Alley',
    cuisine: 'Fish & Chips tradicional inglés, Cottage Pie, salchichas bangers y ensaladas',
    seatingCapacity: 'Amplio comedor con techos altos de taberna mágica',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Inmersión temática total en el Callejón Diagon. Ideal para recargar energías después de subir a Escape from Gringotts.',
    recommendedDishes: 'Traditional Fish & Chips y Fisherman\'s Pie.'
  },
  {
    id: 'simpsons-fast-food',
    name: 'Fast Food Boulevard (Springfield)',
    park: 'Universal Studios Florida',
    land: 'Springfield: Home of the Simpsons',
    cuisine: 'Food court temático múltiple: Krusty Burger, Cletus Chicken Shack, Luigi Pizza y Flaming Moe',
    seatingCapacity: 'Muy amplia (salón cerrado enorme con mesas de grupo)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Perfecto para cuando los chicos quieren hamburguesas o pollo crujiente y los adultos prefieren sándwiches o ensaladas: todos piden en distintas barras y se sientan juntos.',
    recommendedDishes: 'The Ribwich, Chicken and Waffle Sandwich y Krusty Clogger Burger.'
  },
  {
    id: 'mead-hall-epic',
    name: 'Mead Hall (Isle of Berk)',
    park: 'Universal Epic Universe',
    land: 'How to Train Your Dragon – Isle of Berk',
    cuisine: 'Banquete nórdico: carnes asadas, salmón grillado, albóndigas suecas y papas rústicas',
    seatingCapacity: 'Enorme (gran salón vikingo con mesas largas de madera para grupos grandes)',
    mobileOrderAvailable: true,
    highlightsFor10Pax: 'Su "Thawfest Platter" es una fuente nórdica gigante pensada para compartir; con 2 o 3 fuentes comen los 12 con comodidad y aire acondicionado.',
    recommendedDishes: 'Thawfest Platter, Yaknog (bebida fría cremosa) y Stormfly Cupcake.'
  }
];

export const ITINERARY: ItineraryDay[] = [
  {
    dayNumber: 1,
    dateStr: 'Mar 19 Ene',
    dayOfWeek: 'Martes',
    dateFull: '19 de Enero de 2027',
    type: 'travel',
    title: 'Llegada a Orlando, Check-in y Aprovisionamiento',
    highlight: 'Aterrizaje en MCO (15:35 hs), traslado sin agencia en 2x UberXL a Celebration Suites, check-in en 3 departamentos y compras en Walmart.',
    schedule: [
      { time: '15:35', activity: 'Aterrizaje en Orlando International Airport (MCO). Trámite de aduana y recogida de equipajes (no hay traslado de agencia contratado).', type: 'transport' },
      { time: '17:00', activity: 'Solicitar 2x UberXL en el área de Rideshare de MCO hacia Celebration Suites (33.8 km). Capacidad máxima legal: 6 pasajeros por auto (12 viajeros en total).', notes: 'Si llevan valijas vacías para compras que no entren con las 6 personas en cada baúl, sumar 1 Uber estándar adicional en el momento solo para el equipaje.', type: 'transport' },
      { time: '18:00', activity: 'Check-in en Celebration Suites. Distribución en 3 departamentos para las 12 personas: Depto 1 (Carolina, Fofi, Tuto, Luisina y Josefina), Depto 2 (Lorena, Celia, Renato y Máximo) y Depto 3 (Juan, José y Bruno).', notes: 'Los 7 adolescentes tienen flexibilidad para rotar entre los departamentos. Revisar wi-fi y enchufes para cargar todos los celulares.', type: 'tip' },
      { time: '19:15', activity: 'Salida de abastecimiento a Walmart Supercenter #5214 Vine St (a solo 4.5 km / 6 min de Celebration Suites).', notes: 'Comprar packs de agua mineral (40 botellas), snacks, frutas, barritas de cereal y desayunos para los parques.', type: 'shopping' },
      { time: '21:00', activity: 'Cena distendida en Old Town Kissimmee (al lado del hotel, se puede ir caminando) o pizza en el suite.', type: 'food' },
      { time: '22:30', activity: 'Descanso temprano: ¡mañana arranca el Bloque Disney en EPCOT a ritmo tranquilo tras el vuelo!', type: 'tip' }
    ],
    teenFocus: ['Recargar celulares, acomodarse en los 3 departamentos (rotación flexible para los 7 adolescentes) y probar la piscina'],
    adultFocus: ['Coordinar los 2x UberXL desde MCO (+ 1 Uber estándar si sobran valijas), comprar provisiones en Walmart y chequear eSIM'],
    uberRecommendation: {
      departureTime: '16:50',
      destination: 'MCO Airport ➔ Celebration Suites (Sin traslado de agencia)',
      distanceKm: 33.8,
      estMinutes: 28,
      recommendedDropoff: 'Lobby principal de Celebration Suites (5820 W Irlo Bronson Memorial Hwy)',
      returnTip: 'Al viajar livianos a la ida se piden 2x UberXL (máx. legal 6 pasajeros por auto = 12 viajeros). Si llevan valijas vacías que no entren con 6 personas en el baúl, sumar 1 Uber estándar adicional en el momento solo para equipaje.'
    },
    mealsTip: 'Comprar snacks tipo Oreo, frutos secos, barritas y botellitas de agua en Walmart: en Disney y Universal se permite ingresar comida sellada y botellas de agua.',
    expertTips: [
      '🚗 Tip de Experto · Llegada a MCO sin traslado de agencia: al viajar livianos a la ida se piden 2x UberXL (capacidad máxima legal: 6 pasajeros por auto = 12 viajeros) hacia Celebration Suites. Si llevan valijas vacías para compras que no entren con las 6 personas en cada baúl, sumar 1 Uber estándar adicional en el momento solo para el equipaje.',
      '🏠 Distribución en 3 Departamentos (Celebration Suites): Depto 1 (Carolina, Fofi, Tuto, Luisina y Josefina), Depto 2 (Lorena, Celia, Renato y Máximo) y Depto 3 (Juan, José y Bruno), aclarando que los 7 adolescentes tienen flexibilidad para rotar entre los departamentos.',
      '🎟️ Bloque Disney (Pase 4-Park Magic Ticket · ventana del 20 al 26 de enero): mañana 20 de enero arrancamos de forma estratégica y tranquila en EPCOT para entrar en ritmo sin agotarse después del viaje.'
    ]
  },
  {
    dayNumber: 2,
    dateStr: 'Mié 20 Ene',
    dayOfWeek: 'Miércoles',
    dateFull: '20 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Disney 1/4',
    title: 'Parque 1 · Disney\'s EPCOT (Bloque Disney 1/4)',
    parkName: 'Disney\'s EPCOT',
    parkCode: 'disney_epcot',
    highlight: 'Arranque tranquilo del Bloque Disney (Pase 4-Park Magic Ticket · ventana 20 al 26 ene) para recorrer a buen ritmo después del viaje: Guardians of the Galaxy: Cosmic Rewind, Soarin\', Remy\'s Ratatouille y Luminous.',
    ticketBlock: {
      blockLabel: 'Bloque Disney · Día 1 de 4',
      passName: 'Pase 4-Park Magic Ticket',
      validityWindow: 'Ventana válida: 20 al 26 de enero de 2027',
      theme: 'disney'
    },
    schedule: [
      { time: '06:55', activity: 'Alarma de Fila Virtual: a las 07:00:00 AM ingresar en app My Disney Experience para solicitar cupo de Guardians of the Galaxy: Cosmic Rewind.', type: 'tip' },
      { time: '08:15', activity: 'Desayuno relajado en los 3 departamentos de Celebration Suites (sin corridas tras el viaje de ayer) y salida sincronizada en 2x UberXL hacia EPCOT (13.7 km).', type: 'transport' },
      { time: '08:45', activity: 'Llegada al Lote Este de Rideshare frente a la esfera Spaceship Earth y acceso fluido a World Celebration y World Discovery.', type: 'transport' },
      { time: '09:15', activity: 'Guardians of the Galaxy: Cosmic Rewind según grupo de llamada (¡la mejor montaña rusa de Disney, súper fluida para los 12 viajeros!).', type: 'ride' },
      { time: '10:45', activity: 'Test Track (diseño de autos y velocidad a 105 km/h; Single Rider disponible para los 7 chicos) y Mission: SPACE (Naranja extrema / Verde suave).', type: 'ride' },
      { time: '12:15', activity: 'Soarin\' Around the World en World Nature (simulador de vuelo en ala delta con aromas y brisa) y Spaceship Earth.', type: 'ride' },
      { time: '13:30', activity: 'Almuerzo cómodo en Connections Eatery (salón climatizado gigante con enchufes USB para cargar celulares de los 12).', type: 'food' },
      { time: '15:00', activity: 'Paseo a buen ritmo por World Showcase: Pabellón de Francia ➔ Remy\'s Ratatouille Adventure (simulador 3D sin rieles) y panadería Les Halles.', type: 'ride' },
      { time: '17:00', activity: 'Recorrido panorámico por los 11 países de World Showcase (México, Noruega: Frozen Ever After, Japón, Italia y Alemania).', type: 'shopping' },
      { time: '20:30', activity: 'Ubicarse junto a la laguna de World Showcase para el show nocturno "Luminous: The Symphony of Us" (21:00 hs).', type: 'ride' },
      { time: '21:30', activity: 'Regreso en 2x UberXL hacia Celebration Suites (13.7 km).', type: 'transport' }
    ],
    teenFocus: [
      'Guardians of the Galaxy: Cosmic Rewind (lanzamiento hacia atrás, rotación 360° y música de Queen / Earth Wind & Fire)',
      'Test Track (aceleración a 105 km/h) y Mission: SPACE Misión Naranja (fuerzas G reales)',
      'Probar sodas internacionales exóticas en Club Cool de Coca-Cola (¡probar la Beverly de broma!)'
    ],
    adultFocus: [
      'Arranque gradual y placentero después del vuelo: avenidas amplias, pabellones internacionales y sin desgaste extremo',
      'Guardians of the Galaxy (riel ultrasuave sin sacudones), Soarin\' Around the World y Remy\'s Ratatouille',
      'Degustación gastronómica en los pabellones de Francia, Italia y Japón en World Showcase'
    ],
    uberRecommendation: {
      departureTime: '08:15',
      destination: 'Celebration Suites ➔ Disney\'s EPCOT',
      distanceKm: 13.7,
      estMinutes: 18,
      recommendedDropoff: 'Rideshare Drop-off EPCOT (Lote Este frente a la esfera de Spaceship Earth)',
      returnTip: 'Al terminar Luminous, caminar por el lateral izquierdo de Spaceship Earth hacia el estacionamiento este ANTES de pedir ambos UberXL (6+6 pax).'
    },
    mealsTip: 'En el pabellón de Francia, pasar por Les Halles Boulangerie-Patisserie para probar croissants, baguettes rellenas y macarons.',
    expertTips: [
      '🎟️ Bloque Disney 1/4 (Pase 4-Park Magic Ticket · ventana 20 al 26 de enero): arrancar por EPCOT al día siguiente del vuelo permite entrar en ritmo disfrutando atracciones top sin correr desde las 6 AM.',
      '🚗 Pedido sincronizado de 2x UberXL a las 08:15 hs (13.7 km / ~18 min): llegan directo al Lote Este frente a la esfera Spaceship Earth.',
      '🔌 En Connections Eatery a las 13:30 hs aprovechen los puertos USB en las mesas largas para recargar celulares y powerbanks de los 12 viajeros.',
      '🎬 Mañana 21 de enero seguimos con el Bloque Disney 2/4 en Hollywood Studios (¡conviene acostarse temprano para llegar con energía al Rope Drop de Star Wars!).'
    ],
    quickServiceRecommendation: {
      name: 'Connections Eatery',
      location: 'World Celebration (EPCOT)',
      specialty: 'Hamburguesas gourmet, pizzas napolitanas, waffles y ensaladas',
      whyFor10Pax: 'Espacio enorme con aire acondicionado y enchufes para cargar todos los celulares de los 7 adolescentes mientras comen.'
    }
  },
  {
    dayNumber: 3,
    dateStr: 'Jue 21 Ene',
    dayOfWeek: 'Jueves',
    dateFull: '21 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Disney 2/4',
    title: 'Parque 2 · Disney\'s Hollywood Studios (Bloque Disney 2/4)',
    parkName: 'Disney\'s Hollywood Studios',
    parkCode: 'disney_hs',
    highlight: 'Segundo parque del Bloque Disney (4-Park Magic Ticket): Star Wars: Rise of the Resistance, Tower of Terror, Rock \'n\' Roller Coaster, Toy Story Land y show Fantasmic!.',
    ticketBlock: {
      blockLabel: 'Bloque Disney · Día 2 de 4',
      passName: 'Pase 4-Park Magic Ticket',
      validityWindow: 'Ventana válida: 20 al 26 de enero de 2027',
      theme: 'disney'
    },
    schedule: [
      { time: '07:30', activity: 'Desayuno rápido en los suites. (A las 07:00 hs abrir app My Disney Experience si coordinan Lightning Lane).', type: 'tip' },
      { time: '08:00', activity: 'Salida sincronizada en 2x UberXL rumbo a Disney\'s Hollywood Studios (11.6 km).', type: 'transport' },
      { time: '08:25', activity: 'Llegada al loop de Rideshare exclusivo (a solo 150 m de los molinetes) y paso por seguridad para el Rope Drop.', type: 'transport' },
      { time: '09:00', activity: 'Apertura: Star Wars: Rise of the Resistance (¡la mayor obra maestra tecnológica de Disney para los 12!).', type: 'ride' },
      { time: '10:45', activity: 'Millennium Falcon: Smugglers Run (dividir los 12 en 2 tripulaciones exactas de 6 personas para pilotear la nave).', type: 'ride' },
      { time: '12:00', activity: 'The Twilight Zone Tower of Terror (adrenalina pura en caída libre para los 7 adolescentes y adultos audaces).', type: 'ride' },
      { time: '13:00', activity: 'Rock \'n\' Roller Coaster Starring Aerosmith (lanzamiento a oscuras de 0 a 92 km/h con 3 inversiones; Single Rider disponible).', type: 'ride' },
      { time: '14:15', activity: 'Almuerzo en ABC Commissary: salón climatizado inmenso con Mobile Order para 12.', type: 'food' },
      { time: '15:30', activity: 'Toy Story Land: Slinky Dog Dash (montaña rusa familiar con doble lanzamiento) + Toy Story Mania.', type: 'ride' },
      { time: '17:30', activity: 'Mickey & Minnie\'s Runaway Railway (tecnología trackless sin lentes 3D fascinante).', type: 'ride' },
      { time: '19:30', activity: 'Tomar ubicaciones en el anfiteatro de Fantasmic! (show nocturno con agua, láseres y pirotecnia).', type: 'ride' },
      { time: '21:30', activity: 'Salida ágil y regreso en 2x UberXL hacia Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'The Twilight Zone Tower of Terror (caídas libres aleatorias)',
      'Rock \'n\' Roller Coaster (0 a 92 km/h en 2.8s con música de Aerosmith y fila Single Rider)',
      'Star Wars: Rise of the Resistance (escapar del Star Destroyer de Kylo Ren)'
    ],
    adultFocus: [
      'Rise of the Resistance (efectos prácticos, animatrónicos hiperrealistas y simulador)',
      'Millennium Falcon (2 cabinas de 6 personas para los 12 viajeros)',
      'Show Fantasmic! (uno de los mejores espectáculos nocturnos de Disney)'
    ],
    uberRecommendation: {
      departureTime: '08:00',
      destination: 'Celebration Suites ➔ Hollywood Studios',
      distanceKm: 11.6,
      estMinutes: 16,
      recommendedDropoff: 'Rideshare Drop-off Area de Hollywood Studios (a 150 metros de los molinetes de entrada)',
      returnTip: 'Al terminar Fantasmic!, caminar directamente al loop de Uber para evitar la marea de salida.'
    },
    mealsTip: 'Para grupos de 12 personas, ABC Commissary permite hacer Mobile Order en la app de Disney para que la comida esté lista apenas lleguen.',
    expertTips: [
      '🎟️ Bloque Disney 2/4 (Pase 4-Park Magic Ticket): Hollywood Studios queda a solo 11.6 km (~16 min) de Celebration Suites y tiene el acceso de UberXL más cómodo de todo Disney.',
      '🚀 En Millennium Falcon: Smugglers Run las cabinas son exactamente para 6 personas: ¡los 12 viajeros ocupan 2 cabinas completas sin desconocidos!',
      '🏰 Mañana 22 de enero toca Magic Kingdom (Bloque Disney 3/4): recordar poner alarma a las 06:55 AM para pedir la Fila Virtual de TRON Lightcycle / Run.'
    ],
    quickServiceRecommendation: {
      name: 'ABC Commissary',
      location: 'Commissary Lane (Hollywood Studios)',
      specialty: 'Carnitas bowls, tacos de langostinos, sándwiches gourmet y bebidas con refill',
      whyFor10Pax: 'Salón interior gigantesco 100% techado y climatizado con mesas largas para 12 personas y sistema de Mobile Order super fluido.'
    }
  },
  {
    dayNumber: 4,
    dateStr: 'Vie 22 Ene',
    dayOfWeek: 'Viernes',
    dateFull: '22 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Disney 3/4',
    title: 'Parque 3 · Disney\'s Magic Kingdom (Bloque Disney 3/4)',
    parkName: 'Disney\'s Magic Kingdom',
    parkCode: 'disney_mk',
    highlight: 'Tercer parque del Bloque Disney (4-Park Magic Ticket): TRON Lightcycle / Run, Space Mountain, Big Thunder Mountain, Seven Dwarfs y el show Happily Ever After en el castillo.',
    ticketBlock: {
      blockLabel: 'Bloque Disney · Día 3 de 4',
      passName: 'Pase 4-Park Magic Ticket',
      validityWindow: 'Ventana válida: 20 al 26 de enero de 2027',
      theme: 'disney'
    },
    schedule: [
      { time: '06:55', activity: 'Alarma de Fila Virtual: a las 07:00:00 AM ingresar en app My Disney Experience para solicitar cupo en TRON Lightcycle / Run.', type: 'tip' },
      { time: '07:45', activity: 'Salida sincronizada en 2x UberXL hacia el Transportation and Ticket Center (TTC) de Magic Kingdom (15.8 km).', type: 'transport' },
      { time: '08:20', activity: 'Tomar el Express Monorail o el Ferry desde el TTC cruzando Seven Seas Lagoon hasta el frente de Magic Kingdom.', type: 'transport' },
      { time: '09:00', activity: 'Entrada oficial por Main Street U.S.A. Fotos grupales de los 12 frente al Castillo de Cenicienta.', type: 'tip' },
      { time: '09:15', activity: 'Tomorrowland: Space Mountain (montaña rusa clásica a oscuras) y TRON Lightcycle / Run (moto futurista de alta velocidad).', type: 'ride' },
      { time: '11:30', activity: 'Fantasyland: Seven Dwarfs Mine Train (montaña rusa con vagones oscilantes) y Peter Pan\'s Flight.', type: 'ride' },
      { time: '13:00', activity: 'Almuerzo en Columbia Harbour House (planta alta tranquila con aire acondicionado y mesas grandes para los 12) o Pecos Bill.', type: 'food' },
      { time: '14:30', activity: 'Frontierland y Adventureland: Big Thunder Mountain Railroad y Pirates of the Caribbean.', type: 'ride' },
      { time: '16:30', activity: 'Haunted Mansion (la mansión embrujada con efectos holográficos deslumbrantes) y Buzz Lightyear\'s Space Ranger Spin.', type: 'ride' },
      { time: '18:00', activity: 'Paseo por Main Street y descanso con helados en Plaza Ice Cream Parlor.', type: 'food' },
      { time: '20:00', activity: 'Happily Ever After: el icónico show de proyecciones sobre el castillo, canciones de Disney y fuegos artificiales.', type: 'ride' },
      { time: '21:30', activity: 'Ferry o Monorriel de regreso al TTC y toma de los 2x UberXL hacia Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'TRON Lightcycle / Run (posición acostado sobre la moto de luz y lanzamiento a 97 km/h)',
      'Space Mountain (clásico de velocidad a oscuras en Tomorrowland)',
      'Big Thunder Mountain Railroad'
    ],
    adultFocus: [
      'Emoción del Castillo de Cenicienta y show nocturno Happily Ever After',
      'Pirates of the Caribbean y Haunted Mansion',
      'Seven Dwarfs Mine Train'
    ],
    uberRecommendation: {
      departureTime: '07:45',
      destination: 'Celebration Suites ➔ Magic Kingdom (TTC)',
      distanceKm: 15.8,
      estMinutes: 20,
      recommendedDropoff: 'Transportation and Ticket Center (TTC) Rideshare Loop',
      returnTip: 'IMPORTANTE: Los Uber no pueden dejar pasajeros en el castillo mismo, siempre llegan al TTC. Calcular 20-25 min extras entre TTC y la entrada en Ferry/Monorriel.'
    },
    mealsTip: 'Columbia Harbour House en Liberty Square ofrece mesas en el piso superior con vista a la calle y aire acondicionado perfecto para los 12.',
    expertTips: [
      '🎟️ Bloque Disney 3/4 (Pase 4-Park Magic Ticket): salida clave a las 07:45 hs en 2x UberXL hacia el TTC (15.8 km) sumando 20-25 min para cruzar Seven Seas Lagoon en Ferry o Monorriel.',
      '🍽️ En Columbia Harbour House suban directo al 2° piso: casi siempre hay mesas largas disponibles para sentar a los 12 juntos con aire acondicionado.',
      '🦁 Mañana 23 de enero cerramos el Bloque Disney en Animal Kingdom en formato efectivo (medio día + tarde de pileta) para llegar descansados al día libre del 24.'
    ],
    quickServiceRecommendation: {
      name: 'Columbia Harbour House',
      location: 'Liberty Square (Magic Kingdom)',
      specialty: 'Plato combinado de langostinos, pescado frito y pollo con papas',
      whyFor10Pax: 'Suban directamente a la segunda planta: es uno de los salones más amplios y tranquilos de Magic Kingdom, ideal para sentar a los 12 juntos lejos del ruido.'
    }
  },
  {
    dayNumber: 5,
    dateStr: 'Sáb 23 Ene',
    dayOfWeek: 'Sábado',
    dateFull: '23 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Disney 4/4',
    title: 'Parque 4 · Disney\'s Animal Kingdom (Cierre Bloque Disney 4/4)',
    parkName: 'Disney\'s Animal Kingdom',
    parkCode: 'disney_ak',
    highlight: 'Cierre completo del Bloque Disney dentro de la ventana del Pase 4-Park Magic Ticket (20–26 ene): mañana efectiva en Avatar Flight of Passage, Safaris y Expedition Everest, y tarde de pileta antes del día libre del 24.',
    ticketBlock: {
      blockLabel: 'Bloque Disney · Día 4 de 4 (Cierre)',
      passName: 'Pase 4-Park Magic Ticket',
      validityWindow: 'Ventana válida: 20 al 26 de enero de 2027 (¡4 parques completados con 3 días de margen!)',
      theme: 'disney'
    },
    schedule: [
      { time: '07:00', activity: 'Despertador temprano: Animal Kingdom abre a las 08:00 AM y es el parque más cercano a Celebration Suites (10.9 km).', type: 'tip' },
      { time: '07:25', activity: 'Salida sincronizada en 2x UberXL rumbo a Disney\'s Animal Kingdom (10.9 km / ~14 min).', type: 'transport' },
      { time: '07:45', activity: 'Rope drop directo a Pandora: World of Avatar ➔ Avatar Flight of Passage.', type: 'ride', notes: 'Simulador de vuelo en banshee; experiencia sensorial imperdible para los 12.' },
      { time: '09:30', activity: 'Na\'vi River Journey (recorrido bioluminiscente en bote) y caminata hacia África.', type: 'ride' },
      { time: '10:30', activity: 'Kilimanjaro Safaris (por la mañana los animales de la sabana están súper activos).', type: 'ride' },
      { time: '12:00', activity: 'Expedition Everest - Legend of the Forbidden Mountain (montaña rusa con retroceso a oscuras y el Yeti; usar Single Rider si quieren repetir).', type: 'ride' },
      { time: '13:15', activity: 'Almuerzo liviano y nutritivo en Satu\'li Canteen (Pandora) con Mobile Order grupal.', type: 'food' },
      { time: '14:30', activity: 'Festival of the Lion King (espectáculo acrobático sentado en carpa climatizada — cero caminata).', type: 'ride' },
      { time: '15:30', activity: 'Salida temprana en 2x UberXL hacia Celebration Suites para tarde de pileta, reposeras y recuperación muscular.', type: 'transport' },
      { time: '19:30', activity: 'Cena distendida en Texas Roadhouse (Kissimmee 192, a 5 min): ¡mañana 24 de enero es día libre de descanso, pileta, outlets y Walmart!', type: 'food' }
    ],
    teenFocus: [
      'Expedition Everest (usar fila Single Rider para subir 2 veces seguidas sin desgaste)',
      'Avatar Flight of Passage (sentir respirar al banshee entre las piernas)',
      'Tarde libre de pileta en Celebration Suites tras completar los 4 parques de Disney'
    ],
    adultFocus: [
      'Avatar Flight of Passage y Kilimanjaro Safaris por la mañana sin calor ni cansancio',
      'Festival of the Lion King (show sentado de nivel Broadway)',
      'Cierre perfecto del Bloque Disney regresando a las 15:30 hs a descansar'
    ],
    uberRecommendation: {
      departureTime: '07:25',
      destination: 'Celebration Suites ➔ Disney\'s Animal Kingdom',
      distanceKm: 10.9,
      estMinutes: 14,
      recommendedDropoff: 'Rideshare Drop-off Animal Kingdom (loop oeste a solo 100 m de los molinetes)',
      returnTip: 'Al volver a las 15:30 hs evitan cualquier congestión de salida y consiguen los 2 UberXL en menos de 4 minutos.'
    },
    mealsTip: 'Satu\'li Canteen en Pandora tiene los mejores bowls saludables de Disney y las famosas Cheeseburger Steamed Pods.',
    expertTips: [
      '🎟️ Bloque Disney 4/4 completado: cerramos los 4 parques de Disney (EPCOT, Hollywood Studios, Magic Kingdom y Animal Kingdom) perfectamente dentro de la ventana del Pase 4-Park Magic Ticket (20 al 26 de enero).',
      '⚡ Estrategia anti-fatiga: Animal Kingdom está a solo 10.9 km (~14 min). Saliendo a las 07:25 hs hacemos todo lo imperdible temprano y volvemos a las 15:30 hs a la pileta.',
      '🛍️ Mañana 24 de enero es día libre completo para descanso, pileta, outlets (Nike/Adidas) y Walmart antes de arrancar el Bloque Universal el 25 junto a Agustina.'
    ],
    quickServiceRecommendation: {
      name: "Satu'li Canteen",
      location: 'Pandora - World of Avatar (Animal Kingdom)',
      specialty: 'Bowls de carne, pollo asado, arroz integral y chimichurri',
      whyFor10Pax: 'La mejor comida rápida de Disney. Salón amplio, fresco y liviano para recargar energía sin pesadez.'
    }
  },
  {
    dayNumber: 6,
    dateStr: 'Dom 24 Ene',
    dayOfWeek: 'Domingo',
    dateFull: '24 de Enero de 2027',
    type: 'shopping',
    eventShortLabel: 'Libre / Outlets',
    title: 'Día Libre · Descanso, Pileta, Outlets (Nike/Adidas) & Walmart',
    highlight: 'Jornada bisagra de recuperación física entre el Bloque Disney y el Bloque Universal: mañana sin despertador y pileta en Celebration Suites, tarde de outlets (Nike y Adidas) y reabastecimiento en Walmart.',
    ticketBlock: {
      blockLabel: 'Día Libre · Pausa Estratégica',
      passName: 'Descanso + Compras & Provisiones',
      validityWindow: 'Bisagra entre Bloque Disney (20–23 ene) y Bloque Universal (25–27 ene)',
      theme: 'rest'
    },
    schedule: [
      { time: '09:30', activity: 'Mañana sin despertador, desayuno relajado en los 3 departamentos y disfrute de la pileta de Celebration Suites para recuperar piernas tras los 4 parques Disney.', type: 'tip' },
      { time: '12:00', activity: 'Salida en 2x UberXL rumbo a Orlando International Premium Outlets en I-Drive (22.2 km) o Vineland Premium Outlets (12.7 km).', type: 'transport' },
      { time: '12:30', activity: 'Parada prioritaria 1: Nike Factory / Clearance Store (buscar el "Hash Wall" al fondo para botines de fútbol y zapatillas para los 7 chicos).', type: 'shopping' },
      { time: '14:00', activity: 'Parada prioritaria 2: Adidas Outlet Store (botines Predator/X/Copa, camisetas y promos 2x1 / 50% OFF en el segundo par).', type: 'shopping' },
      { time: '15:15', activity: 'Almuerzo distendido en el Food Court o en Shake Shack / Five Guys.', type: 'food' },
      { time: '16:45', activity: 'Parada opcional de tecnología en Best Buy Millenia (a 3.5 km de I-Drive Outlets) para ver notebooks, powerbanks Anker y accesorios.', type: 'shopping' },
      { time: '18:15', activity: 'Reabastecimiento en Walmart Supercenter #5214 Vine St (a solo 4.5 km de Celebration Suites): reponer packs de agua mineral, frutas, barritas y snacks para los 3 días intensos de Universal.', type: 'shopping' },
      { time: '20:00', activity: 'Cena relajada en Ford\'s Garage (Kissimmee 192, a 5 min) o pizza en los suites y descanso temprano: ¡mañana 25 arrancamos el Bloque Universal junto a Agustina!', type: 'food' }
    ],
    teenFocus: [
      'Dormir sin despertador y disfrutar la pileta de Celebration Suites para recargar energía',
      'Probarse botines de fútbol y zapatillas en Nike ("Hash Wall") y Adidas Outlet',
      'Elegir snacks y bebidas en Walmart para las mochilas de los 3 días de Universal'
    ],
    adultFocus: [
      'Pausa física total de caminatas de parque entre el Bloque Disney y el Bloque Universal',
      'Aprovechar cuponeras VIP digitales en Nike/Adidas y reabastecer los 3 departamentos en Walmart',
      'Coordinar horario de encuentro para mañana 25 de enero con Agustina en Universal'
    ],
    uberRecommendation: {
      departureTime: '12:00',
      destination: 'Celebration Suites ➔ Outlets (Nike/Adidas) & Walmart Vine St',
      distanceKm: 22.2,
      estMinutes: 25,
      recommendedDropoff: 'Puerta principal junto a Nike / Food Court (International o Vineland Outlets) y luego Walmart #5214 (4.5 km del hotel)',
      returnTip: 'Si vuelven con bolsas de compras, pasar directo por Walmart #5214 Vine St (a 6 min del hotel) o enviar a 2 adultos en 1 Uber estándar para el súper.'
    },
    mealsTip: 'Aprovechar el paso por Walmart #5214 a la tarde para reponer 2 packs de agua mineral, frutas y desayunos para los 3 días seguidos de Universal (25, 26 y 27).',
    expertTips: [
      '🏊 Mañana de pileta y recuperación real: después de 4 días de parques Disney, descansar sin despertador hasta media mañana renueva energías para toda la semana.',
      '👟 Estrategia Nike & Adidas: llevar una mochila vacía o carry-on liviano para guardar cajas de botines y activar la cuponera VIP de Simon Outlets.',
      '🎢 Mañana 25 de enero se abre la ventana del Pase 3-Day Ticket de Universal: arrancamos en Universal\'s Islands of Adventure junto a Agustina (¡salimos 08:05 hs en 2x UberXL!).'
    ]
  },
  {
    dayNumber: 7,
    dateStr: 'Lun 25 Ene',
    dayOfWeek: 'Lunes',
    dateFull: '25 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Universal 1/3',
    title: 'Parque 5 · Universal\'s Islands of Adventure (Bloque Universal 1/3 · Con Agustina)',
    parkName: 'Islands of Adventure',
    parkCode: 'universal_ioa',
    highlight: 'Apertura del Bloque Universal (Pase 3-Day Ticket válido desde el 25 de enero de 2027) ¡junto a Agustina!: pura adrenalina en VelociCoaster, Hagrid\'s Motorbike, Hulk Coaster y Hogwarts.',
    ticketBlock: {
      blockLabel: 'Bloque Universal · Día 1 de 3',
      passName: 'Pase 3-Day Ticket Universal',
      validityWindow: 'Ventana válida: a partir del 25 de enero de 2027',
      companionNote: '¡Junto a Agustina!',
      theme: 'universal'
    },
    schedule: [
      { time: '07:30', activity: 'Desayuno energético en Celebration Suites con mochilas compactas, agua de Walmart y zapatillas cómodas.', type: 'food' },
      { time: '08:05', activity: 'Pedir sincronizados los 2x UberXL (6+6 pax) hacia Universal Orlando Drop-off Hub (23.3 km).', type: 'transport' },
      { time: '08:35', activity: 'Llegada al Piso 5 del estacionamiento central, seguridad de CityWalk y punto de encuentro con Agustina en el arco de Islands of Adventure.', type: 'transport' },
      { time: '09:00', activity: 'Apertura oficial (Rope Drop): ir directo a Hagrid\'s Magical Creatures Motorbike Adventure (7 lanzamientos) o VelociCoaster.', type: 'ride' },
      { time: '10:30', activity: 'Jurassic World VelociCoaster (¡el highlight absoluto de adrenalina para los 7 adolescentes!).', type: 'ride', notes: 'Los casilleros para celulares y mochilas son obligatorios y gratuitos junto a la entrada.' },
      { time: '12:00', activity: 'The Wizarding World of Harry Potter: Hogsmeade + Harry Potter and the Forbidden Journey dentro del Castillo de Hogwarts.', type: 'ride' },
      { time: '13:30', activity: 'Almuerzo grupal en Three Broomsticks (Las Tres Escobas) en Hogsmeade con bandejas "The Great Feast".', type: 'food' },
      { time: '15:00', activity: 'The Amazing Adventures of Spider-Man (simulador 3D legendario para todos) + The Incredible Hulk Coaster (teens).', type: 'ride' },
      { time: '17:00', activity: 'Jurassic Park River Adventure (Splash moderado) o Skull Island: Reign of Kong.', type: 'ride' },
      { time: '19:00', activity: 'Repetir la montaña rusa preferida de noche (VelociCoaster iluminada sobre la laguna es una locura).', type: 'ride' },
      { time: '20:30', activity: 'Cena distendida en Universal CityWalk (Cowfish o Antojitos Mexicanos) junto a Agustina y regreso en 2x UberXL a Celebration Suites.', type: 'food' }
    ],
    teenFocus: [
      'VelociCoaster (0 a 112 km/h en 2.4s, gravedad cero sobre la laguna — ¡imperdible #1!)',
      'Hagrid\'s Magical Creatures Motorbike Adventure (7 lanzamientos y caída libre vertical)',
      'The Incredible Hulk Coaster (lanzamiento inicial de 67 km/h y 7 inversiones)'
    ],
    adultFocus: [
      'Compartir el inicio del Bloque Universal junto a Agustina con piernas descansadas tras el día libre del 24',
      'Harry Potter and the Forbidden Journey y The Amazing Adventures of Spider-Man (simulador 4K)',
      'Paseo temático por Hogsmeade con Butterbeer Frozen'
    ],
    uberRecommendation: {
      departureTime: '08:05',
      destination: 'Celebration Suites ➔ Universal Drop-off Hub (CityWalk Piso 5)',
      distanceKm: 23.3,
      estMinutes: 24,
      recommendedDropoff: 'Universal Orlando Resort Guest Drop-off (Piso 5 del estacionamiento central)',
      returnTip: 'A la salida (20:30-21:00), subir al Piso 5 de la estación de Uber en CityWalk ANTES de pedir los 2x UberXL.'
    },
    mealsTip: 'Probar la Butterbeer Frozen en Hogsmeade. En Three Broomsticks pedir 2 o 3 fuentes gigantes "The Great Feast" para compartir en grupo.',
    expertTips: [
      '🎟️ Bloque Universal 1/3 (Pase 3-Day Ticket · válido desde el 25 de enero · junto a Agustina): arrancamos con la mayor dosis de adrenalina del viaje después del día libre del 24.',
      '🚗 Logística 2x UberXL (08:05 hs · 23.3 km): destino "Universal Orlando Resort Guest Drop-off" (Piso 5 de CityWalk). Al volver, subir al Piso 5 antes de solicitar los autos.',
      '🔐 Casilleros gratuitos: en VelociCoaster, Hulk y Forbidden Journey llevar mochilas compactas o agrupar pertenencias para entrar y salir rápido de los lockers.'
    ],
    quickServiceRecommendation: {
      name: 'Three Broomsticks (Las Tres Escobas)',
      location: 'Hogsmeade (Islands of Adventure)',
      specialty: 'Platos familiares de costillas, pollo asado, papas y ensalada fresca',
      whyFor10Pax: 'Pidiendo dos o tres bandejas gigantes "The Great Feast" comen todos con abundancia y a menor costo que comprando platos individuales.'
    }
  },
  {
    dayNumber: 8,
    dateStr: 'Mar 26 Ene',
    dayOfWeek: 'Martes',
    dateFull: '26 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Universal 2/3',
    title: 'Parque 6 · Universal Studios Florida (Bloque Universal 2/3 · Con Agustina)',
    parkName: 'Universal Studios Florida',
    parkCode: 'universal_studios',
    highlight: 'Segundo día del Bloque Universal (Pase 3-Day Ticket) junto a Agustina: menor afluencia estadística de filas para Escape from Gringotts, Revenge of the Mummy, Rip Ride Rockit y Diagon Alley.',
    ticketBlock: {
      blockLabel: 'Bloque Universal · Día 2 de 3',
      passName: 'Pase 3-Day Ticket Universal',
      validityWindow: 'Ventana válida: a partir del 25 de enero de 2027',
      companionNote: '¡Junto a Agustina!',
      theme: 'universal'
    },
    schedule: [
      { time: '07:35', activity: 'Desayuno en suites con zapatillas cómodas y botellas de agua en mochilas compactas.', type: 'food' },
      { time: '07:55', activity: 'Pedir sincronizados los 2x UberXL hacia Universal Orlando Drop-off Hub (23.3 km).', type: 'transport' },
      { time: '08:30', activity: 'Llegada al Piso 5 del estacionamiento central, seguridad de CityWalk y encuentro con Agustina en el globo giratorio de Universal Studios.', type: 'transport' },
      { time: '09:00', activity: 'Entrada directa a Diagon Alley tras la pared de ladrillos: Harry Potter and the Escape from Gringotts con mínima fila.', type: 'ride' },
      { time: '10:30', activity: 'Revenge of the Mummy (montaña rusa bajo techo con fuego real y aceleraciones brutales).', type: 'ride' },
      { time: '11:45', activity: 'Hollywood Rip Ride Rockit (subida a 90° y música a elección) + Race Through New York Starring Jimmy Fallon.', type: 'ride' },
      { time: '13:15', activity: 'Almuerzo en Fast Food Boulevard (Springfield de Los Simpsons) o Leaky Cauldron en Diagon Alley.', type: 'food' },
      { time: '14:45', activity: 'TRANSFORMERS: The Ride 3D (simulador de batalla urbana) y Despicable Me Minion Mayhem.', type: 'ride' },
      { time: '16:15', activity: 'MEN IN BLACK Alien Attack (competencia grupal de disparos láser: Auto 1 vs Auto 2).', type: 'ride' },
      { time: '17:45', activity: 'E.T. Adventure (clásico encantador para todos) y última vuelta de los adolescentes en Gringotts o Mummy.', type: 'ride' },
      { time: '19:45', activity: 'Cena relajada en Universal CityWalk (Hard Rock Cafe o Antojitos) y regreso en 2x UberXL para dormir bien antes de Epic Universe.', type: 'food' }
    ],
    teenFocus: [
      'Hollywood Rip Ride Rockit (elegir tema heavy metal o pop antes de subir)',
      'Revenge of the Mummy (0 a 72 km/h a oscuras con efectos de calor y caídas sorpresa)',
      'Escape from Gringotts (caída en riel y dragón ucraniano escupefuego)'
    ],
    adultFocus: [
      'Inmersión arquitectónica en Diagon Alley junto a Agustina (ver el dragón de Gringotts rugir fuego cada 10 min)',
      'TRANSFORMERS The Ride 3D y simuladores bajo techo con aire acondicionado',
      'Competencia grupal en MEN IN BLACK Alien Attack para ver quién saca más puntos'
    ],
    uberRecommendation: {
      departureTime: '07:55',
      destination: 'Celebration Suites ➔ Universal Drop-off Hub',
      distanceKm: 23.3,
      estMinutes: 24,
      recommendedDropoff: 'Universal Orlando Resort Guest Drop-off (Piso 5)',
      returnTip: 'Regla de oro de regreso: subir todos juntos al Piso 5 de CityWalk ANTES de pedir los 2 UberXL para no hacer esperar a los choferes.'
    },
    mealsTip: 'En Leaky Cauldron pedir Fish & Chips y Cottage Pie. En Diagon Alley prueben el helado de manteca (Butterbeer Ice Cream) en Florean Fortescue\'s.',
    expertTips: [
      '🎟️ Bloque Universal 2/3 (Pase 3-Day Ticket · junto a Agustina): estadísticamente esta jornada tiene 25-35% menos fila en simuladores y montañas rusas de Universal Studios Florida.',
      '🚗 Logística 2x UberXL a las 07:55 hs (23.3 km / ~24 min): ir al Hub tradicional de CityWalk Piso 5 (¡OJO: mañana 27 Epic Universe queda en otro campus distinto sobre Epic Blvd!).',
      '🔐 Casilleros gratuitos: en Gringotts, Mummy y Rip Ride Rockit agrupen mochilas en 1 o 2 bolsos compactos para entrar y salir rápido de los lockers.',
      '😴 Salir del parque antes de las 20:30 hs para dormir 8 horas: mañana 27 de enero cerramos el Bloque Universal estrenando Universal Epic Universe.'
    ],
    quickServiceRecommendation: {
      name: 'Fast Food Boulevard (Springfield)',
      location: 'Springfield (Universal Studios)',
      specialty: 'Krusty Burgers, Cletus Chicken Shack, pizzas y Flaming Moes',
      whyFor10Pax: 'Múltiples barras de comidas diferentes dentro de un mismo mega salón cerrado con mesas grandes donde los 12 pueden sentarse juntos.'
    }
  },
  {
    dayNumber: 9,
    dateStr: 'Mié 27 Ene',
    dayOfWeek: 'Miércoles',
    dateFull: '27 de Enero de 2027',
    type: 'park',
    eventShortLabel: 'Universal 3/3',
    title: 'Parque 7 · Universal Epic Universe (Bloque Universal 3/3 · Con Agustina)',
    parkName: 'Universal Epic Universe',
    parkCode: 'universal_epic',
    highlight: '¡Gran cierre del Bloque Universal (Pase 3-Day Ticket) junto a Agustina y 7° parque de Orlando! 5 mundos inmersivos: SUPER NINTENDO WORLD, Dark Universe, Isle of Berk, Ministry of Magic y Stardust Racers.',
    ticketBlock: {
      blockLabel: 'Bloque Universal · Día 3 de 3 (Cierre)',
      passName: 'Pase 3-Day Ticket Universal',
      validityWindow: 'Ventana válida: a partir del 25 de enero de 2027',
      companionNote: '¡Junto a Agustina!',
      theme: 'universal'
    },
    schedule: [
      { time: '07:15', activity: 'Desayuno energético temprano en Celebration Suites. Verificar la App oficial de Universal Orlando (Mobile Order y tiempos en vivo).', type: 'food' },
      { time: '07:40', activity: 'Pedir sincronizados los 2x UberXL rumbo al nuevo campus de Universal Epic Universe (20.5 km, acceso por Epic Blvd / Universal Blvd).', type: 'transport', notes: 'ATENCIÓN: No confundir en la app de Uber con el campus antiguo de CityWalk; seleccionar "Universal Epic Universe".' },
      { time: '08:15', activity: 'Encuentro con Agustina e ingreso por el portal monumental Chronos hacia Celestial Park listos para el Rope Drop.', type: 'transport' },
      { time: '09:00', activity: 'Portal 1 — SUPER NINTENDO WORLD: Mario Kart: Bowser\'s Challenge (realidad aumentada) y Mine-Cart Madness (Donkey Kong Country con saltos de vía).', type: 'ride', notes: 'Los chicos pueden usar las pulseras Power-Up Band para interactuar con bloques y minijuegos; Yoshi\'s Adventure ofrece vistas panorámicas.' },
      { time: '11:30', activity: 'Portal 2 — The Wizarding World of Harry Potter – Ministry of Magic: recorrer el París mágico de los años 20 y subir a Harry Potter and the Battle at the Ministry.', type: 'ride', notes: 'Una de las atracciones más espectaculares jamás creadas (ascensores omnidireccionales y efectos prácticos gigantes).' },
      { time: '13:30', activity: 'Almuerzo en Mead Hall (Isle of Berk) o Toadstool Cafe (Super Nintendo World) usando Mobile Order grupal.', type: 'food' },
      { time: '14:45', activity: 'Portal 3 — How to Train Your Dragon – Isle of Berk: montaña rusa familiar Hiccup\'s Wing Gliders, Dragon Racer\'s Rally y Fyre Drill.', type: 'ride' },
      { time: '17:00', activity: 'Portal 4 — Dark Universe: Monsters Unchained: The Frankenstein Experiment (tecnología robótica KUKA de nueva generación) y Curse of the Werewolf.', type: 'ride' },
      { time: '19:15', activity: 'Celestial Park de noche — Stardust Racers: la doble montaña rusa de lanzamiento paralelo a 100 km/h iluminando el cielo nocturno.', type: 'ride', notes: '¡Imperdible de noche! Los trenes cometa brillan sin iluminación externa de rieles mientras se cruzan en el aire.' },
      { time: '20:45', activity: 'Show nocturno en las fuentes de Cosmos Fountain y regreso en 2x UberXL a Celebration Suites (20.5 km).', type: 'transport' }
    ],
    teenFocus: [
      'Stardust Racers de noche (duelo paralelo de dos trenes a 100 km/h e inversión "Celestial Spin")',
      'Mine-Cart Madness (montaña rusa de Donkey Kong con sensación de saltar rieles rotos)',
      'Monsters Unchained y Curse of the Werewolf en Dark Universe'
    ],
    adultFocus: [
      'Gran cierre del Bloque Universal junto a Agustina estrenando el parque más moderno del mundo',
      'Harry Potter and the Battle at the Ministry y Mario Kart: Bowser\'s Challenge',
      'Arquitectura y gastronomía de Isle of Berk y el espectáculo nocturno de Celestial Park'
    ],
    uberRecommendation: {
      departureTime: '07:40',
      destination: 'Celebration Suites ➔ Universal Epic Universe',
      distanceKm: 20.5,
      estMinutes: 25,
      recommendedDropoff: 'Universal Epic Universe Rideshare Loop (acceso por Epic Blvd junto a Chronos Plaza)',
      returnTip: 'Al cerrar el parque, salgan por la plaza central Chronos hacia el loop de Rideshare de Epic Blvd ANTES de pedir los 2x UberXL.'
    },
    mealsTip: 'Mead Hall en Isle of Berk tiene salones vikingos enormes ideales para sentar al grupo junto y fuentes "Thawfest Platter" para compartir. En Super Nintendo World, Toadstool Cafe requiere Mobile Order temprano.',
    expertTips: [
      '🎟️ Bloque Universal 3/3 (Pase 3-Day Ticket · junto a Agustina) — Ubicación distinta de Uber: Universal Epic Universe está a 20.5 km de Celebration Suites (sobre Epic Blvd), NO en CityWalk. Verificar que ambos choferes marquen "Universal Epic Universe".',
      '🌌 Orden inteligente de portales: ataquen SUPER NINTENDO WORLD (Mario Kart + Mine-Cart) o Ministry of Magic a las 09:00 AM en punto, y dejen Stardust Racers para después de las 18:30 hs cuando cae la noche.',
      '🏀 Mañana jueves 28 de enero tenemos mañana tranquila de descanso y luego NBA Orlando Magic vs. Chicago Bulls en Kia Center: esta noche dejar descargadas las entradas digitales en el wallet y separar carteras pequeñas (prohibidas las mochilas de parque en el estadio).'
    ],
    quickServiceRecommendation: {
      name: 'Mead Hall (Isle of Berk)',
      location: 'How to Train Your Dragon – Isle of Berk (Epic Universe)',
      specialty: 'Fuentes nórdicas Thawfest Platter, carnes asadas, salmón y postres temáticos',
      whyFor10Pax: 'Gran salón vikingo con mesas comunales larguísimas donde entran los 12 cómodos con aire acondicionado y Mobile Order.'
    }
  },
  {
    dayNumber: 10,
    dateStr: 'Jue 28 Ene',
    dayOfWeek: 'Jueves',
    dateFull: '28 de Enero de 2027',
    type: 'sports',
    statusBadge: '✅ ¡Entradas listas!',
    eventShortLabel: 'NBA',
    bannerHeadline: '🏀 Partido Confirmado NBA: Orlando Magic vs. Chicago Bulls · Kia Center (19:00 hs)',
    bannerTransportNote: '🚗 2x UberXL a las 16:45 hs (35 km)',
    title: 'Mañana Libre / Descanso & NBA: Orlando Magic vs. Chicago Bulls',
    highlight: '✅ ¡Entradas listas! Mañana libre y de descanso total tras el Bloque Universal (Islands of Adventure, Universal Studios y Epic Universe); a las 19:00 hs partido oficial NBA en el Kia Center (400 W Church St, a 35 km).',
    logisticAlert: {
      departureTime: '16:45',
      title: 'Alerta Logística NBA · Pedir 2x UberXL a las 16:45 hs en punto',
      message: 'El Kia Center queda a 35 km desde Celebration Suites por la I-4 Este. Pedir los 2 UberXL a las 16:45 hs evita la congestión de hora pico en la I-4, permite ingresar sin corridas, ver el precalentamiento en cancha y recorrer el Magic Team Shop.'
    },
    schedule: [
      { time: '10:00', activity: 'Mañana libre sin despertador y desayuno relajado en Celebration Suites. Descanso físico tras los 3 días seguidos del Bloque Universal.', type: 'tip' },
      { time: '11:30', activity: 'Pileta del hotel, relax en los departamentos o caminata tranquila por Old Town Kissimmee (al lado del hotel).', notes: 'Mañana pensada para recargar energía y cuidar piernas (mañana viernes 29 queda entero para compras finales).', type: 'tip' },
      { time: '13:30', activity: 'Almuerzo tranquilo en Celebration Suites o en algún local cercano sobre la 192.', type: 'food' },
      { time: '15:30', activity: 'Ducha, cambio de ropa y control de tickets: verificar que las entradas estén guardadas en Apple/Google Wallet y dejar TODAS las mochilas de parque en el suite.', notes: 'En el Kia Center NO permiten mochilas de parque. Llevar solo lo mínimo en bolsillos o carteras sobre muy chicas.', type: 'tip' },
      { time: '16:45', activity: '🚨 ALERTA LOGÍSTICA: Pedir sincronizados los 2x UberXL rumbo al Kia Center (400 W Church St, Orlando — 35 km por I-4 Este).', notes: 'Salida estratégica a las 16:45 hs para esquivar el tráfico pesado de la I-4.', type: 'transport' },
      { time: '17:45', activity: 'Llegada a Hughey Ave & W Church St. Ingreso ágil mostrando el wallet del celular y visita al Orlando Magic Team Shop.', type: 'tip' },
      { time: '19:00', activity: '🏀 PARTIDO NBA CONFIRMADO: Orlando Magic vs. Chicago Bulls en el Kia Center (19:00 hs EST / 21:00 hs ARG).', notes: 'Duelo NBA en vivo para los 12 viajeros (ocupando 6 pasajeros por UberXL) con show de luces, pantalla 4K y mascotas.', type: 'ride' },
      { time: '22:00', activity: 'Cena rápida post-partido en Church Street o regreso directo en 2x UberXL hacia Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      '🏀 ¡Entradas listas! Ver en vivo Orlando Magic vs. Chicago Bulls en el Kia Center (19:00 hs)',
      'Elegir camisetas o gorras oficiales de la NBA en el Orlando Magic Team Shop',
      'Mañana libre de descanso y pileta para llegar al 100% al partido'
    ],
    adultFocus: [
      'Mañana tranquila de descanso real tras el Bloque Universal (Islands of Adventure + Universal Studios + Epic Universe)',
      'Traslado cómodo en 2x UberXL a las 16:45 hs (6 pasajeros por auto) evitando manejar por la I-4',
      'Vivir el espectáculo NBA en vivo junto a los 7 chicos'
    ],
    uberRecommendation: {
      departureTime: '16:45',
      destination: 'Celebration Suites ➔ Kia Center (400 W Church St, Orlando)',
      distanceKm: 35,
      estMinutes: 42,
      recommendedDropoff: 'Loop Rideshare de Hughey Ave & W Church St (frente al atrio del Kia Center)',
      returnTip: 'Al terminar el partido (~21:45 hs), caminar 200 m por Church Street alejándose de la puerta principal antes de pedir los 2x UberXL de vuelta.'
    },
    mealsTip: 'Almorzar tranquilo cerca del hotel y cenar dentro del Kia Center (puestos de hamburguesas, tacos, tenders y gaseosas; estadio 100% cashless con tarjeta o Apple/Google Pay).',
    expertTips: [
      '🚗 Pedir los 2 UberXL a las 16:45 hs en punto: son 35 km por la I-4 Este y a esa hora empieza el tráfico pesado rumbo a Downtown Orlando.',
      '📲 Entradas en el wallet del celular: agregar los tickets de Orlando Magic vs. Chicago Bulls a Apple Wallet o Google Wallet antes de salir (la señal en la puerta suele colapsar).',
      '🎒 NO llevar mochilas de parque: el Kia Center prohíbe mochilas y bolsos grandes; solo permiten carteras sobre chicas (máx. 4.5" x 6.5") o llevar celular y tarjeta en los bolsillos.',
      '💳 Estadio 100% Cashless: no aceptan efectivo dentro del estadio, todo se paga con tarjeta o wallet del celular.'
    ]
  },
  {
    dayNumber: 11,
    dateStr: 'Vie 29 Ene',
    dayOfWeek: 'Viernes',
    dateFull: '29 de Enero de 2027',
    type: 'shopping',
    title: 'Día Libre de Parques · Compras Finales & Armado de 12 Valijas',
    highlight: 'Jornada completa sin parques para cerrar todas las compras (Outlets, Nike Clearance al lado del hotel y Walmart) y dejar las 12 valijas armadas para salir a Miami a las 07:00 hs.',
    schedule: [
      { time: '09:00', activity: 'Desayuno en Celebration Suites y salida temprana en 2x UberXL hacia Orlando Vineland Premium Outlets (12.7 km) o I-Drive Outlets.', type: 'shopping' },
      { time: '11:30', activity: 'Parada clave de regreso en Kissimmee: Nike Clearance Store al lado del hotel (sobre US-192 / Kissimmee) para cazar últimas ofertas en botines y zapatillas.', notes: 'Súper cerca de Celebration Suites; ideal para liquidar talles de los 7 adolescentes y adultos.', type: 'shopping' },
      { time: '13:30', activity: 'Almuerzo distendido sobre la 192 (Ford\'s Garage / Shake Shack / Chick-fil-A).', type: 'food' },
      { time: '15:00', activity: 'Última pasada por Walmart Supercenter #5214 (Vine St, a 4.5 km): recuerdos Disney/Universal económicos, snacks para la ruta, balanza de equipaje o valija extra si hace falta.', type: 'shopping' },
      { time: '17:00', activity: 'Regreso a Celebration Suites: tarde dedicada a clasificar compras, quitar etiquetas/cajas innecesarias y armar las 12 valijas.', type: 'tip', notes: 'Pesar todas las valijas para cumplir límites de aerolínea y tener bolsos de mano listos.' },
      { time: '20:30', activity: 'Cena tranquila de despedida de Orlando cerca del hotel y a dormir temprano (mañana sábado 30 salimos a las 07:00 hs hacia Miami).', type: 'food' }
    ],
    teenFocus: [
      'Últimas recorridas por Outlets y Nike Clearance Store al lado del hotel para botines y buzos',
      'Elegir chocolates, golosinas y recuerdos en Walmart para llevar a Argentina',
      'Dejar mochilas y las 12 valijas listas antes de acostarse (traje de baño a mano para Miami Beach)'
    ],
    adultFocus: [
      'Cerrar compras pendientes en Outlets y Walmart con calma y sin cansancio de parques',
      'Armar y pesar las 12 valijas con tiempo, separando muda de playa para el sábado en Miami Beach',
      'Dejar todo listo en el hall de los 3 departamentos para cargar el traslado contratado por agencia a las 06:45 hs'
    ],
    uberRecommendation: {
      departureTime: '09:00',
      destination: 'Celebration Suites ➔ Outlets, Nike Clearance & Walmart',
      distanceKm: 12.7,
      estMinutes: 16,
      recommendedDropoff: 'Vineland Premium Outlets / Nike Clearance Kissimmee / Walmart Vine St (4.5 km)',
      returnTip: 'Al estar el Nike Clearance y Walmart a pocos minutos de Celebration Suites, los tramos de vuelta en 2x UberXL salen muy económicos.'
    },
    mealsTip: 'Aprovechen el almuerzo cerca de los outlets y a la noche cenen liviano cerca del hotel para acostarse temprano antes de la salida de las 07:00 hs.',
    expertTips: [
      '👟 Nike Clearance al lado del hotel + Outlets + Walmart en el mismo día: arranquen por Outlets a las 09:00 hs cuando recién abren, sigan por Nike Clearance al mediodía y cierren con Walmart a las 15:00 hs para traer snacks y bolsas de viaje.',
      '🧳 Operativo 12 Valijas: armen el equipaje entre las 17:00 y las 20:00 hs dejando arriba de todo o en una mochila de mano el traje de baño, ojotas y protector solar para aprovechar la playa apenas lleguemos a Miami Beach.',
      '⏰ Alarma obligatoria: mañana sábado 30 el traslado terrestre contratado por agencia sale puntual a las 07:00 hs rumbo a Miami (~380 km). Dejar las 12 valijas cerca de la puerta antes de dormir.'
    ]
  },
  {
    dayNumber: 12,
    dateStr: 'Sáb 30 Ene',
    dayOfWeek: 'Sábado',
    dateFull: '30 de Enero de 2027',
    type: 'travel',
    title: 'Salida 07:00 hs a Miami & Todo el Sábado de Playa en Seacoast Suites',
    highlight: 'Traslado terrestre contratado por agencia Orlando ➔ Miami para los 12 pasajeros: salida puntual a las 07:00 hs (~380 km) hacia Seacoast Suites on Miami Beach (5101 Collins Ave, 3 departamentos con salida directa a la playa).',
    schedule: [
      { time: '06:15', activity: 'Check-out rápido en los 3 departamentos de Celebration Suites, control final de armarios/enchufes y café/desayuno ágil para llevar.', type: 'tip' },
      { time: '06:45', activity: 'Carga de las 12 valijas en el traslado terrestre contratado por agencia Orlando ➔ Miami para los 12 pasajeros en el lobby de Celebration Suites.', type: 'transport' },
      { time: '07:00', activity: '🚐 SALIDA TEMPRANO PUNTUAL rumbo a Miami Beach (~380 km por Florida\'s Turnpike, traslado terrestre contratado por agencia para los 12 pasajeros).', notes: 'Salir a las 07:00 hs evita tráfico de media mañana y garantiza llegar a la playa para el mediodía.', type: 'transport' },
      { time: '09:15', activity: 'Parada técnica rápida de 20 min en Fort Drum Service Plaza (km 190 del Turnpike) para baños y café.', type: 'food' },
      { time: '11:00', activity: 'Llegada a Seacoast Suites on Miami Beach (5101 Collins Ave): check-in en los 3 departamentos (Depto 1: Carolina, Fofi, Tuto, Luisina y Josefina; Depto 2: Lorena, Celia, Renato y Máximo; Depto 3: Juan, José y Bruno).', notes: 'Los 7 adolescentes tienen flexibilidad para rotar entre los departamentos. Salida directa a la playa.', type: 'tip' },
      { time: '11:45', activity: '🏖️ ¡TODO EL SÁBADO DE PLAYA EN MIAMI BEACH! Salida directa desde Seacoast Suites al mar, almuerzo frente a la playa y pileta para los 12 viajeros.', type: 'ride' },
      { time: '19:30', activity: 'Ducha en los 3 departamentos, paseo nocturno por Lincoln Road o Ocean Drive y cena distendida en Miami Beach.', type: 'food' }
    ],
    teenFocus: [
      'Dormir el tramo de ruta escuchando música y bajar directo a la playa antes del mediodía',
      'Salida directa a la playa desde Seacoast Suites on Miami Beach: tarde completa de mar, fútbol en la arena y pileta',
      'Recorrida nocturna por Ocean Drive / Lincoln Road'
    ],
    adultFocus: [
      'Control de las 12 valijas al subir al traslado terrestre contratado por agencia a las 06:45 hs',
      'Comodidad en Seacoast Suites on Miami Beach (5101 Collins Ave): 3 departamentos con salida directa a la playa',
      'Dejar listos los bolsos transparentes para la doble jornada FIFA de mañana domingo 31'
    ],
    uberRecommendation: {
      departureTime: '07:00',
      destination: 'Celebration Suites ➔ Seacoast Suites on Miami Beach (Contratado por Agencia)',
      distanceKm: 380,
      estMinutes: 230,
      recommendedDropoff: 'Seacoast Suites on Miami Beach (5101 Collins Ave, Miami Beach, FL 33140 · 3 Deptos c/ salida directa a la playa)',
      returnTip: 'Este traslado terrestre Orlando ➔ Miami del sábado 30 (~380 km) está contratado por agencia para los 12 pasajeros, sin necesidad de pedir Uber.'
    },
    mealsTip: 'Llevar agua, fruta y sándwiches/snacks comprados ayer en Walmart para desayunar en ruta y almorzar tranquilos frente a la playa al llegar a Seacoast Suites on Miami Beach.',
    expertTips: [
      '🕖 Salida clave a las 07:00 hs (traslado terrestre contratado por agencia para los 12 pasajeros): hacer los ~380 km bien temprano permite llegar ~11:00 hs a Seacoast Suites y ganar toda la jornada de sol y playa.',
      '🏨 Distribución en 3 Deptos en Seacoast Suites (5101 Collins Ave): Depto 1 (Carolina, Fofi, Tuto, Luisina y Josefina), Depto 2 (Lorena, Celia, Renato y Máximo) y Depto 3 (Juan, José y Bruno), con flexibilidad para que los 7 adolescentes roten entre los departamentos.',
      '⚽ Preparar hoy a la noche la visita de mañana domingo 31 al Nu Stadium (FIFA Women\'s Champions Cup): revisar entradas en el wallet y armar solo bolsos transparentes (Clear Bag Policy).'
    ]
  },
  {
    dayNumber: 13,
    dateStr: 'Dom 31 Ene',
    dayOfWeek: 'Domingo',
    dateFull: '31 de Enero de 2027',
    type: 'sports',
    statusBadge: '✅ ¡Entradas listas!',
    eventShortLabel: 'FIFA',
    bannerHeadline: "⚽ FIFA Women's Champions Cup 2027 (Fase Final) · Nu Stadium (Inter Miami CF)",
    bannerTransportNote: '🎟️ Doble jornada: 15:30 hs (3° Puesto) & 18:30 hs (Gran Final)',
    title: "FIFA Women's Champions Cup 2027 · Estadio Inter Miami CF (Nu Stadium)",
    highlight: "✅ ¡Entradas listas! Mañana de playa desde Seacoast Suites on Miami Beach (5101 Collins Ave) y doble jornada de fútbol internacional en el estadio de Inter Miami CF (Nu Stadium): 15:30 hs Partido por el 3° puesto y 18:30 hs la Gran Final.",
    logisticAlert: {
      departureTime: '13:45',
      title: 'Alerta Logística FIFA · Pedir 2x UberXL con tiempo (13:45 hs) + Clear Bag Policy',
      message: "La entrada cubre ambos partidos en el Nu Stadium (estadio de Inter Miami CF). Salir en 2x UberXL desde Seacoast Suites on Miami Beach (6 pasajeros por auto = 12 viajeros sin valijas) con margen (~13:45 hs) permite absorber el tráfico previo a eventos FIFA y pasar controles antes del pitazo de las 15:30 hs. ¡Solo se permiten bolsos transparentes!"
    },
    schedule: [
      { time: '09:30', activity: 'Mañana tranquila en Seacoast Suites on Miami Beach (5101 Collins Ave): desayuno en los 3 departamentos y playa con salida directa al mar.', type: 'tip' },
      { time: '12:30', activity: 'Almuerzo temprano en Miami Beach y preparación de indumentaria futbolera para el estadio.', type: 'food' },
      { time: '13:30', activity: 'Control obligatorio antes de salir: entradas en el wallet del celular y ÚNICAMENTE bolsos transparentes (Clear Bag Policy) + baterías portátiles cargadas.', notes: 'Prohibidas mochilas opacas, carteras grandes y bolsos deportivos comunes en el ingreso.', type: 'tip' },
      { time: '13:45', activity: '🚗 Pedir con tiempo los 2x UberXL desde Seacoast Suites on Miami Beach (5101 Collins Ave) rumbo al estadio de Inter Miami CF (Nu Stadium).', notes: 'Los 12 viajeros ocupan exactamente el máximo legal de los 2 UberXL (6 pasajeros por auto) al ir sin valijas.', type: 'transport' },
      { time: '14:45', activity: 'Llegada al Nu Stadium (Inter Miami CF), ingreso por seguridad con bolsos transparentes, fotos grupales y fan zone.', type: 'tip' },
      { time: '15:30', activity: "⚽ PARTIDO 1 (Incluido en la entrada): Partido por el 3° Puesto — FIFA Women's Champions Cup 2027.", type: 'ride' },
      { time: '17:30', activity: 'Entretiempo entre partidos: hidratación, snacks/cena rápida en las barras del estadio y visita a la tienda oficial.', type: 'food' },
      { time: '18:30', activity: "🏆 PARTIDO 2 (Incluido en la entrada): GRAN FINAL — FIFA Women's Champions Cup 2027 y ceremonia de premiación.", type: 'ride' },
      { time: '21:15', activity: 'Caminata tranquila hacia la zona designada de Rideshare y regreso en 2x UberXL hacia Seacoast Suites on Miami Beach.', type: 'transport' }
    ],
    teenFocus: [
      "⚽ ¡Entradas listas! Doble jornada FIFA en el estadio de Inter Miami CF (Nu Stadium): 15:30 hs (3° puesto) y 18:30 hs (Gran Final)",
      'Conocer el nuevo estadio de Inter Miami CF y vivir la ceremonia de campeonas en vivo',
      'Mañana de playa con salida directa desde Seacoast Suites on Miami Beach antes de ir a la cancha'
    ],
    adultFocus: [
      'Desayuno y mañana relajada en los 3 departamentos de Seacoast Suites (5101 Collins Ave)',
      'Cumplir sin contratiempos la política de bolsos transparentes (Clear Bag Policy) para entrar rápido con los 12',
      'Traslado puerta a puerta en 2x UberXL (6 pax por auto) sin preocuparse por estacionamientos en evento FIFA'
    ],
    uberRecommendation: {
      departureTime: '13:45',
      destination: 'Seacoast Suites on Miami Beach ➔ Estadio Inter Miami CF (Nu Stadium)',
      distanceKm: 18,
      estMinutes: 35,
      recommendedDropoff: 'Zona oficial de Rideshare / Uber Drop-off del Nu Stadium (Inter Miami CF)',
      returnTip: 'Al finalizar la Gran Final (~21:00 hs), esperar 15-20 min disfrutando la premiación antes de caminar al punto de UberXL (6 pax por auto) rumbo a Seacoast Suites (5101 Collins Ave).'
    },
    mealsTip: 'Almorzar bien a las 12:30 hs cerca de Seacoast Suites antes de salir; dentro del Nu Stadium aprovechar el intervalo entre el partido de las 15:30 hs y la Gran Final de las 18:30 hs para cenar (estadio cashless: llevar tarjeta o Apple/Google Pay).',
    expertTips: [
      '🚗 Pedir los 2 UberXL con tiempo (~13:45 hs desde Seacoast Suites on Miami Beach): los 12 viajeros ocupan exactamente el máximo legal de 6 pasajeros por auto al ir sin valijas.',
      '👜 Clear Bag Policy obligatoria: SOLO se permiten bolsos transparentes (plástico/PVC transparente hasta 12" x 6" x 12" / 30x15x30 cm) o carteras de mano muy pequeñas (clutch). Mochilas y bolsos opacos quedan afuera.',
      '🔋 Jornada larga de 2 partidos (15:30 hs y 18:30 hs): llevar entradas ya descargadas en el wallet del celular y al menos 1 powerbank por cada Auto (Auto 1 y Auto 2) dentro del bolso transparente para no quedarse sin batería a la vuelta.',
      '☀️ Llevar gorra y protector solar aplicado desde el departamento para el primer partido de las 15:30 hs, y un buzo liviano atado a la cintura para cuando refresque en la Gran Final de las 18:30 hs.'
    ]
  },
  {
    dayNumber: 14,
    dateStr: 'Lun 1 Feb',
    dayOfWeek: 'Lunes',
    dateFull: '1 de Febrero de 2027',
    type: 'shopping',
    eventShortLabel: 'Compras / Playa',
    title: 'Sawgrass Mills (Clearance Outlets) & Última Playa en Seacoast Suites',
    highlight: 'Mañana y primera tarde en Sawgrass Mills (el outlet más grande de EE.UU., a 50 km, ideal para tiendas Clearance de Nike, Adidas y Burlington). Tardecita de última playa en Seacoast Suites y armado de las 12 valijas.',
    schedule: [
      { time: '08:45', activity: 'Desayuno en los 3 departamentos de Seacoast Suites on Miami Beach (5101 Collins Ave).', type: 'food' },
      { time: '09:15', activity: 'Salida sincronizada en 2x UberXL (6 pasajeros por auto) hacia Sawgrass Mills en Sunrise (50 km / ~45-50 min).', notes: 'Ir temprano garantiza conseguir mejores talles en las tiendas Clearance antes de que se llene el mall.', type: 'transport' },
      { time: '10:00', activity: 'Apertura de Sawgrass Mills (el outlet más grande de EE.UU.): arrancar directo por Nike Clearance / Nike Factory Store, Adidas Outlet y Burlington.', type: 'shopping' },
      { time: '13:30', activity: 'Almuerzo rápido en el Food Court o Cheesecake Factory / P.F. Chang\'s de The Oasis en Sawgrass Mills.', type: 'food' },
      { time: '15:30', activity: 'Regreso en 2x UberXL hacia Seacoast Suites on Miami Beach (50 km) para llegar con luz de tarde.', type: 'transport' },
      { time: '16:30', activity: '🏖️ Tardecita de última playa con salida directa desde Seacoast Suites on Miami Beach y despedida del mar.', type: 'ride' },
      { time: '19:00', activity: '🧳 Armado y pesaje definitivo de las 12 valijas en los 3 departamentos (check-out mañana a las 07:15 hs en Van Privada).', notes: 'Tener pasaportes, tarjetas de embarque y equipaje de mano separados antes de dormir.', type: 'tip' },
      { time: '21:00', activity: 'Última cena en Miami Beach y descanso temprano para madrugar rumbo al aeropuerto MIA.', type: 'food' }
    ],
    teenFocus: [
      'Cazar últimas oportunidades en Nike Clearance, Adidas Outlet y Burlington en el outlet más grande de EE.UU. (Sawgrass Mills)',
      'Último chapuzón de tardecita en la playa de Seacoast Suites',
      'Dejar mochilas de mano listas para los vuelos de regreso'
    ],
    adultFocus: [
      'Recorrer Sawgrass Mills (50 km) con estrategia de mañana + primera tarde para evitar horas pico de regreso',
      'Disfrutar la última tarde de playa con salida directa desde los 3 departamentos',
      'Dejar las 12 valijas cerradas y pesadas antes de acostarse (mañana 07:15 hs Van Privada hacia MIA)'
    ],
    uberRecommendation: {
      departureTime: '09:15',
      destination: 'Seacoast Suites on Miami Beach ➔ Sawgrass Mills (Sunrise, FL)',
      distanceKm: 50,
      estMinutes: 48,
      recommendedDropoff: 'Entrada principal de Sawgrass Mills junto a Nike / The Colonnade Outlets (12801 W Sunrise Blvd)',
      returnTip: 'Salir de Sawgrass Mills alrededor de las 15:30 hs evita el tráfico pesado vespertino de la I-95 / I-595 hacia Miami Beach.'
    },
    mealsTip: 'Aprovechar el Food Court o The Oasis en Sawgrass Mills a las 13:30 hs para almorzar rápido y no perder tiempo de compras ni de la última tardecita de playa.',
    expertTips: [
      '🛍️ Estrategia Sawgrass Mills (50 km): es gigante (más de 350 locales). Vayan directo primero a Nike Clearance/Factory, Adidas y Burlington entre 10:00 y 13:00 hs mientras hay stock fresco de talles.',
      '🏖️ Corte a las 15:30 hs: regresar a esa hora les regala la última tardecita de playa en Seacoast Suites on Miami Beach antes de armar las 12 valijas.',
      '⚖️ Operativo 12 Valijas: controlar peso máximo (23 kg en bodega) y que no queden líquidos >100 ml en los bolsos de mano; mañana a las 07:15 hs nos busca la Van Privada Confirmada hacia MIA.'
    ]
  },
  {
    dayNumber: 15,
    dateStr: 'Mar 2 Feb',
    dayOfWeek: 'Martes',
    dateFull: '2 de Febrero de 2027',
    type: 'travel',
    statusBadge: '✅ Van Privada Confirmada',
    eventShortLabel: 'Regreso',
    bannerHeadline: '🚐 Traslado Privado en Van CONFIRMADO (Seacoast Suites ➔ MIA · 07:15 hs) & Vuelos Copa Airlines',
    bannerTransportNote: '✈️ Copa CM 440 (11:21 hs) + CM 882 (PTY ➔ ROS)',
    title: 'Check-out Seacoast Suites (07:15 hs) & Van Privada Confirmada a MIA · Vuelos Copa',
    highlight: '✅ Van Privada CONFIRMADA: 07:15 hs Check-out de Seacoast Suites y traslado privado en van al Aeropuerto Internacional de Miami (MIA, a 20 km) para los 12 viajeros con todas las valijas llenas de compras. Vuelos de regreso de Copa Airlines: CM 440 (MIA 11:21 ➔ PTY 14:30) y conexión CM 882 (PTY 15:23 ➔ Rosario 00:16 del mié 3 feb).',
    schedule: [
      { time: '06:30', activity: 'Último café en los 3 departamentos de Seacoast Suites, revisión de pasaportes de los 12 viajeros, enchufes y cajas de seguridad.', type: 'tip' },
      { time: '07:15', activity: '✅🚐 TRASLADO EN VAN PRIVADA CONFIRMADA a las 07:15 hs desde Seacoast Suites on Miami Beach (5101 Collins Ave) hacia el Aeropuerto Internacional de Miami (MIA, a 20 km).', notes: 'Servicio confirmado para trasladar cómodamente a los 12 viajeros con todas las valijas llenas de compras y equipaje de mano (sin pedir Uber).', type: 'transport' },
      { time: '07:50', activity: 'Llegada a Terminal de Copa Airlines en MIA (Terminal J / Concourse J). Despacho de las 12 valijas (y compras extra) y paso por seguridad TSA.', type: 'tip' },
      { time: '11:21', activity: '✈️ VUELO COPA AIRLINES CM 440: Despegue desde Miami (MIA) 11:21 hs rumbo a Ciudad de Panamá (PTY).', type: 'ride' },
      { time: '14:30', activity: 'Aterrizaje en Aeropuerto Internacional de Tocumen, Panamá (PTY). ¡Conexión rápida de 53 minutos! Dirigirse directo a la puerta de embarque de CM 882.', notes: 'Sin pasar migraciones en Panamá: solo caminar directo de puerta a puerta dentro de la terminal.', type: 'transport' },
      { time: '15:23', activity: '✈️ CONEXIÓN COPA AIRLINES CM 882: Despegue desde Panamá (PTY) 15:23 hs rumbo a Rosario, Argentina (ROS).', type: 'ride' },
      { time: '00:16', activity: '🏠 Llegada al Aeropuerto Internacional de Rosario (ROS) a las 00:16 hs de la madrugada del miércoles 3 de febrero. ¡Fin de un viaje inolvidable!', type: 'tip' }
    ],
    teenFocus: [
      'Tener auriculares, celulares cargados y películas descargadas para los vuelos CM 440 y CM 882',
      'Caminar rápido todos juntos en Panamá (PTY) entre puertas: ¡es una conexión ágil de 53 min!'
    ],
    adultFocus: [
      'Control de los 12 pasaportes y despacho simultáneo de todas las valijas en el mostrador de Copa Airlines en MIA (~08:00 hs)',
      'Abordar cómodamente la Van Privada Confirmada a las 07:15 hs con los 12 viajeros y las valijas llenas de compras rumbo a MIA (20 km)'
    ],
    uberRecommendation: {
      departureTime: '07:15',
      destination: 'Seacoast Suites on Miami Beach ➔ Aeropuerto Internacional de Miami (MIA · Van Privada Confirmada)',
      distanceKm: 20,
      estMinutes: 30,
      recommendedDropoff: 'Miami International Airport (MIA) · Salidas Internacionales / Copa Airlines (Concourse J)',
      returnTip: '✅ Van Privada Confirmada a las 07:15 hs: reemplaza a los Uber para trasladar cómodamente a los 12 viajeros con todas las valijas llenas de compras.'
    },
    mealsTip: 'Desayunar algo liviano en Seacoast o en la zona de embarque de MIA después de pasar TSA (entre 09:00 y 10:30 hs), ya que Copa Airlines sirve almuerzo/cena a bordo en ambos vuelos.',
    expertTips: [
      '✅🚐 Van Privada Confirmada (07:15 hs rumbo a MIA, 20 km): reemplaza a los Uber para trasladar cómodamente a los 12 viajeros con todas las valijas llenas de compras, llegando ~3 horas antes del vuelo Copa CM 440 (11:21 hs).',
      '⚡ Conexión exprés en Panamá (PTY): llegan a las 14:30 hs en el CM 440 y el CM 882 sale a las 15:23 hs (53 min). Lleven ya impresos/en wallet los dos boarding passes desde MIA y caminen directo a la puerta del vuelo a Rosario antes de pasar al Duty Free.',
      '🇦🇷 Llegada a Rosario (ROS): el CM 882 aterriza a las 00:16 hs del miércoles 3 de febrero; coordinar con anticipación los traslados de regreso desde Fisherton.'
    ]
  }
];

export const ATTRACTIONS: Attraction[] = [
  // --- 1. DISNEY'S EPCOT (DÍA 2 · 20 ENE · BLOQUE DISNEY 1/4) ---
  {
    id: 'cosmic-rewind',
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
    visitDayLabel: 'Día 2 · 20 Ene · Disney 1/4',
    land: 'World Discovery',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 4,
    techImmersionLevel: 5,
    minHeightCm: 107,
    minHeightInches: 42,
    description: 'La primera "omnicoaster" del mundo y una de las montañas rusas bajo techo más largas jamás construidas. Lanzamiento en reversa a 97 km/h en un viaje intergaláctico con rotación 360 programada y canciones legendarias (como September o Disco Inferno).',
    whyForGroup: 'Pura euforia para arrancar los parques el 20 de enero a buen ritmo. No tiene caídas verticales violentas ni sacudones: adolescentes y adultos salen bailando y con la sonrisa de oreja a oreja.',
    queueStrategy: 'Obligatorio Virtual Queue en app My Disney Experience a las 07:00 AM o 13:00 hs, o Lightning Lane Single Pass.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Virtual Queue (gratuito) o Lightning Lane Single Pass'
  },
  {
    id: 'remy-ratatouille',
    name: "Remy's Ratatouille Adventure",
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
    visitDayLabel: 'Día 2 · 20 Ene · Disney 1/4',
    land: 'World Showcase - France',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 2,
    techImmersionLevel: 5,
    minHeightCm: 0,
    minHeightInches: 0,
    description: 'Vehículos sin rieles con lentes 3D que te encogen al tamaño de Remy para huir por la cocina del restaurante de Gusteau entre ollas hirviendo, hornos calientes y caídas cómicas.',
    whyForGroup: 'Tecnología trackless encantadora que todo el grupo de 12 viajeros adorará.',
    queueStrategy: 'Hacer a primera hora o en las últimas 2 horas de la tarde.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider en prueba'
  },
  {
    id: 'soarin',
    name: "Soarin' Around the World",
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
    visitDayLabel: 'Día 2 · 20 Ene · Disney 1/4',
    land: 'World Nature',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 2,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Vuelo en ala delta frente a una pantalla IMAX de cúpula envolvente de 24 metros, sobrevolando las Pirámides de Egipto, la Torre Eiffel, las Cataratas del Iguazú y el Taj Mahal.',
    whyForGroup: 'Simulador sumamente relajante y placentero con brisa marina y aroma a jazmín y hierba.',
    queueStrategy: 'Fila fluida con esperas promedio de 30-40 min.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },

  // --- 2. DISNEY'S HOLLYWOOD STUDIOS (DÍA 3 · 21 ENE · BLOQUE DISNEY 2/4) ---
  {
    id: 'rise-of-resistance',
    name: 'Star Wars: Rise of the Resistance',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    visitDayLabel: 'Día 3 · 21 Ene · Disney 2/4',
    land: "Star Wars: Galaxy's Edge",
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'La atracción más ambiciosa de la historia de Disney: 18 minutos que combinan 4 tipos de vehículos (transporte de prisioneros trackless, simulador de cápsula espacial y caída libre vertical en turbo-ascensor).',
    whyForGroup: 'Obligatoria para los 12 integrantes sin excepción. Seas fan o no de Star Wars, te deja sin palabras.',
    queueStrategy: 'Hacer Rope Drop inmediato apenas abre el parque o comprar Lightning Lane Single Pass si el grupo desea garantizar 0 fila.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Single Pass / Fila regular'
  },
  {
    id: 'tower-of-terror',
    name: 'The Twilight Zone Tower of Terror',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    visitDayLabel: 'Día 3 · 21 Ene · Disney 2/4',
    land: 'Sunset Boulevard',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'El ascensor de servicio del Hollywood Tower Hotel se desconecta de la gravedad y cae en picada con secuencias aleatorias generadas por computadora que te levantan del asiento.',
    whyForGroup: 'Sensación de vacío en el estómago inigualable para Renato, Tuto, José, Máximo, Josefina, Luisina y Bruno.',
    queueStrategy: 'Hacer a primera hora o durante el desfile/show Fantasmic! cuando la fila baja.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },
  {
    id: 'rock-n-roller',
    name: "Rock 'n' Roller Coaster Starring Aerosmith",
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    visitDayLabel: 'Día 3 · 21 Ene · Disney 2/4',
    land: 'Sunset Boulevard',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 4,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Limusina súper veloz que acelera de 0 a 92 km/h en 2.8 segundos y entra a 3 inversiones en completa oscuridad al ritmo de Sweet Emotion y Walk This Way.',
    whyForGroup: 'La montaña rusa con inversiones más fuerte de Disney Orlando.',
    queueStrategy: 'Fila Single Rider disponible muy útil para los 7 adolescentes.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider'
  },
  {
    id: 'millennium-falcon',
    name: "Millennium Falcon: Smugglers Run",
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    visitDayLabel: 'Día 3 · 21 Ene · Disney 2/4',
    land: "Star Wars: Galaxy's Edge",
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 97,
    minHeightInches: 38,
    description: 'Entras a la cabina real del Halcón Milenario en tripulaciones de 6 personas: 2 pilotos que manejan la nave, 2 artilleros que disparan y 2 ingenieros que reparan.',
    whyForGroup: 'Interacción grupal al 100%: los 12 se dividen en 2 vuelos exactos de 6 personas.',
    queueStrategy: 'Fila Single Rider muy veloz o fila regular al mediodía.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider'
  },
  {
    id: 'slinky-dog',
    name: 'Slinky Dog Dash',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    visitDayLabel: 'Día 3 · 21 Ene · Disney 2/4',
    land: 'Toy Story Land',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 4,
    minHeightCm: 97,
    minHeightInches: 38,
    description: 'Montaña rusa familiar con doble lanzamiento que recorre el patio trasero de Andy en los resortes del perrito Slinky. Muy divertida y visual.',
    whyForGroup: 'Ideal para que los adultos y chicos disfruten juntos sin sacudidas violentas.',
    queueStrategy: 'Fila larga casi todo el día: ideal aprovechar en Rope Drop o al final de la tarde.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },

  // --- 3. DISNEY'S MAGIC KINGDOM (DÍA 4 · 22 ENE · BLOQUE DISNEY 3/4) ---
  {
    id: 'tron-lightcycle',
    name: 'TRON Lightcycle / Run',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
    visitDayLabel: 'Día 4 · 22 Ene · Disney 3/4',
    land: 'Tomorrowland',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Subes a bordo de una Lightcycle inclinándote hacia adelante como en una moto de competición para ser disparado a 97 km/h a través del mundo digital bajo un dosel futurista deslumbrante.',
    whyForGroup: 'La atracción más rápida y moderna de Magic Kingdom, sueño hecho realidad para los 7 chicos.',
    queueStrategy: 'Virtual Queue a las 07:00 AM o 13:00 hs en la app Disney, o Lightning Lane Single Pass.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Virtual Queue / Lightning Lane Single Pass'
  },
  {
    id: 'space-mountain',
    name: 'Space Mountain',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
    visitDayLabel: 'Día 4 · 22 Ene · Disney 3/4',
    land: 'Tomorrowland',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 3,
    minHeightCm: 112,
    minHeightInches: 44,
    description: 'Montaña rusa espacial en completa oscuridad con estrellas proyectadas y giros sorpresivos.',
    whyForGroup: 'Ícono histórico de adrenalina que todo adolescente que visita Disney debe experimentar.',
    queueStrategy: 'Hacer temprano en Tomorrowland junto con TRON.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },
  {
    id: 'big-thunder',
    name: 'Big Thunder Mountain Railroad',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
    visitDayLabel: 'Día 4 · 22 Ene · Disney 3/4',
    land: 'Frontierland',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 3,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Tren minero desenfrenado por un cañón del Lejano Oeste con murciélagos, temblores de tierra y caídas veloces.',
    whyForGroup: 'Diversión clásica infalible para toda la familia sin giros de cabeza abajo.',
    queueStrategy: 'Fila agradable al atardecer cuando bajan las luces del cañón.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },
  {
    id: 'seven-dwarfs',
    name: 'Seven Dwarfs Mine Train',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
    visitDayLabel: 'Día 4 · 22 Ene · Disney 3/4',
    land: 'Fantasyland',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 4,
    minHeightCm: 97,
    minHeightInches: 38,
    description: 'Vagones de mina que se mecen de lado a lado con la inercia de las curvas mientras entras a la cueva de diamantes con Blancanieves y los 7 enanitos.',
    whyForGroup: 'Muy agradable y visualmente hermosa para adultos y jóvenes.',
    queueStrategy: 'Fila alta durante todo el día; hacer al final de la noche o en Rope Drop.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Single Pass / Fila regular'
  },

  // --- 4. DISNEY'S ANIMAL KINGDOM (DÍA 5 · 23 ENE · BLOQUE DISNEY 4/4) ---
  {
    id: 'flight-of-passage',
    name: 'Avatar Flight of Passage',
    park: "Disney's Animal Kingdom",
    parkShort: 'Animal Kingdom',
    visitDayLabel: 'Día 5 · 23 Ene · Disney 4/4',
    land: 'Pandora - The World of Avatar',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 4,
    techImmersionLevel: 5,
    minHeightCm: 112,
    minHeightInches: 44,
    description: 'Te montas sobre un simulador biomecánico individual con lentes 3D para volar sobre un Banshee alado a través de los cielos y acantilados de Pandora. Sientes el pecho del animal respirar entre tus piernas, la brisa y los aromas de la selva.',
    whyForGroup: 'Calificada casi unánimemente como una de las 3 mejores atracciones del mundo. Imperdible absoluto para todos.',
    queueStrategy: 'Rope drop indispensable a las 07:45 AM o comprar Lightning Lane Single Pass individual.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Single Pass / Fila regular'
  },
  {
    id: 'expedition-everest',
    name: 'Expedition Everest - Legend of the Forbidden Mountain',
    park: "Disney's Animal Kingdom",
    parkShort: 'Animal Kingdom',
    visitDayLabel: 'Día 5 · 23 Ene · Disney 4/4',
    land: 'Asia',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 4,
    minHeightCm: 112,
    minHeightInches: 44,
    description: 'Montaña rusa que escala el monte Everest, encuentra las vías rotas por el Yeti mítico, se detiene al borde del precipicio y sale disparada hacia atrás a oscuras en una espiral a 80 km/h.',
    whyForGroup: 'Fantástica para los adolescentes y adultos con ganas de emoción. Espectacular escenografía de montaña.',
    queueStrategy: 'Tiene Single Rider casi sin espera durante la mayor parte del día.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider'
  },

  // --- 5. UNIVERSAL ISLANDS OF ADVENTURE (DÍA 7 · 25 ENE · UNIVERSAL 1/3 · CON AGUSTINA) ---
  {
    id: 'veloci-coaster',
    name: 'Jurassic World VelociCoaster',
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    visitDayLabel: 'Día 7 · 25 Ene · Universal 1/3 c/ Agustina',
    land: 'Jurassic Park',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 130,
    minHeightInches: 51,
    description: 'La montaña rusa de lanzamiento más extrema y premiada de Florida. 2 lanzamientos brutales (hasta 112 km/h en 2.4s), "Top Hat" de 47 metros sobre la laguna y caída con inversión en gravedad cero.',
    whyForGroup: 'El imperdible #1 absoluto para Renato, Tuto, José, Máximo, Josefina, Luisina y Bruno al abrir el Bloque Universal junto a Agustina.',
    queueStrategy: 'Ir directo en el Rope Drop matutino o última hora antes del cierre. Casilleros gratuitos con huella o pase incluidos antes del detector de metales.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express aceptado / Fila regular / Single Rider'
  },
  {
    id: 'hagrid-motorbike',
    name: "Hagrid's Magical Creatures Motorbike Adventure",
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    visitDayLabel: 'Día 7 · 25 Ene · Universal 1/3 c/ Agustina',
    land: 'The Wizarding World of Harry Potter - Hogsmeade',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 4,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Montaña rusa de historia única con 7 lanzamientos, caída vertical libre en riel y motos mágicas donde viajas en la moto o en el sidecar a través del Bosque Prohibido.',
    whyForGroup: 'Sensación de velocidad increíble pero muy suave en el recorrido; apta tanto para los chicos fanáticos de la adrenalina como para los adultos.',
    queueStrategy: 'Hacerla en Rope Drop temprano o a la hora del almuerzo (~13:30 hs). La fila suele rondar 60-90 min.',
    hasSingleRider: true,
    virtualQueueOrLL: 'No acepta Express convencional en ciertas temporadas / Single Rider disponible'
  },
  {
    id: 'hulk-coaster',
    name: 'The Incredible Hulk Coaster',
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    visitDayLabel: 'Día 7 · 25 Ene · Universal 1/3 c/ Agustina',
    land: 'Marvel Super Hero Island',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 4,
    minHeightCm: 137,
    minHeightInches: 54,
    description: 'Lanzamiento propulsado por tubo gamma de 0 a 67 km/h en 2 segundos directamente hacia un giro de gravedad cero sobre el agua, con 7 inversiones y banda sonora de Patrick Stump.',
    whyForGroup: 'Fuerza G impresionante que los adolescentes amarán desde el primer instante.',
    queueStrategy: 'Tiene fila Single Rider muy eficiente si el grupo no tiene problema en sentarse en filas separadas.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'forbidden-journey',
    name: 'Harry Potter and the Forbidden Journey',
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    visitDayLabel: 'Día 7 · 25 Ene · Universal 1/3 c/ Agustina',
    land: 'The Wizarding World of Harry Potter - Hogsmeade',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Simulador montado en brazos robóticos industriales KUKA. Vuelas en escoba sobre el castillo de Hogwarts, encuentras dementores gigantes y esquivas dragones.',
    whyForGroup: 'Imprescindible para todo el grupo: la fila dentro del castillo de Hogwarts con cuadros parlantes y la oficina de Dumbledore es una atracción en sí misma.',
    queueStrategy: 'Fila ágil y fluida. Los adultos no propensos al mareo la disfrutarán muchísimo.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'spider-man',
    name: 'The Amazing Adventures of Spider-Man',
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    visitDayLabel: 'Día 7 · 25 Ene · Universal 1/3 c/ Agustina',
    land: 'Marvel Super Hero Island',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Vehículos con movimiento giroscópico 3D de alta definición, efectos de fuego real, ráfagas de aire y agua mientras luchas junto a Spider-Man contra los villanos de Marvel.',
    whyForGroup: 'Pionero en simuladores de acción que sigue estando en la cúspide mundial. Diversión garantizada para adultos y adolescentes.',
    queueStrategy: 'Filas moderadas después de las 14:00 hs.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },

  // --- 6. UNIVERSAL STUDIOS FLORIDA (DÍA 8 · 26 ENE · UNIVERSAL 2/3 · CON AGUSTINA) ---
  {
    id: 'gringotts',
    name: 'Harry Potter and the Escape from Gringotts',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
    visitDayLabel: 'Día 8 · 26 Ene · Universal 2/3 c/ Agustina',
    land: 'The Wizarding World of Harry Potter - Diagon Alley',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 107,
    minHeightInches: 42,
    description: 'Híbrido fascinante entre montaña rusa multidireccional y simulador 3D subterráneo en las bóvedas de Gringotts frente a Bellatrix Lestrange y Voldemort.',
    whyForGroup: 'Atracción estrella que fascina a toda la familia. La antesala del banco con duendes animatrónicos y lámparas de cristal de 15 metros es asombrosa.',
    queueStrategy: 'Entrar a primera hora apenas abre Diagon Alley.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'mummy',
    name: 'Revenge of the Mummy',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
    visitDayLabel: 'Día 8 · 26 Ene · Universal 2/3 c/ Agustina',
    land: 'New York',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 4,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Montaña rusa interior psicológica con aceleraciones de 0 a 72 km/h, frenadas en falso, techo de fuego real a 100°C y escarabajos.',
    whyForGroup: 'Favorita absoluta de los amantes de la emoción sin inversiones altas.',
    queueStrategy: 'Single Rider muy veloz o fila Express.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'rip-ride-rockit',
    name: 'Hollywood Rip Ride Rockit',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
    visitDayLabel: 'Día 8 · 26 Ene · Universal 2/3 c/ Agustina',
    land: 'Production Central',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 3,
    minHeightCm: 130,
    minHeightInches: 51,
    description: 'Subida vertical de 90 grados mirando al cielo a 50 metros de altura, con pantalla táctil en el asiento para seleccionar la canción que sonará en tus oídos a 105 km/h.',
    whyForGroup: 'Clásico de adrenalina para los 7 chicos: cada uno elige su propio hit musical.',
    queueStrategy: 'Hacerlo al mediodía o tarde con Single Rider.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'transformers',
    name: 'TRANSFORMERS: The Ride-3D',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
    visitDayLabel: 'Día 8 · 26 Ene · Universal 2/3 c/ Agustina',
    land: 'Production Central',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Simulador cinético de alta tecnología donde te sumerges en el combate entre Optimus Prime y Megatron en vehículos de movimiento dinámico.',
    whyForGroup: 'Impresionante nivel de detalle visual y sonoro para disfrutar todos juntos.',
    queueStrategy: 'Ideal para primera hora de la tarde.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express'
  },
  {
    id: 'men-in-black',
    name: 'MEN IN BLACK Alien Attack',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
    visitDayLabel: 'Día 8 · 26 Ene · Universal 2/3 c/ Agustina',
    land: 'World Expo',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 2,
    techImmersionLevel: 4,
    minHeightCm: 107,
    minHeightInches: 42,
    description: 'Juego de disparos láser interactivo en autos que giran por las calles de Nueva York cazando alienígenas para acumular puntos.',
    whyForGroup: 'Competencia grupal ideal: se dividen en 2 vehículos y compiten adultos contra jóvenes.',
    queueStrategy: 'Fila rápida habitualmente.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },

  // --- 7. UNIVERSAL EPIC UNIVERSE (DÍA 9 · 27 ENE · UNIVERSAL 3/3 · CON AGUSTINA) ---
  {
    id: 'stardust-racers',
    name: 'Stardust Racers',
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'Celestial Park',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Doble montaña rusa de lanzamiento paralelo que alcanza 100 km/h y 40 metros de altura. Ambos trenes compiten y se entrelazan en el "Celestial Spin", iluminando la noche sin luces en la vía.',
    whyForGroup: 'La nueva joya extrema de Orlando junto a VelociCoaster: gran cierre del Bloque Universal para los 7 chicos y Agustina.',
    queueStrategy: 'Subir al caer la tarde o de noche para disfrutar los trenes iluminados. Tiene Single Rider y casilleros gratuitos obligatorios.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider / Fila regular'
  },
  {
    id: 'mario-kart-bowsers-challenge',
    name: "Mario Kart: Bowser's Challenge",
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'SUPER NINTENDO WORLD',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 2,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Recorrido interactivo con visores de realidad aumentada dentro del Castillo de Bowser: manejan el volante y lanzan caparazones a los Koopalings para ganar la Copa Dorada.',
    whyForGroup: 'Diversión competitiva ideal para los 12 viajeros juntos (adultos vs adolescentes acumulando monedas digitales).',
    queueStrategy: 'Ir en Rope Drop a las 09:00 AM en punto o aprovechar Single Rider.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'mine-cart-madness',
    name: 'Mine-Cart Madness (Donkey Kong)',
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'SUPER NINTENDO WORLD',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Montaña rusa familiar revolucionaria con riel oculto que genera la ilusión real de saltar sobre vías rotas y barrancos en Donkey Kong Country.',
    whyForGroup: 'Tecnología patentada única en el mundo: emocionante para los chicos y muy disfrutable para los 5 adultos.',
    queueStrategy: 'Hacer inmediatamente después de Mario Kart en la mañana o por fila Single Rider.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Single Rider / Fila regular'
  },
  {
    id: 'battle-at-the-ministry',
    name: 'Harry Potter and the Battle at the Ministry',
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'The Wizarding World of Harry Potter – Ministry of Magic',
    category: 'dark_ride',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Viajas por el Metro-Floo desde el París mágico de 1920 hasta el inmenso atrio del Ministerio británico para el juicio de Dolores Umbridge en ascensores omnidireccionales.',
    whyForGroup: 'Escala cinematográfica al nivel de Rise of the Resistance: obligatoria para los 12 integrantes del grupo.',
    queueStrategy: 'Priorizar en la primera hora de la mañana o verificar fila en la app oficial de Universal.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'monsters-unchained',
    name: 'Monsters Unchained: The Frankenstein Experiment',
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'Dark Universe',
    category: 'dark_ride',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'La atracción más oscura y tecnológicamente avanzada de Dark Universe: brazos robóticos KUKA de última generación rodeados de Drácula, el Hombre Lobo y el Monstruo de Frankenstein.',
    whyForGroup: 'Ambientación gótica impresionante y movimientos dinámicos intensos que fascinan a adolescentes y adultos.',
    queueStrategy: 'La fila avanza muy rápido por su alta capacidad horaria; ideal para media tarde.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'curse-of-the-werewolf',
    name: 'Curse of the Werewolf',
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'Dark Universe',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 4,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Montaña rusa giratoria (spinning coaster) familiar-intensa con lanzamiento adelante y atrás a 60 km/h atravesando el bosque maldito de Darkmoor.',
    whyForGroup: 'Giro libre de los carros según el peso de cada grupo, haciendo cada vuelta distinta para los chicos.',
    queueStrategy: 'Hacer junto con Monsters Unchained entre las 16:30 y 18:30 hs.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'hiccups-wing-gliders',
    name: "Hiccup's Wing Gliders",
    park: 'Universal Epic Universe',
    parkShort: 'Epic Universe',
    visitDayLabel: 'Día 9 · 27 Ene · Universal 3/3 c/ Agustina',
    land: 'How to Train Your Dragon – Isle of Berk',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 4,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'Montaña rusa de doble lanzamiento suave estilo Hagrid que planea sobre la laguna y los barcos vikingos de Isle of Berk a 72 km/h junto a Hipo y Chimuelo.',
    whyForGroup: 'Ideal para subir todos juntos disfrutando las vistas completas de la isla vikinga sin inversiones extremas.',
    queueStrategy: 'Excelente para hacer justo después del almuerzo en Mead Hall.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Universal Express / Fila regular'
  }
];

export const UBER_ROUTES: UberRoute[] = [
  {
    id: 'celebration-to-epcot',
    destinationName: "1. Disney's EPCOT (20 Ene · Disney 1/4)",
    category: 'disney',
    distanceKm: 13.7,
    drivingMinutesNormal: 16,
    drivingMinutesPeak: 22,
    estCostPerUberXL: 24, // total x2 = $48
    pickupAdvice: 'Día 2 (20 Ene · arranque tranquilo): Salida recomendada 08:30 hs tras pedir Virtual Queue de Guardians of the Galaxy a las 07:00 AM.',
    dropoffAdvice: 'Zona exacta: Lote Este de Rideshare frente a la gran esfera geodésica de Spaceship Earth (a 200 m de los molinetes).',
    carSyncTips: 'Al terminar el espectáculo nocturno Luminous (21:30 hs), caminar por el lateral izquierdo de Spaceship Earth para llegar rápido a los autos.',
    exactZoneCoordinates: 'EPCOT East Parking Lot - Rideshare Pick-up & Drop-off Zone'
  },
  {
    id: 'celebration-to-hollywood-studios',
    destinationName: "2. Disney's Hollywood Studios (21 Ene · Disney 2/4)",
    category: 'disney',
    distanceKm: 11.6,
    drivingMinutesNormal: 14,
    drivingMinutesPeak: 18,
    estCostPerUberXL: 22, // total x2 = $44
    pickupAdvice: 'Día 3 (21 Ene): Salida recomendada 08:00 hs para apertura 08:30 / 09:00 hs.',
    dropoffAdvice: 'Zona exacta: Rideshare Loop exclusivo ubicado a la derecha del estacionamiento general, a solo 150 metros (2 min a pie) de los molinetes de entrada.',
    carSyncTips: 'A la salida después del show Fantasmic!, caminar directamente hacia la salida sin detenerse en los locales para pedir ambos UberXL antes del pico de saturación.',
    exactZoneCoordinates: 'Hollywood Studios Rideshare Loop (Carril derecho peatonal frente a la entrada principal)'
  },
  {
    id: 'celebration-to-magic-kingdom',
    destinationName: "3. Disney's Magic Kingdom (22 Ene · TTC)",
    category: 'disney',
    distanceKm: 15.8,
    drivingMinutesNormal: 18,
    drivingMinutesPeak: 25,
    estCostPerUberXL: 28, // total para 12 personas = $56 (6 pax por auto)
    pickupAdvice: 'Día 4 (22 Ene): Lobby de Celebration Suites. Salir a las 07:45 hs para apertura 09:00 hs.',
    dropoffAdvice: 'Zona exacta: Transportation and Ticket Center (TTC) Rideshare Loop. NINGÚN auto o Uber puede dejar pasajeros en los molinetes directos de Magic Kingdom.',
    carSyncTips: 'Desde el TTC, caminar 100 m hacia la estación y tomar el Express Monorail o el Ferryboat a través del Seven Seas Lagoon (calcular 20-25 min extras de traslado panorámico gratuito).',
    exactZoneCoordinates: 'TTC Rideshare Lot (Postes señalizados A1-A6 frente a la boletería central)'
  },
  {
    id: 'celebration-to-animal-kingdom',
    destinationName: "4. Disney's Animal Kingdom (23 Ene · Disney 4/4)",
    category: 'disney',
    distanceKm: 10.9,
    drivingMinutesNormal: 12,
    drivingMinutesPeak: 16,
    estCostPerUberXL: 20, // total x2 = $40
    pickupAdvice: 'Día 5 (23 Ene): ¡Es el parque más cercano a Celebration Suites! Salir 07:25 hs para apertura 08:00 hs y cerrar el Bloque Disney.',
    dropoffAdvice: 'Zona exacta: Rideshare Loop este a solo 100 metros del arco de entrada principal. El acceso vehicular más rápido de todo Disney.',
    carSyncTips: 'El tráfico matutino por US-192 / World Drive hacia Animal Kingdom es sumamente despejado.',
    exactZoneCoordinates: 'Animal Kingdom Front Entrance Rideshare Loop (Carril exclusivo de vans y taxis)'
  },
  {
    id: 'celebration-to-universal',
    destinationName: "5-6. Universal CityWalk · IOA & Studios (25 y 26 Ene)",
    category: 'universal',
    distanceKm: 23.3,
    drivingMinutesNormal: 22,
    drivingMinutesPeak: 30,
    estCostPerUberXL: 34, // total x2 = $68
    pickupAdvice: 'Bloque Universal junto a Agustina: Salir 08:05 hs (25 Ene · Islands of Adventure) y 08:00 hs (26 Ene · Universal Studios) para llegar al Rope Drop tras pasar CityWalk.',
    dropoffAdvice: 'Zona exacta: Piso 5 (Level 5) de la mega estructura central de estacionamientos (área señalizada "Guest Drop-off / Rideshare").',
    carSyncTips: 'Bajan por las escaleras mecánicas hacia la seguridad de CityWalk. Para el regreso nocturno: SUBIR al Piso 5 ANTES de pedir los 2 UberXL para no hacer esperar a los choferes.',
    exactZoneCoordinates: 'Universal Parking Garage - Level 5 Rideshare Hub (Señalización Jurassic Park / Cat in the Hat)'
  },
  {
    id: 'celebration-to-epic-universe',
    destinationName: '7. Universal Epic Universe (27 Ene · Nuevo Campus)',
    category: 'universal',
    distanceKm: 20.5,
    drivingMinutesNormal: 22,
    drivingMinutesPeak: 30,
    estCostPerUberXL: 32, // total x2 = $64
    pickupAdvice: 'Cierre Bloque Universal junto a Agustina (27 Ene): Salir 07:40 hs desde Celebration Suites hacia el nuevo campus sobre Epic Blvd / Universal Blvd (NO ir al parking viejo de CityWalk).',
    dropoffAdvice: 'Zona exacta: Loop de Rideshare / Drop-off exclusivo de Universal Epic Universe frente a la entrada Chronos Plaza.',
    carSyncTips: 'Confirmar en las 2 apps de Uber (Auto 1 y Auto 2) que el destino diga exactamente "Universal Epic Universe" y no "Universal Studios Florida", ya que están separados por varios kilómetros.',
    exactZoneCoordinates: 'Universal Epic Universe Rideshare Drop-off (Epic Blvd / Chronos Gate)'
  },
  {
    id: 'celebration-to-kia-center',
    destinationName: 'Kia Center · Orlando Magic vs. Bulls (28 Ene NBA)',
    category: 'shopping',
    distanceKm: 35.0,
    drivingMinutesNormal: 32,
    drivingMinutesPeak: 42,
    estCostPerUberXL: 45, // total x2 = $90
    pickupAdvice: 'ALERTA EXPERTO (Jue 28 Ene): Pedir los 2x UberXL a las 16:45 hs desde Celebration Suites para esquivar la hora pico en la I-4 Este y llegar con margen al partido de las 19:00 hs (400 W Church St).',
    dropoffAdvice: 'Zona exacta: Hughey Ave & W Church St, a pasos del acceso principal de Church Street Station.',
    carSyncTips: 'Recordar para los 12 (ocupan exactamente 6 pax por auto sin valijas): entradas digitales ya descargadas en el celular, estadio 100% cashless (sin efectivo) y política de bolsos estricta (NO mochilas de parque; solo carteras tipo sobre de hasta 4.5" x 6.5").',
    exactZoneCoordinates: 'Kia Center Rideshare Drop-off (Hughey Ave & Church St Loop)'
  },
  {
    id: 'celebration-to-vineland-outlets',
    destinationName: 'Orlando Vineland Premium Outlets (24 Ene · Libre)',
    category: 'shopping',
    distanceKm: 12.7,
    drivingMinutesNormal: 15,
    drivingMinutesPeak: 20,
    estCostPerUberXL: 22, // total x2 = $44
    pickupAdvice: 'Día libre 24 Ene: Mucho más cercano que I-Drive. Salida 13:30 hs tras pileta y almuerzo para Nike/Adidas.',
    dropoffAdvice: 'Drop-off en la entrada central junto a Tommy Hilfiger y la plaza gastronómica (8200 Vineland Ave).',
    carSyncTips: 'Cuenta con el Nike Clearance Store y Adidas Outlet, ideales para botines y zapatillas en el día libre del 24.',
    exactZoneCoordinates: 'Vineland Outlets Center Court Drop-off Circle'
  },
  {
    id: 'celebration-to-international-outlets',
    destinationName: 'Orlando International Premium Outlets (I-Drive)',
    category: 'shopping',
    distanceKm: 22.2,
    drivingMinutesNormal: 24,
    drivingMinutesPeak: 32,
    estCostPerUberXL: 32, // total x2 = $64
    pickupAdvice: 'Salida 11:00 AM para compras distendidas.',
    dropoffAdvice: 'Entrada principal del Food Court / Nike Factory Store (4951 International Dr).',
    carSyncTips: 'Tienen las tiendas oficiales más grandes de Nike y Adidas.',
    exactZoneCoordinates: 'International Outlets Main Entrance / Food Court Valet Loop'
  },
  {
    id: 'celebration-to-florida-mall',
    destinationName: 'The Florida Mall (Apple Store & Best Buy zona)',
    category: 'shopping',
    distanceKm: 24.5,
    drivingMinutesNormal: 25,
    drivingMinutesPeak: 35,
    estCostPerUberXL: 35, // total x2 = $70
    pickupAdvice: 'Salida 11:30 AM en día de descanso/compras.',
    dropoffAdvice: 'Entrada exterior de Apple Store / Dining Pavilion (8001 S Orange Blossom Trail).',
    carSyncTips: 'Es un shopping cerrado gigante ideal si el clima está fresco o lluvioso.',
    exactZoneCoordinates: 'The Florida Mall - Entrance 4 (Between Macy\'s and Apple Store)'
  },
  {
    id: 'celebration-to-walmart-vine',
    destinationName: 'Walmart Supercenter #5214 (Compras rápidas)',
    category: 'supermarket',
    distanceKm: 4.5,
    drivingMinutesNormal: 6,
    drivingMinutesPeak: 9,
    estCostPerUberXL: 12, // total x2 = $24
    pickupAdvice: 'Supermercado más cercano a Celebration Suites (ideal el 19 Ene al llegar y el 24 Ene para reposición antes de Universal). Abierto de 06:00 AM a 23:00 PM.',
    dropoffAdvice: 'Puerta principal de Alimentos / Grocery (4444 W Vine St, Kissimmee).',
    carSyncTips: 'Pueden ir solo 2 o 3 adultos en un único Uber normal para comprar agua y snacks para todo el grupo, ahorrando un auto.',
    exactZoneCoordinates: 'Walmart Grocery Entrance Pick-up Area'
  },
  {
    id: 'celebration-to-mco-airport',
    destinationName: 'Aeropuerto Internacional de Orlando (MCO)',
    category: 'airport',
    distanceKm: 33.8,
    drivingMinutesNormal: 26,
    drivingMinutesPeak: 36,
    estCostPerUberXL: 48, // total x2 = $96
    pickupAdvice: 'Llegada Día 1 (19 Ene · 15:35 hs): No hay traslado de agencia contratado desde MCO.',
    dropoffAdvice: 'Rideshare Pickup en MCO (Level 2 Arrivals) hacia Lobby de Celebration Suites.',
    carSyncTips: 'Al viajar livianos a la ida se piden 2x UberXL (máximo legal: 6 pasajeros por auto = 12 viajeros). Si llevan valijas vacías para compras que no entren con 6 personas en el baúl, sumar 1 Uber estándar adicional en el momento solo para el equipaje.',
    exactZoneCoordinates: 'MCO Level 2 (Arrivals - Rideshare Pickup) ➔ Celebration Suites'
  }
];

export const SHOPPING_SPOTS: ShoppingSpot[] = [
  {
    id: 'intl-premium-outlets',
    name: 'Orlando International Premium Outlets',
    type: 'outlet',
    address: '4951 International Dr, Orlando, FL 32819',
    distFromCelebrationKm: 22.2,
    distFromCelebrationMin: 25,
    keyStores: [
      {
        storeName: 'Nike Factory Store',
        specialty: 'Botines de fútbol, zapatillas deportivas y ropa técnica',
        groupTip: 'Al entrar, caminar directo al fondo a la pared "Hash Wall" (cajas sin tapa con descuentos del 30% al 50% extra sobre el precio de outlet).'
      },
      {
        storeName: 'Adidas Outlet Store',
        specialty: 'Botines Predator, X Crazyfast, Copa Pure y camisetas de fútbol',
        groupTip: 'Suelen tener promociones de "Buy One, Get One 50% Off" en calzado y ropa de entrenamiento para los 7 chicos.'
      },
      {
        storeName: 'Puma / Under Armour / New Balance',
        specialty: 'Accesorios deportivos, medias térmicas, remeras dri-fit y botines alternativos',
        groupTip: 'Excelentes precios en packs de medias y shorts de entrenamiento para las jornadas de parque.'
      }
    ],
    generalTips: [
      'Descargar cuponera digital gratuita registrándose en el VIP Shopper Club de Simon Malls antes de ir.',
      'Llevar una valija de cabina pequeña o mochila vacía para cargar las compras sin cargar bolsas plásticas pesadas.',
      'El patio de comidas suele llenarse entre 13:00 y 14:30; comer temprano (12:15) o tarde (15:00) es mucho más cómodo para 12 personas.'
    ]
  },
  {
    id: 'vineland-premium-outlets',
    name: 'Orlando Vineland Premium Outlets',
    type: 'outlet',
    address: '8200 Vineland Ave, Orlando, FL 32821',
    distFromCelebrationKm: 12.7,
    distFromCelebrationMin: 15,
    keyStores: [
      {
        storeName: 'Nike Clearance Store',
        specialty: 'Precios de remate en calzado y botines de temporadas recientes',
        groupTip: 'A diferencia del Factory Store común, el Clearance tiene precios de liquidación pura con descuentos muy agresivos.'
      },
      {
        storeName: 'Adidas Outlet',
        specialty: 'Indumentaria urbana y de fútbol',
        groupTip: 'Local muy ordenado, menos saturado de gente que el de I-Drive.'
      },
      {
        storeName: 'Tommy Hilfiger / Polo Ralph Lauren / Calvin Klein',
        specialty: 'Ropa para adultos, abrigos y camperas de media estación',
        groupTip: 'Ideal para que los 5 adultos hagan compras de calidad con cupones adicionales de descuento.'
      }
    ],
    generalTips: [
      'Está a solo 12.7 km (15 minutos) de Celebration Suites, perfecto para una escapada rápida sin perder el día entero.',
      'Ambiente estilo villa mediterránea al aire libre, más espacioso y relajado para caminar en grupo.'
    ]
  },
  {
    id: 'florida-mall',
    name: 'The Florida Mall (Apple Store + Deportes)',
    type: 'mall',
    address: '8001 S Orange Blossom Trail, Orlando, FL 32809',
    distFromCelebrationKm: 24.5,
    distFromCelebrationMin: 26,
    keyStores: [
      {
        storeName: 'Apple Store Oficial',
        specialty: 'Notebooks MacBook Air / Pro, iPhones liberados de fábrica, iPads y AppleCare',
        groupTip: 'Si buscan teclado con "Ñ", pedir específicamente en el mostrador "Spanish Keyboard configuration" (suelen tener unidades o pueden reservarse online con 24-48 hs de antelación).'
      },
      {
        storeName: 'Dick\'s Sporting Goods',
        specialty: 'Megatienda de deportes con área exclusiva de fútbol (Soccer Pro Shop)',
        groupTip: 'Variedad inmensa de botines gama alta (Elite/Pro) en todas las suelas: Firm Ground (pasto natural), Artificial Grass y Turf.'
      },
      {
        storeName: 'JD Sports & Foot Locker',
        specialty: 'Sneakers exclusivas, zapatillas urbanas y ropa urbana deportiva',
        groupTip: 'Modelos que los adolescentes buscan y que frecuentemente están agotados en outlets.'
      }
    ],
    generalTips: [
      'Shopping totalmente cerrado con aire acondicionado central y pasillos amplios.',
      'Best Buy Orange Blossom Trail está a 3 km del shopping si necesitan comparar precios de laptops.'
    ]
  },
  {
    id: 'best-buy-millenia',
    name: 'Best Buy Millenia / OBT',
    type: 'electronics',
    address: '4155 Millenia Blvd, Orlando, FL 32839 (o 8350 S Orange Blossom Trail)',
    distFromCelebrationKm: 23.0,
    distFromCelebrationMin: 22,
    keyStores: [
      {
        storeName: 'Sector Computación & Laptops',
        specialty: 'MacBooks, laptops Windows gaming (Asus ROG, Lenovo Legion, HP Omen, Dell XPS)',
        groupTip: 'Consultar por "Open-Box Excellent Condition": notebooks devueltas en los 14 días con garantía oficial completa y rebajas de $100 a $300 USD.'
      },
      {
        storeName: 'Sector Celulares & Accesorios',
        specialty: 'Celulares desbloqueados (Unlocked), powerbanks Anker, cables reforzados y adaptadores',
        groupTip: 'Comprar baterías externas portátiles (Anker de 10.000 o 20.000 mAh) para llevar a los parques: las apps de Disney y Universal consumen mucha batería.'
      }
    ],
    generalTips: [
      'Voltaje: Todas las laptops, MacBooks y celulares modernos son bivoltaje (100V a 240V). Solo necesitan el adaptador físico de patas planas a redonda o enchufe argentino.',
      'Garantía: Apple ofrece garantía mundial de 1 año en notebooks y tablets. En Windows, marcas como Dell y Asus ofrecen garantía internacional transferible.'
    ]
  }
];

export const HISTORICAL_WEATHER_ORLANDO_JANUARY = {
  highCelsius: 22,
  highFahrenheit: 72,
  lowCelsius: 10,
  lowFahrenheit: 50,
  occasionalColdFrontLowCelsius: 6,
  occasionalColdFrontLowFahrenheit: 43,
  rainProbabilityPct: 15,
  daylightHours: '07:15 AM a 17:55 PM (aprox. 10.5 horas de luz)',
  hourlyCurve: [
    { hour: '07:00 AM', tempC: 10, tempF: 50, feel: 'Fresco / Frío', icon: 'sunrise' },
    { hour: '09:00 AM', tempC: 14, tempF: 57, feel: 'Fresco agradable', icon: 'sun' },
    { hour: '11:00 AM', tempC: 18, tempF: 64, feel: 'Templado', icon: 'sun' },
    { hour: '14:00 PM', tempC: 22, tempF: 72, feel: 'Ideal / Soleado', icon: 'sun' },
    { hour: '17:00 PM', tempC: 19, tempF: 66, feel: 'Templado', icon: 'sunset' },
    { hour: '19:00 PM', tempC: 15, tempF: 59, feel: 'Fresco', icon: 'moon' },
    { hour: '22:00 PM', tempC: 12, tempF: 53, feel: 'Frío nocturno', icon: 'moon' },
  ],
  packingChecklist: [
    { id: '1', item: 'Remeras manga corta transpirables (2 por persona por día de parque)', category: 'ropa', checked: false },
    { id: '2', item: 'Buzos con capucha / camperas livianas (Hoodies deportivas)', category: 'ropa', checked: false },
    { id: '3', item: 'Campera abrigada / rompevientos para las mañanas y noches', category: 'ropa', checked: false },
    { id: '4', item: 'Pantalones largos cómodos (jogging o calzas) + shorts para la tarde', category: 'ropa', checked: false },
    { id: '5', item: 'Zapatillas deportivas cómodas con buen amortiguador (¡usadas, no estrenar!)', category: 'calzado', checked: false },
    { id: '6', item: '2 pares de medias deportivas por día (para cambiar a mitad de día si hay lluvia/splash)', category: 'calzado', checked: false },
    { id: '7', item: 'Pilotos / ponchos de lluvia descartables en bolsita plástica', category: 'parque', checked: false },
    { id: '8', item: 'Baterías portátiles (Powerbanks) de al menos 10.000 mAh + cables lightning / USB-C', category: 'tecnologia', checked: false },
    { id: '9', item: 'Adaptadores de enchufe de pata plana americana (tipo A/B)', category: 'tecnologia', checked: false },
    { id: '10', item: 'Protector solar SPF 50 y bálsamo labial con filtro', category: 'salud', checked: false },
    { id: '11', item: 'Mochila liviana y compacta por vehículo para botellas y abrigos', category: 'parque', checked: false },
    { id: '12', item: 'Pasaportes vigentes y constancia de ESTA / Visa estadounidense aprobada', category: 'documentos', checked: false }
  ]
};
