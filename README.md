# Bidverse - Online Auction Platform

## 🚀 Introduction
**Bidverse** is a full-stack online auction platform built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. The platform allows users to create accounts, bid on items, and manage auctions in real-time.

## 🖥️ Features
✅ User Authentication (Register/Login)
✅ Admin Panel for Auction Management
✅ Real-time Bidding System
✅ Product Listing with Detailed Descriptions
✅ Countdown Timer for Active Auctions
✅ Secure Payment Integration
✅ Responsive Design for Mobile and Desktop

## 📂 Project Structure
```
📁 MERN_Stack_Auction_Platform-main
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┗ index.js
 ┃ ┣ .env
 ┃ ┣ package.json
 ┃ ┗ README.md
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ index.js
 ┃ ┣ .env
 ┃ ┗ package.json
 ┣ .gitignore
 ┣ README.md
 ┗ package.json
```

## ⚙️ Installation and Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Krharry-28/Bidverse-Online-Auction-System.git
cd MERN_Stack_Auction_Platform-main
```

### 2️⃣ Backend Setup
1. Navigate to the **backend** folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
```
PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_SECRET_KEY>
```
4. Start the backend server:
```bash
npm start
```

### 3️⃣ Frontend Setup
1. Navigate to the **frontend** folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
```
REACT_APP_API_URL=http://localhost:5000
```
4. Start the frontend server:
```bash
npm start
```

### 4️⃣ Access the Application
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

## 📋 Usage
1. **Register** for an account.
2. **Log in** to access your profile and place bids.
3. Admins can manage auctions, approve listings, and oversee users.
4. Watch live countdown timers and place bids in real-time.

## 🚧 Future Enhancements
✅ Add email notifications for bid status updates.  
✅ Implement payment gateway for secure transactions.  
✅ Introduce a chat system for bidder-seller communication.  

## 🤝 Contributing
We welcome contributions! Here's how you can help:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request.

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** [Optional] AWS / Vercel / Netlify / Heroku

## 📄 License
This project is licensed under the **MIT License**.

## 🙌 Acknowledgments
Special thanks to the contributors and the MERN community for their valuable support.

---

> **Created with ❤️ by Krharry-28**

