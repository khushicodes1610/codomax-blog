// ========================================
// GET USER
// ========================================

const user = JSON.parse(
    localStorage.getItem("blogUser")
);

const isLoggedIn =
    localStorage.getItem("isLoggedIn");


// ========================================
// PROTECT DASHBOARD
// ========================================

if (!user || isLoggedIn !== "true") {

    window.location.href = "login.html";

}


// ========================================
// DISPLAY USER
// ========================================

if (user) {

    document.getElementById("userName").textContent =
        user.name;

    document.getElementById("profileName").textContent =
        user.name;

    document.getElementById("profileEmail").textContent =
        user.email;

}


// ========================================
// DISPLAY BLOGS
// ========================================

const blogList =
    document.getElementById("blogList");

const blogs =
    JSON.parse(
        localStorage.getItem("blogs")
    ) || [];


const myBlogs =
    blogs.filter(
        blog => blog.author === user.name
    );


if (myBlogs.length === 0) {

    blogList.innerHTML = `
        <p class="empty-message">
            You haven't created any blogs yet.
        </p>
    `;

} else {

    blogList.innerHTML = "";

    myBlogs.forEach(function (blog) {

        const blogCard =
            document.createElement("div");

        blogCard.className =
            "dashboard-blog-card";


        blogCard.innerHTML = `

            <h3>
                ${blog.title}
            </h3>

            <span class="blog-category">
                ${blog.category}
            </span>

            <p>
                ${blog.content}
            </p>

            <small>
                Published on ${blog.date}
            </small>

            <button
                class="delete-btn"
                onclick="deleteBlog(${blog.id})"
            >
                Delete 🗑️
            </button>

        `;


        blogList.appendChild(blogCard);

    });

}


// ========================================
// DELETE BLOG
// ========================================

function deleteBlog(blogId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {

        return;

    }


    let blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


    blogs =
        blogs.filter(
            blog => blog.id !== blogId
        );


    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );


    location.reload();

}


// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                "isLoggedIn"
            );


            window.location.href =
                "login.html";

        }
    );

}