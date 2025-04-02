// Fetch car data from the API
async function fetchCarData() {
  try {
    const response = await fetch('http://localhost:3000/cars', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    renderCars(result.message);
  } catch (err) {
    console.error("Error retrieving car data:", err);
    return null;
  }
}

// Render the car cards into the container
function renderCars(cars) {
  const carList = document.getElementById('carList');
  carList.innerHTML = ''; // Clear existing content

  cars.forEach(car => {
    const card = createCarCard(car);
    carList.appendChild(card);
  });
}

// Create a card element for each car
function createCarCard(car) {
  const card = document.createElement('div');
  card.className = 'car-card';

  // Create and append the car image
  const img = document.createElement('img');
  img.src = car.image;
  img.alt = `${car.brand} ${car.model}`;
  card.appendChild(img);

  // Create and append a title (brand and model)
  const title = document.createElement('h3');
  title.textContent = `${car.brand} ${car.model}`;
  title.style.paddingLeft = '10px';
  title.style.paddingTop = '5px';
  card.appendChild(title);

  // Create and append info (year and formatted price)
  const info = document.createElement('p');
  info.textContent = `${car.year} - ${car.price.toLocaleString('de-DE')}€`;
  info.style.paddingLeft = '10px';
  card.appendChild(info);

  // Attach a click event to show detailed info in a modal
  card.addEventListener('click', () => showCarDetails(car));

  return card;
}

// Show detailed car information using SweetAlert2
function showCarDetails(car) {
  // Destructure the car object for clarity
  const {
    brand, model, year, price, image, color, fuel, engine, horsepower,
    torque, transmission, drivetrain, redline, acceleration, top_speed,
    platform, suspension, brakes_front, brakes_rear, production_notes,
    additional_info
  } = car;

  const formattedPrice = price.toLocaleString('de-DE');

  // Build the HTML content for the modal
  const detailsHTML = `
    <div style="user-select: none;">
      <img src="${image}" alt="${brand} ${model}" style="max-width:100%; height:auto;" draggable="false">
      <div style="text-align: left; margin-top: 20px;">
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Fuel:</strong> ${fuel}</p>
        <p><strong>Engine:</strong> ${engine}</p>
        <p><strong>Horsepower:</strong> ${horsepower} hp</p>
        <p><strong>Torque:</strong> ${torque} Nm</p>
        <p><strong>Transmission:</strong> ${transmission}</p>
        <p><strong>Drivetrain:</strong> ${drivetrain}</p>
        <p><strong>Redline:</strong> ${redline} rpm</p>
        <p><strong>Acceleration:</strong> ${acceleration}</p>
        <p><strong>Top Speed:</strong> ${top_speed}</p>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Suspension:</strong> ${suspension}</p>
        <p><strong>Brakes:</strong> Front - ${brakes_front}, Rear - ${brakes_rear}</p>
        <p><strong>Production Notes:</strong> ${production_notes}</p>
        <p><strong>Additional Info:</strong> ${additional_info}</p>
      </div>
    </div>
  `;

  Swal.fire({
    title: `${year} ${brand} ${model} - ${formattedPrice}€`,
    html: detailsHTML,
    confirmButtonText: 'Close'
  });
}

// Fetch the data when the page loads
window.addEventListener('DOMContentLoaded', fetchCarData);
