async function createProfile() {
  console.log("Creating profile card...");

  try {
    // Ensure user info exists
    if (!window.userinformations || !window.userinformations.username) {
      console.warn("User information not available.");
      return;
    }

    const username = window.userinformations.username;

    // Retrieve profile data from the API (sending username in the body)
    let response = await fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let user = await response.json();

    // We only require these fields now
    const requiredFields = ['countryCode', 'profileImage', 'description'];
    const missingFields = requiredFields.filter(field => !user[field]);

    // If any required field is missing, show the update modal
    if (missingFields.length > 0) {
      const formHTML = `
        <style>
          /* Modern form styling */
          .modern-form {
            font-family: 'Roboto', sans-serif;
            padding: 20px;
            color: #444;
          }
          .modern-form label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 14px;
          }
          .modern-form input,
          .modern-form select,
          .modern-form textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-bottom: 15px;
            font-size: 14px;
            transition: border-color 0.3s ease;
          }
          .modern-form input:focus,
          .modern-form select:focus,
          .modern-form textarea:focus {
            border-color: #007BFF;
            outline: none;
          }
          .modern-form textarea {
            resize: vertical;
            min-height: 80px;
          }
        </style>
        <form id="modernProfileForm" class="modern-form">
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
                <!-- Add more options as needed -->
              </select>
            </div>
          ` : ''}
          ${missingFields.includes('profileImage') ? `
            <div>
              <label for="profileImage">Profile Image</label>
              <input type="file" id="profileImage" name="profileImage" accept="image/*">
            </div>
          ` : ''}
          ${missingFields.includes('description') ? `
            <div>
              <label for="description">About You</label>
              <textarea id="description" name="description" placeholder="Tell us about yourself"></textarea>
            </div>
          ` : ''}
        </form>
      `;

      await Swal.fire({
        title: 'Complete Your Profile',
        html: formHTML,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          // Return an object if needed (not used directly in the API call)
          const form = document.getElementById('modernProfileForm');
          const formData = new FormData(form);
          let result = {};
          if (missingFields.includes('countryCode')) {
            result.countryCode = formData.get('countryCode');
          }
          if (missingFields.includes('profileImage')) {
            const fileInput = document.getElementById('profileImage');
            result.profileImage = fileInput.files[0] || null;
          }
          if (missingFields.includes('description')) {
            result.description = formData.get('description');
          }
          return result;
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Build a FormData payload for the update API call
          const form = document.getElementById('modernProfileForm');
          const formData = new FormData(form);
          let updatePayload = new FormData();

          if (missingFields.includes('countryCode')) {
            updatePayload.append('countryCode', formData.get('countryCode'));
          }
          if (missingFields.includes('profileImage')) {
            const fileInput = document.getElementById('profileImage');
            if (fileInput.files[0]) {
              updatePayload.append('profileImage', fileInput.files[0]);
            }
          }
          if (missingFields.includes('description')) {
            updatePayload.append('description', formData.get('description'));
          }
          // Include username to identify the user
          updatePayload.append('username', username);

          // Call the update API
          const updateResponse = await fetch('http://localhost:3000/updateProfile', {
            method: 'POST',
            body: updatePayload
          });
          if (!updateResponse.ok) {
            throw new Error(`Update failed: ${updateResponse.status}`);
          }
          const updatedData = await updateResponse.json();
          // Merge the updated data into the original user object
          user = { ...user, ...updatedData };
          console.log('Profile updated successfully:', updatedData);
        }
      });
    }

    // Build the final profile card using your original design
    const profileHTML = `
      <style>
        /* Original profile card styles with slight modern tweaks */
        .profile-card {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 15px;
          max-width: 350px;
          margin: 20px auto;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          background: #fff;
        }
        .profile-username {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profile-username img {
          width: 24px;
          height: 18px;
        }
        .profile-image {
          width: 100%;
          max-width: 300px;
          border-radius: 6px;
          display: block;
          margin: 10px auto;
        }
        .profile-description {
          font-size: 16px;
          color: #555;
          text-align: center;
        }
      </style>
      <div class="profile-card">
        <div class="profile-username">
          ${user.username}
          <img src="images/flags/${user.countryCode}" alt="${user.countryCode}" draggable="false">
        </div>
        <img class="profile-image" src="images/profiles/${user.profileImage}" alt="Profile Image" draggable="false">
        <div class="profile-description">
          ${user.description ? user.description : 'No description provided.'}
        </div>
      </div>
    `;

    // Display the final profile card in a SweetAlert modal using your original profile page design
    Swal.fire({
      title: 'Profile',
      html: profileHTML,
      showConfirmButton: true,
      confirmButtonText: 'Close'
    });

    console.log("Created profile card!");

  } catch (error) {
    console.error("Error retrieving or updating user profile:", error);
  }
}

// Expose the function so it can be called from other scripts
window.createProfile = createProfile;
