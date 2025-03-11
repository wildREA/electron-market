<<<<<<< HEAD
async function createProfile() {
  console.log("Creating profile card...");
=======
// Function to create the window for the user profile model
function createProfile() {
  console.log("Creating profile card...");

    // Populate after a successful login - temporary variable
    const user = {
    username: 'ahmetHmoudT0pG_benz',    // Registered username.
    countryCode: "uk.jpg",              // Reference the flag image (e.g., "us", "gb", etc.) - Make a new file filled with references to ./images/flags
    profileImage: 'ahmetHmoudT0pG_benz.jpg',    // profileImage asset name derived from username
    sellerStatus: 'Top G',              // "Seller" / "Customer"
    businessType: 'Multi-binaire'       // "Commercial" / "Private"
};
>>>>>>> 0e93f633f4a9b6cbe02c30a027f151dec6621595

  try {
    // Retrieve user data from your database through the API endpoint
    const response = await fetch('/profile');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user = await response.json();

    // Build the profile HTML using the database values
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

    console.log("Created profile card!");
<<<<<<< HEAD
  } catch (error) {
    console.error("Error retrieving user profile:", error);
  }
=======
>>>>>>> 0e93f633f4a9b6cbe02c30a027f151dec6621595
}

// Expose the function so it can be called from other scripts
window.createProfile = createProfile;
