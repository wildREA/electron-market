async function createProfile() {
  console.log("Creating profile card...");

  try {
    // Ensure user info exists
    if (!window.userinformation || !window.userinformation.username) {
      console.warn("User information not available.");
      return;
    }
    const { username, password } = window.userinformation;
    // Retrieve profile data from the API
    let response = await fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    let user = data.message;
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
    // Helper function/variable to convert file to base64
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data URL prefix
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    };

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
        console.log("Sending update request with payload:", updatePayload);
        const updateResponse = await fetch('http://localhost:3000/updateProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });
        if (!updateResponse.ok) throw new Error(`Update failed: ${updateResponse.status}`);
        //const updatedData = await updateResponse.json();
        //No real data it only returns error message use if needed.

      } else {
        // User canceled the form submission
        return;
      }
    }
    // Close any existing SweetAlert (if present)
    Swal.close();
    // Build simple profile display
    finalProfile(user)
  } catch (error) {
    console.error("Error in profile creation:", error);
    Swal.fire('Error', 'Failed to process profile information', 'error');
  }
}

async function getProfileImage(path = window.userinformation.profileImage) {
  //path += ".png";
  console.log("Fetching profile image:", path);
  const imageResponse = await fetch(`http://localhost:3000/getProfileImage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imagePath: path })
  });



  if (imageResponse.ok) {
    const imageData = await imageResponse.json();
    console.log("Look here: " + imageData.data.imageBase64 );
    profileImageBase64 = imageData.data.imageBase64;
    console.log(profileImageBase64);
    return profileImageBase64;
  }
  else (console.log("Error fetching profile image"));
}

window.createProfile = createProfile;
window.getProfileImage = getProfileImage;

// Call the function to create the profile card
async function finalProfile(user) {
  let img;
  try {
    img = await getProfileImage(user.profileImage);
    console.log("Retrieved profile image base64:", img ? "Base64 data available" : "No image data found");

    if (!img) {
      console.warn("No profile image data returned from getProfileImage()");
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
    img = null;
  }

  const profileHTML = `
    <body>
      <div class="custom-profile-card">
        ${img ?
      `<img class="custom-profile-img" src="data:image/jpeg;base64,${img}" alt="${user.username}'s profile" onerror="console.error('Image failed to load'); this.onerror=null; this.innerHTML='${user.username.charAt(0)}'" />` :
      `<div class="custom-profile-img">${user.username.charAt(0)}</div>`
  }
        <div class="custom-username">${user.username} <img src="https://flagcdn.com/w40/${user.countryCode.toLowerCase()}.png" class="custom-flag" /></div>
        <div class="custom-biography">${user.biography}</div>
        <div class="custom-badge">${user.sellerStatus} - ${user.businessType}</div>
      </div>
    </body>
  `;

  console.log("Creating profile card with image status:", img ? "Using image" : "Using fallback");

  Swal.fire({
    html: profileHTML,
    width: '350px',
    showConfirmButton: true,
    confirmButtonText: 'Close'
  });
}
