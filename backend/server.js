const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Storage (will be migrated to Database in Module 3)
const users = [];
let blogs = [
    {
        id: 1,
        title: "The Power of Learning",
        category: "Education",
        content: "Learning something new every day can completely transform your future and open doors to opportunities.",
        author: "Codomax Admin",
        date: new Date().toLocaleDateString()
    },
    {
        id: 2,
        title: "Exploring Technology & Web Development",
        category: "Technology",
        content: "Full-stack web development allows developers to build robust, scalable applications using modern stacks.",
        author: "Codomax Admin",
        date: new Date().toLocaleDateString()
    }
];

// ========================================
// HEALTH CHECK ROUTE
// ========================================
app.get("/", (req, res) => {
    res.json({
        message: "Codomax Blog API is running 🚀",
        status: "Active",
        endpoints: [
            "POST /api/register",
            "POST /api/login",
            "GET  /api/blogs",
            "GET  /api/blogs/:id",
            "POST /api/blogs",
            "DELETE /api/blogs/:id"
        ]
    });
});

// ========================================
// AUTHENTICATION ROUTES
// ========================================

// User Registration API
app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password) are required."
        });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User with this email already exists."
        });
    }

    // Create user object
    const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "Registration successful! 🎉",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// User Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        });
    }

    // Authenticate user
    const user = users.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password ❌"
        });
    }

    res.status(200).json({
        success: true,
        message: "Login successful! 🎉",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// ========================================
// BLOG ROUTES
// ========================================

// Get All Blogs (with optional author filtering)
app.get("/api/blogs", (req, res) => {
    const { author } = req.query;

    if (author) {
        const filtered = blogs.filter(
            b => b.author.toLowerCase() === author.toLowerCase()
        );
        return res.status(200).json({
            success: true,
            count: filtered.length,
            blogs: filtered
        });
    }

    res.status(200).json({
        success: true,
        count: blogs.length,
        blogs: blogs
    });
});

// Get Single Blog by ID
app.get("/api/blogs/:id", (req, res) => {
    const blogId = Number(req.params.id);
    const blog = blogs.find(b => b.id === blogId);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    res.status(200).json({
        success: true,
        blog: blog
    });
});

// Create Blog API
app.post("/api/blogs", (req, res) => {
    const { title, category, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({
            success: false,
            message: "Title, content, and author are required."
        });
    }

    const newBlog = {
        id: Date.now(),
        title: title.trim(),
        category: category || "General",
        content: content.trim(),
        author: author.trim(),
        date: new Date().toLocaleDateString()
    };

    // Prepend new blog so newest appears first
    blogs.unshift(newBlog);

    res.status(201).json({
        success: true,
        message: "Blog published successfully! 🚀",
        blog: newBlog
    });
});

// Delete Blog API
app.delete("/api/blogs/:id", (req, res) => {
    const blogId = Number(req.params.id);
    const blogIndex = blogs.findIndex(b => b.id === blogId);

    if (blogIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    const deletedBlog = blogs.splice(blogIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully! 🗑️",
        deletedBlog: deletedBlog
    });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});