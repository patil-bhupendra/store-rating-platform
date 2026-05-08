#  Store Rating Platform 

A full-stack web application that allows users to rate stores (1–5 stars) with role-based access for Admin, Normal Users, and Store Owners.

---

##  Live Demo
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

##  Tech Stack

### Frontend
- React.js
- Axios
- Tailwind CSS (optional styling improvements)
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MySQL

---

##  User Roles

### 1. Admin
- Add Users (Admin / Normal / Store Owner)
- Add Stores
- View Dashboard stats:
  - Total Users
  - Total Stores
  - Total Ratings
- View all users & stores
- Search & filter data

---

### 2. Normal User
- Register & Login
- View all stores
- Search stores by name/address
- Submit rating (1–5)
- Update rating
- Update password

---

### 3. Store Owner
- Login
- View their store dashboard
- See users who rated their store
- View average rating

---

##  Core Features

- JWT-based authentication
- Role-based authorization
- Store rating system (1–5)
- Admin dashboard with analytics
- Search & filtering system
- Password validation (strong password rules)
- RESTful APIs
- MySQL relational schema

---

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/store-rating-platform.git
