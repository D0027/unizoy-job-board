# Unizoy Job Board Platform 🚀

A modern, full-stack job board application built for Unizoy. This platform allows administrators to securely post and manage job listings, while providing candidates with a seamless, premium UI/UX application experience.

## 🌟 Features

### For Candidates (Frontend)
- **Premium UI/UX:** Built with Next.js and Tailwind CSS, featuring a responsive, soft-glassmorphism design.
- **Live Search & Filtering:** Instantly filter open positions by job title or location.
- **Seamless Application Flow:** Candidates can easily apply with their Name, Email, Resume Link, and optional Cover Letter.
- **Form Validation & UX:** Includes loading states, success animations, and GDPR/Privacy consent checks.

### For Administrators (Admin Portal)
- **Secure Access:** The admin dashboard is protected by a frontend security passcode.
- **Job Management:** Instantly create and publish new job postings to the live board.
- **Candidate Pipeline:** View all received applications organized by job.
- **Quick Actions:** One-click access to candidate resumes and a "Smart Reply" feature that opens a pre-formatted email to the applicant.

## 💻 Tech Stack
- **Frontend:** React, Next.js (App Router), Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express.js, Mongoose, CORS, dotenv.
- **Database:** MongoDB.

## 🚀 Getting Started (Local Setup)

### Prerequisites
Make sure you have Node.js and MongoDB installed on your machine.

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies:
   npm install 

3. Create a .env file in the backend directory and add your MongoDB connection string and Port:
   MONGO_URI=your_mongodb_connection_string_here
   PORT=5000

4. Start the backend server:
   node server.js

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the Next.js development server:
   npm run dev

4. Open your browser and visit http://localhost:3000
   
### Testing the Admin Portal

To test the admin features (posting jobs and viewing candidates), click "Admin Portal" on the navigation bar.
1. Testing Passcode: unizoy123