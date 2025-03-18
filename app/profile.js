async function createProfile() {
  console.log("Creating profile card...");

  // Helper function to convert file to base64
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data URL prefix
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  try {
    // Ensure user info exists
    if (!window.userinformations || !window.userinformations.username) {
      console.warn("User information not available.");
      return;
    }

    const { username, password } = window.userinformations;

    // Retrieve profile data from the API
    let response = await fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let user = await response.json();

    // Check required fields
    const requiredFields = ['countryCode', 'profileImage', 'description'];
    const missingFields = requiredFields.filter(field => !user[field]);

    if (missingFields.length > 0) {
      const formHTML = `
        <style>
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

      const { value: formValues } = await Swal.fire({
        title: 'Complete Your Profile',
        html: formHTML,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
          const formData = new FormData(document.getElementById('modernProfileForm'));
          const result = {};

          if (missingFields.includes('countryCode')) {
            result.countryCode = formData.get('countryCode');
          }
          if (missingFields.includes('description')) {
            result.description = formData.get('description');
          }
          if (missingFields.includes('profileImage')) {
            const fileInput = document.getElementById('profileImage');
            if (fileInput.files[0]) {
              result.profileImage = await readFileAsBase64(fileInput.files[0]);
            }
          }
          return result;
        }
      });

      if (formValues) {
        const updatePayload = {
          username,
          password,
          ...formValues
        };

        // Send update request
        const updateResponse = await fetch('http://localhost:3000/updateProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });

        if (!updateResponse.ok) throw new Error(`Update failed: ${updateResponse.status}`);
        const updatedData = await updateResponse.json();
        user = { ...user, ...updatedData };
      }
    }

    // Build profile card
    const profileHTML = `
      <style>
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

    Swal.fire({
      title: 'Profile',
      html: profileHTML,
      showConfirmButton: true,
      confirmButtonText: 'Close'
    });

    console.log("Created profile card!");
  } catch (error) {
    console.error("Error in profile creation:", error);
    Swal.fire('Error', 'Failed to process profile information', 'error');
  }
}

window.createProfile = createProfile;