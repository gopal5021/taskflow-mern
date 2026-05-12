# 📌 TaskFlow MERN

A full-stack Task Management Application built using the MERN stack that allows users to register, login, and manage daily tasks efficiently.

---

## 🚀 Features

* User Authentication (Register & Login)
* JWT-based authentication
* Create, update, delete tasks
* Protected dashboard
* Deployed on Vercel & Render

---

## 🛠️ Tech Stack

Frontend:

* React.js (Vite)
* Tailwind CSS
* Axios

Backend:

* Node.js
* Express.js

Database:

* MongoDB (Mongoose)

Authentication:

* JWT

---

## ⚙️ Setup Instructions

### 1. Clone Repo

git clone https://github.com/gopal5021/taskflow-mern.git

---

### 2. Backend Setup

cd backend
npm install

Create `.env`:
PORT=5021
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

Run:
npm run dev

---

### 3. Frontend Setup

cd frontend
npm install
npm run dev

---

## 🔗 API Routes

POST /api/auth/signup
POST /api/auth/login

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

---

## 🧑‍💻 Author

Gopal Soni
https://github.com/gopal5021

---

## ⭐ Future Improvements

* Task categories
* Dark mode
* Notifications
