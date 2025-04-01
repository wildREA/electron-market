document.addEventListener("DOMContentLoaded", () => {
  // Fetch user data from the API
  async function fetchUserData() {
    try {
      const response = await fetch('http://localhost:3000/getProfileImage');
      const result = await response.json();
      if (result.success) {
        // Create and append the user element using fetched data
        const userElement = createUserElement(result.message);
        userListContainer.appendChild(userElement);
      } else {
        console.error('Error fetching user:', result.error);
      }
    } catch (err) {
      console.error("Error retrieving user data:", err);
    }
  }

  // Get container elements from HTML
  const chatList = document.getElementById("chatList");
  const chatBox = document.getElementById("chatBox");
  const chatIconImage = './images/icons/app_icon.png';

  // Create the chat toggle icon (at the top of the user list)
  const chatToggle = document.createElement("div");
  chatToggle.classList.add("chat-toggle-icon");
  chatToggle.innerHTML = `<img src="${chatIconImage}" alt="Chat Icon" id="chatIcon"/>`;
  chatList.appendChild(chatToggle);

  // Create and delete search bar to add users to the chat
  function createSearchBar() {
    const searchBar = document.createElement("form");
    searchBar.innerHTML = `
    <input type="text" name="search" placeholder="Search for users..." class="form-control" required/>
  `;
    searchBar.classList.add("search-bar");
    chatList.appendChild(searchBar);
  }

  function deleteSearchBar() {
    const searchBar = document.querySelector(".search-bar");
    if (searchBar) {
      chatList.removeChild(searchBar);
    }
  }

  // Create a container to hold all user profile icons
  const userListContainer = document.createElement("div");
  userListContainer.classList.add("user-list-container");
  chatList.appendChild(userListContainer);

  // Function to create a user element in the list
  function createUserElement(user) {
    const userElement = document.createElement("div");
    userElement.classList.add("user-item");
    userElement.setAttribute("id", `user-${user.username}`);

    // Create an image element for the profile picture
    const img = document.createElement("img");
    img.src = user.profile_image || './images/icons/default_avatar.png';
    img.alt = user.username;
    img.classList.add("user-avatar");
    userElement.appendChild(img);

    // Truncate the display/username if it's too long
    const clientName = user.displayname || user.username;
    const truncatedUserList = clientName.length > 23
      ? clientName.substring(0, 21) + "..."
      : clientName;
    const truncatedUserChat = clientName.length > 31
      ? clientName.substring(0, 29) + "..."
      : clientName;

    // Add user (truncated) display name next to the avatar
    const nameSpan = document.createElement("span");
    nameSpan.textContent = truncatedUserList;
    userElement.appendChild(nameSpan);

    // Add click event to open chat for the selected user
    userElement.addEventListener("click", () => {
      openChat(user, truncatedUserChat);
    });

    return userElement;
  }

  // Function to open a chat conversation with a user
  function openChat(user, truncatedUserChat) {
    chatBox.innerHTML = "";
    const header = document.createElement("div");
    header.classList.add("chat-header");
    header.textContent = truncatedUserChat;
    chatBox.appendChild(header);

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("chat-description");
    descriptionContainer.textContent = `Conversation with @${user.name}.`;
    chatBox.appendChild(descriptionContainer);

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-messages");
    messageContainer.setAttribute("id", "chatMessages");
    chatBox.appendChild(messageContainer);

    const chatFormField = document.createElement("div");
    chatFormField.classList.add("chat-form-field");
    chatBox.appendChild(chatFormField);

    const form = document.createElement("form");
    form.classList.add("chat-form");
    form.innerHTML = `
      <input type="text" name="message" placeholder="Type a message..." class="form-control" required/>
    `;
    chatFormField.appendChild(form);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const messageInput = form.querySelector("input[name='message']");
      const messageText = messageInput.value.trim();
      if (messageText !== "") {
        const newMessage = document.createElement("span");
        newMessage.classList.add("message");
        newMessage.textContent = messageText;
        messageContainer.appendChild(newMessage);
        messageInput.value = "";
      }
    });

    searchBar.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = searchBar.querySelector("input[name='search']");
      const searchText = searchInput.value.trim().toLowerCase();
      if (searchText !== "") {
        const newSubmission = document.createElement("span");
        newSubmission.classList.add("username-submission");
        newSubmission.textContent = searchText;
        submissionContainer.appendChild(newSubmission);
        searchInput.value = "";
        console.log("Search submitted:", searchText);
      }
    });

    chatBox.style.display = "block";
  }

  // Toggle behavior for the chat toggle icon
  chatToggle.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
      } else { // If closed, then open
        if (userListContainer.style.display === "none" || userListContainer.style.display === "") {
          userListContainer.style.display = "block";
          chatList.style.backgroundColor = "#2f3136";
          createSearchBar();
        } else { // If open, then close
          userListContainer.style.display = "none";
          chatList.style.backgroundColor = "#36393f";
          deleteSearchBar();
        }
        chatBox.style.display = "none";
      }
    }
  });

  // Initialization
  // Styling
  chatBox.style.display = "none";
  userListContainer.style.display = "none";
  chatList.style.padding = "0";
  chatList.style.backgroundColor = "#36393f";
  chatToggle.style.backgroundColor = "#2f3136";

  // Functionality
  deleteSearchBar();
});
