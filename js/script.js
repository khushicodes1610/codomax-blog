// ========================================
// REGISTER
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Create user

        const user = {

            name: name,

            email: email,

            password: password

        };


        // Save user

        localStorage.setItem(
            "blogUser",
            JSON.stringify(user)
        );


        alert("Registration successful! 🎉");


        // Go to login

        window.location.href = "login.html";

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // Get saved user

        const storedUser =
            JSON.parse(
                localStorage.getItem("blogUser")
            );


        // No user

        if (!storedUser) {

            alert(
                "No account found. Please register first."
            );

            return;
        }


        // Check login details

        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            alert("Login successful! 🎉");


            window.location.href =
                "dashboard.html";

        } else {

            alert(
                "Invalid email or password ❌"
            );

        }

    });

}