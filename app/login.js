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

function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    // Call sendLogin with the form values
    sendLogin(username, password);
}

function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract values from the form
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    // Call sendRegister with the form values
    sendRegister(username, email, password);
}

function sendRegister(username, email, password) {
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
                // Add any further actions, such as triggering a profile picture change
                document.getElementById('login').innerText = "Logout";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

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
            await getUserInformations(identifier);
            window.userinformation.password = password;
            // Add further actions here, such as updating the profile picture
            document.getElementById('login').innerText = "Logout";
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getUserInformations(username) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });
        const data = await response.json();
        console.log(data);
        console.log('Success:', data.success);
        if (data.success) {
            window.userinformation = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Expose the function so it can be called from other scripts
window.createLogin = createLogin;
