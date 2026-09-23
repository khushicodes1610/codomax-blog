// ========================================
// CHECK LOGIN
// ========================================

const user = JSON.parse(
    localStorage.getItem("blogUser")
);

const isLoggedIn =
    localStorage.getItem("isLoggedIn");


if (!user || isLoggedIn !== "true") {

    window.location.href = "login.html";

}


// ========================================
// CREATE BLOG
// ========================================

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "blogTitle"
                ).value.trim();


            const category =
                document.getElementById(
                    "blogCategory"
                ).value;


            const content =
                document.getElementById(
                    "blogContent"
                ).value.trim();


            // Create blog

            const blog = {

                id: Date.now(),

                title: title,

                category: category,

                content: content,

                author: user.name,

                date:
                    new Date().toLocaleDateString()

            };


            // Get existing blogs

            let blogs =
                JSON.parse(
                    localStorage.getItem("blogs")
                ) || [];


            // Add blog

            blogs.push(blog);


            // Save blogs

            localStorage.setItem(
                "blogs",
                JSON.stringify(blogs)
            );


            alert(
                "Blog published successfully! 🎉"
            );


            // Go dashboard

            window.location.href =
                "dashboard.html";

        }
    );

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