// ========================================
// API CONFIGURATION
// ========================================
const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// CHECK LOGIN & AUTH GUARD
// ========================================
const user = JSON.parse(localStorage.getItem("blogUser"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!user || isLoggedIn !== "true") {
    window.location.href = "login.html";
}

// ========================================
// CREATE BLOG VIA BACKEND REST API
// ========================================
const blogForm = document.getElementById("blogForm");

if (blogForm) {
    blogForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("blogTitle").value.trim();
        const category = document.getElementById("blogCategory").value;
        const content = document.getElementById("blogContent").value.trim();

        if (!title || !content) {
            alert("Please fill in both title and content.");
            return;
        }

        try {
            // Call Backend REST API
            const response = await fetch(`${API_BASE_URL}/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: content,
                    author: user.name
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message || "Blog published successfully! 🎉");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Failed to create blog. Please try again.");
            }
        } catch (error) {
            console.error("Create blog error:", error);
            alert("Unable to reach the backend server. Please make sure the backend is running at http://localhost:5000.");
        }
    });
}

// ========================================
// LOGOUT
// ========================================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("blogUser");
        window.location.href = "login.html";
    });
}