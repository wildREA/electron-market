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
