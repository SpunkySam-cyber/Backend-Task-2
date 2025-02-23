# Backend-Task-2
Authentication system with Express, MongoDB and Node

Below is a **comprehensive README** that you can adapt to your project. It covers setup, local usage, deployment, and general troubleshooting tips. You can tweak the wording to fit your exact needs.

---

# **Auth-System**

A full-stack authentication system built with **Node.js (Express)**, **MongoDB (Atlas)**, and a simple **HTML/CSS/JS** frontend. It allows users to **register**, **login**, and **access protected routes**. The system uses **JSON Web Tokens (JWT)** for authentication.

---

## **Table of Contents**

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Environment Variables](#environment-variables)  
7. [Running Locally](#running-locally)  
8. [Deployment (Vercel)](#deployment-vercel)  
9. [API Endpoints](#api-endpoints)  
10. [Frontend Usage](#frontend-usage)  
11. [Troubleshooting](#troubleshooting)  
12. [License](#license)

---

## **1. Features**

- **User Registration:** New users can register with a unique email and secure password (hashed with **bcrypt**).  
- **User Login:** Existing users can log in to receive a **JWT** for authenticated requests.  
- **Protected Routes:** Certain routes require a valid JWT token to access.  
- **Password Security:** Passwords are hashed using **bcrypt** before storage in MongoDB.  
- **MongoDB Atlas:** Data is stored on a cloud-hosted MongoDB Atlas cluster, ensuring easy deployment.  
- **Simple Frontend:** A minimal HTML/CSS/JS interface for registration, login, and accessing a protected dashboard.

---

## **2. Tech Stack**

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Frontend:** HTML, CSS, JavaScript (no framework)  
- **Authentication:** JWT (jsonwebtoken)  
- **Deployment:** Vercel  

---

## **3. Project Structure**

```
Auth-system
├── public
│   ├── index.html        // Login page
│   ├── register.html     // Registration page
│   ├── dashboard.html    // Protected dashboard
│   ├── script.js         // Frontend logic (API calls, token storage)
│   └── style.css         // Basic styling
├── routes
│   ├── auth.js           // Registration & login routes
│   └── protected.js      // Protected routes requiring JWT
├── models
│   └── user.js           // Mongoose user schema
├── server.js             // Main server file (Express, route mounting)
├── .env                  // Environment variables (ignored by Git)
├── vercel.json           // Vercel deployment config
├── package.json
└── package-lock.json
```

---

## **4. Prerequisites**

- **Node.js** (v14+ recommended)
- **npm** (v6+)
- **MongoDB Atlas** account (for remote DB)

---

## **5. Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/Auth-system.git
   cd Auth-system
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```

---

## **6. Environment Variables**

Create a `.env` file in the root of the project with the following variables:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
PORT=5000
```

- **MONGO_URI:** Your MongoDB Atlas connection string  
- **JWT_SECRET:** A secret key for signing JWT tokens  
- **PORT:** The port on which the server will run locally (defaults to 5000)

Make sure to add `.env` to your `.gitignore` to avoid committing sensitive information.

---

## **7. Running Locally**

1. **Start the Server:**
   ```bash
   npm start
   ```
   or
   ```bash
   npx nodemon server.js
   ```
2. **Open the Frontend:**  
   - You can open `public/index.html` directly in your browser.  
   - By default, your API runs on `http://localhost:5000`.

3. **Test the Endpoints:**  
   - **Register:** `POST http://localhost:5000/api/auth/register`  
   - **Login:** `POST http://localhost:5000/api/auth/login`  
   - **Protected:** `GET http://localhost:5000/api/protected/dashboard` (requires JWT)

---

## **8. Deployment (Vercel)**

1. **Create a Vercel Account** (if you don’t have one).
2. **Add Environment Variables** on the Vercel dashboard:
   - `MONGO_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET`
3. **vercel.json** (in the root):
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "server.js", "use": "@vercel/node" },
       { "src": "public/**", "use": "@vercel/static" }
     ],
     "routes": [
       { "src": "^/api/(.*)$", "dest": "server.js" },
       { "src": "^/(.*)$", "dest": "/public/$1" }
     ]
   }
   ```
4. **Deploy**:
   - **Option 1 (CLI):**  
     ```bash
     npm install -g vercel
     vercel login
     vercel
     ```
   - **Option 2 (GitHub Integration):**  
     - Push your code to GitHub.  
     - Import your repo into Vercel and set up a project.  
     - Vercel will auto-build and deploy on every push to the configured branch.

---

## **9. API Endpoints**

### **Registration**
- **Endpoint:** `POST /api/auth/register`
- **Body:** `{ "name": "string", "email": "string", "password": "string" }`
- **Response:**  
  - **201**: `{ "msg": "User registered successfully" }`  
  - **400**: `{ "msg": "User already exists" }`  
  - **500**: `{ "msg": "Server error" }`

### **Login**
- **Endpoint:** `POST /api/auth/login`
- **Body:** `{ "email": "string", "password": "string" }`
- **Response:**  
  - **200**: `{ "token": "JWT_TOKEN" }`  
  - **400**: `{ "msg": "Invalid credentials" }`

### **Protected**
- **Endpoint:** `GET /api/protected/dashboard`
- **Headers:** `{ "Authorization": "Bearer <JWT_TOKEN>" }`
- **Response:**  
  - **200**: `{ "msg": "Welcome to the dashboard!", "user": { "userId": "..." } }`  
  - **401**: `{ "message": "Access Denied" }`

### **Get All Users (Protected)**
- **Endpoint:** `GET /api/protected/users`
- **Headers:** `{ "Authorization": "Bearer <JWT_TOKEN>" }`
- **Response:**  
  - **200**: Returns an array of user objects without passwords.  
  - **401**: `{ "message": "Access Denied" }`

---

## **10. Frontend Usage**

The **public** folder contains a simple frontend:

- **`index.html`:** Login page  
- **`register.html`:** Registration page  
- **`dashboard.html`:** Protected dashboard (requires JWT)  
- **`script.js`:** Contains code to handle form submissions, store JWT in `localStorage`, and fetch protected routes.  
- **`style.css`:** Basic styling.

1. **Register:** Enter a name, email, and password → click “Register”  
2. **Login:** Enter the same email/password → click “Login” → JWT stored locally  
3. **Access Dashboard:** If JWT is valid, the user is redirected to `dashboard.html` and sees a list of all registered users.

---

## **11. Troubleshooting**

1. **MongoDB Connection Error**  
   - Ensure your **MONGO_URI** is correct.  
   - Check Atlas [Network Access](https://docs.atlas.mongodb.com/security/ip-access-list/) to allow 0.0.0.0/0 or specific IP addresses.

2. **CORS Issues**  
   - `cors()` is enabled in `server.js`. If you have a custom domain, ensure your CORS settings match.

3. **JWT Invalid or 401 Errors**  
   - Make sure you send the header as `Authorization: Bearer <token>`.  
   - Tokens expire after 1 hour (configurable in `jwt.sign`).

4. **404 or 500 Errors on Vercel**  
   - Check `vercel.json` to ensure routes are correct.  
   - Confirm environment variables in Vercel’s dashboard.  
   - Review Vercel logs for build/runtime errors.

5. **Favicon 500 Error**  
   - Add a `favicon.ico` or `favicon.png` in `public/` to prevent 500 errors when browsers request a favicon.

---

## **12. License**

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute as needed.

---

### **That’s It!**

You now have a fully functional authentication system with a simple frontend, ready for local development or cloud deployment on Vercel. If you have any questions or issues, feel free to open an issue or reach out. Happy coding!
