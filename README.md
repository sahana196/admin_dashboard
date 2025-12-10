# Admin Dashboard - HR Management System

A modern, responsive Admin Dashboard for HR management, built with React and Node.js. This application provides comprehensive tools for managing employees, departments, roles, and viewing real-time analytics.

## 🚀 Features

### Dashboard & Analytics
- **Real-time Overview**: Key performance indicators (KPIs) for Total Users, Active Users, New Signups, and Open Tickets.
- **Interactive Charts**:
  - User Growth Trends (Line Chart)
  - Ticket Status Distribution (Pie Chart)
  - Department-wise Employee Distribution (Bar Chart)
- **Recent Activity**: Activity log tracking user actions.
- **Widgets**: Server health status and quick action shortcuts.

### Employee Management
- **CRUD Operations**: Add, Edit, View, and Delete employee records.
- **Search & Filter**: Real-time search by name/role and filtering by department.
- **Bulk Import**: Support for importing employee data via Excel/CSV (using `xlsx`).
- **Profile Management**: Detailed view of employee profiles.

### Administrative Tools
- **Department Management**: Create and manage organizational departments.
- **Role Management**: Define and assign user roles (RBAC).
- **Reports**: Generate and export system reports to PDF (using `jspdf`).
- **Authentication**: Secure Login and Registration pages.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & CSS Modules
- **Charting**: [Recharts](https://recharts.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Utilities**: `jspdf` (PDF generation)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Data Storage**: Local JSON file storage (Mock Database in `backend/data/`)
- **File Handling**: `multer` (Uploads) & `xlsx` (Excel parsing)
- **CORS**: Enabled for cross-origin requests

## 📂 Project Structure

```
Admin_Dashboard/
├── backend/                  # Node.js Express Server
│   ├── data/                 # JSON Data Storage
│   │   ├── departments.json
│   │   ├── employees.json
│   │   └── roles.json
│   ├── package.json          # Backend Dependencies
│   └── server.js             # Main Server Entry Point
│
├── frontend/                 # React Vite Client
│   ├── public/               # Static Assets
│   ├── src/
│   │   ├── api/              # API Service Configuration
│   │   ├── assets/           # Images & Icons
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── Charts.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ...
│   │   ├── context/          # React Context (State Management)
│   │   ├── hooks/            # Custom Hooks (e.g., useSSE)
│   │   ├── pages/            # Page Components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ...
│   │   ├── App.jsx           # Main App Component
│   │   └── main.jsx          # React Entry Point
│   ├── index.html
│   ├── tailwind.config.cjs
│   └── package.json          # Frontend Dependencies
│
└── README.md                 # Project Documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher) installed.

### 1. Backend Setup
Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Start the backend server (runs on port 4000):

```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server (runs on port 5173):

```bash
npm run dev
```

### 3. Usage
- Open your browser and visit `http://localhost:5173`.
- Log in with any credentials (development mode).
- Navigate through the sidebar to access Dashboard, Employees, and other features.

## 📸 Screenshots
*(Add your screenshots here)*

---
*Created by [Your Name]*
