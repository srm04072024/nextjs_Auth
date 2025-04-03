# Next.js Authentication

## 📌 Project Overview

This project is based on the **"Learn Auth in 1 Video"** course by **Hitesh Choudhury** from the **ChaiAurCode** YouTube channel. It implements authentication in **Next.js**, covering user sign-up, login, authentication tokens, email verification, password hashing, and handling authentication securely.

## 🚀 Features

- 🔐 **User Authentication** (Sign Up & Login)
- 📧 **Email Verification** using Nodemailer
- 🔑 **JWT Token Generation & Verification**
- 🔄 **Password Hashing** with Bcrypt.js
- 🗄 **Database Connection** for User Management
- 📝 **Environment Variables Handling**
- 🔍 **Error Handling & Debugging**
- 🛠 **API Testing with Postman**

## 🏗️ Project Structure

/next-auth-app
├── pages/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── signup.ts
│ │ │ ├── login.ts
│ │ │ ├── verify.ts
│ │ │ ├── reset-password.ts
│ ├── dashboard.tsx
│ ├── login.tsx
│ ├── signup.tsx
├── models/
│ ├── User.ts
├── utils/
│ ├── auth.ts
│ ├── db.ts
├── .env
├── next.config.js
├── package.json
└── README.md

markdown
Copy
Edit

## 🛠️ Technologies Used

- **Next.js** – Full-stack React framework
- **MongoDB** – Database for user authentication
- **Nodemailer** – Sending email verification links
- **Bcrypt.js** – Hashing user passwords
- **JSON Web Token (JWT)** – Secure token-based authentication
- **Postman** – API testing tool

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/next-auth-app.git
cd next-auth-app
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and configure:

ini
Copy
Edit
DATABASE_URL=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.your-email.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
4️⃣ Run the Project
bash
Copy
Edit
npm run dev
Access the app at http://localhost:3000

🔑 Authentication Flow
1️⃣ User Signs Up ➝ Data stored securely in the database.
2️⃣ Email Verification ➝ A verification link is sent to the user.
3️⃣ User Logs In ➝ Password is hashed and verified.
4️⃣ JWT Token Issued ➝ Secured authentication via tokens.
5️⃣ Protected Routes ➝ Only authenticated users can access certain pages.

🛠 API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Registers a new user
POST	/api/auth/login	Logs in a user
GET	/api/auth/verify	Verifies user email
POST	/api/auth/reset-password	Resets user password
🧪 Testing with Postman
Import the API collection into Postman.

Test authentication endpoints with valid and invalid credentials.

Debug token verification and environment variables.

🔍 Debugging & Issues
Invalid Token? Check .env file and JWT_SECRET.

Email Not Sent? Configure SMTP settings properly.

Database Not Connecting? Ensure MongoDB URL is correct.

📌 Summary
This project provides a secure authentication system in Next.js, covering everything from user sign-up, login, email verification, password hashing, and JWT-based authentication. 🎯

🚀 Happy Coding! 😃
```
