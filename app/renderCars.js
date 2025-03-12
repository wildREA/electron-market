// Define your car objects
import { car1, car2, car3, car4, car5, car6, car7, car8, car9, car10, car11, car12, car13, car14, car15} from './carList.js';

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
    <div style="user-select: none;">
      <img src="${extraInfo.image}" alt="${brand} ${model}" style="max-width:100%; height:auto;" draggable="false">
      <div style="text-align: left; margin-top: 20px;">
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
      </div>
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

document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.getElementById('profilePic');
  const dropdownMenu = document.getElementById('dropdownMenu');

  // Toggle dropdown when clicking the profile picture
  profilePic.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
    console.log("Visibility: " + dropdownMenu.checkVisibility());
  });

  // Close dropdown when clicking outside the profile container
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-container') && !e.target.closest('.card')) {  // Fix logic for debugging for card lists, include and exclude for only profile container
      dropdownMenu.classList.remove('active');
      console.log("Visibility: false");
    }
  });
});
