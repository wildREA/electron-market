// Define your car objects
const car1 = {
  brand: 'Honda',
  model: 'Integra Type R DC2',
  year: 1996,
  price: 1,
  image: 'images/cars/honda_integra_type_r_dc2_1996.jpg',
  flag: 'images/flags/japan.jpg',
  country: 'Japan'
};

const car2 = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2001,
  price: 1,
  image: 'images/cars/toyota_corolla_2001.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

const car3 = {
  brand: 'Ford',
  model: 'Mustang Dark Horse',
  year: 2024,
  price: 1,
  image: 'images/cars/ford_mustang_dark_horse_2024.jpg',
  flag: 'images/flags/japan.jpg',
  country: ''
};

// Array of car objects
const cars = [car1, car2, car3];

// Function to handle car selection
function selectCar(brand, model, year, price) {
  console.log("Selected Car:", brand, model, year, price);
  alert("You selected a " + brand + " " + model + " (" + year + ")" + " for " + price + "€");
}

// Function to dynamically render the car cards
function renderCars() {
  const carList = document.getElementById('carList');
  carList.innerHTML = ''; // Clear existing content

  cars.forEach(car => {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'car-card';
    card.addEventListener('click', () => selectCar(car.brand, car.model, car.year, car.price));

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
    const year = document.createElement('p');
    year.textContent = `${car.year}`;
    year.className = 'car-year';

    // Create and set the price paragraph
    const price = document.createElement('p');
    price.textContent = `${car.price}€`;
    price.className = 'car-price';

    // Append objects to container
    info.appendChild(title)
    priceYearContainer.appendChild(year);
    priceYearContainer.appendChild(price);

    // Append child container to parent
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
