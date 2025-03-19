async function createProfile() {
  console.log("Creating profile card...");

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

    let data = await response.json();
    console.log("User data:", data);

    let user = data.message; // Extract the message object

    // Fetch the profile image if it exists
    let profileImageBase64 = null;
    if (user.profileImage) {
      try {
        const imageResponse = await fetch(`http://localhost:3000/getProfileImage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imagePath: user.profileImage })
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          profileImageBase64 = imageData.imageBase64;
        } else {
          console.warn("Failed to fetch profile image");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }

    const requiredFields = ['countryCode', 'profileImage', 'biography'];
    const missingFields = requiredFields.filter(field => !user[field]);

    console.log("Missing fields:", missingFields);

    if (missingFields.length > 0) {
      // Create form HTML for missing fields
      const formHTML = `
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
          ${missingFields.includes('biography') ? `
            <div>
              <label for="biography">About You</label>
              <textarea id="biography" name="biography" placeholder="Tell us about yourself"></textarea>
            </div>
          ` : ''}
        </form>
      `;

      // Helper function to convert file to base64
      const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data URL prefix
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      };

      const result = await Swal.fire({
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
          if (missingFields.includes('biography')) {
            result.biography = formData.get('biography');
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

      if (result.isConfirmed && result.value) {
        const updatePayload = {
          username,
          password,
          ...result.value
        };

        // Send update request
        const updateResponse = await fetch('http://localhost:3000/updateProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });

        if (!updateResponse.ok) throw new Error(`Update failed: ${updateResponse.status}`);
        const updatedData = await updateResponse.json();
        user = { ...user, ...updatedData.message };

        // If profile image was updated, use it directly
        if (result.value.profileImage) {
          profileImageBase64 = result.value.profileImage;
        } else if (updatedData.message.profileImage && updatedData.message.profileImage !== user.profileImage) {
          // Fetch the new profile image
          const imageResponse = await fetch(`http://localhost:3000/getProfileImage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imagePath: updatedData.message.profileImage })
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            profileImageBase64 = imageData.imageBase64;
          }
        }
      } else {
        // User canceled the form submission
        return;
      }
    }

    // Close any existing SweetAlert (if present)
    Swal.close();

    // Build simple profile display
    finalProfile(user)

    console.log("Created profile display!");
  } catch (error) {
    console.error("Error in profile creation:", error);
    Swal.fire('Error', 'Failed to process profile information', 'error');
  }
}

window.createProfile = createProfile;

// Call the function to create the profile card
function finalProfile(user) {
  const profileHTML = `
    <style>
      .custom-profile-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #1e1e2f, #3a3a5a);
        color: white;
        font-family: Arial, sans-serif;
      }
      .custom-profile-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #555;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .custom-flag {
        width: 24px;
        height: 16px;
        margin-left: 5px;
      }
      .custom-username {
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
      }
      .custom-biography {
        font-size: 14px;
        margin-top: 8px;
        text-align: center;
        opacity: 0.8;
      }
      .custom-badge {
        background: #ff9800;
        color: black;
        padding: 4px 8px;
        border-radius: 5px;
        font-size: 12px;
        margin-top: 8px;
      }
    </style>
    <body>
      <div class="custom-profile-card">
        <div class="custom-profile-img">${user.username.charAt(0)}</div>
        <div class="custom-username">${user.username} <img src="https://flagcdn.com/w40/${user.countryCode.toLowerCase()}.png" class="custom-flag" /></div>
        <div class="custom-biography">${user.biography}</div>
        <div class="custom-badge">${user.sellerStatus} - ${user.businessType}</div>
      </div>
    </body>
  `;

  Swal.fire({
    html: profileHTML,
    width: '350px',
    showConfirmButton: true,
    confirmButtonText: 'Close'
  });
}
