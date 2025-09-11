
---

# 📘 README.md

##  Referral Platform

A full-stack web application for job referrals, built as part of the internship assignment.
It provides secure login/signup, profile management, referral posting, and a public feed.

---

## ✨ Features

### ✅ MVP (Must-Have)

* **Secure Login/Signup** with JWT authentication.
* **Profile creation & editing** (personal, education, employment).
* **Post job referrals** with title, company, description, and status.
* **Dashboard** displaying profile details & user’s referrals.

### 🎁 Optional (Good-to-Have)

* ✅ **Referral status tracking** (Pending, Accepted, Closed).
* ✅ **Public referral feed** for all users.
* ✅ Search/filter referrals.
* ❌ Basic messaging between referrer & candidate (future enhancement).

---

## 🛠️ Tech Stack Justification

### **Frontend**:

* **React (Vite)** → Fast, modern UI library.
* **TailwindCSS** → Utility-first CSS for responsive, consistent styling.
* **Framer Motion** → Smooth animations for better UX.

👉 Fits perfectly for building a clean, responsive, and modern interface quickly.

### **Backend**:

* **Express.js** → Lightweight and flexible Node.js framework.
* **MongoDB + Mongoose** → Schema-based, scalable NoSQL database.
* **JWT Authentication** → Secure login with token-based auth.

👉 Chosen for rapid prototyping, scalability, and ease of implementing REST APIs.

---

## 📂 Project Structure

```
/frontend   → React + Tailwind + Framer Motion code
/backend    → Express + MongoDB backend code
README.md   → Documentation & setup instructions
```

---

## 🔑 Demo Login

Use this seeded demo account for evaluation:

```
Email: hire-me@anshumat.org  
Password: HireMe@2025!
```

---

## ⚡ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd referral-platform
```

### 2. Setup Backend

```bash
cd backend
npm install
# create .env file with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret>
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application

Visit 👉 `http://localhost:5173/`

---

## 📌 API Endpoints

### Profile

* `POST /profile` → Create/Update profile
* `GET /profile` → Get logged-in user profile

### Referral

* `POST /referral` → Create referral
* `GET /referral` → Public feed (all referrals)
* `GET /referral/user` → User’s referrals
* `PUT /referral/:id` → Update referral
* `DELETE /referral/:id` → Delete referral

---

## 🚀 Future Enhancements

* 🔍 Search & filter referrals by company/title/status.
* 💬 Messaging system between referrer & candidate.
* 📊 Analytics dashboard for referral stats.
* 🐳 Docker support for easier deployment.

---

## 👨‍💻 Author

**Sujit Thakur**

* Portfolio: [sujit-porttfolio.vercel.app](https://sujit-porttfolio.vercel.app/)
* GitHub: [tsujit74](https://github.com/tsujit74)
* Email: [tsujeet440@gmail.com](mailto:tsujeet440@gmail.com)

---
