# StudyPulse — Full Stack Quiz & Study Platform

Welcome to **StudyPulse**, a modern, mobile-responsive, full-stack web application designed to help learners master technical subjects with smart quizzes, notes, and flashcards. Built with **Java Spring Boot** backend and **React + TypeScript + Tailwind CSS** frontend, StudyPulse offers a seamless learning experience with engaging UI and real-time quiz functionality.

---

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Screenshots](#screenshots)  
- [Live Demo](#live-demo)  
- [Future Enhancements](#future-enhancements)  
- [Contributing](#contributing)  
- [Contact](#contact)  

---

## Features

### Frontend UI & UX
- **Landing Page** with catchy header, motivational quotes, and smooth background animations  
- User-friendly **Login** and **Register** pages with validation & password visibility toggle  
- Personalized **User Dashboard** showing greetings, latest scores, quiz cards, notes, and leaderboard  
- **Quiz Selection Page** with subject cards (OS, Java, DBMS, CN, DSA, Aptitude), filters by difficulty and time  
- Interactive **Quiz Taking Page** with timer, progress bar, navigation, animated transitions, auto-submit on timer end  
- Detailed **Result Page** showing score, correct/incorrect answers, time taken, with confetti animations  
- **Notes Section** featuring rich-text editor, search, filter, and color-coded note cards  
- Fun **Flashcards Section** with flip animations and learned/unlearned toggles  
- Competitive **Leaderboard** by subject and overall rankings  
- **Admin Panel** (Role-based UI) for quiz, notes, and resources management, plus analytics dashboard  
- **User Profile Page** showcasing badges, progress stats, quiz history, and bookmarks  
- Responsive navigation, light/dark mode toggle, toast notifications, skeleton loaders, and smooth animations (Framer Motion)  

### Backend & API
- RESTful APIs built with **Spring Boot** and **Spring Data JPA**  
- Secure authentication using **Spring Security** (JWT or session-based)  
- Support for CRUD operations on quizzes, questions, notes, users, and admin analytics  
- MySQL database integration with entity relationships  
- Robust error handling and validations  

---

## Technology Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React, TypeScript, TailwindCSS |
| Backend    | Java, Spring Boot, Spring Security |
| Database   | MySQL                          |
| Styling    | Tailwind CSS                   |
| Routing    | React Router DOM               |
| Animations | Framer Motion                 |
| Notifications | React Toastify              |
| API Client | Axios                         |
| Charts     | Chart.js or Recharts           |
| Version Control | Git, GitHub               |
| Deployment | Vercel (Frontend), Heroku/AWS (Backend - planned) |

---

## Project Structure
StudyPulse/
├── backend/ # Spring Boot backend source code
│ ├── src/main/java # Controllers, services, models, security config
│ ├── src/main/resources # application.properties, DB scripts
│ ├── pom.xml # Maven dependencies
│
├── frontend/ # React frontend source code
│ ├── src/
│ │ ├── components/ # Reusable UI components (Button, Navbar, Card, Loader, etc.)
│ │ ├── pages/ # Page components (Home, Quiz, Dashboard, Admin, Profile, etc.)
│ │ ├── context/ # React contexts (Auth, Theme)
│ │ ├── services/ # API service helpers (Axios instances, API calls)
│ │ ├── assets/ # Images, icons, logos
│ │ └── App.tsx # Main app routing and layout
│ ├── public/ # Static files
│ └── package.json # Frontend dependencies
│




---

## Setup & Installation

### Backend Setup

1. Open terminal and navigate to the backend directory:  
   ```bash
   cd backend
Configure your src/main/resources/application.properties file with your MySQL database credentials.

./mvnw spring-boot:run
Backend will run on:
http://localhost:8080


###Frontend Setup
cd frontend
npm install
npm run dev
Frontend will be available at:
http://localhost:5173

Usage
Open frontend URL in browser.

Signup or login to access dashboard.

Select quizzes by subject (Operating System, Java, DBMS, CN, DSA, Aptitude).

Take quizzes one question at a time with timer and progress.

View detailed results with performance stats.

Create, view, and edit notes.

Use flashcards to revise topics.

Track progress on the dashboard and check the leaderboard.

Live Demo
Try the live frontend here:
https://frontend-quiz-app-theta-mauve.vercel.app/
## Screenshots

### Landing Page
![Landing Page](screenshots/landing-page.png (2))

### Quiz Page
![Quiz Page](screenshots/landing-page.png)

### Result Page
![Result Page](screenshots/notes.png)

### Dashboard
![Dashboard](screenshots/quiz-page.png)



