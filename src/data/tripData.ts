/**
 * Base de datos completa del viaje a Orlando 2027
 * Grupo de 11 personas (5 adultos + 6 adolescentes)
 * Alojamiento: Celebration Suites (Kissimmee)
 * Fechas: 19 al 30 de Enero 2027
 * Unidades: Kilómetros (km), grados Celsius / Fahrenheit
 */

export interface Traveler {
  id: string;
  name: string;
  role: 'adult' | 'teen';
  age?: number;
  relation: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateStr: string; // e.g. "Mar 19 Ene"
  dayOfWeek: string;
  dateFull: string;
  type: 'park' | 'shopping' | 'travel' | 'rest';
  title: string;
  parkName?: string;
  parkCode?: 'universal_ioa' | 'universal_studios' | 'disney_hs' | 'disney_ak' | 'disney_epcot' | 'disney_mk' | 'universal_repeat';
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
  park: 'Universal Islands of Adventure' | 'Universal Studios Florida' | "Disney's Hollywood Studios" | "Disney's Animal Kingdom" | "Disney's EPCOT" | "Disney's Magic Kingdom";
  parkShort: string;
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
  { id: '1', name: 'Lorena', role: 'adult', relation: 'Mamá coordinadora' },
  { id: '2', name: 'Carolina', role: 'adult', relation: 'Mamá (Depto Familia Caro)' },
  { id: '3', name: 'Celia', role: 'adult', relation: 'Madrina de Renato' },
  { id: '4', name: 'Fofi', role: 'adult', relation: 'Papá' },
  { id: '5', name: 'Juan', role: 'adult', relation: 'Papá' },
  { id: '6', name: 'Renato', role: 'teen', age: 15, relation: 'Adolescente (15 años)' },
  { id: '7', name: 'Tuto', role: 'teen', age: 15, relation: 'Adolescente (15 años - Depto Caro)' },
  { id: '8', name: 'José', role: 'teen', age: 15, relation: 'Adolescente (15 años)' },
  { id: '9', name: 'Máximo', role: 'teen', age: 15, relation: 'Sobrino (15 años)' },
  { id: '10', name: 'Josefina', role: 'teen', age: 15, relation: 'Adolescente (15 años - Depto Caro)' },
  { id: '11', name: 'Luisina', role: 'teen', age: 13, relation: 'Adolescente (13 años - Depto Caro)' },
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
    highlightsFor10Pax: 'El segundo piso suele estar semivacío y tiene mesas grandes donde pueden sentarse los 10 juntos en un ambiente silencioso con aire acondicionado ideal para descansar piernas.',
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
    highlightsFor10Pax: 'Ubicación perfecta entre Pirates of the Caribbean y Big Thunder Mountain. Permite pedir por Mobile Order para 10 personas sin demoras.',
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
    highlightsFor10Pax: 'Uno de los mejores Quick Service de Hollywood Studios. Mesas cuadradas y cabinas donde entran 10 cómodos. Refill de gaseosas libre en máquina dispensadora.',
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
    highlightsFor10Pax: 'El "The Great Feast" es una fuente gigantesca familiar diseñada para grupos de 4 a 6 personas. Pidiendo 2 fuentes comen los 10 con abundancia y a precio muy conveniente.',
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
    highlight: 'Aterrizaje en MCO (15:35 hs), llegada a Celebration Suites, compras en Walmart y cena distendida.',
    schedule: [
      { time: '15:35', activity: 'Aterrizaje en Orlando International Airport (MCO). Trámite de aduana y recogida de equipajes.', type: 'transport' },
      { time: '17:00', activity: 'Solicitar 2x UberXL en el área designada de Rideshare del Aeropuerto MCO hacia Celebration Suites (Kissimmee, 33.8 km).', type: 'transport' },
      { time: '18:00', activity: 'Check-in en Celebration Suites. Distribución de habitaciones para las 11 personas (Josefina en el depto de Caro, Fofi, Tuto y Luisina).', notes: 'Revisar wi-fi y enchufes para cargar todos los celulares.' },
      { time: '19:15', activity: 'Salida de abastecimiento a Walmart Supercenter #5214 Vine St (a solo 4.5 km / 6 min de Celebration Suites).', notes: 'Comprar packs de agua mineral (40 botellas), snacks, frutas, barritas de cereal y desayunos para los parques.', type: 'shopping' },
      { time: '21:00', activity: 'Cena distendida en Old Town Kissimmee (al lado del hotel, se puede ir caminando) o pizza en el suite.', type: 'food' },
      { time: '22:30', activity: 'Descanso temprano: ¡mañana arranca el primer gran día de parque!', type: 'tip' }
    ],
    teenFocus: ['Recargar celulares, elegir camas, probar la zona de juegos/piscina de Celebration Suites'],
    adultFocus: ['Comprar provisiones para abaratar desayunos y snacks de parque, coordinar chips/eSIM'],
    uberRecommendation: {
      departureTime: '16:50',
      destination: 'MCO Airport ➔ Celebration Suites',
      distanceKm: 33.8,
      estMinutes: 28,
      recommendedDropoff: 'Lobby principal de Celebration Suites (5820 W Irlo Bronson Memorial Hwy)',
      returnTip: 'Esperar a tener las valijas de los 11 antes de pedir los 2x UberXL.'
    },
    mealsTip: 'Comprar snacks tipo Oreo, frutos secos, barritas y botellitas de agua en Walmart: en Disney y Universal se permite ingresar comida sellada y botellas de agua.'
  },
  {
    dayNumber: 2,
    dateStr: 'Mié 20 Ene',
    dayOfWeek: 'Miércoles',
    dateFull: '20 de Enero de 2027',
    type: 'park',
    title: 'Parque 1 · Universal\'s Islands of Adventure',
    parkName: 'Islands of Adventure',
    parkCode: 'universal_ioa',
    highlight: 'Día de pura adrenalina: VelociCoaster, Hagrid\'s Motorbike, Hulk Coaster y Harry Potter.',
    schedule: [
      { time: '07:30', activity: 'Desayuno en los suites y alistarse con mochilas listas y zapatillas deportivas.', type: 'food' },
      { time: '08:05', activity: 'Pedir sincronizados 2x UberXL hacia Universal Orlando Drop-off hub (23.3 km).', type: 'transport' },
      { time: '08:35', activity: 'Llegada al hub de Universal (Piso 5), paso por seguridad de CityWalk y caminata a los molinetes de IOA.', type: 'transport' },
      { time: '09:00', activity: 'Apertura oficial (Rope Drop): ir directo a Hagrid\'s Magical Creatures Motorbike Adventure o VelociCoaster.', type: 'ride' },
      { time: '10:30', activity: 'Jurassic World VelociCoaster (¡el highlight absoluto para los 5 adolescentes!).', type: 'ride', notes: 'Los casilleros para celulares y mochilas son obligatorios y gratuitos junto a la entrada.' },
      { time: '12:00', activity: 'The Wizarding World of Harry Potter: Hogsmeade + Harry Potter and the Forbidden Journey (¡alucinante para todo el grupo!).', type: 'ride' },
      { time: '13:30', activity: 'Almuerzo en Three Broomsticks (Las Tres Escobas) en Hogsmeade.', type: 'food' },
      { time: '15:00', activity: 'The Amazing Adventures of Spider-Man (simulador 3D legendario para todos) + The Incredible Hulk Coaster (teens).', type: 'ride' },
      { time: '17:00', activity: 'Jurassic Park River Adventure (Splash moderado) o Skull Island: Reign of Kong.', type: 'ride' },
      { time: '19:00', activity: 'Repetir la montaña rusa preferida de noche (VelociCoaster iluminada es una locura).', type: 'ride' },
      { time: '20:30', activity: 'Cena distendida en Universal CityWalk (Cowfish o Antojitos Mexicanos) y regreso en 2x UberXL a Celebration Suites.', type: 'food' }
    ],
    teenFocus: [
      'VelociCoaster (0 a 112 km/h en 2.4s, gravedad cero sobre la laguna)',
      'Hagrid\'s Magical Creatures Motorbike Adventure (7 lanzamientos)',
      'The Incredible Hulk Coaster (lanzamiento inicial de 67 km/h y 7 inversiones)'
    ],
    adultFocus: [
      'Harry Potter and the Forbidden Journey (vuelo inmersivo en el castillo)',
      'The Amazing Adventures of Spider-Man (simulador 4K)',
      'Paseo temático por Hogsmeade con Butterbeer (cerveza de manteca)'
    ],
    uberRecommendation: {
      departureTime: '08:05',
      destination: 'Celebration Suites ➔ Universal Drop-off Hub',
      distanceKm: 23.3,
      estMinutes: 24,
      recommendedDropoff: 'Universal Orlando Resort Guest Drop-off (Piso 5 del estacionamiento central)',
      returnTip: 'A la salida (20:30-21:00), subir al piso 5 de la estación de Uber en CityWalk ANTES de pedir los 2 autos.'
    },
    mealsTip: 'Probar la Butterbeer Frozen en Hogsmeade. En Three Broomsticks pedir "The Great Feast" para 10 personas.',
    quickServiceRecommendation: {
      name: 'Three Broomsticks (Las Tres Escobas)',
      location: 'Hogsmeade (Islands of Adventure)',
      specialty: 'Platos familiares de costillas, pollo asado, papas y ensalada fresca',
      whyFor10Pax: 'Pidiendo dos bandejas gigantes "The Great Feast" comen los 10 con abundancia y a menor costo que comprando platos individuales.'
    }
  },
  {
    dayNumber: 3,
    dateStr: 'Jue 21 Ene',
    dayOfWeek: 'Jueves',
    dateFull: '21 de Enero de 2027',
    type: 'shopping',
    title: 'Día de Compras & Descanso 1 · Outlets I-Drive & Best Buy',
    highlight: 'Descanso de caminata, botines en Nike & Adidas Outlet ("Hash Wall"), y tecnología en Best Buy.',
    schedule: [
      { time: '09:30', activity: 'Mañana libre y relajada. Dormir hasta tarde para recuperar piernas tras Universal.', type: 'tip' },
      { time: '11:00', activity: 'Salida en 2x UberXL rumbo a Orlando International Premium Outlets en I-Drive (22.2 km).', type: 'transport' },
      { time: '11:30', activity: 'Parada prioritaria 1: Nike Factory Store (buscar el "Hash Wall" al fondo para botines de fútbol y zapatillas).', type: 'shopping' },
      { time: '13:00', activity: 'Parada prioritaria 2: Adidas Outlet Store (indumentaria deportiva, camisetas y botines Predator/X/Copa).', type: 'shopping' },
      { time: '14:30', activity: 'Almuerzo en el Food Court o en Shake Shack / Five Guys en International Drive.', type: 'food' },
      { time: '16:00', activity: 'Traslado corto en UberXL a Best Buy Millenia (4155 Millenia Blvd, a 3.5 km).', type: 'transport' },
      { time: '16:15', activity: 'Visita de tecnología: ver notebooks (MacBook Air/Pro, laptops gaming Asus/Lenovo), tablets, iPads y consolas.', type: 'shopping' },
      { time: '18:30', activity: 'Regreso a Celebration Suites para dejar las bolsas y descansar junto a la pileta.', type: 'transport' },
      { time: '20:30', activity: 'Cena tranquila en Celebration Town Center (zona de lagos hermosa) o pizza en el departamento.', type: 'food' }
    ],
    teenFocus: [
      'Probarse botines de fútbol de última gama en Nike y Adidas',
      'Mirar laptops gamer, auriculares Sony/Bose y accesorios en Best Buy'
    ],
    adultFocus: [
      'Ver notebooks y tablets para trabajo o estudio con buen precio en Best Buy',
      'Compras de indumentaria deportiva con descuentos en outlets'
    ],
    uberRecommendation: {
      departureTime: '11:00',
      destination: 'Celebration Suites ➔ Orlando Int. Premium Outlets',
      distanceKm: 22.2,
      estMinutes: 25,
      recommendedDropoff: 'Puerta principal junto al Food Court (4951 International Dr)',
      returnTip: 'A las 16:00, pedir Uber de Outlets a Best Buy Millenia (solo 8 minutos de viaje).'
    },
    mealsTip: 'Para no perder tiempo en compras, comer algo ágil en Shake Shack o en el patio de comidas de los Outlets.'
  },
  {
    dayNumber: 4,
    dateStr: 'Vie 22 Ene',
    dayOfWeek: 'Viernes',
    dateFull: '22 de Enero de 2027',
    type: 'park',
    title: 'Parque 2 · Disney\'s Hollywood Studios',
    parkName: 'Disney\'s Hollywood Studios',
    parkCode: 'disney_hs',
    highlight: 'Star Wars: Rise of the Resistance, Tower of Terror, Rock \'n\' Roller y show Fantasmic!',
    schedule: [
      { time: '07:30', activity: 'Desayuno rápido en suite. (A las 07:00 hs abrir app My Disney Experience si van a coordinar Lightning Lane/reservas).', type: 'tip' },
      { time: '08:00', activity: 'Salida en 2x UberXL rumbo a Disney\'s Hollywood Studios (11.6 km).', type: 'transport' },
      { time: '08:25', activity: 'Llegada al loop de Rideshare exclusivo y paso por seguridad. Entrar con tiempo para el Rope Drop.', type: 'transport' },
      { time: '09:00', activity: 'Apertura: Star Wars: Rise of the Resistance (¡la mayor obra maestra tecnológica de Disney!).', type: 'ride' },
      { time: '10:45', activity: 'Millennium Falcon: Smugglers Run (pilotean 6 personas la nave espacial juntos).', type: 'ride' },
      { time: '12:00', activity: 'The Twilight Zone Tower of Terror (adrenalina pura en caída libre para teens y adultos audaces).', type: 'ride' },
      { time: '13:00', activity: 'Rock \'n\' Roller Coaster Starring Aerosmith (lanzamiento a oscuras con looping).', type: 'ride' },
      { time: '14:15', activity: 'Almuerzo en ABC Commissary: salón climatizado inmenso con Mobile Order para 10.', type: 'food' },
      { time: '15:30', activity: 'Toy Story Land: Slinky Dog Dash (montaña rusa familiar con lanzamientos) + Toy Story Mania.', type: 'ride' },
      { time: '17:30', activity: 'Mickey & Minnie\'s Runaway Railway (tecnología trackless sin lentes 3D fascinante).', type: 'ride' },
      { time: '19:30', activity: 'Tomar ubicaciones en el anfiteatro de Fantasmic! (show nocturno con agua, láseres y pirotecnia).', type: 'ride' },
      { time: '21:30', activity: 'Salida ágil y regreso en 2x UberXL hacia Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'The Twilight Zone Tower of Terror (caídas aleatorias)',
      'Rock \'n\' Roller Coaster (0 a 92 km/h en 2.8s con música de Aerosmith a todo volumen)',
      'Rise of the Resistance (escapar del Star Destroyer de Kylo Ren)'
    ],
    adultFocus: [
      'Rise of the Resistance (efectos prácticos, animatrónicos hiperrealistas y simulador)',
      'Millennium Falcon (manejar los controles de la nave)',
      'Show Fantasmic! (uno de los mejores espectáculos de Disney)'
    ],
    uberRecommendation: {
      departureTime: '08:00',
      destination: 'Celebration Suites ➔ Hollywood Studios',
      distanceKm: 11.6,
      estMinutes: 16,
      recommendedDropoff: 'Rideshare Drop-off Area de Hollywood Studios (a 150 metros de los molinetes de entrada)',
      returnTip: 'Al terminar Fantasmic!, caminar directamente al loop de Uber para evitar la marea de salida.'
    },
    mealsTip: 'Para grupos de 10 personas, ABC Commissary permite hacer Mobile Order en la app de Disney para que la comida esté lista apenas lleguen.',
    quickServiceRecommendation: {
      name: 'ABC Commissary',
      location: 'Commissary Lane (Hollywood Studios)',
      specialty: 'Carnitas bowls, tacos de langostinos, sándwiches gourmet y bebidas con refill',
      whyFor10Pax: 'Salón interior gigantesco 100% techado y climatizado con mesas largas para 10 personas y sistema de Mobile Order super fluido.'
    }
  },
  {
    dayNumber: 5,
    dateStr: 'Sáb 23 Ene',
    dayOfWeek: 'Sábado',
    dateFull: '23 de Enero de 2027',
    type: 'shopping',
    title: 'Día de Compras & Relax 2 · The Florida Mall & Apple Store',
    highlight: 'Apple Store oficial (MacBooks, iPhones, iPads), tiendas de botines y tarde distendida.',
    schedule: [
      { time: '10:00', activity: 'Desayuno relajado en los suites de Celebration. Descanso muscular.', type: 'food' },
      { time: '11:30', activity: 'Traslado en 2x UberXL a The Florida Mall (24.5 km, el shopping cerrado más grande de Orlando Central).', type: 'transport' },
      { time: '12:00', activity: 'Parada estrella: Apple Store oficial de The Florida Mall.', notes: 'Ver notebooks MacBook Air M-Series, MacBook Pro, iPhones liberados de fábrica y accesorios. Consultar por teclado en español.', type: 'shopping' },
      { time: '13:45', activity: 'Almuerzo en el dining pavilion de Florida Mall (opciones de todo el mundo).', type: 'food' },
      { time: '15:00', activity: 'Recorrido deportivo en The Florida Mall: Dick\'s Sporting Goods, JD Sports y Foot Locker.', notes: 'Excelente selección de botines de fútbol y camisetas.', type: 'shopping' },
      { time: '17:30', activity: 'Parada opcional en Best Buy South Orange Blossom Trail (a solo 3 km del shopping).', type: 'shopping' },
      { time: '19:00', activity: 'Regreso en UberXL a Celebration Suites.', type: 'transport' },
      { time: '20:30', activity: 'Cena distendida en Ford\'s Garage (Kissimmee / 192) con hamburguesas gourmet en ambientación mecánica vintage.', type: 'food' }
    ],
    teenFocus: [
      'Probar los nuevos iPhones, MacBooks y iPads en Apple Store',
      'Buscar botines de fútbol exclusivos que no llegan a Sudamérica en Dick\'s y JD Sports'
    ],
    adultFocus: [
      'Comprar tecnología con garantía oficial y asesoramiento del Genius Bar',
      'Día sin caminar 20 km bajo el sol para recargar energías'
    ],
    uberRecommendation: {
      departureTime: '11:30',
      destination: 'Celebration Suites ➔ The Florida Mall',
      distanceKm: 24.5,
      estMinutes: 26,
      recommendedDropoff: 'Entrada exterior de Apple Store / Dining Pavilion (8001 S Orange Blossom Trail)',
      returnTip: 'El shopping está cerrado con aire acondicionado, ideal si afuera hace calor o llueve.'
    },
    mealsTip: 'En Ford\'s Garage sobre la autopista 192 la comida es deliciosa y está a menos de 5 minutos de Celebration Suites.'
  },
  {
    dayNumber: 6,
    dateStr: 'Dom 24 Ene',
    dayOfWeek: 'Domingo',
    dateFull: '24 de Enero de 2027',
    type: 'park',
    title: 'Parque 3 · Universal Studios Florida',
    parkName: 'Universal Studios Florida',
    parkCode: 'universal_studios',
    highlight: 'Escape from Gringotts, Revenge of the Mummy, Rip Ride Rockit y Diagon Alley.',
    schedule: [
      { time: '07:45', activity: 'Desayuno y salida en 2x UberXL hacia Universal Studios Florida (23.3 km).', type: 'transport' },
      { time: '08:45', activity: 'Llegada (Piso 5) y entrada por Universal Studios Florida.', type: 'transport' },
      { time: '09:00', activity: 'Entrada directa a Diagon Alley tras la pared de ladrillos londinense: Harry Potter and the Escape from Gringotts.', type: 'ride' },
      { time: '10:45', activity: 'Revenge of the Mummy (montaña rusa bajo techo con fuego real y aceleraciones brutales).', type: 'ride' },
      { time: '12:00', activity: 'Hollywood Rip Ride Rockit (montaña rusa con subida a 90 grados y música a elección personal).', type: 'ride' },
      { time: '13:15', activity: 'Almuerzo en Fast Food Boulevard (Springfield de Los Simpsons) o Leaky Cauldron.', type: 'food' },
      { time: '14:45', activity: 'TRANSFORMERS: The Ride 3D (simulador de batalla urbana gigantesco) y Despicable Me Minion Mayhem.', type: 'ride' },
      { time: '16:30', activity: 'MEN IN BLACK Alien Attack (juego de disparos láser interactivo con giro de autos, ideal para competir adultos vs teens).', type: 'ride' },
      { time: '18:00', activity: 'E.T. Adventure (clásico nostálgico encantador para todos) y espectáculo de pirotecnia/drones según cronograma.', type: 'ride' },
      { time: '20:00', activity: 'Cena en CityWalk (Hard Rock Cafe Orlando o Vivo Italian Kitchen) y retorno en 2x UberXL.', type: 'food' }
    ],
    teenFocus: [
      'Hollywood Rip Ride Rockit (elegir tema heavy metal o pop antes de subir)',
      'Revenge of the Mummy (0 a 72 km/h a oscuras con efectos de calor y caídas sorpresa)',
      'Escape from Gringotts (caída en riel y dragón ucraniano escupefuego)'
    ],
    adultFocus: [
      'Inmersión arquitectónica en Diagon Alley (ver el dragón de Gringotts rugir fuego cada 10 min)',
      'TRANSFORMERS The Ride 3D',
      'Competencia grupal en MEN IN BLACK Alien Attack para ver quién saca más puntos'
    ],
    uberRecommendation: {
      departureTime: '08:00',
      destination: 'Celebration Suites ➔ Universal Drop-off Hub',
      distanceKm: 23.3,
      estMinutes: 24,
      recommendedDropoff: 'Universal Orlando Resort Guest Drop-off (Piso 5)',
      returnTip: 'Tener coordinado el punto de encuentro en la estatua del globo de Universal para salir todos juntos hacia el Piso 5 de Uber.'
    },
    mealsTip: 'En Leaky Cauldron pedir Fish & Chips y Cottage Pie. En Diagon Alley pueden probar el helado de manteca (Butterbeer Ice Cream) en Florean Fortescue\'s.',
    quickServiceRecommendation: {
      name: 'Fast Food Boulevard (Springfield)',
      location: 'Springfield (Universal Studios)',
      specialty: 'Krusty Burgers, Cletus Chicken Shack, pizzas y Flaming Moes',
      whyFor10Pax: 'Múltiples barras de comidas diferentes dentro de un mismo mega salón cerrado con mesas grandes donde los 10 pueden sentarse juntos.'
    }
  },
  {
    dayNumber: 7,
    dateStr: 'Lun 25 Ene',
    dayOfWeek: 'Lunes',
    dateFull: '25 de Enero de 2027',
    type: 'park',
    title: 'Parque 4 · Disney\'s Animal Kingdom & Tarde de Pileta',
    parkName: 'Disney\'s Animal Kingdom',
    parkCode: 'disney_ak',
    highlight: 'Avatar Flight of Passage (el simulador #1 de Disney), Expedition Everest y Safaris.',
    schedule: [
      { time: '07:00', activity: 'Despertador temprano: Animal Kingdom abre a las 08:00 AM y es el parque más cercano a Celebration Suites (10.9 km).', type: 'tip' },
      { time: '07:25', activity: 'Salida en 2x UberXL rumbo a Disney\'s Animal Kingdom.', type: 'transport' },
      { time: '07:45', activity: 'Rope drop directo a Pandora: World of Avatar ➔ Avatar Flight of Passage.', type: 'ride', notes: 'Simulador de vuelo en banshee; una experiencia sensorial inigualable para los 10.' },
      { time: '09:30', activity: 'Na\'vi River Journey (recorrido bioluminiscente en bote con el animatrónico más avanzado de Disney).', type: 'ride' },
      { time: '10:30', activity: 'Expedition Everest - Legend of the Forbidden Mountain (montaña rusa con retroceso a oscuras y encuentro con el Yeti).', type: 'ride' },
      { time: '12:00', activity: 'Kilimanjaro Safaris (safari en camión abierto por la sabana africana; por la mañana los animales están muy activos).', type: 'ride' },
      { time: '13:15', activity: 'Almuerzo en Satu\'li Canteen (Pandora): bowls saludables de carne, pollo o tofu.', type: 'food' },
      { time: '14:45', activity: 'Festival of the Lion King (espectáculo acrobático estilo Broadway en vivo).', type: 'ride' },
      { time: '16:00', activity: 'Regreso temprano a Celebration Suites para aprovechar la piscina y descansar las piernas.', type: 'transport' },
      { time: '19:30', activity: 'Cena distendida en Texas Roadhouse (Kissimmee 192): cortes de carne estilo tejano y pan caliente con manteca de canela.', type: 'food' }
    ],
    teenFocus: [
      'Expedition Everest (subir varias veces si la fila está baja)',
      'Avatar Flight of Passage (sentir respirar al banshee entre las piernas)',
      'Tarde libre en la piscina de Celebration Suites'
    ],
    adultFocus: [
      'Avatar Flight of Passage (tecnología visual y aromática deslumbrante)',
      'Kilimanjaro Safaris (fotografiar jirafas, leones y elefantes)',
      'Festival of the Lion King y Satu\'li Canteen (la comida más rica de parque Disney)'
    ],
    uberRecommendation: {
      departureTime: '07:25',
      destination: 'Celebration Suites ➔ Disney\'s Animal Kingdom',
      distanceKm: 10.9,
      estMinutes: 14,
      recommendedDropoff: 'Rideshare Drop-off Animal Kingdom (loop oeste a solo 100 m de los molinetes)',
      returnTip: 'Como salen a las 16:00 hs, evitan el tráfico pico y consiguen UberXL en minutos.'
    },
    mealsTip: 'Satu\'li Canteen en Pandora tiene los mejores bowls de Disney y las famosas Cheeseburger Steamed Pods.',
    quickServiceRecommendation: {
      name: "Satu'li Canteen",
      location: 'Pandora - World of Avatar (Animal Kingdom)',
      specialty: 'Bowls de carne, pollo asado, arroz integral y chimichurri',
      whyFor10Pax: 'La mejor comida rápida de Disney. El salón es amplio, con sombra y aire acondicionado, ideal para grupos grandes que desean comer sano y sabroso.'
    }
  },
  {
    dayNumber: 8,
    dateStr: 'Mar 26 Ene',
    dayOfWeek: 'Martes',
    dateFull: '26 de Enero de 2027',
    type: 'shopping',
    title: 'Día de Compras 3 & Tarde en Disney Springs',
    highlight: 'Vineland Premium Outlets (Nike Clearance), compras finales y paseo nocturno en Disney Springs.',
    schedule: [
      { time: '10:00', activity: 'Desayuno pausado y mañana de descanso muscular.', type: 'tip' },
      { time: '11:15', activity: 'Salida en 2x UberXL hacia Orlando Vineland Premium Outlets (el outlet más cercano a Celebration, solo 12.7 km).', type: 'transport' },
      { time: '11:30', activity: 'Recorrido en Vineland: Nike Clearance Store (precios de liquidación aún mejores que I-Drive), Adidas, Tommy Hilfiger, Under Armour.', type: 'shopping' },
      { time: '14:00', activity: 'Almuerzo en Ford\'s Garage Vineland o patio de comidas del outlet.', type: 'food' },
      { time: '16:00', activity: 'Regreso breve al hotel para dejar compras o traslado directo a Disney Springs (8 km).', type: 'transport' },
      { time: '17:00', activity: 'Disney Springs (no requiere entrada a parques): paseo por World of Disney (la tienda Disney más grande del planeta), Lego Store y tienda Marvel.', type: 'shopping' },
      { time: '19:30', activity: 'Cena grupal en Disney Springs: Earl of Sandwich (económico y delicioso), Chicken Guy! o T-REX Café.', type: 'food' },
      { time: '21:30', activity: 'Regreso en 2x UberXL a Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'Cazar liquidaciones en Nike Clearance Store de Vineland',
      'Visitar la tienda de Lego y los locales temáticos de Star Wars / Marvel en Disney Springs'
    ],
    adultFocus: [
      'Comprar ropa y calzado en Vineland (ambiente más ordenado y elegante que I-Drive)',
      'Paseo nocturno agradable por la rambla de Disney Springs junto al lago'
    ],
    uberRecommendation: {
      departureTime: '11:15',
      destination: 'Celebration Suites ➔ Vineland Premium Outlets',
      distanceKm: 12.7,
      estMinutes: 16,
      recommendedDropoff: 'Puerta central de Vineland Outlets (8200 Vineland Ave)',
      returnTip: 'De Disney Springs a Celebration Suites: la parada de Uber está ubicada en el extremo oeste (West Side Drop-off, cerca de Cirque du Soleil).'
    },
    mealsTip: 'Earl of Sandwich en Disney Springs es una de las opciones más rendidoras para grupos grandes (sándwiches calientes de excelente calidad a precio accesible).'
  },
  {
    dayNumber: 9,
    dateStr: 'Mié 27 Ene',
    dayOfWeek: 'Miércoles',
    dateFull: '27 de Enero de 2027',
    type: 'park',
    title: 'Parque 5 · Disney\'s EPCOT',
    parkName: 'Disney\'s EPCOT',
    parkCode: 'disney_epcot',
    highlight: 'Guardians of the Galaxy: Cosmic Rewind (¡la mejor montaña rusa de Disney!), Test Track y Remy.',
    schedule: [
      { time: '06:55', activity: 'Alarma de Fila Virtual: a las 07:00:00 AM ingresar en la app My Disney Experience para solicitar Virtual Queue de Guardians of the Galaxy.', type: 'tip' },
      { time: '08:00', activity: 'Desayuno y salida en 2x UberXL hacia EPCOT (13.7 km).', type: 'transport' },
      { time: '08:30', activity: 'Llegada y Rope drop hacia World Celebration y World Discovery.', type: 'transport' },
      { time: '09:00', activity: 'Subida a Guardians of the Galaxy: Cosmic Rewind según grupo de llamada (montaña rusa con rotación 360 y temazos de rock).', type: 'ride' },
      { time: '10:45', activity: 'Test Track (o Soarin\' Around the World en World Nature; simulador de vuelo en ala delta con olores a naranja y brisa marina).', type: 'ride' },
      { time: '12:15', activity: 'Spaceship Earth (viaje nostálgico por la historia de las comunicaciones adentro de la icónica esfera geodésica).', type: 'ride' },
      { time: '13:30', activity: 'Almuerzo en Connections Eatery (salón climatizado gigante con enchufes de carga para los 10).', type: 'food' },
      { time: '15:00', activity: 'Paseo por World Showcase: Pabellón de Francia ➔ Remy\'s Ratatouille Adventure (simulador 3D en el tamaño de una ratita).', type: 'ride' },
      { time: '17:00', activity: 'Recorrido por los 11 países de World Showcase (México: Gran Fiesta Tour; Noruega: Frozen Ever After; Japón; Alemania).', type: 'shopping' },
      { time: '20:30', activity: 'Ubicarse en el borde de la laguna de World Showcase para el show nocturno de fuegos artificiales "Luminous: The Symphony of Us" (21:00 hs).', type: 'ride' },
      { time: '21:30', activity: 'Retorno en 2x UberXL a Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'Guardians of the Galaxy: Cosmic Rewind (lanzamiento hacia atrás, giros controlados y música de Queen / Earth Wind & Fire)',
      'Probar dulces y sodas exóticas en Club Cool de Coca-Cola (¡probar la Beverly de broma!)'
    ],
    adultFocus: [
      'Guardians of the Galaxy (suavidad absoluta en el riel, cero vibración brusca)',
      'Soarin\' Around the World y Remy\'s Ratatouille Adventure',
      'Degustación gastronómica en los pabellones de Francia, Italia y Japón en World Showcase'
    ],
    uberRecommendation: {
      departureTime: '08:00',
      destination: 'Celebration Suites ➔ Disney\'s EPCOT',
      distanceKm: 13.7,
      estMinutes: 18,
      recommendedDropoff: 'Rideshare Drop-off EPCOT (Lote Este frente a la esfera de Spaceship Earth)',
      returnTip: 'Al terminar Luminous, caminar por el lateral izquierdo de Spaceship Earth hacia el estacionamiento este de Uber.'
    },
    mealsTip: 'En el pabellón de Francia, pasar por Les Halles Boulangerie-Patisserie para probar croissants, baguettes rellenas y macarons.',
    quickServiceRecommendation: {
      name: 'Connections Eatery',
      location: 'World Celebration (EPCOT)',
      specialty: 'Hamburguesas gourmet, pizzas napolitanas, waffles y ensaladas',
      whyFor10Pax: 'Espacio enorme con aire acondicionado y enchufes para cargar todos los celulares de los chicos mientras comen.'
    }
  },
  {
    dayNumber: 10,
    dateStr: 'Jue 28 Ene',
    dayOfWeek: 'Jueves',
    dateFull: '28 de Enero de 2027',
    type: 'park',
    title: 'Parque 6 · Disney\'s Magic Kingdom',
    parkName: 'Disney\'s Magic Kingdom',
    parkCode: 'disney_mk',
    highlight: 'TRON Lightcycle / Run, Space Mountain, Big Thunder y el show Happily Ever After en el castillo.',
    schedule: [
      { time: '06:55', activity: 'Alarma de Fila Virtual: a las 07:00:00 AM ingresar en app My Disney Experience para solicitar cupo en TRON Lightcycle / Run.', type: 'tip' },
      { time: '07:45', activity: 'Salida en 2x UberXL hacia el Transportation and Ticket Center (TTC) de Magic Kingdom (15.8 km).', type: 'transport' },
      { time: '08:20', activity: 'Tomar el Monorriel o el Ferry desde el TTC cruzando Seven Seas Lagoon hasta el frente de Magic Kingdom.', type: 'transport' },
      { time: '09:00', activity: 'Entrada oficial por Main Street U.S.A. Fotos frente al Castillo de Cenicienta.', type: 'tip' },
      { time: '09:15', activity: 'Tomorrowland: Space Mountain (montaña rusa clásica a oscuras) y TRON Lightcycle / Run (moto futurista de alta velocidad).', type: 'ride' },
      { time: '11:30', activity: 'Fantasyland: Seven Dwarfs Mine Train (montaña rusa con vagones oscilantes) y Peter Pan\'s Flight.', type: 'ride' },
      { time: '13:00', activity: 'Almuerzo en Columbia Harbour House (planta alta tranquila con aire acondicionado y mesas grandes) o Pecos Bill.', type: 'food' },
      { time: '14:30', activity: 'Frontierland y Adventureland: Big Thunder Mountain Railroad ("la montaña más loca del oeste") y Pirates of the Caribbean.', type: 'ride' },
      { time: '16:30', activity: 'Haunted Mansion (la mansión embrujada con efectos holográficos deslumbrantes).', type: 'ride' },
      { time: '18:00', activity: 'Paseo por Main Street y descanso con helados en Plaza Ice Cream Parlor.', type: 'food' },
      { time: '20:00', activity: 'Happily Ever After: el icónico show de proyecciones sobre el castillo, canciones de Disney y fuegos artificiales (comienza a las 20:00 o 21:00 hs según calendario).', type: 'ride' },
      { time: '21:30', activity: 'Ferry o Monorriel de regreso al TTC y toma de los 2x UberXL hacia Celebration Suites.', type: 'transport' }
    ],
    teenFocus: [
      'TRON Lightcycle / Run (posición acostado sobre la moto de luz y lanzamiento a 97 km/h)',
      'Space Mountain (clásico de velocidad a oscuras)',
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
    mealsTip: 'Columbia Harbour House en Liberty Square ofrece mesas en el piso superior con vista a la calle y aire acondicionado perfecto para los 10.',
    quickServiceRecommendation: {
      name: 'Columbia Harbour House',
      location: 'Liberty Square (Magic Kingdom)',
      specialty: 'Plato combinado de langostinos, pescado frito y pollo con papas',
      whyFor10Pax: 'Suban directamente a la segunda planta: es uno de los salones más amplios y tranquilos de Magic Kingdom, ideal para sentar a 10 personas juntas lejos del ruido.'
    }
  },
  {
    dayNumber: 11,
    dateStr: 'Vie 29 Ene',
    dayOfWeek: 'Viernes',
    dateFull: '29 de Enero de 2027',
    type: 'park',
    title: 'Parque 7 · Universal Park-to-Park / Revancha de Favoritos',
    parkName: 'Universal Studios + Islands of Adventure',
    parkCode: 'universal_repeat',
    highlight: 'Día de revancha para los adolescentes: repetir VelociCoaster, Hagrid, Gringotts y cruzar en Hogwarts Express.',
    schedule: [
      { time: '08:00', activity: 'Desayuno con energía para el último gran día de parques temáticos.', type: 'food' },
      { time: '08:30', activity: 'Salida en 2x UberXL hacia Universal Orlando (23.3 km).', type: 'transport' },
      { time: '09:00', activity: 'Entrada y pase Park-to-Park: subirse a la atracción que más les haya gustado en Islands of Adventure (¡VelociCoaster o Hulk!).', type: 'ride' },
      { time: '11:00', activity: 'Tomar el tren Hogwarts Express en Hogsmeade Station hacia King\'s Cross Station (Universal Studios) con vistas en las ventanas.', type: 'ride' },
      { time: '12:30', activity: 'Almuerzo en Universal Studios y repetición de Revenge of the Mummy o Gringotts.', type: 'food' },
      { time: '14:30', activity: 'Compras finales de recuerdos y varitas mágicas en Ollivanders / Honeydukes.', type: 'shopping' },
      { time: '17:00', activity: 'Última vuelta en VelociCoaster al atardecer para los 5 adolescentes.', type: 'ride' },
      { time: '19:30', activity: 'Gran cena de despedida de Orlando en Universal CityWalk (Toothsome Chocolate Emporium o NBC Sports Grill).', type: 'food' },
      { time: '21:30', activity: 'Regreso en 2x UberXL a Celebration Suites y preparar valijas para el viaje a Miami.', type: 'tip' }
    ],
    teenFocus: [
      'Subir a VelociCoaster por segunda o tercera vez usando Single Rider si la fila es larga',
      'Cruzar en el Hogwarts Express y despedirse de las montañas rusas de Universal'
    ],
    adultFocus: [
      'Pasear tranquilos sabiendo que ya cumplieron el checklist principal',
      'Disfrutar del Hogwarts Express y una buena cena de cierre en Toothsome Chocolate Emporium'
    ],
    uberRecommendation: {
      departureTime: '08:30',
      destination: 'Celebration Suites ➔ Universal Drop-off Hub',
      distanceKm: 23.3,
      estMinutes: 24,
      recommendedDropoff: 'Universal Orlando Resort Guest Drop-off (Piso 5)',
      returnTip: 'A la noche, salir con tiempo y verificar que nadie olvide mochilas ni cargadores en los casilleros.'
    },
    mealsTip: 'The Toothsome Chocolate Emporium & Savory Feast Kitchen en CityWalk tiene postres gigantescos y milkshakes artesanales ideales para compartir entre los 10.',
    quickServiceRecommendation: {
      name: 'Thunder Falls Terrace',
      location: 'Jurassic Park (Islands of Adventure)',
      specialty: 'Costillitas ahumadas, pollo asado, arroz amarillo y choclo',
      whyFor10Pax: 'Gran salón interior con vista a la caída acuática de Jurassic Park River Adventure. Platos generosos y muchas mesas contiguas.'
    }
  },
  {
    dayNumber: 12,
    dateStr: 'Sáb 30 Ene',
    dayOfWeek: 'Sábado',
    dateFull: '30 de Enero de 2027',
    type: 'travel',
    title: 'Check-out en Orlando & Traslado a Miami en Combi Privada',
    highlight: 'Combi/Trafic privada contratada para el grupo de 11 personas: salida desde Celebration Suites y llegada a Seacoast (Miami Beach).',
    schedule: [
      { time: '09:00', activity: 'Desayuno final en Celebration Suites. Revisar armarios, enchufes y cajas de seguridad.', type: 'tip' },
      { time: '10:30', activity: 'Check-out formal en recepción de Celebration Suites.', type: 'tip' },
      { time: '10:45', activity: 'Encuentro en el lobby con la combi/trafic privada ya contratada. Carga de los equipajes de los 11.', type: 'transport' },
      { time: '11:00', activity: 'Inicio del viaje en combi privada rumbo a Miami Beach (380 km por Florida\'s Turnpike, ~3.5 a 4 horas).', type: 'transport' },
      { time: '13:00', activity: 'Parada técnica de descanso y almuerzo en Fort Drum Service Plaza (km 190, mitad de camino sobre el Turnpike).', type: 'food' },
      { time: '15:30', activity: 'Llegada a Miami Beach, Check-in en Hotel Seacoast frente al mar (5101 Collins Ave).', type: 'tip' },
      { time: '18:00', activity: 'Paseo relajado por la playa y cena en Lincoln Road o Ocean Drive.', type: 'food' }
    ],
    teenFocus: ['Conocer la playa de Miami Beach, descansar en la combi escuchando música con el grupo'],
    adultFocus: ['Control exhaustivo de valijas y documentos antes de dejar el hotel en Orlando'],
    uberRecommendation: {
      departureTime: '11:00',
      destination: 'Celebration Suites ➔ Miami Beach (Combi Privada Contratada)',
      distanceKm: 380,
      estMinutes: 220,
      recommendedDropoff: 'Hotel Seacoast Suites Miami Beach (5101 Collins Ave, Miami Beach, FL 33140)',
      returnTip: 'Aclaración importante: Este trayecto se realiza en la combi/trafic privada ya contratada por el grupo, sin necesidad de usar Uber.'
    },
    mealsTip: 'Hacer una parada para almorzar en Fort Drum Service Plaza sobre Florida\'s Turnpike (Wendy\'s, Dunkin, Starbucks y minimercado).'
  }
];

export const ATTRACTIONS: Attraction[] = [
  // --- UNIVERSAL ISLANDS OF ADVENTURE ---
  {
    id: 'veloci-coaster',
    name: 'Jurassic World VelociCoaster',
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
    land: 'Jurassic Park',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 130,
    minHeightInches: 51,
    description: 'La montaña rusa de lanzamiento más extrema y premiada de Florida. 2 lanzamientos brutales (hasta 112 km/h en 2.4s), "Top Hat" de 47 metros sobre la laguna y caída con inversión en gravedad cero.',
    whyForGroup: 'El imperdible #1 absoluto para Renato, Tuto, José, Máximo, Josefina y Luisina. Pura adrenalina sin tregua.',
    queueStrategy: 'Ir directo en el Rope Drop matutino o última hora antes del cierre. Casilleros gratuitos con huella o pase incluidos antes del detector de metales.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express aceptado / Fila regular / Single Rider'
  },
  {
    id: 'hagrid-motorbike',
    name: "Hagrid's Magical Creatures Motorbike Adventure",
    park: 'Universal Islands of Adventure',
    parkShort: 'Islands of Adventure',
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

  // --- UNIVERSAL STUDIOS FLORIDA ---
  {
    id: 'gringotts',
    name: 'Harry Potter and the Escape from Gringotts',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
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
    land: 'Production Central',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 4,
    techImmersionLevel: 3,
    minHeightCm: 130,
    minHeightInches: 51,
    description: 'Subida vertical de 90 grados mirando al cielo a 50 metros de altura, con pantalla táctil en el asiento para seleccionar la canción que sonará en tus oídos a 105 km/h.',
    whyForGroup: 'Clásico de adrenalina para los 5 chicos: cada uno elige su propio hit musical.',
    queueStrategy: 'Hacerlo al mediodía o tarde con Single Rider.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Universal Express / Single Rider'
  },
  {
    id: 'transformers',
    name: 'TRANSFORMERS: The Ride-3D',
    park: 'Universal Studios Florida',
    parkShort: 'Universal Studios',
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

  // --- DISNEY'S HOLLYWOOD STUDIOS ---
  {
    id: 'rise-of-resistance',
    name: 'Star Wars: Rise of the Resistance',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    land: "Star Wars: Galaxy's Edge",
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'La atracción más ambiciosa de la historia de Disney: 18 minutos que combinan 4 tipos de vehículos (transporte de prisioneros trackless, simulador de cápsula espacial y caída libre vertical en turbo-ascensor).',
    whyForGroup: 'Obligatoria para los 11 integrantes sin excepción. Seas fan o no de Star Wars, te deja sin palabras.',
    queueStrategy: 'Hacer Rope Drop inmediato apenas abre el parque o comprar Lightning Lane Single Pass si el grupo desea garantizar 0 fila.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Single Pass / Fila regular'
  },
  {
    id: 'tower-of-terror',
    name: 'The Twilight Zone Tower of Terror',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    land: 'Sunset Boulevard',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 102,
    minHeightInches: 40,
    description: 'El ascensor de servicio del Hollywood Tower Hotel se desconecta de la gravedad y cae en picada con secuencias aleatorias generadas por computadora que te levantan del asiento.',
    whyForGroup: 'Sensación de vacío en el estómago inigualable y vistas panorámicas de todo el parque cuando las puertas se abren arriba.',
    queueStrategy: 'Hacer a primera hora o durante el desfile/show Fantasmic! cuando la fila baja.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Lightning Lane Multi Pass'
  },
  {
    id: 'rock-n-roller',
    name: "Rock 'n' Roller Coaster Starring Aerosmith",
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    land: 'Sunset Boulevard',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 4,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Limusina súper veloz que acelera de 0 a 92 km/h en 2.8 segundos y entra a 3 inversiones en completa oscuridad al ritmo de Sweet Emotion y Walk This Way.',
    whyForGroup: 'La montaña rusa con inversiones más fuerte de Disney Orlando.',
    queueStrategy: 'Fila Single Rider disponible muy útil para los 5 chicos.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider'
  },
  {
    id: 'millennium-falcon',
    name: "Millennium Falcon: Smugglers Run",
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
    land: "Star Wars: Galaxy's Edge",
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 3,
    techImmersionLevel: 5,
    minHeightCm: 97,
    minHeightInches: 38,
    description: 'Entras a la cabina real del Halcón Milenario en tripulaciones de 6 personas: 2 pilotos que manejan la nave, 2 artilleros que disparan y 2 ingenieros que reparan.',
    whyForGroup: 'Interacción grupal al 100%: los adolescentes aman ser pilotos y los adultos pueden tomar artillería o ingeniería.',
    queueStrategy: 'Fila Single Rider muy veloz o fila regular al mediodía.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider'
  },
  {
    id: 'slinky-dog',
    name: 'Slinky Dog Dash',
    park: "Disney's Hollywood Studios",
    parkShort: 'Hollywood Studios',
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

  // --- DISNEY'S ANIMAL KINGDOM ---
  {
    id: 'flight-of-passage',
    name: 'Avatar Flight of Passage',
    park: "Disney's Animal Kingdom",
    parkShort: 'Animal Kingdom',
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

  // --- DISNEY'S EPCOT ---
  {
    id: 'cosmic-rewind',
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
    land: 'World Discovery',
    category: 'rollercoaster',
    targetAudience: 'all',
    adrenalineLevel: 4,
    techImmersionLevel: 5,
    minHeightCm: 107,
    minHeightInches: 42,
    description: 'La primera "omnicoaster" del mundo y una de las montañas rusas bajo techo más largas jamás construidas. Lanzamiento en reversa a 97 km/h en un viaje intergaláctico con rotación 360 programada y canciones legendarias (como September o Disco Inferno).',
    whyForGroup: 'Pura euforia. No tiene caídas verticales violentas ni sacudones, el riel se siente como seda. Adolescentes y adultos salen bailando y con la sonrisa de oreja a oreja.',
    queueStrategy: 'Obligatorio Virtual Queue en app My Disney Experience a las 07:00 AM o 13:00 hs, o Lightning Lane Single Pass.',
    hasSingleRider: false,
    virtualQueueOrLL: 'Virtual Queue (gratuito) o Lightning Lane Single Pass'
  },
  {
    id: 'remy-ratatouille',
    name: "Remy's Ratatouille Adventure",
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
    land: 'World Showcase - France',
    category: 'simulator',
    targetAudience: 'all',
    adrenalineLevel: 2,
    techImmersionLevel: 5,
    minHeightCm: 0,
    minHeightInches: 0,
    description: 'Vehículos sin rieles con lentes 3D que te encogen al tamaño de Remy para huir por la cocina del restaurante de Gusteau entre ollas hirviendo, hornos calientes y caídas cómicas.',
    whyForGroup: 'Tecnología trackless encantadora que todo el grupo adorará.',
    queueStrategy: 'Hacer a primera hora o en las últimas 2 horas de la tarde.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Lightning Lane Multi Pass / Single Rider en prueba'
  },
  {
    id: 'soarin',
    name: "Soarin' Around the World",
    park: "Disney's EPCOT",
    parkShort: 'EPCOT',
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

  // --- DISNEY'S MAGIC KINGDOM ---
  {
    id: 'tron-lightcycle',
    name: 'TRON Lightcycle / Run',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
    land: 'Tomorrowland',
    category: 'rollercoaster',
    targetAudience: 'teens',
    adrenalineLevel: 5,
    techImmersionLevel: 5,
    minHeightCm: 122,
    minHeightInches: 48,
    description: 'Subes a bordo de una Lightcycle inclinándote hacia adelante como en una moto de competición para ser disparado a 97 km/h a través del mundo digital bajo un dosel futurista deslumbrante.',
    whyForGroup: 'La atracción más rápida y moderna de Magic Kingdom, sueño hecho realidad para los 5 chicos.',
    queueStrategy: 'Virtual Queue a las 07:00 AM o 13:00 hs en la app Disney, o Lightning Lane Single Pass.',
    hasSingleRider: true,
    virtualQueueOrLL: 'Virtual Queue / Lightning Lane Single Pass'
  },
  {
    id: 'space-mountain',
    name: 'Space Mountain',
    park: "Disney's Magic Kingdom",
    parkShort: 'Magic Kingdom',
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
  }
];

export const UBER_ROUTES: UberRoute[] = [
  {
    id: 'celebration-to-magic-kingdom',
    destinationName: "Disney's Magic Kingdom (TTC)",
    category: 'disney',
    distanceKm: 15.8,
    drivingMinutesNormal: 18,
    drivingMinutesPeak: 25,
    estCostPerUberXL: 28, // total para 10 personas = $56
    pickupAdvice: 'Lobby de Celebration Suites. Salir a las 07:40 AM para apertura 09:00 AM.',
    dropoffAdvice: 'Zona exacta: Transportation and Ticket Center (TTC) Rideshare Loop. NINGÚN auto o Uber puede dejar pasajeros en los molinetes directos de Magic Kingdom.',
    carSyncTips: 'Desde el TTC, caminar 100 m hacia la estación y tomar el Express Monorail o el Ferryboat a través del Seven Seas Lagoon (calcular 20-25 min extras de traslado panorámico gratuito).',
    exactZoneCoordinates: 'TTC Rideshare Lot (Postes señalizados A1-A6 frente a la boletería central)'
  },
  {
    id: 'celebration-to-hollywood-studios',
    destinationName: "Disney's Hollywood Studios",
    category: 'disney',
    distanceKm: 11.6,
    drivingMinutesNormal: 14,
    drivingMinutesPeak: 18,
    estCostPerUberXL: 22, // total x2 = $44
    pickupAdvice: 'Salida recomendada: 08:00 AM para apertura 08:30 / 09:00 AM.',
    dropoffAdvice: 'Zona exacta: Rideshare Loop exclusivo ubicado a la derecha del estacionamiento general, a solo 150 metros (2 min a pie) de los molinetes de entrada.',
    carSyncTips: 'A la salida después del show Fantasmic!, caminar directamente hacia la salida sin detenerse en los locales para pedir ambos UberXL antes del pico de saturación.',
    exactZoneCoordinates: 'Hollywood Studios Rideshare Loop (Carril derecho peatonal frente a la entrada principal)'
  },
  {
    id: 'celebration-to-epcot',
    destinationName: "Disney's EPCOT",
    category: 'disney',
    distanceKm: 13.7,
    drivingMinutesNormal: 16,
    drivingMinutesPeak: 22,
    estCostPerUberXL: 24, // total x2 = $48
    pickupAdvice: 'Salida recomendada: 08:00 AM para ingresar temprano y estar listos con la Virtual Queue de Guardians of the Galaxy.',
    dropoffAdvice: 'Zona exacta: Lote Este de Rideshare frente a la gran esfera geodésica de Spaceship Earth (a 200 m de los molinetes).',
    carSyncTips: 'Al terminar el espectáculo nocturno Luminous (21:30 hs), caminar por el lateral izquierdo de Spaceship Earth para llegar rápido a los autos.',
    exactZoneCoordinates: 'EPCOT East Parking Lot - Rideshare Pick-up & Drop-off Zone'
  },
  {
    id: 'celebration-to-animal-kingdom',
    destinationName: "Disney's Animal Kingdom",
    category: 'disney',
    distanceKm: 10.9,
    drivingMinutesNormal: 12,
    drivingMinutesPeak: 16,
    estCostPerUberXL: 20, // total x2 = $40
    pickupAdvice: '¡Es el parque más cercano a Celebration Suites! Salir 07:25 AM para apertura 08:00 AM.',
    dropoffAdvice: 'Zona exacta: Rideshare Loop este a solo 100 metros del arco de entrada principal. El acceso vehicular más rápido de todo Disney.',
    carSyncTips: 'El tráfico matutino por US-192 / World Drive hacia Animal Kingdom es sumamente despejado.',
    exactZoneCoordinates: 'Animal Kingdom Front Entrance Rideshare Loop (Carril exclusivo de vans y taxis)'
  },
  {
    id: 'celebration-to-universal',
    destinationName: "Universal Orlando Resort (CityWalk Hub)",
    category: 'universal',
    distanceKm: 23.3,
    drivingMinutesNormal: 22,
    drivingMinutesPeak: 30,
    estCostPerUberXL: 34, // total x2 = $68
    pickupAdvice: 'Salida recomendada: 08:05 AM para llegar al Rope Drop de las 09:00 AM tras pasar el control de seguridad de CityWalk.',
    dropoffAdvice: 'Zona exacta: Piso 5 (Level 5) de la mega estructura central de estacionamientos (área señalizada "Guest Drop-off / Rideshare").',
    carSyncTips: 'Bajan por las escaleras mecánicas hacia la seguridad de CityWalk. Para el regreso nocturno: SUBIR al Piso 5 ANTES de pedir los 2 UberXL para no hacer esperar a los choferes.',
    exactZoneCoordinates: 'Universal Parking Garage - Level 5 Rideshare Hub (Señalización Jurassic Park / Cat in the Hat)'
  },
  {
    id: 'celebration-to-kia-center',
    destinationName: 'Kia Center · Orlando Magic (Downtown NBA)',
    category: 'shopping',
    distanceKm: 32.0,
    drivingMinutesNormal: 30,
    drivingMinutesPeak: 38,
    estCostPerUberXL: 42, // total x2 = $84
    pickupAdvice: 'Llegar 1 hora antes del partido de los Magic al Downtown de Orlando (400 W Church St).',
    dropoffAdvice: 'Zona exacta: Hughey Ave & W Church St, a pasos del acceso principal de Church Street Station.',
    carSyncTips: 'Recordar para los 11: el estadio NO acepta efectivo (100% digital/tarjeta) y tiene política de bolsos estricta (máximo 4.5" x 6.5", sin mochilas).',
    exactZoneCoordinates: 'Kia Center Rideshare Drop-off (Hughey Ave & Church St Loop)'
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
    id: 'celebration-to-vineland-outlets',
    destinationName: 'Orlando Vineland Premium Outlets',
    category: 'shopping',
    distanceKm: 12.7,
    drivingMinutesNormal: 15,
    drivingMinutesPeak: 20,
    estCostPerUberXL: 22, // total x2 = $44
    pickupAdvice: 'Mucho más cercano que I-Drive. Salida 11:15 AM.',
    dropoffAdvice: 'Drop-off en la entrada central junto a Tommy Hilfiger y la plaza gastronómica (8200 Vineland Ave).',
    carSyncTips: 'Cuenta con el Nike Clearance Store, con descuentos adicionales al outlet tradicional.',
    exactZoneCoordinates: 'Vineland Outlets Center Court Drop-off Circle'
  },
  {
    id: 'celebration-to-florida-mall',
    destinationName: 'The Florida Mall (Apple Store & Best Buy zona)',
    category: 'shopping',
    distanceKm: 24.5,
    drivingMinutesNormal: 25,
    drivingMinutesPeak: 35,
    estCostPerUberXL: 35, // total x2 = $70
    pickupAdvice: 'Salida 11:30 AM en día de descanso.',
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
    pickupAdvice: 'Supermercado más cercano a Celebration Suites. Abierto de 06:00 AM a 23:00 PM.',
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
    pickupAdvice: 'Coordinar con las 10 valijas listas en el hall de Celebration Suites.',
    dropoffAdvice: 'Terminal A o B según la aerolínea correspondiente en el nivel de Salidas (Departures).',
    carSyncTips: 'Pedir 2x UberXL garantiza espacio suficiente para 5 pasajeros y hasta 4-5 valijas por vehículo.',
    exactZoneCoordinates: 'MCO Level 2 (Arrivals) para llegada / Level 3 (Departures) para salida'
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
        groupTip: 'Suelen tener promociones de "Buy One, Get One 50% Off" en calzado y ropa de entrenamiento para los 5 chicos.'
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
      'El patio de comidas suele llenarse entre 13:00 y 14:30; comer temprano (12:15) o tarde (15:00) es mucho más cómodo para 10 personas.'
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
