# 📘 Planora – Study Tracker & Streak App

## 🚀 Overview
Planora is a React-based study tracking web application that helps users manage tasks, track study time, and maintain daily learning streaks. It is designed to improve productivity and consistency.

## ✨ Features
- Add, edit, and delete study tasks  
- Start, pause, and stop timer for each task  
- Track completed study hours  
- Daily streak system (based on study minutes)  
- Data saved in Local Storage  
- Logout functionality with route redirect  
- Clean and simple UI  

## 🛠 Tech Stack
- React.js  
- JavaScript (ES6+)  
- React Router DOM  
- HTML & CSS (Inline Styling)  
- Local Storage API  

## 📂 Project Structure
src/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── AddTask.jsx
│   ├── Streak.jsx
│   └── Schedule.jsx
│
├── components/
├── styles/
└── App.jsx

## ▶ How to Run

# Clone repo
git clone https://github.com/Anaya1015/planora.git

# Install dependencies
npm install

# Start project
npm start

## 🔥 Streak System
- User must study at least 3 minutes per day  
- If condition met → streak increases by 1  
- Only counted once per day  

## 🚪 Logout Feature
- Clears running timer data  
- Redirects user to login page  

## 👨‍💻 Author
Your Name

GitHub: https://github.com/your-username

## 📌 Future Improvements
- Backend integration (MongoDB / Firebase)  
- Better UI design improvements  
- Mobile responsive design  
- Analytics dashboard  
