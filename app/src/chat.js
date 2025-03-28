// Fetch user data from the API
async function fetchUserData() {
  try {
    const response = await fetch('http://localhost:3000/getContact');
    const result = await response.json();
    if(result.success) {
      createUserElement(result.message);
    } else {
      console.error('Error fetching user:', result.error);
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Get container elements from HTML
  const chatList = document.getElementById("chatList");
  const chatBox = document.getElementById("chatBox");
  const chatIconImage = './images/icons/app_icon.png';

  // Create the chat toggle icon (at the top of the user list)
  const chatToggle = document.createElement("div");
  chatToggle.classList.add("chat-toggle-icon");
  chatToggle.innerHTML = `<img src="${chatIconImage}" alt="Chat Icon" id="chatIcon"/>`;
  chatList.appendChild(chatToggle);

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
    img.src = user.profile_image || './images/icons/default_avatar.png'; // Default avatar if no image is provided
    img.alt = user.username;
    img.classList.add("user-avatar");
    userElement.appendChild(img);

    // Truncate the display/username if it's too long
    const clientName = user.displayname || user.username; // Fallback to username if display name is not available
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

  // Populate the user list with each user’s element
  users.forEach(user => {
    const userElement = createUserElement(user);
    userListContainer.appendChild(userElement);
  });

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
    descriptionContainer.textContent = `Conversation with @${user.name}.`;
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
        // Create a new message div
        const newMessage = document.createElement("div");
        newMessage.classList.add("message");
        newMessage.textContent = messageText;

        // Append the new message to the message container
        messageContainer.appendChild(newMessage);

        // Clear the input
        messageInput.value = "";
      }
    });

    // Display the chat box
    chatBox.style.display = "block";
  }

  // Toggle behavior for the chat toggle icon
  chatToggle.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      // If the chat box is visible, clicking the toggle icon should close it
      if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
      } else {
        // Toggle the user list container visibility
        if (userListContainer.style.display === "none" || userListContainer.style.display === "") {
          userListContainer.style.display = "block";
          chatList.style.backgroundColor = "#2f3136";
        } else {
          userListContainer.style.display = "none";
          chatList.style.backgroundColor = "#36393f";
        }
        // Close the chat box when toggling
        chatBox.style.display = "none";
      }
    }
  });

  // TMRRW ADD THE STUFF WHERE FOR THE FULLY TOGGLED OFF CHAT STATE TO HAVE IT BE SO THAT THE BLANK BLACK PAGE IS GONE AND ONLY THE ICON IS VISIBLE, RENABLES WHEN USER LIST IS TOGGLED, OBVIOUSLY KEPT WITH CHAT_USER LIST

  // Initially hide the chat box, color the toggle icon, and hide the user list container with same color
  chatBox.style.display = "none";
  userListContainer.style.display = "none";
  chatList.style.padding = "0";
  chatList.style.backgroundColor = "#36393f";
  chatToggle.style.backgroundColor = "#2f3136";
});

// Fetch the data when the page loads
window.addEventListener('DOMContentLoaded', fetchUserData);