// Method to create car card
createCarCard(brand, model, year, price, extraInfo);

// Function to dynamically render the car cards
function renderCars() {
  const carList = document.getElementById('carList');
  carList.innerHTML = ''; // Clear existing content

  cars.forEach(car => {
    const card = createCarCard(car);
    carList.appendChild(card);
  });
}

function createCarCard(car) {
  // Create the card container
  const card = document.createElement('div');
  card.className = 'car-card';
  // Pass the whole car object as extraInfo so extra details are available
  card.addEventListener('click', () => selectCar(car.brand, car.model, car.year, car.price, car));

  // Create the image element
  const img = document.createElement('img');
  img.src = car.image;
  img.alt = `${car.brand} ${car.model}`;
  img.draggable = false;

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

  return card;
}

// Render cars when the page loads
window.onload = renderCars;
