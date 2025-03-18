async function createProfile() {
  console.log("Creating profile card...");

  try {
    // Retrieve user data from the database                                                                                                                                                                                \atabase through the API endpoint
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
  } catch (error) {
    console.error("Error retrieving user profile:", error);
  }
}

// Expose the function so it can be called from other scripts
window.createProfile = createProfile;

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
