"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sweetalert2_1 = __importDefault(require("sweetalert2"));
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
        return data.imageBase64;
    }
    catch (error) {
        console.warn("Unable to fetch profile image.");
        return null;
    }
};
// Displays the final profile using SweetAlert2
const displayProfileCard = (user, imageData) => {
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
        <img src="https://flagcdn.com/w40/${user.countryCode?.toLowerCase()}.png" class="custom-flag" />
      </div>
      <div class="custom-biography">${user.biography || ''}</div>
      <div class="custom-badge">${user.sellerStatus || ''} - ${user.businessType || ''}</div>
    </div>
  `;
    sweetalert2_1.default.fire({
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
      ${missingFields.includes('countryCode') ? `
        <div>
          <label for="countryCode">Country Code</label>
          <select id="countryCode" name="countryCode">
            <option value="">Select Country Code</option>
            <option value="us">US</option>
            <option value="gb">GB</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="it">IT</option>
          </select>
        </div>
      ` : ''}
      ${missingFields.includes('profileImage') ? `
        <div>
          <label for="profileImage">Profile Image</label>
          <input type="file" id="profileImage" name="profileImage" accept="image/*">
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
    const result = await sweetalert2_1.default.fire({
        title: 'Complete Your Profile',
        html: formHTML,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            const formElement = document.getElementById('profileCompletionForm');
            const formData = new FormData(formElement);
            const updateData = {};
            if (missingFields.includes('countryCode')) {
                updateData.countryCode = formData.get('countryCode');
            }
            if (missingFields.includes('biography')) {
                updateData.biography = formData.get('biography');
            }
            if (missingFields.includes('profileImage')) {
                const fileInput = document.getElementById('profileImage');
                if (fileInput.files && fileInput.files[0]) {
                    updateData.profileImage = await convertFileToBase64(fileInput.files[0]);
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
        // Pre-fetch profile image if provided as a file path
        let fetchedProfileImage = null;
        if (user.profileImage) {
            try {
                fetchedProfileImage = await fetchProfileImage(user.profileImage);
            }
            catch (error) {
                console.warn("Error while retrieving profile image:", error);
            }
        }
        // Determine missing fields that need to be completed
        const requiredFields = ['countryCode', 'profileImage', 'biography'];
        const missingFields = requiredFields.filter(field => !user[field]);
        if (missingFields.length > 0) {
            const result = await promptProfileCompletion(missingFields);
            if (result.isConfirmed && result.value) {
                const updatePayload = {
                    username,
                    password,
                    ...result.value
                };
                console.log("Sending profile update payload:", updatePayload);
                await fetchJSON('http://localhost:3000/updateProfile', updatePayload);
                // Merge new data into the user object
                user = { ...user, ...result.value };
                // If a new profile image was provided, update our local copy
                if (result.value.profileImage) {
                    fetchedProfileImage = result.value.profileImage;
                }
            }
            else {
                // User canceled profile completion
                return;
            }
        }
        sweetalert2_1.default.close();
        // Display the final profile card
        displayProfileCard(user, fetchedProfileImage);
    }
    catch (error) {
        console.error("Error building profile card:", error);
        sweetalert2_1.default.fire('Error', 'Failed to process profile information', 'error');
    }
}
// Expose functions to the global window object
window.buildProfileCard = buildProfileCard;
window.fetchProfileImage = fetchProfileImage;
// Trigger the profile card build process
buildProfileCard();
