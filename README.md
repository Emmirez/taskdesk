# TaskDesk — Full-Stack Task Management App

TaskDesk is a modern full-stack task management application built with **React, Vite, Tailwind CSS, and Node.js**. It allows users to manage tasks efficiently with authentication, secure sessions, and a clean UI.

---

🌍 Live Demo
🔗 Frontend: https://your-taskdesk.vercel.app
🔗 Backend API: https://your-taskdesk.onrender.com

## 🚀 Tech Stack

### Frontend

- **React 18** (UI library)
- **Vite** (fast build tool)
- **Tailwind CSS** (utility-first styling)

### Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication (Access + Refresh Tokens)**
- **Cookie-based session handling**

---

## ✨ Features

- 🔐 User authentication (Register, Login, Logout)
- 🔄 JWT Access & Refresh token system
- 🍪 Secure HTTP-only cookies
- 📧 Email verification & password reset
- ✅ Task CRUD (Create, Read, Update, Delete)
- ⚡ Rate limiting for API protection
- 🛡️ Error handling & security middleware
- 📱 Responsive modern UI

---

## 📁 Project Structure

```
taskdesk/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── main.jsx
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

CLIENT_URL=http://localhost:5173
```

---

## 🛠️ Installation

### 1. Clone the repository

````bash
git clone git remote add origin https://github.com/Emmirez/taskdesk.git
cd taskdesk

---

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
````

#### Frontend

```bash
cd frontend
npm install
```

---

## ▶️ Running the App

### Backend

```bash
npm run dev
```

### Frontend

````bash
npm run dev

## 🌐 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET  /api/auth/me`

### Tasks

- `GET    /api/tasks`
- `POST   /api/tasks`
- `PUT    /api/tasks/:id`
- `DELETE /api/tasks/:id`

## 🔐 Authentication Flow

- Access token (short-lived)
- Refresh token (long-lived)
- Tokens stored in **HTTP-only cookies**
- Automatic refresh system for seamless sessions

## 🚀 Deployment

### Backend

- Hosted on Render

### Frontend

- Hosted on Vercel

## 📌 Health Check

GET /api/health

Response:

```json
{
  "success": true,
  "message": "TaskFlow API is running"
}


## 🧠 Key Highlights

* Secure authentication system using **JWT + cookies**
* Clean scalable backend architecture
* Production-ready middleware (rate limiting, error handling)
* Modern responsive UI with Tailwind CSS
* Built with performance-focused tools (Vite)

## 👨‍💻 Author

Built by **Obaro**

---

## 📄 License

This project is for educational and portfolio purposes.
````
