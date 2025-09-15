# User Management Dashboard

A full-stack web application for managing users with CRUD operations. Built with React.js (frontend) and Node.js with Express (backend), using SQLite as the database. The frontend uses **Bootstrap** for styling and responsive design.

## 🚀 Features

### Frontend (React.js + Bootstrap)
- **Dashboard**: View all users in responsive card layouts
- **Search/Filter**: Search users by name, email, or company
- **User Details**: View complete user information
- **Create User**: Add new users with form validation (React Hook Form)
- **Edit User**: Update existing user details
- **Delete User**: Remove users with confirmation dialogs (Bootstrap modals)
- **Responsive Design**: Mobile-friendly using Bootstrap grid and utilities
- **State Management**: React Context API
- **Routing**: React Router DOM for navigation
- **Notifications**: React Toastify for feedback and error handling

### Backend (Node.js + Express)
- **RESTful API**: Full CRUD user management endpoints
- **SQLite**: Lightweight database for persistence
- **Validation**: Server-side input validation with Joi
- **Security**: Helmet.js for HTTP headers and CORS enabled
- **Logging**: Morgan for HTTP request logging

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

Extract or clone the project to your desired folder.

### 2. Backend Setup

cd backend
npm install
cp .env.example .env # create environment file
npm run dev # start backend dev server (localhost:5000)


### 3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start # start frontend dev server (localhost:3000)


## 🏗️ Project Structure

user-management-app/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ └── routes/
│ ├── app.js
│ ├── package.json
│ └── .env.example
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
└── README.md


## 🔧 API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/users`       | Get all users     |
| GET    | `/api/users/:id`   | Get user by ID    |
| POST   | `/api/users`       | Create new user   |
| PUT    | `/api/users/:id`   | Update user       |
| DELETE | `/api/users/:id`   | Delete user       |
| GET    | `/api/health`      | Health check      |

## 📊 Database Schema

CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
phone TEXT NOT NULL,
company TEXT NOT NULL,
street TEXT NOT NULL,
city TEXT NOT NULL,
zipcode TEXT NOT NULL,
lat REAL NOT NULL,
lng REAL NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


## 🧪 Example API Usage

### Create a User

curl -X POST http://localhost:5000/api/users
-H "Content-Type: application/json"
-d '{
"name": "John Doe",
"email": "john.doe@example.com",
"phone": "+1234567890",
"company": "Tech Corp",
"street": "123 Main St",
"city": "New York",
"zipcode": "10001",
"lat": 40.7128,
"lng": -74.0060
}'



## 🎯 Technologies Used

### Frontend
- React.js
- React Router DOM
- React Hook Form
- Axios
- React Toastify
- Bootstrap 5 (React components and CSS)

### Backend
- Node.js
- Express.js
- SQLite3
- Joi
- Helmet.js
- Morgan
- CORS

## 🚦 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload

### Frontend
- `npm start` - Start development server with hot reload
- `npm run build` - Build production optimized bundle
- `npm test` - Run tests

## 🏆 Production Ready

This app demonstrates clean code architecture, responsive UI with Bootstrap, comprehensive validation, proper error handling, and development best practices.

## 📝 License

This project is licensed under the MIT License.

## Working Screen shots
<img width="1347" height="736" alt="Screenshot 2025-09-15 at 12 48 20 PM" src="https://github.com/user-attachments/assets/05f8f069-c26c-46d4-a209-14515b107400" />

<img width="1440" height="900" alt="Screenshot 2025-09-15 at 12 50 32 PM" src="https://github.com/user-attachments/assets/440082c7-b278-477e-bd68-abcc476cf5fb" />

<img width="1440" height="900" alt="Screenshot 2025-09-15 at 12 50 12 PM" src="https://github.com/user-attachments/assets/21d731f6-314f-4015-beff-90c37c11d6c3" />


