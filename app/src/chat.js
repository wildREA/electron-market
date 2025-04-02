document.addEventListener("DOMContentLoaded", () => {
  // Updated: fetch user data for a specific username from the API
  async function fetchUserData(username) {
    try {
      const response = await fetch('http://localhost:3000/getProfileImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "imagePath": username })
      });
      const result = await response.json();
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
      const userSearch = searchInput.value.trim().toLowerCase();
      if (userSearch !== "") {
        const userData = await fetchUserData(userSearch);
        console.log(userData);
        if (userData && userData.data.success) {
          console.log("User found:", userSearch);
          let contactInfo = {'img': userData.data.imageBase64, 'username': userSearch};
          console.log("Contact info:", contactInfo);
          addUserToChat(contactInfo);
        } else {
          console.error("User not found:", userSearch);
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
  userListContainer.setAttribute("id", "userListContainer"); // Ensure ID is set correctly
  chatList.appendChild(userListContainer);

  // Function to create a user element in the list
  function createUserElement(user) {
    const userElement = document.createElement("div");
    userElement.classList.add("user-item");
    userElement.setAttribute("id", `user-${user.username}`);
    userElement.setAttribute("data-user-id", user.username);

    // Create an image element for the profile picture
    const img = document.createElement("img");
    img.alt = user.username;
    img.src = `data:image/png;base64,${user.img}`;
    img.classList.add("user-avatar");
    userElement.appendChild(img);

    // Truncate the display/username if it's too long
    const clientName = user.username;
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
    // Clear previous chat contents
    chatBox.innerHTML = "";
    
    // Create a header for the chat box
    const header = document.createElement("div");
    header.classList.add("chat-header");
    header.textContent = truncatedUserChat;
    chatBox.appendChild(header);
    
    // Create a container describing conversation or status
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("chat-description");
    descriptionContainer.textContent = `Conversation with @${user.username}.`;
    chatBox.appendChild(descriptionContainer);
    
    // Create a container for the messages
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-messages");
    messageContainer.setAttribute("id", "chatMessages");
    chatBox.appendChild(messageContainer);
    
    // Create a container for the form field
    const chatFormField = document.createElement("div");
    chatFormField.classList.add("chat-form-field");
    chatBox.appendChild(chatFormField);
    
    // Create a form for sending messages
    const form = document.createElement("form");
    form.classList.add("chat-form");
    form.innerHTML = `
      <input type="text" name="message" placeholder="Type a message..." class="form-control" required/>
    `;
    chatFormField.appendChild(form);

    // Attach the event listener to the form
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const messageInput = form.querySelector("input[name='message']");
      const messageText = messageInput.value.trim();
      if (messageText !== "") {
        const newMessage = document.createElement("span");
        newMessage.classList.add("message");
        newMessage.textContent = messageText;
        // Append the new message to the message container
        messageContainer.appendChild(newMessage);
        // Clear the input
        messageInput.value = "";
      }
    });

    chatBox.style.display = "block";
  }

  // Toggle behavior for the chat toggle icon
  chatToggle.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      // If the chat box is visible, clicking the toggle icon should close it
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
        // Close the chat box when toggling
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
