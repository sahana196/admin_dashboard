# Admin Dashboard

A modern, responsive Admin Dashboard application built with React and Node.js. This project allows administrators to manage employees, view real-time analytics, generate reports, and track system activity.

## 🚀 Tech Stack

### Frontend
- **Framework:** [React 18.3.1](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:**
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Material UI (MUI)](https://mui.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Data Grid:** [MUI X Data Grid](https://mui.com/x/react-data-grid/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Reporting:** [jsPDF](https://github.com/parallax/jsPDF) & [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Data Source:** In-memory Mock Data (No database required for demo)
- **Features:** Server-Sent Events (SSE) for real-time updates

## ✨ Features

- **Dashboard Analytics:** 
  - Visual data representation using Recharts (Line, Pie, Bar charts).
  - Real-time metrics via Server-Sent Events (SSE).
- **Employee Management:** 
  - Full CRUD capabilities for employee records.
  - Interactive data grid with pagination and filtering.
- **Department & Role Management:** 
  - Manage organizational structure and user roles (RBAC).
- **Reports:** Generate and download PDF reports for analytics and employee lists.
- **Audit Logs:** Track recent system activities and user actions.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.

## 📂 Project Structure

```bash
Admin_Dashboard/
├── backend/          # Node.js/Express Backend
│   ├── server.js     # Entry point (Port 4000)
│   └── package.json
├── frontend/         # React Frontend
│   ├── src/
│   │   ├── pages/    # Dashboard, Reports, Employees, Settings
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed on your machine.

### 1. Backend Setup
Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm start
# OR for development with auto-restart
npm run dev
```
*The server runs on `http://localhost:4000`.*

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```
*The application will handle requests on `http://localhost:5173`.*

