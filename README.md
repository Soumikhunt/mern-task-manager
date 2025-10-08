# 🧩 MERN Task Management System

A full-stack **Task Management Application** built using the **MERN (MongoDB, Express, React, Node.js)** stack as part of the **MERN Round 1 Task**.

---

## 🚀 Features

### 🔐 User Authentication
- Register and Login using JWT-based authentication.
- Only authorized users can create, view, edit, or delete tasks.
- Token stored securely in `localStorage`.

### 🧭 Task Management
- **Create Tasks** with title, description, due date, and priority (High / Medium / Low).
- **View Task List** with pagination and AJAX-like dynamic updates.
- **View Task Details** on a separate page.
- **Edit Tasks** – update title, description, and due date.
- **Delete Tasks** – includes confirmation dialog before deletion.
- **Update Task Status** – mark as “Pending” or “Completed”.
- **Priority Management** – move tasks between different priority lists.
- **Color-coded UI**:
  - 🔴 High Priority → Red  
  - 🟠 Medium Priority → Orange  
  - 🟢 Low Priority → Green  

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js (Axios, React Router DOM, CSS3) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Auth** | JSON Web Token (JWT), bcrypt.js |
| **Styling** | Custom CSS (Modern, Responsive UI) |
