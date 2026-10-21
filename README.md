# BlogSpace – Full Stack Blog Application ✍️

A full-stack blog application developed as part of the **Web Development Internship at Codomax Digital Solutions**.

---

## 🌟 Modules Overview

- **Module 1: Frontend Development (Completed)**
  - Responsive user interface using HTML5 & CSS3
  - Multi-page setup: Home, Login, Register, Dashboard, and Create Blog
  - Client-side validation & local state management
- **Module 2: Backend Development (Completed)**
  - RESTful API server powered by **Node.js** and **Express.js**
  - Cross-Origin Resource Sharing (**CORS**) enabled
  - REST APIs for User Registration, User Login, Blog Creation, Retrieval, and Deletion
  - Seamless frontend-to-backend integration using asynchronous JavaScript (`fetch` API)
- **Module 3: Database Integration (Upcoming)**
  - Migration to MongoDB / Supabase for persistent cloud storage

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Fetch API
- **Backend**: Node.js, Express.js, CORS, Nodemon
- **Version Control**: Git & GitHub

---

## 🚀 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status health check |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Authenticate user & login |
| `GET` | `/api/blogs` | Get all blogs (supports `?author=` query filter) |
| `GET` | `/api/blogs/:id` | Get single blog by ID |
| `POST` | `/api/blogs` | Create and publish a new blog post |
| `DELETE` | `/api/blogs/:id` | Delete a blog post by ID |

---

## 📂 Project Structure

```text
codomax-blog/
├── backend/
│   ├── package.json
│   ├── server.js          # Express backend server with REST APIs
│   └── .gitignore
├── css/
│   └── style.css          # Styling for all pages
├── js/
│   ├── script.js          # Authentication (Register & Login) API calls
│   ├── dashboard.js       # Dashboard blog listing & deletion API calls
│   └── create-blog.js     # Blog creation API calls
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── create-blog.html
├── index.html             # Landing page
├── .gitignore
└── README.md
```

---

## 💻 How to Run Locally

### 1. Start the Backend Server
```bash
# Navigate to backend folder
cd backend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
# or
npm start
```
The backend server runs on `http://localhost:5000`.

### 2. Launch the Frontend
Open `index.html` directly in your browser or run it with VS Code's **Live Server** extension (`http://127.0.0.1:5500`).

---

## 👨‍💻 Author

**Khushi Gill**  
B.Tech | Web Development Intern @ Codomax Digital Solutions