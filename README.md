# Task Management REST API

A secure and scalable Task Management REST API built with **Node.js, Express, MongoDB, JWT, and bcrypt**.

This project demonstrates authentication, authorization, validation, and CRUD operations following production-style architecture.

---

##  Features

### Authentication

* User registration with encrypted passwords (bcrypt)
* User login with JWT token generation
* Protected APIs using JWT middleware

### Task Management

* Create, read, update, and delete tasks
* Ownership-based access control
* Pagination and filtering
* Search by title
* Soft delete support

### Security & Quality

* Role-based access control (user/admin)
* Joi validation
* Centralized error handling
* Clean layered architecture (Routes → Controllers → Services → Models)

---

##  Tech Stack

* Node.js (v16+)
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Joi

---

##  Project Structure

```
src/
 ├── app.js
 ├── server.js
 ├── config/
 ├── models/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middlewares/
 ├── validators/
 └── utils/
```

---

##  Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/rchuahanji01/NodeJS_Assignment_Task_Management_API.git
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env` file from example:

```bash
cp .env.example .env
```

Fill values in `.env`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT=10
NODE_ENV=development
```

### 4. Run Server

```bash
npm run dev
```

or

```bash
node src/server.js
```

Server will run on:

```
http://localhost:4000
```

---

##  Health Check

```http
GET /health
```

Response:

```json
{
  "status": "OK"
}
```

---

##  Authentication APIs

### Register User

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Rakesh",
  "email": "r@test.com",
  "password": "123456"
}
```

---

### Login User

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "r@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

Use this token for protected APIs.

---

##  Task APIs (Protected)

All task APIs require header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Create Task

```http
POST /api/tasks
```

Body:

```json
{
  "title": "Finish Assignment",
  "description": "Complete all APIs",
  "status": "pending",
  "dueDate": "2026-02-15"
}
```

---

### List Tasks (Pagination + Filter + Search)

```http
GET /api/tasks?page=1&limit=10&status=pending&search=finish
```

---

### Get Single Task (Owner/Admin Only)

```http
GET /api/tasks/:id
```

---

### Update Task

```http
PUT /api/tasks/:id
```

Body:

```json
{
  "status": "completed"
}
```

---

### Delete Task (Soft Delete)

```http
DELETE /api/tasks/:id
```

No body required.

---

##  Admin Access

Admins can access all users' tasks.

### Create Admin User

1. Register normally using API
2. Open MongoDB
3. Update user document:

```
role: "admin"
```

4. Login again to receive admin JWT

---

##  Error Handling

All errors follow standard format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common Status Codes:

* 400 → Bad Request
* 401 → Unauthorized
* 403 → Forbidden
* 404 → Not Found
* 409 → Conflict
* 500 → Server Error

---

##  Sample Test Credentials

```
Email: r@test.com
Password: 123456
```

(Replace with your own)

---

##  Notes

* Passwords are stored using bcrypt hashing
* JWT tokens are stateless
* Deleted tasks are soft deleted using `isDeleted` flag
* Validation is handled using Joi
* Business logic is isolated in services layer

---

##  License

This project is for technical assignment and learning purposes.

