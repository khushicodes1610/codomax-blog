// ========================================
// API CONFIGURATION
// ========================================
const API_BASE_URL = "http://localhost:5000/api";

// ========================================
// GET LOGGED-IN USER & AUTH GUARD
// ========================================
const user = JSON.parse(localStorage.getItem("blogUser"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!user || isLoggedIn !== "true") {
    window.location.href = "login.html";
}

// ========================================
// DISPLAY USER INFORMATION
// ========================================
if (user) {
    const userNameEl = document.getElementById("userName");
    const profileNameEl = document.getElementById("profileName");
    const profileEmailEl = document.getElementById("profileEmail");

    if (userNameEl) userNameEl.textContent = user.name;
    if (profileNameEl) profileNameEl.textContent = user.name;
    if (profileEmailEl) profileEmailEl.textContent = user.email;
}

// ========================================
// FETCH & DISPLAY USER BLOGS FROM BACKEND
// ========================================
const blogList = document.getElementById("blogList");

async function loadUserBlogs() {
    if (!blogList) return;

    try {
        blogList.innerHTML = `<p class="loading-message">Loading blogs from server...</p>`;

        // Fetch blogs from backend API
        const response = await fetch(`${API_BASE_URL}/blogs?author=${encodeURIComponent(user.name)}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            blogList.innerHTML = `<p class="empty-message">Failed to load blogs from backend.</p>`;
            return;
        }

        const myBlogs = data.blogs || [];

        if (myBlogs.length === 0) {
            blogList.innerHTML = `
                <p class="empty-message">
                    You haven't created any blogs yet. Click "Create Blog" to publish one!
                </p>
            `;
            return;
        }

        blogList.innerHTML = "";

        myBlogs.forEach(function (blog) {
            const blogCard = document.createElement("div");
            blogCard.className = "dashboard-blog-card";

            blogCard.innerHTML = `
                <h3>${blog.title}</h3>
                <span class="blog-category">${blog.category || "General"}</span>
                <p>${blog.content}</p>
                <small>Published on ${blog.date} by ${blog.author}</small>
                <button
                    class="delete-btn"
                    onclick="deleteBlog(${blog.id})"
                >
                    Delete 🗑️
                </button>
            `;

            blogList.appendChild(blogCard);
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        blogList.innerHTML = `
            <p class="empty-message" style="color: #e53e3e;">
                ⚠️ Cannot connect to backend server at http://localhost:5000.<br>
                Please ensure the backend is running (<code>npm start</code> or <code>npm run dev</code> in the backend folder).
            </p>
        `;
    }
}

// Load blogs immediately
loadUserBlogs();

// ========================================
// DELETE BLOG VIA BACKEND REST API
// ========================================
async function deleteBlog(blogId) {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message || "Blog deleted successfully! 🗑️");
            // Reload blogs list
            loadUserBlogs();
        } else {
            alert(data.message || "Failed to delete blog.");
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to reach server. Make sure the backend is running.");
    }
}

// Attach deleteBlog to window scope so inline onclick works
window.deleteBlog = deleteBlog;

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