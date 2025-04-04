// Helper to convert a file to a Base64 string
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            // Remove the data URL prefix and return only the Base64 part
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
// Helper to fetch JSON data from an API endpoint
const fetchJSON = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
};
// Fetches the profile image, either as Base64 data or by retrieving it from a file path.
const fetchProfileImage = async (imageIdentifier) => {
    // If the imageIdentifier looks like Base64 data, return it directly.
    if (imageIdentifier.startsWith('data:image') || imageIdentifier.length > 100) {
        return imageIdentifier;
    }
    // Otherwise, assume it is a file path and fetch the Base64 image from the server.
    try {
        const data = await fetchJSON('http://localhost:3000/getProfileImage', { imagePath: imageIdentifier });
        return data.data.imageBase64;
    }
    catch (error) {
        console.warn("Unable to fetch profile image.");
        return null;
    }
};
// Displays the final profile using SweetAlert2
const displayProfileCard = (user, imageData) => {
    const sellerStatusDisplay = (user.seller_status !== undefined && user.seller_status !== null) ? user.seller_status : '';
    const sellerTypeDisplay = (user.seller_type !== undefined && user.seller_type !== null) ? user.seller_type : '';
    const profileCardHTML = `
    <div class="custom-profile-card">
      ${imageData ? `
        <img class="custom-profile-img" src="data:image/jpeg;base64,${imageData}" alt="${user.username}'s profile" 
             onerror="console.error('Image failed to load'); this.onerror=null; this.innerHTML='${user.username.charAt(0)}'" />
      ` : `
        <div class="custom-profile-img">${user.username.charAt(0)}</div>
      `}
      <div class="custom-username">
        ${user.username} 
        <img src="https://flagcdn.com/w40/${user.country_code?.toLowerCase()}.png" class="custom-flag" />
      </div>
      <div class="custom-biography">${user.biography || ''}</div>
      <div class="custom-badge">${sellerStatusDisplay} - ${sellerTypeDisplay}</div>
    </div>
  `;
    Swal.fire({
        html: profileCardHTML,
        width: '350px',
        showConfirmButton: true,
        confirmButtonText: 'Close'
    });
};
// Prompts the user to complete missing profile fields using SweetAlert2
const promptProfileCompletion = async (missingFields) => {
    const formHTML = `
    <form id="profileCompletionForm" class="modern-form">
      ${missingFields.includes('country_code') ? `
        <div>
          <label for="country_code">Country Code</label>
          <select id="country_code" name="country_code">
            <option value="">Select Country Code</option>
            <option value="us">US</option>
            <option value="gb">GB</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="it">IT</option>
          </select>
        </div>
      ` : ''}
      ${missingFields.includes('profile_image') ? `
        <div>
          <label for="profile_image">Profile Image</label>
          <input type="file" id="profile_image" name="profile_image" accept="image/*">
        </div>
      ` : ''}
      ${missingFields.includes('biography') ? `
        <div>
          <label for="biography">About You</label>
          <textarea id="biography" name="biography" placeholder="Tell us about yourself"></textarea>
        </div>
      ` : ''}
    </form>
  `;
    const result = await Swal.fire({
        title: 'Complete Your Profile',
        html: formHTML,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            const formElement = document.getElementById('profileCompletionForm');
            const formData = new FormData(formElement);
            const updateData = {};
            if (missingFields.includes('country_code')) {
                updateData.country_code = formData.get('country_code');
            }
            if (missingFields.includes('biography')) {
                updateData.biography = formData.get('biography');
            }
            if (missingFields.includes('profile_image')) {
                const fileInput = document.getElementById('profile_image');
                if (fileInput.files && fileInput.files[0]) {
                    updateData.profile_image = await convertFileToBase64(fileInput.files[0]);
                }
            }
            return updateData;
        }
    });
    return { isConfirmed: result.isConfirmed, value: result.value };
};
// Main function to create or update the profile
async function buildProfileCard() {
    console.log("Building profile card...");
    if (!window.userinformation || !window.userinformation.username) {
        console.warn("User information not available.");
        return;
    }
    const { username, password } = window.userinformation;
    try {
        // Fetch profile data
        const profileResponse = await fetchJSON('http://localhost:3000/profile', { username });
        let user = profileResponse.message;
        console.log(user);
        // Pre-fetch profile image if provided as a file path
        let fetchedProfileImage = null;
        if (user.profile_image) {
            try {
                fetchedProfileImage = await fetchProfileImage(user.username);
            }
            catch (error) {
                console.warn("Error while retrieving profile image:", error);
            }
        }
        // Determine missing fields that need to be completed
        const requiredFields = ['country_code', 'profile_image', 'biography'];
        const missingFields = requiredFields.filter(field => !user[field]);
        if (missingFields.length > 0) {
            const result = await promptProfileCompletion(missingFields);
            if (result.isConfirmed && result.value) {
                const updatePayload = {
                    username,
                    password,
                    ...result.value
                };
                await fetchJSON('http://localhost:3000/updateProfile', updatePayload);
                // Merge new data into the user object
                user = { ...user, ...result.value }; // Note that it's not a response from the server; it's user's own input directly
                // If a new profile image was provided, update our local copy
                if (result.value.profile_image) {
                    fetchedProfileImage = result.value.profile_image;
                }
            }
            else {
                // User canceled profile completion
                return;
            }
        }
        Swal.close();
        // Display the final profile card
        displayProfileCard(user, fetchedProfileImage);
    }
    catch (error) {
        console.error("Error building profile card:", error);
        Swal.fire('Error', 'Failed to process profile information', 'error');
    }
}
// Expose functions to the global window object
window.buildProfileCard = buildProfileCard;
window.fetchProfileImage = fetchProfileImage;
// Trigger the profile card build process
buildProfileCard();
