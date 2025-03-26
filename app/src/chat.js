document.addEventListener("DOMContentLoaded", () => {
    // Get container elements from HTML
    const chatList = document.getElementById("chatList");
    const chatBox = document.getElementById("chatBox");
  
    // Create the chat toggle icon (at the top of the user list)
    const chatToggle = document.createElement("div");
    chatToggle.classList.add("chat-toggle-icon");
    chatToggle.innerHTML = "&#9993;"; // Using an envelope icon as an example
    chatList.appendChild(chatToggle);
  
    // Create a container to hold all user profile icons
    const userListContainer = document.createElement("div");
    userListContainer.classList.add("user-list-container");
    chatList.appendChild(userListContainer);
  
    // Sample users array (replace profilePic with actual image URLs)
    const users = [
      { id: 1, name: "Alice", profilePic: "alice.png" },
      { id: 2, name: "Bob", profilePic: "bob.png" },
      { id: 3, name: "Charlie", profilePic: "charlie.png" }
    ];
  
    // Function to create a user element in the list
    function createUserElement(user) {
      const userElement = document.createElement("div");
      userElement.classList.add("user-item");
      userElement.setAttribute("data-user-id", user.id);
  
      // Create an image element for the profile picture
      const img = document.createElement("img");
      img.src = user.profilePic;
      img.alt = user.name;
      img.classList.add("user-avatar");
  
      // Append the image to the user element
      userElement.appendChild(img);
  
      // Add user name next to the avatar
      const nameSpan = document.createElement("span");
      nameSpan.textContent = user.name;
      userElement.appendChild(nameSpan);
  
      // Add click event to open chat for the selected user
      userElement.addEventListener("click", () => {
        openChat(user);
      });
  
      return userElement;
    }
  
    // Populate the user list with each user’s element
    users.forEach(user => {
      const userElement = createUserElement(user);
      userListContainer.appendChild(userElement);
    });
  
    // Function to open a chat conversation with a user
    function openChat(user) {
        // Clear previous chat contents
        chatBox.innerHTML = "";

        // Create a header for the chat box
        const header = document.createElement("div");
        header.classList.add("chat-header");
        header.textContent = `Chat with ${user.name}`;
        chatBox.appendChild(header);
        
        // Create a container describing conversation or status
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("chat-description");
        descriptionContainer.textContent = `Conversation with ${user.name}.`;
        chatBox.appendChild(descriptionContainer);
        
        // Create a container for the messages
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("chat-messages");
        chatBox.appendChild(messageContainer);

        const chatFormField = document.createElement("div");
        chatFormField.classList.add("chat-form-field");
        chatBox.appendChild(chatFormField);

        // Create a form for sending messages
        const form = document.createElement("form");
        form.classList.add("chat-form");

        // Form inner HTML with an input and a send button
        form.innerHTML = `
        <input type="text" name="message" placeholder="Type a message..." class="form-control" required/>
        `;
        chatFormField.appendChild(form);

        // Attach the event listener to the form (not a div)
        form.addEventListener("submit", (event) => {
        event.preventDefault();
        const messageInput = form.querySelector("input[name='message']");
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            // Create a new message div
            const newMessage = document.createElement("div");
            newMessage.classList.add("my-message");
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
    chatToggle.addEventListener("click", () => {
      // If the chat box is visible, clicking the toggle icon should close it
      if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
      } else {
        // Toggle the user list container visibility
        if (userListContainer.style.display === "none") {
          userListContainer.style.display = "block";
        } else {
          userListContainer.style.display = "none";
        }
        // Close the chat box when toggling
        chatBox.style.display = "none";
      }
    });
  
    // Initially hide the chat box
    chatBox.style.display = "none";
  });
  