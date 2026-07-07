# ROVE Hire - HR Recruitment Management System

A full-stack HR recruitment management system that helps HR teams manage jobs, candidates, interviews, hiring decisions, and offer document generation.

## Live Demo

Frontend:
https://hr-recruitment-system-gray.vercel.app

Backend API:
https://hr-backend-0gyo.onrender.com

GitHub Repository:
https://github.com/yashashree27/hr-recruitment-system

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Upload)
* PDFKit (Offer Letter & NDA Generation)

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Features

### Authentication

* HR user login
* JWT based authentication
* Protected routes
* Role-based authorization

### Job Management

* Create jobs
* View available jobs
* Track job status
* Support open and closed jobs

### Candidate Management

* Add candidates to jobs
* Resume upload
* Prevent duplicate candidates for the same job
* Candidate profile tracking
* Candidate status timeline

### Interview Management

* Schedule interviews
* Support screening and technical interviews
* Add interviewer details and notes
* Complete interviews with feedback
* Update candidate status after interview

### Hiring Workflow

Candidate workflow:

```
Applied
   ↓
Interview Scheduled
   ↓
Interview Completed
   ↓
Hire / Rejected
   ↓
Offer Sent
```

### Offer Documents

* Generate Offer Letter PDF
* Generate NDA PDF
* Store generated documents
* Track offer status

---

## Project Structure

```
hr-recruitment-system

├── hr_backend
│
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── uploads
│   │
│   ├── server.js
│   └── package.json
│
├── hr_frontend
│
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   └── services
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md 
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yashashree27/hr-recruitment-system.git

cd hr-recruitment-system
```

---

# Backend Setup

Navigate to backend:

```bash
cd hr_backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:8000
```

---

# Frontend Setup

Open another terminal:

```bash
cd hr_frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Modules

### Authentication

```
POST /api/auth/login
```

### Jobs

```
GET    /api/jobs
POST   /api/jobs
```

### Candidates

```
GET    /api/candidates
POST   /api/candidates
```

### Interviews

```
POST /api/interviews
POST /api/interviews/complete
```

### Offers

```
POST /api/offers
```

---

## Environment Variables

Backend requires:

| Variable   | Description                       |
| ---------- | --------------------------------- |
| MONGO_URI  | MongoDB Atlas connection string   |
| JWT_SECRET | Secret key for JWT authentication |
| PORT       | Backend server port               |

---

## Deployment Architecture

```
                 Users
                   |
                   |
              Vercel
          React + Vite Frontend
                   |
                   |
              Render
          Node + Express Backend
                   |
                   |
            MongoDB Atlas
              Database
```

---

## Hosting

The application is hosted as a full-stack web application.

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

This setup allows the frontend and backend to be deployed independently while using a managed cloud database that is accessible from both local and production environments.


## Tech Stack & Why

### Frontend
**React + Vite**
- Chosen for its component-based architecture, fast development experience, and optimized production builds.

### Backend
**Node.js + Express.js**
- Provides a lightweight and scalable REST API with simple routing and middleware support.

### Database
**MongoDB Atlas**
- A flexible NoSQL database that works well for storing jobs, candidates, interviews, and offer data.

### File Storage
**Multer with local storage**
- Used to upload resumes and generated PDF documents. It was sufficient for this assignment and easy to integrate.

### Hosting
- **Vercel** was chosen for the frontend because it provides seamless deployment for React applications.
- **Render** was chosen for the backend because it supports long-running Node.js/Express services and integrates well with GitHub.

## PDF Generation Approach

Offer Letters and NDA documents are generated using **PDFKit**.

PDFKit was chosen because it allows PDFs to be generated directly from the backend without requiring HTML templates or external services. It is lightweight and easy to customize.

For a production-scale application, I would:
- Store generated PDFs in cloud storage such as AWS S3.
- Generate documents asynchronously using background jobs.
- Support customizable templates that HR teams can edit without changing code.

## Author

Yashashree Marghade
