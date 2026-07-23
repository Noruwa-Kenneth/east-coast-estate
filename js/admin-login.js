/*=========================================
API URL
=========================================*/

const API_URL =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://east-coast-estate.onrender.com";

/*=========================================
ELEMENTS
=========================================*/

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const togglePassword = document.getElementById("togglePassword");

/*=========================================
SHOW / HIDE PASSWORD
=========================================*/

togglePassword.addEventListener("click", () => {

    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.innerHTML = isPassword
        ? `<i class="ri-eye-off-line"></i>`
        : `<i class="ri-eye-line"></i>`;

});

/*=========================================
LOGIN
=========================================*/

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = usernameInput.value.trim();

    const password = passwordInput.value;

    try {

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Logging in...
        `;

        const response = await fetch(`${API_URL}/admin/login`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,

                password

            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        /* Save Token */

        localStorage.setItem("token", data.token);

        localStorage.setItem("admin", JSON.stringify(data.admin));

        /* Redirect */

        window.location.href = "admin.html";

    }

    catch (error) {

        alert(error.message);

        loginBtn.disabled = false;

        loginBtn.innerHTML = `
            <i class="ri-login-circle-line"></i>
            Login
        `;

    }

});