#  Store Rating Platform 

A full-stack web application that allows users to rate stores (1–5 stars) with role-based access for Admin, Normal Users, and Store Owners.

---

##  Live Demo
- Frontend: ``
- Backend: ``

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
```

## 2. Backend Setup
cd backend
npm install

Create .env file:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_app
JWT_SECRET=your_secret_key
```

Run backend:
```
npx nodemon app.js
```
## 3. Frontend Setup
```
cd frontend
npm install
npm run dev
```
## Database Schema Overview
### Users Table
- id
- name
- email
- password
- address
- role (ADMIN / USER / STORE_OWNER)

### Stores Table
- id
- name
- email
- address
- owner_id
  
### Ratings Table
- id
- user_id
- store_id
- rating (1–5)
  
## Authentication Flow
1. User logs in
2. JWT token generated
3. Token stored in localStorage
4. Protected routes accessed using token
5. Role-based access enforced

## API Endpoints

**Auth**
POST ```/api/auth/register```
POST ```/api/auth/login```
PUT ```/api/auth/update-password```

**Admin**
- POST ```/api/admin/add-user```
- POST ```/api/admin/add-store```
- GET ```/api/admin/dashboard```
- GET ```/api/admin/users```
- GET ```/api/admin/stores```

**Ratings**
POST ```/api/stores/rate```

## Key Highlights
- Clean role-based architecture
- Secure authentication with JWT
- Fully functional admin dashboard
- Search & filter system
- Scalable backend design
- Production-ready structure

## Future Improvements
- Pagination for tables
- Advanced sorting (asc/desc UI toggle)
- Email verification
- Deployment (Render + Vercel)
- Better UI/UX polish

## Author
GitHub: [[[Your GitHub Link](https://github.com/patil-bhupendra)]](https://github.com/patil-bhupendra)

### License

This project is for educational/internship evaluation purposes.
