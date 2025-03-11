// Function to create the window for the login model
function createLogin() {
    console.log("Creating login card...");

    // Populate after a successful login - temporary variable
    const user = {
        username: 'ahmetHmoudT0pG_benz',    // Registered username.
        countryCode: "uk.jpg",              // Reference the flag image (e.g., "us", "gb", etc.) - Make a new file filled with references to ./images/flags
        profileImage: 'ahmetHmoudT0pG_benz.jpg',    // profileImage asset name derived from username
        sellerStatus: 'Top G',              // "Seller" / "Customer"
        businessType: 'Multi-binaire'       // "Commercial" / "Private"
    };

    const loginHTML = `
        <div id="login-body">
            <div class="login-container">
            <h2>Login</h2>
            <form action="/login" method="POST">
                <input type="text" name="username" class="input-field" placeholder="Username" required>
                <input type="password" name="password" class="input-field" placeholder="Password" required>
                <button type="submit" class="login-button">Login</button>
            </form>
            <a onclick="register()" " class="forgot-password">Register</a>
            </div>
        </div>
      `;

    // Use SweetAlert2 to display the login model
    Swal.fire({
        title: 'Account',
        html: loginHTML,
        showConfirmButton: true,
        confirmButtonText: 'Close'
    });

    console.log("Created profile card!");
}


function register() {
    let registerHTML =
    `
        <div class="login-container">
            <h2>Register</h2>
            <form action="/register" method="POST">
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

// Extra login so user can seamlessly switch between login and register
function login() {
    let loginHTML =
    `
        <div class="login-container">
            <h2>Login</h2>
            <form action="sendRegister()" method="POST"> 
                <input type="text" name="username" class="input-field" placeholder="Username" required>
                <input type="password" name="password" class="input-field" placeholder="Password" required>
                <button type="submit" class="login-button">Login</button>
            </form>
            <a onclick="register()" class="forgot-password">Register</a>
        </div>
    `;
    document.getElementById("login-body").innerHTML = loginHTML;
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
                text: 'Successfull registration',
                icon: 'success',
                confirmButtonText: 'Close'
            });


            //Add more information
            global.userinformations = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            // put some methods here to trigger profile picture change

        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function sendLogin(username, password) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data.success);
        if (data.success) {
            Swal.fire({
                title: 'Success',
                text: 'Successfull login',
                icon: 'success',
                confirmButtonText: 'Close'
            });

            //Add more information
            global.userinformations = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            // put some methods here to trigger profile picture change

        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}





// Expose the function so it can be called from other scripts
window.createLogin = createLogin;
