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
  productionNotes: 'Originally a JDM special; US models were limited (≈4000 units)',
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
  flag: 'images/flags/japan.jpg',
  country: 'Japan',

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
  additionalInfo: 'Blending classic muscle car heritage with modern engineering, the 2024 Mustang Dark Horse delivers exhilarating performance and an unmistakably aggressive design.',
  reviews: [
    'Celebrated for its dynamic performance and bold styling.',
    'A modern reinterpretation of the American muscle icon that thrills on every drive.'
  ]
};

const car4 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car5 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car6 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car7 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car8 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car9 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car10 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 28000,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

// Array of car objects
const cars = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10];

// Function to handle car selection
function selectCar(brand, model, year, price, extraInfo) {
  // Format the price using toLocaleString
  const formattedPrice = price.toLocaleString('de-DE');
  
  // Log all selected car details for debugging
  console.log("Selected Car:", brand, model, year, formattedPrice, extraInfo);
  
  // Build the HTML content with additional information if available
  let detailsHTML = `
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Price:</strong> ${formattedPrice}€</p>`;
    
  // Only display extra details if extraInfo is provided and has engine property
  if (extraInfo && extraInfo.engine) {
    detailsHTML += `
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
      <p><strong>Reviews:</strong> ${extraInfo.reviews.join('; ')}</p>`;
  }
  
  // Display the car details in a SweetAlert modal
  Swal.fire({
    title: `${brand} ${model}`,
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
