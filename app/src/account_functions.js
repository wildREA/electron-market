
// Function to create the window for the login modal
function createLogin() {
    console.log("Creating login card...");
    const loginHTML = `
        <div id="login-body">
            <div class="login-container">
                <h2>Login</h2>
                <form onsubmit="handleLogin(event)">
                    <input type="text" name="username" class="input-field" placeholder="Username" required>
                    <input type="password" name="password" class="input-field" placeholder="Password" required>
                    <button type="submit" class="login-button">Login</button>
                </form>
                <a onclick="register()" class="forgot-password">Register</a>
            </div>
        </div>
      `;

    // Use SweetAlert2 to display the login modal
    Swal.fire({
        title: 'Account',
        html: loginHTML,
        showConfirmButton: true,
        confirmButtonText: 'Close'
    });

    console.log("Created profile card!");
}

function register() {
    let registerHTML = `
        <div class="login-container">
            <h2>Register</h2>
            <form onsubmit="handleRegister(event)">
                <input type="text" name="username" class="input-field" placeholder="Username" required>
                <input type="email" name="email" class="input-field" placeholder="Email" required>
                <input type="password" name="password" class="input-field" placeholder="Password" required>
                <button type="submit" class="login-button">Register</button>
            </form>
            <a onclick="login()" class="forgot-password">Login</a>
        </div>
    `;
    document.getElementById("login-body").innerHTML = registerHTML;
}

// Extra login so the user can seamlessly switch between login and register
function login() {
    let loginHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <form onsubmit="handleLogin(event)">
                <input type="text" name="username" class="input-field" placeholder="Username" required>
                <input type="password" name="password" class="input-field" placeholder="Password" required>
                <button type="submit" class="login-button">Login</button>
            </form>
            <a onclick="register()" class="forgot-password">Register</a>
        </div>
    `;
    document.getElementById("login-body").innerHTML = loginHTML;
}

function handleLogout(event) {
    event.preventDefault(); // Prevent default form submission
    // Call sendLogout to handle the logout process
    sendLogout(event);
    // Refresh the page to clear any session data
    location.reload();
}

function sendLogout(event) {
    try {
        // Use SweetAlert2 to display a success message
        Swal.fire({
            title: 'Success',
            text: 'Successful logout',
            icon: 'success',
            confirmButtonText: 'Close'
        });
        // Clear user information
        delete window.userinformation;
        disableChat();
        disableWebsocket();
        // Set the dropdown button for account manage to "Login"
        document.getElementById('account').innerText = "Log in";
        document.getElementById('account').addEventListener('click', createLogin);
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission
    // Extract values from the form
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    // Call sendLogin with the form values
    sendLogin(username, password);
}

// Function to send login data to the server
async function sendLogin(identifier, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        });
        const data = await response.json();
        if (data.success) {
            Swal.fire({
                title: 'Success',
                text: 'Successful login',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            window.userinformation = { username: identifier, password: password };
            enableChat();
            enableWebsocket(identifier, password);
            // Add further actions here, such as updating the profile picture
            document.getElementById('account').innerText = "Log out";
            document.getElementById('account').addEventListener('click', handleLogout);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission
    // Extract values from the form
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    // Call sendRegister with the form values
    username = username.toLowerCase();
    sendRegister(username, email, password);
}

async function sendRegister(username, email, password) {
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data.success);
        if (data.success) {
            Swal.fire({
                title: 'Success',
                text: 'Successful registration',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            window.userinformation = { username: username, password: password };
            enableChat();
            enableWebsocket(username, password);
            // Add any further actions, such as triggering a profile picture change
            document.getElementById('account').innerText = "Log out";
            document.getElementById('account').addEventListener('click', handleLogout);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function enableWebsocket(username, password) {
    await wait10Seconds(); // Wait for 10 seconds before loading the websocket script
    console.log("Logged in as: " + username);
    window.scriptParams = { username: username, password: password };

    // Ensure chat is fully loaded before loading websocket
    await ensureChatLoaded();

    const script = document.createElement("script");
    script.src = "src/websocket.js";
    script.type = "module";
    document.body.appendChild(script);
}

async function ensureChatLoaded() {
    return new Promise((resolve) => {
        // Check if chat script is already loaded
        if (document.querySelector('script[src="src/chat.js"]')) {
            console.log("Chat script already loaded.");
            return resolve();
        }

        console.log("Loading chat script first...");
        const script = document.createElement("script");
        script.src = "src/chat.js";
        script.type = "module";
        script.onload = () => {
            console.log("Chat script fully loaded.");
            resolve();
        };
        document.body.appendChild(script);
    });
}

function wait10Seconds() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

async function disableWebsocket() {
    console.log("Logged out!");
    const websocketScript = document.querySelector('script[src="websocket.js"]');
    if (websocketScript) {
        websocketScript.remove();
    }
}

async function enableChat() {
    console.log("Enabled chat!");
    window.scriptParams = {username: window.userinformation.username, password: window.userinformation.password};
    const script = document.createElement("script");
    script.src = "src/chat.js";
    script.type = "module";
    document.body.appendChild(script);
}

async function disableChat() {
    console.log("Disabled chat!");
    const chatScript = document.querySelector('script[src="chat.js"]');
    if (chatScript) {
        chatScript.remove();
    }
}

// Expose the function so it can be called from other scripts
window.createLogin = createLogin;