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
  
  viewProfile(username, country, sellerStatus, sellerType);
});

// Function to create the window for the user profile model
function createProfile() {
    // Populate after a successful login - temporary variable
    const user = {
    username: "Ahmet Hmoud",                // Registered username.
    countryCode: "uk.jpg",                      // Reference the flag image (e.g., "us", "gb", etc.) - Make a new file filled with references to ./images/flags
    profileImage: "ahmetHmoudT0pG_benz.jpg",    // profileImage asset name derived from username
    sellerStatus: "Top G",                  // "Seller" / "Customer"
    businessType: "Multi-binaire"           // "Commercial" / "Private"
};

const profileHTML = `
<div class="profile-card">
<div class="profile-username">
        ${user.username}
        <img src="images/flags/${user.countryCode}" alt="${user.countryCode}" draggable="false">
        </div>
        <img class="profile-image" src="images/profiles/${user.profileImage}" alt="Profile Image" draggable="false">
        <div class="seller-info">
        <div>Status: ${user.sellerStatus}</div>
        <div>Type: ${user.businessType}</div>
        </div>
    </div>
    `;

    // Use SweetAlert2 to display the profile modal
    Swal.fire({
    title: 'Profile',
    html: profileHTML,
    showConfirmButton: true,
    confirmButtonText: 'Close'
    });
}

// Expose the function so it can be called from other scripts
window.createProfile = createProfile;
