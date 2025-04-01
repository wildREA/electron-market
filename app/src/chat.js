document.addEventListener("DOMContentLoaded", () => {
  // Updated: fetch user data for a specific username from the API
  async function fetchUserData(username) {
    try {
      const response = await fetch('http://localhost:3000/getProfileImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const result = await response.json();
      result.imageBase64
      // exampleImage = `data:image/png;base64,${result.imageBase64}`;
      return result;
    } catch (err) {
      console.error("Error retrieving user data:", err);
      return null;
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

  function addUserToChat(user) {
    if (!user) return;
    const userElement = createUserElement(user);
    userListContainer.appendChild(userElement);
  }

  // Create and delete search bar to add users to the chat
  function createSearchBar() {
    const searchBar = document.createElement("form");
    searchBar.innerHTML = `
      <input type="text" name="search" placeholder="Search for users..." class="form-control" required/>
    `;
    searchBar.classList.add("search-bar");
    chatList.appendChild(searchBar);

    // Add user to chat on search: check if user exists in database
    searchBar.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchInput = searchBar.querySelector("input[name='search']");
      const searchText = searchInput.value.trim().toLowerCase();
      if (searchText !== "") {
        // Use the updated fetchUserData that sends the username parameter
        const userData = await fetchUserData(searchText);
        if (userData.success) {
          // Append the user to the list using fetched data
          // Assuming the returned object is structured with a message property containing user info
          addUserToChat(userData.message);
        } else {
          console.error("User not found:", searchText);
        }
        searchInput.value = "";
      }
    });
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
    // If user.profile_image is provided (e.g. as a base64 string), use it. Otherwise, fallback to default
    img.src = user.profile_image ? user.profile_image : './images/icons/default_avatar.png';
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
    descriptionContainer.textContent = `Conversation with @${user.username}.`;
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

  // Initialization & styling
  chatBox.style.display = "none";
  userListContainer.style.display = "none";
  chatList.style.padding = "0";
  chatList.style.backgroundColor = "#36393f";
  chatToggle.style.backgroundColor = "#2f3136";

  // Ensure the search bar is not present initially
  deleteSearchBar();
});
