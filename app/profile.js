// Function to display the profile modal using SweetAlert2
function viewProfile(username, country, sellerStatus, sellerType) {
  // Build the HTML content with additional information
  let detailsHTML = `
    <p>Status: ${sellerStatus}</p>
    <p>Type: ${sellerType}</p>`;
  
  // Display the user details in a SweetAlert modal
  Swal.fire({
    title: `${username} - ${country}`,
    html: detailsHTML,
    confirmButtonText: 'Close'
  });
}

// (Optional) Function to create a profile card element—for example, if you want to show a list of profiles later
function createProfileCard(profile) {
  // Create the card container
  const card = document.createElement('div');
  card.classList.add('profile-card');
  
  // Populate the card with profile information
  card.innerHTML = `
    <h3>${profile.username}</h3>
    <p>${profile.country}</p>
    <p>${profile.sellerStatus}</p>
    <p>${profile.sellerType}</p>
  `;
  
  // When the card is clicked, show the modal with profile details
  card.addEventListener('click', () => {
    viewProfile(profile.username, profile.country, profile.sellerStatus, profile.sellerType);
  });
  
  return card;
}

// Instead, attach the click event to the Profile button in the dropdown menu
document.getElementById('profile').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior if necessary
  
  // Replace hardcoded values with dynamic data from database
  const username = "Ahmet Hmoud";
  const country = "Arabistan";
  const sellerStatus = "Seller";
  const sellerType = "Private";
  const color = "Gotham Night";
  
  viewProfile(username, country, sellerStatus, sellerType);
});
