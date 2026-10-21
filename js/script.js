// ========================================
// API CONFIGURATION
// ========================================
const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// USER REGISTRATION
// ========================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Password matching validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Call Backend REST API
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Save user info locally for convenience
                localStorage.setItem("blogUser", JSON.stringify(data.user));

                alert(data.message || "Registration successful! 🎉");
                window.location.href = "login.html";
            } else {
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to reach the backend server. Please make sure the backend server is running on http://localhost:5000 (run 'npm run dev' or 'npm start' in the backend folder).");
        }
    });
}

// ========================================
// USER LOGIN
// ========================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {
            // Call Backend REST API
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Store user session in localStorage
                localStorage.setItem("blogUser", JSON.stringify(data.user));
                localStorage.setItem("isLoggedIn", "true");

                alert(data.message || "Login successful! 🎉");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Invalid email or password ❌");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to reach the backend server. Please make sure the backend server is running on http://localhost:5000 (run 'npm run dev' or 'npm start' in the backend folder).");
        }
    });
}