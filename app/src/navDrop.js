document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profilePic');
    const dropdownMenu = document.getElementById('dropdownMenu');
  
    // Toggle dropdown when clicking the profile picture
    profilePic.addEventListener('click', (e) => {
      console.log('click');
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
      console.log(dropdownMenu.classList.contains('active'));
      console.log(dropdownMenu.checkVisibility());
    });
  
    // Close dropdown when clicking outside the profile container
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.profile-container')) {
        dropdownMenu.classList.remove('active');
      }
    });
  });
  