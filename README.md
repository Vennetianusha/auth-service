## 🔐 Multi-Provider OAuth 2.0 Authentication Service

**JWT • RBAC • Docker • Prisma • PostgreSQL • Redis**

A production-ready, fully containerized authentication service built with **Node.js, Express, Prisma, PostgreSQL, and Redis**.  
This service supports **local authentication**, **OAuth 2.0 (Google & GitHub)**, **JWT-based sessions**, and **Role-Based Access Control (RBAC)**.


---

## 🚀 Features

- ✅ Email & Password Registration
- 🔐 Secure Password Hashing (bcrypt)
- 🌐 OAuth 2.0 Login (Google & GitHub)
- 🎟 JWT Access & Refresh Tokens
- 🔁 Refresh Token Endpoint
- 🛡 Role-Based Access Control (Admin / User)
- 🚦 Rate Limiting on Auth Endpoints
- ⚡ Redis Cache Integration
- 🗄 PostgreSQL Database with Prisma ORM
- 🐳 Fully Containerized using Docker & Docker Compose

---

## 🧰 Tech Stack

| Category | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Cache | Redis |
| Auth | JWT, OAuth 2.0 |
| Containerization | Docker, Docker Compose |

---


---

## 🐳 Docker Setup

The application runs using **Docker Compose** with three services:

- **app** – Node.js API
- **db** – PostgreSQL 13
- **cache** – Redis 6.2

✔ All services include **health checks**  
✔ App waits for DB & Redis to be healthy before starting

---

## ▶️ Running the Application

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/auth-service.git
cd auth-service
2️⃣ Create Environment File
cp .env.example .env
⚠️ Add real values only in .env.
Never commit .env to GitHub.

3️⃣ Start Services
docker-compose up --build
4️⃣ Health Check
Open in browser:

http://localhost:8080/health
Expected response:

{
  "status": "ok"
}
🗄 Database Schema
users Table
Column	Type	Constraints
id	UUID	Primary Key
email	VARCHAR(255)	UNIQUE, NOT NULL
password_hash	VARCHAR(255)	Nullable
name	VARCHAR(255)	NOT NULL
role	VARCHAR(50)	Default: user
created_at	TIMESTAMP	Default NOW()
auth_providers Table
Column	Type	Constraints
id	UUID	Primary Key
user_id	UUID	FK → users(id)
provider	VARCHAR(50)	NOT NULL
provider_user_id	VARCHAR(255)	NOT NULL
✔ Unique constraint on (provider, provider_user_id)

🔐 API Endpoints
📝 Register
POST /api/auth/register

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "Password123"
}
Response (201)

{
  "id": "uuid",
  "name": "User Name",
  "email": "user@example.com",
  "role": "user"
}
🔑 Login
POST /api/auth/login

{
  "email": "user@example.com",
  "password": "Password123"
}
Response (200)

{
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
🔄 Refresh Token
POST /api/auth/refresh

{
  "refreshToken": "jwt"
}
🌐 OAuth Login
GET /api/auth/google

GET /api/auth/github

➡ Redirects to OAuth provider login page.

👤 Get Current User
GET /api/users/me

Header:

Authorization: Bearer <accessToken>
🛡 Admin – Get All Users
GET /api/users

✔ Admin only
❌ Regular users receive 403 Forbidden

🧪 Test Credentials
Defined in submission.json and seeded automatically:

{
  "testCredentials": {
    "adminUser": {
      "email": "admin@example.com",
      "password": "AdminPassword123!"
    },
    "regularUser": {
      "email": "user@example.com",
      "password": "UserPassword123!"
    }
  }
}
🔒 Security Measures
bcrypt password hashing

JWT access & refresh token separation

Rate limiting on auth endpoints

RBAC middleware

Environment-based configuration

No secrets committed to repository

📄 Environment Variables
All required variables are documented in .env.example:

API_PORT

DATABASE_URL

REDIS_URL

JWT_SECRET

JWT_REFRESH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID

GITHUB_CLIENT_SECRET

✅ Submission Checklist
✔ Dockerized application

✔ PostgreSQL & Redis configured

✔ Prisma ORM implemented

✔ OAuth 2.0 endpoints added

✔ JWT + RBAC enforced

✔ Database seeded

✔ Ready for Partnr evaluation

👤 Author
Anusha Pavani Venneti
