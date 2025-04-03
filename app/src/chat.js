// Updated: fetch user data for a specific username from the API
async function fetchUserData(username) {
  try {
    const response = await fetch('http://localhost:3000/getProfileImage', { // Change to 172.16.3.52 in production
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

function addUserToChat(user) {
  const isSelf = user.username === window.userinformation.username;
  const existingUser = document.getElementById('user-' + user.username);

  if (isSelf || existingUser) {
    console.log(isSelf ? "Cannot add yourself to chat:" : "User already exists in chat:", user.username);
    return;
  }
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
  chatList.insertBefore(searchBar, chatToggle.nextSibling);

  // Add user to chat on search: check if user exists in database
  searchBar.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = searchBar.querySelector("input[name='search']");
    const userSearch = searchInput.value.trim().toLowerCase();
    if (userSearch !== "") {
      const userData = await fetchUserData(userSearch);
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
    window.activeRecipient = user.username;
    openChat(user, truncatedUserChat);
  });

  return userElement;
}

function createChatContainer(user, truncatedUserChat) {
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



  // Return the form and messageContainer for further use
  return { form, messageContainer };
}

export function createMessage(data) {
  let messageContainer = window.container
  // Create a new message element
  const newMessage = document.createElement("li");
  newMessage.classList.add("message");
  messageContainer.appendChild(newMessage);

  // Create a new message content element
  const content = document.createElement("div");
  content.classList.add("content");
  newMessage.appendChild(content);

  // Create a timestamp element
  const timestamp = document.createElement("div");
  timestamp.classList.add("content-time");
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timestamp.textContent = formattedTime;
  content.appendChild(timestamp);

  // Create a placeholder element for message box and profile image
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  content.appendChild(placeholder);

  // Create a profile image element
  const profileImage = document.createElement("img");
  profileImage.classList.add("profile-image");
  // Fetch the image data from the server
  fetchUserData(data.sender).then((response) => {
    if (response && response.data.success) {
      profileImage.src = `data:image/png;base64,${response.data.imageBase64}`;
    } else {
      console.error("Failed to fetch user image:", data.sender);
      profileImage.src = "./images/icons/default_profile.png"; // Default image if fetch fails
    }
  });
  profileImage.alt = data.sender, "profile_image";
  placeholder.appendChild(profileImage);

  // Create a message box to hold username and message content
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  placeholder.appendChild(messageBox);

  // Create a message username element that holds the sender's username
  const messageUsername = document.createElement("div");
  messageUsername.classList.add("message-username");
  messageUsername.textContent = data.sender;
  messageBox.appendChild(messageUsername);

  // Create a message content element that holds the actual message text
  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");
  messageBox.appendChild(messageContent);

  // Create a paragraph element for the message text
  const messageText = document.createElement("p");
  messageText.textContent = data.message;
  messageContent.appendChild(messageText);

  // Scroll to the bottom of the message container
  messageContainer.scrollTop = messageContainer.scrollHeight;
}



// Function to open a chat conversation with a user
async function openChat(user, truncatedUserChat) {
  // Dynamically import the sendMessage function from websocket.js
  const { sendMessage } = await import('./websocket.js');

  // Create a new chat container and get the form and messageContainer
  const { form,  messageContainer } = createChatContainer(user, truncatedUserChat);
  window.container = messageContainer; // Store the message container in a global variable
  // Attach the event listener to the form
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const messageInput = form.querySelector("input[name='message']");
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      console.log("User: ", user);
      sendMessage(window.activeRecipient);
    }
  });

  chatBox.style.display = "block";
}

export function handleCreateMessage(user, message, messageContainer) {

  const newMessage = document.createElement("span");
      newMessage.classList.add("message");
      newMessage.textContent = messageText;
      // Append the new message to the message container
      messageContainer.appendChild(newMessage)

        // Create message and scroll to bottom if already at bottom
        createMessage(user, message, messageContainer);
        // Scroll to the bottom of the message container
        messageContainer.scrollTop = messageContainer.scrollHeight;
      // Clear the input
      messageInput.value = "";


}

// Create body
const body = document.body;

// Create chat container
const chatContainer = document.createElement("div");
chatContainer.classList.add("chat-container");
body.insertBefore(chatContainer, document.querySelector('script[src="src/chat.js"]'));

// Create user chat list
const chatList = document.createElement("div");
chatList.classList.add("user-chat-list");
chatContainer.appendChild(chatList);

// Create chat box
const chatBox = document.createElement("div");
chatBox.classList.add("chat-box");
chatBox.setAttribute("id", "chatBox");
chatContainer.appendChild(chatBox);

// Get container elements from HTML
const chatIconImage = './images/icons/app_icon.png';

// Create the chat toggle icon (at the top of the user list)
const chatToggle = document.createElement("div");
chatToggle.classList.add("chat-toggle-icon");
chatToggle.innerHTML = `<img src="${chatIconImage}" alt="Chat Icon" id="chatIcon"/>`;
chatList.appendChild(chatToggle);

// Create a container to hold all user profile icons
const userListContainer = document.createElement("div");
userListContainer.classList.add("user-list-container");
userListContainer.setAttribute("id", "userListContainer"); // Ensure ID is set correctly
chatList.appendChild(userListContainer);

// Toggle behavior for the chat toggle icon
chatToggle.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() === "img") {
    // If the chat box is visible, clicking the toggle icon should close it
    if (chatBox.style.display === "block") {
      chatBox.style.display = "none";
    } else { // If closed, then open (--> TRUE)
      if (userListContainer.style.display === "none" || userListContainer.style.display === "") {
        userListContainer.style.display = "block";
        chatBox.style.backgroundColor = "#2f3136";
        chatList.style.backgroundColor = "#2f3136";
        console.log("User list opened.");
        createSearchBar();
      } else { // If open, then close (--> FALSE)
        userListContainer.style.display = "none";
        chatBox.style.backgroundColor = "transparent";
        chatList.style.backgroundColor = "transparent";
        console.log("User list closed.");
        deleteSearchBar();
      }
      // Close the chat box when toggling
      chatBox.style.display = "none";
    }
  }
});

// Initialization & styling
chatBox.style.display = "none";
chatBox.style.backgroundColor = "transparent";
userListContainer.style.display = "none";
chatList.style.backgroundColor = "transparent";
chatList.style.padding = "0";
chatToggle.style.backgroundColor = "#2f3136";

// Ensure the search bar is not present initially
deleteSearchBar();
