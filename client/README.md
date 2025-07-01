# 🛒 E-KhariDari – Modern E-Commerce Web App

**E-KhariDari** is a modern, full-featured e-commerce web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It includes user authentication, product management, shopping cart, admin dashboard, and integrated Braintree payments.

---

## 🚀 Features

- 🔐 Secure user authentication (JWT)
- 🛍️ Product listings, categories, and details
- 🛒 Add to cart, remove, and quantity management
- 💳 Braintree payment integration
- 👤 User dashboard for orders
- 🛠️ Admin dashboard for product/order management
- 🔎 Search and filter products
- 📱 Fully responsive design

---

## 📂 Project Structure

E-Shop/
├── client/ # React frontend
├── server/ # Node.js + Express backend
├── controllers/
├── models/
├── routes/
├── .env
├── package.json
└── README.md

---

## 🧰 Tech Stack

| Technology  | Description                      |
| ----------- | -------------------------------- |
| React       | Frontend library for UI          |
| Node.js     | JavaScript runtime for backend   |
| Express.js  | Web framework for Node.js        |
| MongoDB     | NoSQL database                   |
| Mongoose    | MongoDB ODM for Node.js          |
| JWT         | Authentication (JSON Web Tokens) |
| Braintree   | Payment gateway integration      |
| Axios       | HTTP requests from frontend      |
| FontAwesome | Icons used across the app        |

### 💻 Frontend Setup

````bash
cd client
npm install
npm start

### Backend Setup

```bash
cd "C:\Users\Chaudhary Computer\OneDrive\Desktop\E-Shop"
npm install
npm run dev


````

## 🔐 Environment Variables

Create a `.env` file in your root directory with the following:

```env
PORT=8080
DEV_MODE=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
```
