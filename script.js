// Define your car objects
const car1 = {
  brand: 'Honda',
  model: 'Integra Type R DC2',
  year: 1996,
  price: 7000,
  image: 'images/cars/honda_integra_type_r_dc2_1996.jpg',
  flag: 'images/flags/japan.jpg',
  country: 'Japan',

  // Engine & Performance
  engine: '1.8L DOHC VTEC inline-4 (B18C5)',
  horsepower: 197,            // Approximately 197 hp (JDM spec)
  torque: 181,                // in Nm (≈133 lb-ft)
  transmission: '5-speed manual',
  drivetrain: 'FWD',
  redline: '8400 rpm',        // Redline for the 96 spec (US version often slightly different)
  acceleration: '0-100 km/h in 6.7s',
  topSpeed: '234 km/h (145 mph)',
  weight: '≈1100–1200 kg',    // Lightweight for enhanced agility
  powerToWeight: '≈5.9 kg/hp',
  
  // Chassis & Suspension
  platform: 'DC2',
  suspension: 'Double wishbone (front & rear) with sport-tuned settings',
  brakes: {
    front: 'Ventilated discs (≈282mm)',
    rear: 'Solid discs (≈260mm)'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '3-door coupe',
  aerodynamics: {
    kit: 'Aggressive front and rear spoilers',
    liftReduction: '≈30% reduction'
  },
  
  // Interior & Features
  interior: {
    seats: 'Recaro sport seats (often in red)',
    steeringWheel: 'Momo three-spoke, leather-wrapped',
    gearKnob: 'Titanium shift knob',
    instrumentation: 'High-rev tachometer (up to 10,000 rpm) and digital clock'
  },
  
  // Additional Info
  VTEC: true,
  productionNotes: "The 1996 Honda Integra Type R DC2 epitomizes Honda’s commitment to performance and precision engineering, featuring the celebrated B18C5 engine that delivers 197 hp and 181 Nm of torque. Developed with a focus on lightweight construction, advanced aerodynamics, and meticulous tuning for enhanced handling, this limited-production model became a cult classic among enthusiasts, embodying the pure “driver’s car” ethos that set new benchmarks for spirited performance in the realm of Japanese sports sedans.",
  additionalInfo: 'Originally a JDM special; US models were limited (≈4000 units)',
  reviews: [
    'Praised as one of the best front-wheel-drive performance cars',
    'Acclaimed for its engaging, high-revving character and race-inspired handling'
  ],
  additionalInfo: 'Built on the DC2 platform, the Integra Type R DC2 features a hand-built B18C5 engine with enhanced porting, lightweight components, and a tuned suspension setup for an exhilarating driving experience.'
};

const car2 = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2001,
  price: 3000,
  image: 'images/cars/toyota_corolla_2001.jpg',
  flag: 'images/flags/danmark.jpg',
  country: 'Denmark',

  // Engine & Performance
  engine: '1.8L inline-4 (1ZZ-FE)',
  horsepower: 125,             // Typical for this engine
  torque: 125,                 // Approx. 125 lb-ft torque
  transmission: '5-speed manual',
  drivetrain: 'FWD',
  redline: '5800 rpm',
  acceleration: '0-100 km/h in 10.5s',
  topSpeed: '180 km/h (112 mph)',
  weight: '≈1150–1300 kg',
  powerToWeight: '≈9.8 kg/hp',
  
  // Chassis & Suspension
  platform: 'E110',
  suspension: 'MacPherson strut (front) and torsion beam (rear)',
  brakes: {
    front: 'Ventilated discs',
    rear: 'Solid discs'
  },
  limitedSlipDiff: false,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door sedan',
  aerodynamics: {
    design: 'Streamlined design with subtle aerodynamic features'
  },
  
  // Interior & Features
  interior: {
    seats: 'Comfort fabric seats',
    steeringWheel: 'Tilt-adjustable',
    gearKnob: 'Standard shift knob',
    instrumentation: 'Analog gauges with a digital clock'
  },
  
  // Additional Info
  productionNotes: 'The 2001 Toyota Corolla, part of the long‑running E110 series, was designed to deliver exceptional reliability and fuel efficiency with its 1.8L 1ZZ‑FE engine producing 125 hp and 125 Nm torque, manufactured across various international facilities to meet diverse market demands and solidify its reputation as one of the world’s most dependable and economical vehicles.',
  additionalInfo: 'The 2001 Toyota Corolla is renowned for its reliability and fuel efficiency, making it an economical and practical choice for daily commuting.',
  reviews: [
    'Praised for its low maintenance costs and enduring reliability.',
    'A dependable, economical option that still delivers a refined driving experience.'
  ]
};

const car3 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/usa.jpg',
  country: 'USA',
  
  // Engine & Performance
  engine: '5.0L V8 Coyote',
  horsepower: 500,             // 500 hp as per Dark Horse specs
  torque: 418,                 // 418 lb-ft of torque
  transmission: '6-speed manual',
  drivetrain: 'RWD',
  redline: '7250 rpm',
  acceleration: '0-100 km/h in 4.3s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈1600 kg',
  powerToWeight: '≈3.2 kg/hp',
  
  // Chassis & Suspension
  platform: 'S550',
  suspension: 'Fully independent, performance-tuned',
  brakes: {
    front: 'Ventilated discs (≈350mm)',
    rear: 'Ventilated discs (≈350mm)'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Aggressive front splitter and rear diffuser for enhanced downforce'
  },
  
  // Interior & Features
  interior: {
    seats: 'Leather sport seats with contrast stitching',
    steeringWheel: 'Performance-inspired, leather-wrapped',
    gearKnob: 'Titanium shift knob',
    instrumentation: 'Digital display with performance metrics and a 13.2" touchscreen'
  },
  
  // Additional Info
  productionNotes: 'Built on the modern S550 platform, the 2024 Ford Mustang Dark Horse is a limited‑edition performance variant that marries heritage muscle with cutting‑edge technology, featuring a 5.0L V8 Coyote engine that produces 500 hp and 419 Nm torque, alongside track‑oriented enhancements and aerodynamic refinements tailored for enthusiasts seeking a blend of raw power and modern precision.',
  additionalInfo: 'Blending classic muscle car heritage with modern engineering, the 2024 Mustang Dark Horse delivers exhilarating performance and an unmistakably aggressive design.',
  reviews: [
    'Celebrated for its dynamic performance and bold styling.',
    'A modern reinterpretation of the American muscle icon that thrills on every drive.'
  ]
};

const car4 = {
  brand: 'BMW',
  model: 'M3 E46',
  year: 1998,
  price: 13500,
  image: 'images/cars/bmw_m3_e46_1998.jpg',
  flag: 'images/flags/germany.jpg',
  country: 'Germany',

  // Engine & Performance
  engine: '3.2L DOHC inline-6 (S54)',
  horsepower: 333,            // Approximately 333 hp
  torque: 262,                // Approximately 262 lb-ft
  transmission: '6-speed manual',
  drivetrain: 'RWD',
  redline: '7800 rpm',
  acceleration: '0-100 km/h in 5.2s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈1450 kg',
  powerToWeight: '≈4.4 kg/hp',
  
  // Chassis & Suspension
  platform: 'E46',
  suspension: 'Double wishbone front, multi-link rear',
  brakes: {
    front: 'Ventilated discs (≈350mm)',
    rear: 'Ventilated discs (≈340mm)'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Subtle aerodynamic tweaks with integrated spoiler'
  },
  
  // Interior & Features
  interior: {
    seats: 'Sport seats with leather trim',
    steeringWheel: 'M Sport steering wheel',
    gearKnob: 'Aluminum shift knob',
    instrumentation: 'Digital and analog gauges with a sporty cluster'
  },
  
  // Additional Info
  productionNotes: "The 1998 BMW M3 E46 marks an early phase in BMW’s celebrated M3 lineage, powered by the revered 3.2L DOHC inline‑6 S54 engine delivering 333 hp and 262 Nm torque, and built with meticulous German engineering that blends precision handling and motorsport-inspired design, setting the standard for future performance-oriented models.",
  additionalInfo: 'The BMW M3 E46 is celebrated for its balance between performance and everyday usability, combining raw power with precise handling.',
  reviews: [
    'A timeless performance sedan that delivers thrilling dynamics.',
    'A perfect blend of luxury and sportiness.'
  ]
};

const car5 = {
  brand: 'Aston Martin',
  model: 'Valkyrie',
  year: 2022,
  price: 3345000,
  image: 'images/cars/aston_martin_valkyrie_2022.jpg',
  flag: 'images/flags/monaco.jpg',
  country: 'Monaco',

  // Engine & Performance
  engine: '6.5L V12 with hybrid electric assistance',
  horsepower: 1160,           // Approximately 1160 hp
  torque: 800,                // Approximately 800 lb-ft
  transmission: '7-speed automated manual',
  drivetrain: 'RWD',
  redline: '9000 rpm',
  acceleration: '0-100 km/h in 2.5s',
  topSpeed: '350 km/h (217 mph)',
  weight: '≈1240 kg',
  powerToWeight: '≈1.07 kg/hp',
  
  // Chassis & Suspension
  platform: 'Carbon fiber monocoque',
  suspension: 'Race-tuned adaptive suspension',
  brakes: {
    front: 'Carbon-ceramic discs',
    rear: 'Carbon-ceramic discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: 'Mid-engine coupe',
  aerodynamics: {
    kit: 'Advanced active aerodynamics with extensive carbon fiber elements',
    liftReduction: 'Minimized lift through aerodynamic design'
  },
  
  // Interior & Features
  interior: {
    seats: 'Custom leather and Alcantara sport seats',
    steeringWheel: 'Race-inspired multifunctional steering wheel',
    gearKnob: 'Integrated shift paddles',
    instrumentation: 'Digital display with performance telemetry'
  },
  
  // Additional Info
  productionNotes: "Debuting in 2022, the Aston Martin Valkyrie is a hypercar that pushes engineering boundaries with its 6.6L V12 engine, enhanced by hybrid electric assistance to deliver an astonishing 1160 hp and 800 Nm torque, all housed within an ultra-light carbon fiber monocoque, making it an exclusive masterpiece developed in collaboration with motorsport experts for unparalleled performance.",
  additionalInfo: 'The Aston Martin Valkyrie is a hypercar developed with Red Bull Racing, pushing the boundaries of aerodynamics and performance for an unparalleled driving experience.',
  reviews: [
    'A masterpiece of engineering and design.',
    'A rare blend of track-level performance and cutting-edge technology.'
  ]
};

const car6 = {
  brand: 'Alpina',
  model: 'B3 GT3',
  year: 2012,
  price: 80000,
  image: 'images/cars/alpina_b3_gt3_2012.jpg',
  flag: 'images/flags/germany.jpg',
  country: 'Germany',

  // Engine & Performance
  engine: '3.0L Twin-turbo inline-6',
  horsepower: 500,            // Approximately 500 hp
  torque: 450,                // Approximately 450 lb-ft
  transmission: '6-speed manual',
  drivetrain: 'RWD',
  redline: '7500 rpm',
  acceleration: '0-100 km/h in 4.0s',
  topSpeed: '290 km/h (180 mph)',
  weight: '≈1350 kg',
  powerToWeight: '≈2.7 kg/hp',
  
  // Chassis & Suspension
  platform: 'Based on BMW 3 Series',
  suspension: 'Race-tuned adaptive suspension',
  brakes: {
    front: 'High-performance ventilated discs',
    rear: 'High-performance ventilated discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Aggressive GT body kit with enhanced downforce elements'
  },
  
  // Interior & Features
  interior: {
    seats: 'Sport seats with premium leather and Alcantara',
    steeringWheel: 'M Performance steering wheel',
    gearKnob: 'Aluminum shift knob',
    instrumentation: 'Analog and digital displays for performance metrics'
  },
  
  // Additional Info
  productionNotes: "Introduced by Alpina in 2012, the B3 GT3 transforms the conventional BMW 3 Series into a high‑performance track machine through its 3.0L twin‑turbo inline‑6 engine that delivers 500 hp and 450 Nm torque, enhanced by specialized suspension and aerodynamic upgrades that combine luxurious refinement with aggressive sporting prowess.",
  additionalInfo: 'The Alpina B3 GT3 is a high-performance variant of the BMW 3 Series, engineered for both track and road with exceptional handling and aggressive styling.',
  reviews: [
    'Praised for its blend of luxury and track-ready performance.',
    'A true performance machine that retains everyday usability.'
  ]
};

const car7 = {
  brand: 'Nissan',
  model: 'Skyline R34 GTR V-spec',
  year: 1999,
  price: 110000,
  image: 'images/cars/nissan_skyline_r34_gtr_v-spec_1999.jpg',
  flag: 'images/flags/us.jpg',
  country: 'USA',

  // Engine & Performance
  engine: '2.6L twin-turbo inline-6 (RB26DETT)',
  horsepower: 320,            // Approximately 320 hp
  torque: 289,                // Approximately 289 lb-ft
  transmission: '6-speed manual',
  drivetrain: 'AWD',
  redline: '7500 rpm',
  acceleration: '0-100 km/h in 4.9s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈1600 kg',
  powerToWeight: '≈5.0 kg/hp',
  
  // Chassis & Suspension
  platform: 'R34 chassis',
  suspension: 'Multi-link suspension with performance tuning',
  brakes: {
    front: 'Ventilated discs',
    rear: 'Ventilated discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door coupe',
  aerodynamics: {
    kit: 'Aerodynamic enhancements including front lip and rear spoiler',
    liftReduction: 'Optimized for high-speed stability'
  },
  
  // Interior & Features
  interior: {
    seats: 'Recaro sport seats',
    steeringWheel: 'Leather-wrapped sport steering wheel',
    gearKnob: 'Carbon fiber shift knob',
    instrumentation: 'Digital cluster with performance readouts'
  },
  
  // Additional Info
  productionNotes: "The 1999 Nissan Skyline R34 GTR, celebrated for its iconic status, is powered by the legendary 2.6L twin‑turbo RB26DETT engine that churns out 320 hp and 289 Nm torque, built with advanced electronics and aerodynamic design elements that have made it a revered model among collectors and performance enthusiasts across the globe.",
  additionalInfo: 'The Nissan Skyline R34 GTR V-spec is a legendary sports car known for its advanced engineering and exhilarating performance, making it a favorite among enthusiasts.',
  reviews: [
    'Celebrated for its rally heritage and technological innovation.',
    'An icon of Japanese performance tuning that continues to captivate fans worldwide.'
  ]
};

const car8 = {
  brand: 'Mercedes Benz',
  model: 'AMG C63',
  year: 2013,
  price: 48000,
  image: 'images/cars/mercedes_benz_amg_c63_2013.jpg',
  flag: 'images/flags/danmark.jpg',
  country: 'Denmark',

  // Engine & Performance
  engine: '4.0L V8 Biturbo',
  horsepower: 451,            // Approximately 451 hp
  torque: 443,                // Approximately 443 lb-ft
  transmission: '7-speed automatic',
  drivetrain: 'RWD',
  redline: '7200 rpm',
  acceleration: '0-100 km/h in 4.2s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈1650 kg',
  powerToWeight: '≈3.7 kg/hp',
  
  // Chassis & Suspension
  platform: 'W204',
  suspension: 'Sport-tuned suspension with adaptive dampers',
  brakes: {
    front: 'Ventilated discs (≈360mm)',
    rear: 'Ventilated discs (≈350mm)'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door sedan',
  aerodynamics: {
    kit: 'Aggressive AMG styling with performance aerodynamic elements'
  },
  
  // Interior & Features
  interior: {
    seats: 'Leather sport seats with premium trim',
    steeringWheel: 'Flat-bottomed AMG steering wheel',
    gearKnob: 'Sporty shift knob',
    instrumentation: 'High-resolution digital display with performance stats'
  },
  
  // Additional Info
  productionNotes: "Part of the mature W204 generation, the 2013 Mercedes-Benz AMG C63 boasts a 4.0L V8 Biturbo engine producing 451 hp and 443 Nm torque, embodying a perfect fusion of luxury and performance through precise German engineering, dynamic handling, and distinctive AMG styling that caters to drivers seeking both daily comfort and high‑octane excitement.",
  additionalInfo: 'The Mercedes Benz AMG C63 blends luxury with high performance, featuring a powerful V8 engine and refined driving dynamics for an exhilarating experience.',
  reviews: [
    'Acclaimed for its potent engine and sophisticated design.',
    'A benchmark in performance sedans that balances power with comfort.'
  ]
};

const car9 = {
  brand: 'Ferrari',
  model: '488 GTB DCT',
  year: 2016,
  price: 159000,
  image: 'images/cars/ferrari_488_gtb_dct_2016.jpg',
  flag: 'images/flags/danmark.jpg',
  country: 'Denmark',

  // Engine & Performance
  engine: '3.9L twin-turbo V8',
  horsepower: 661,            // Approximately 661 hp
  torque: 561,                // Approximately 561 lb-ft
  transmission: '7-speed dual-clutch transmission',
  drivetrain: 'RWD',
  redline: '8300 rpm',
  acceleration: '0-100 km/h in 3.0s',
  topSpeed: '330 km/h (205 mph)',
  weight: '≈1475 kg',
  powerToWeight: '≈2.23 kg/hp',
  
  // Chassis & Suspension
  platform: 'Fiorano-based chassis',
  suspension: 'Race-tuned suspension with adaptive dampers',
  brakes: {
    front: 'Carbon-ceramic ventilated discs',
    rear: 'Carbon-ceramic ventilated discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Active aerodynamics with high-speed stability enhancements',
    liftReduction: 'Enhanced downforce through integrated spoilers'
  },
  
  // Interior & Features
  interior: {
    seats: 'Sport seats with carbon fiber accents',
    steeringWheel: 'Racing-inspired steering wheel',
    gearKnob: 'Integrated paddle shifters',
    instrumentation: 'Digital displays with track-focused metrics'
  },
  
  // Additional Info
  productionNotes: "The 2016 Ferrari 488 GTB redefined mid‑engine supercar performance with its 3.9L twin‑turbo V8 engine, producing 661 hp and 561 Nm torque, all integrated with a DCT transmission and a chassis derived from the iconic Fiorano track car, offering a harmonious blend of cutting‑edge aerodynamics, Italian craftsmanship, and exclusive design that underscores Ferrari’s racing heritage.",
  additionalInfo: 'The Ferrari 488 GTB DCT is a masterpiece of Italian engineering, offering blistering performance and exquisite design that defines the modern supercar experience.',
  reviews: [
    'A benchmark in supercar performance and design.',
    'Praised for its precision engineering and breathtaking speed.'
  ]
};

const car10 = {
  brand: 'BMW',
  model: 'M3',
  year: 1986,
  price: 67000,
  image: 'images/cars/bmw_m3_coupe_1986.jpg',
  flag: 'images/flags/danmark.jpg',
  country: 'Denmark',

  // Engine & Performance
  engine: '2.3L DOHC inline-4 (S14)',
  horsepower: 192,            // Approximately 192 hp
  torque: 170,                // Approximately 170 lb-ft
  transmission: '5-speed manual',
  drivetrain: 'RWD',
  redline: '7000 rpm',
  acceleration: '0-100 km/h in 6.8s',
  topSpeed: '240 km/h (149 mph)',
  weight: '≈1250 kg',
  powerToWeight: '≈6.5 kg/hp',
  
  // Chassis & Suspension
  platform: 'E30',
  suspension: 'Sport-tuned suspension with double wishbone front',
  brakes: {
    front: 'Ventilated discs',
    rear: 'Solid discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Classic M3 design with subtle aerodynamic enhancements',
    liftReduction: 'Optimized for high-speed stability'
  },
  
  // Interior & Features
  interior: {
    seats: 'Sport bucket seats with a classic design',
    steeringWheel: 'Traditional M3 styled steering wheel',
    gearKnob: 'Standard shift knob',
    instrumentation: 'Analog gauges with a performance-focused layout'
  },
  
  // Additional Info
  productionNotes: "As the progenitor of BMW’s illustrious M3 series, the 1986 E30 M3 is celebrated for its agile 2.3L DOHC inline‑4 S14 engine that produces 192 hp and 170 Nm torque, crafted with a focus on lightweight construction and motorsport‑inspired precision, which laid the foundation for the performance ethos that continues to define the M3 legacy.",
  additionalInfo: 'The 1986 BMW M3 marks the iconic beginning of BMW\'s M division, delivering raw performance and timeless design that has set benchmarks for performance sedans.',
  reviews: [
    'Celebrated for its agile handling and classic design.',
    'A pioneer that established the legacy of BMW performance cars.'
  ]
};

const car11 = {
  brand: 'Opel',
  model: 'Vectra C Z02',
  year: 2006,
  price: 5000,
  image: 'images/cars/opel_vectra_c_z02_2006.jpg',
  flag: 'images/flags/ukraine.jpg',
  country: 'Ukraine',

  // Engine & Performance
  engine: '2.0L inline-4 (Z20NET)',
  horsepower: 138,             // 138 hp
  torque: 200,                 // Approximately 200 Nm (≈148 lb-ft)
  transmission: '5-speed manual',
  drivetrain: 'FWD',
  redline: '6500 rpm',
  acceleration: '0-100 km/h in 9.5s',
  topSpeed: '210 km/h (130 mph)',
  weight: '≈1300 kg',
  powerToWeight: '≈9.4 kg/hp',
  
  // Chassis & Suspension
  platform: 'Vectra C',
  suspension: 'Front MacPherson struts, rear multi-link',
  brakes: {
    front: 'Ventilated discs',
    rear: 'Solid discs'
  },
  limitedSlipDiff: false,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door sedan',
  aerodynamics: {
    design: 'Streamlined design with efficient airflow'
  },
  
  // Interior & Features
  interior: {
    seats: 'Comfort cloth seats',
    steeringWheel: 'Tilt-adjustable',
    gearKnob: 'Standard shift knob',
    instrumentation: 'Analog gauges with digital clock'
  },
  
  // Additional Info
  productionNotes: "The 2006 Opel Vectra C Z02, a sportier variant of the mainstream Vectra, features a 2.0L inline‑4 engine (Z20NET) delivering 138 hp and 200 Nm torque, paired with performance‑oriented tuning and enhanced suspension, positioning it as a dynamic alternative that combines everyday practicality with a spirited driving experience for the European market.",
  additionalInfo: 'The Opel Vectra C Z02 is a reliable sedan offering a balanced mix of performance and everyday practicality, ideal for daily commuting.',
  reviews: [
    'Noted for its solid performance in everyday driving.',
    'An affordable and dependable sedan with refined handling.'
  ]
};

const car12 = {
  brand: 'Opel',
  model: 'Vectra C OPC',
  year: 2006,
  price: 7500,
  image: 'images/cars/opel_vectra_c_opc_2006.jpg',
  flag: 'images/flags/germany.jpg',
  country: 'Germany',

  // Engine & Performance
  engine: '2.0L turbocharged inline-4 (Z20NET OPC)',
  horsepower: 200,             // 200 hp (estimated for OPC)
  torque: 250,                 // Approximately 250 Nm (≈184 lb-ft)
  transmission: '6-speed manual',
  drivetrain: 'FWD',
  redline: '7000 rpm',
  acceleration: '0-100 km/h in 8.5s',
  topSpeed: '230 km/h (143 mph)',
  weight: '≈1280 kg',
  powerToWeight: '≈6.4 kg/hp',
  
  // Chassis & Suspension
  platform: 'Vectra C',
  suspension: 'Sport-tuned with lowered ride height',
  brakes: {
    front: 'Upgraded ventilated discs',
    rear: 'Upgraded ventilated discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door sedan',
  aerodynamics: {
    kit: 'Aggressive body kit with enhanced airflow and reduced lift'
  },
  
  // Interior & Features
  interior: {
    seats: 'Recaro sport seats with leather trim',
    steeringWheel: 'Performance-oriented, leather-wrapped',
    gearKnob: 'Aluminum shift knob',
    instrumentation: 'Digital performance display with analog backup'
  },
  
  // Additional Info
  productionNotes: "Enhancing the Vectra C’s appeal, the 2006 Opel Vectra OPC takes performance to the next level with a turbocharged 2.0L inline‑4 engine (Z20NET OPC) that produces 200 hp and 250 Nm torque, complemented by aggressive chassis and suspension upgrades, making it a limited-edition, performance‑focused sedan for those seeking a premium and dynamic driving experience.",
  additionalInfo: 'The Opel Vectra C OPC elevates the standard Vectra with a turbocharged engine and sport-tuned dynamics, offering an exhilarating driving experience without sacrificing everyday usability.',
  reviews: [
    'Praised for its dynamic performance and agile handling.',
    'A perfect blend of practicality and enhanced sporty performance.'
  ]
};

const car13 = {
  brand: 'Ford',
  model: 'Mustang GT Coupé',
  year: 2005,
  price: 25000,
  image: 'images/cars/ford_mustang_gt_coupe_2005.jpg',
  flag: 'images/flags/usa.jpg',
  country: 'USA',

  // Engine & Performance
  engine: '4.6L V8',
  horsepower: 300,             // Approximately 300 hp
  torque: 320,                 // Approximately 320 lb-ft
  transmission: '5-speed manual',
  drivetrain: 'RWD',
  redline: '6500 rpm',
  acceleration: '0-100 km/h in 5.3s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈1600 kg',
  powerToWeight: '≈5.3 kg/hp',
  
  // Chassis & Suspension
  platform: 'S197',
  suspension: 'Independent front suspension, live rear axle with performance tuning',
  brakes: {
    front: 'Ventilated discs (≈350mm)',
    rear: 'Ventilated discs (≈340mm)'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Subtle aerodynamic enhancements with a prominent front grille and rear spoiler',
    liftReduction: 'Optimized for improved downforce'
  },
  
  // Interior & Features
  interior: {
    seats: 'Sport bucket seats with leather trim',
    steeringWheel: 'Leather-wrapped sport steering wheel',
    gearKnob: 'Standard shift knob',
    instrumentation: 'Analog gauges with a central tachometer and digital clock'
  },
  
  // Additional Info
  productionNotes: "Hailing from the S197 generation, the 2005 Ford Mustang GT Coupe blends classic American muscle with modern engineering through its robust 4.6L V8 engine delivering 300 hp and 320 Nm torque, designed to offer an accessible yet exhilarating performance while maintaining the iconic styling and heritage that has made the Mustang a perennial favorite.",
  additionalInfo: 'The 2005 Ford Mustang GT Coupé offers classic American muscle with a robust V8 engine and distinctive styling that blends performance with everyday usability.',
  reviews: [
    'Celebrated for its raw power and iconic design.',
    'A perfect blend of performance and heritage in a modern package.'
  ]
};

const car14 = {
  brand: 'Ferrari',
  model: 'F40',
  year: 1987,
  price: 1500000,
  image: 'images/cars/ferrari_f40.jpg',
  flag: 'images/flags/italy.jpg',
  country: 'Italy',

  // Engine & Performance
  engine: '2.9L twin-turbo V8',
  horsepower: 471,             // Approximately 471 hp
  torque: 426,                 // Approximately 426 lb-ft
  transmission: '5-speed manual',
  drivetrain: 'RWD',
  redline: '7000 rpm',
  acceleration: '0-100 km/h in 3.8s',
  topSpeed: '324 km/h (201 mph)',
  weight: '≈1100 kg',
  powerToWeight: '≈2.3 kg/hp',
  
  // Chassis & Suspension
  platform: 'Carbon-kevlar composite chassis',
  suspension: 'Double wishbone front and rear with race-tuned dampers',
  brakes: {
    front: 'Ventilated discs',
    rear: 'Ventilated discs'
  },
  limitedSlipDiff: true,
  
  // Exterior & Aerodynamics
  bodyStyle: '2-door coupe',
  aerodynamics: {
    kit: 'Iconic, minimalist bodywork designed for maximum downforce',
    liftReduction: 'Engineered for extreme aerodynamic efficiency'
  },
  
  // Interior & Features
  interior: {
    seats: 'Stripped-down racing seats with minimal amenities',
    steeringWheel: 'Spartan, functional steering wheel',
    gearKnob: 'Classic manual gear lever',
    instrumentation: 'Analog gauges with a central tachometer'
  },
  
  // Additional Info
  productionNotes: "Produced in limited numbers from 1987 to 1992 to commemorate Ferrari’s 40th anniversary, the F40 is an engineering icon featuring a 2.9L twin‑turbo V8 engine that generates 471 hp and 426 Nm torque, coupled with a revolutionary carbon‑Kevlar composite chassis that reduced weight and enhanced rigidity, establishing it as one of the most legendary supercars in automotive history.",
  additionalInfo: 'The Ferrari F40 is an automotive legend, renowned for its raw performance, minimalist design, and status as one of the last true analog supercars.',
  reviews: [
    'A masterpiece of automotive engineering and raw performance.',
    'Its iconic design and exhilarating driving experience make it a timeless classic.'
  ]
};

const car15 = {
  brand: 'Rolls Royce',
  model: 'Phantom',
  year: 2025,
  price: 450000,
  image: 'images/cars/rolls_royce_phantom_2025.jpg',
  flag: 'images/flags/uk.jpg',
  country: 'United Kingdom',

  // Engine & Performance
  engine: '6.75L V12 twin-turbo',
  horsepower: 563,           // Approximately 563 hp
  torque: 664,               // Approximately 664 lb-ft
  transmission: '8-speed automatic',
  drivetrain: 'RWD',
  redline: '6000 rpm',
  acceleration: '0-100 km/h in 5.2s',
  topSpeed: '250 km/h (155 mph)',
  weight: '≈2500 kg',
  powerToWeight: '≈4.4 kg/hp',
  
  // Chassis & Suspension
  platform: 'Bespoke luxury architecture',
  suspension: 'Adaptive air suspension tuned for supreme comfort',
  brakes: {
    front: 'Advanced ventilated discs',
    rear: 'Advanced ventilated discs'
  },
  limitedSlipDiff: false,
  
  // Exterior & Aerodynamics
  bodyStyle: '4-door sedan',
  aerodynamics: {
    design: 'Hand-crafted body with integrated aerodynamic enhancements for reduced drag and refined presence'
  },
  
  // Interior & Features
  interior: {
    seats: 'Hand-stitched leather seats with customizable embroidery',
    steeringWheel: 'Wood-rimmed multifunction steering wheel',
    gearKnob: 'Elegant automatic gear lever',
    instrumentation: 'Digital displays with analog-inspired dials and a bespoke infotainment system'
  },
  
  // Additional Info
  productionNotes: "Embodying the zenith of bespoke luxury, the 2025 Rolls‑Royce Phantom is crafted with a 6.75L V12 twin‑turbo engine producing 563 hp and 664 Nm torque, all wrapped in an exquisitely customizable, hand‑crafted architecture that seamlessly blends cutting‑edge power with timeless opulence, designed for a discerning clientele who demand unparalleled refinement and individuality.",
  additionalInfo: 'The Rolls Royce Phantom 2025 redefines automotive luxury with unparalleled craftsmanship, cutting-edge technology, and an exquisitely refined driving experience. Every detail is meticulously designed to ensure supreme comfort and performance.',
  reviews: [
    'An epitome of luxury and sophistication.',
    'A masterpiece that seamlessly blends advanced engineering with timeless elegance.'
  ]
};

// Array of car objects
const cars = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10, car11, car12, car13, car14, car15];

// Function to handle car selection
function selectCar(brand, model, year, price, extraInfo) {
  // Format the price using toLocaleString
  const formattedPrice = price.toLocaleString('de-DE');
  
  // Log all selected car details for debugging
  console.log("Selected Car:", brand, model, year, formattedPrice, extraInfo);
  
  // Build the HTML content with additional information if available
  let detailsHTML = `
    <img src="${extraInfo.image}" alt="${brand} ${model}" style="max-width:100%; height:auto;">
    <div style="text-align: left;">
      <p><strong>Engine:</strong> ${extraInfo.engine}</p>
      <p><strong>Horsepower:</strong> ${extraInfo.horsepower} hp</p>
      <p><strong>Torque:</strong> ${extraInfo.torque} Nm</p>
      <p><strong>Transmission:</strong> ${extraInfo.transmission}</p>
      <p><strong>Drivetrain:</strong> ${extraInfo.drivetrain}</p>
      <p><strong>Redline:</strong> ${extraInfo.redline}</p>
      <p><strong>Acceleration:</strong> ${extraInfo.acceleration}</p>
      <p><strong>Top Speed:</strong> ${extraInfo.topSpeed}</p>
      <p><strong>Platform:</strong> ${extraInfo.platform}</p>
      <p><strong>Suspension:</strong> ${extraInfo.suspension}</p>
      <p><strong>Brakes:</strong> Front - ${extraInfo.brakes.front}, Rear - ${extraInfo.brakes.rear}</p>
      <p><strong>Interior:</strong> ${extraInfo.interior.seats}, ${extraInfo.interior.steeringWheel}, Gear Knob: ${extraInfo.interior.gearKnob}</p>
      <p><strong>Production Notes:</strong> ${extraInfo.productionNotes}</p>
      <p><strong>Additional Info:</strong> ${extraInfo.additionalInfo}</p>
      <p><strong>Reviews:</strong> ${extraInfo.reviews.join('; ')}</p>
    </div>`;
  
  // Display the car details in a SweetAlert modal
  Swal.fire({
    title: `${year} ${brand} ${model}`,
    html: detailsHTML,
    confirmButtonText: 'Close'
  });
}

// Function to dynamically render the car cards
function renderCars() {
  const carList = document.getElementById('carList');
  carList.innerHTML = ''; // Clear existing content

  cars.forEach(car => {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'car-card';
    // Pass the whole car object as extraInfo so extra details are available
    card.addEventListener('click', () => selectCar(car.brand, car.model, car.year, car.price, car));

    // Create the image element
    const img = document.createElement('img');
    img.src = car.image;
    img.alt = `${car.brand} ${car.model}`;
    
    // Create the car info container
    const info = document.createElement('div');
    info.className = 'car-info';
    
    // Create and set the title (brand + model)
    const title = document.createElement('h2');
    title.textContent = `${car.brand} ${car.model}`;

    // Create a wrapper div for price and year
    const priceYearContainer = document.createElement('div');
    priceYearContainer.className = 'price-year-container';

    // Create and set the year paragraph
    const yearElem = document.createElement('p');
    yearElem.textContent = `${car.year}`;
    yearElem.className = 'car-year';

    // Create and set the price paragraph
    const priceElem = document.createElement('p');
    priceElem.textContent = `${car.price.toLocaleString('de-DE')}€`;
    priceElem.className = 'car-price';

    // Append objects to container
    info.appendChild(title);
    priceYearContainer.appendChild(yearElem);
    priceYearContainer.appendChild(priceElem);
    info.appendChild(priceYearContainer);

    // Append the image and info container to the card
    card.appendChild(img);
    card.appendChild(info);

    // Append the card to the car list container
    carList.appendChild(card);
  });
}

// Render cars when the page loads
window.onload = renderCars;

console.log("window.electronAPI:", window.electronAPI);

document.getElementById("myButton").addEventListener("click", async () => {
  const response = await window.electronAPI.ye();
  console.log(response); // Should log "Response from main process!"
});