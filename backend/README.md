# User Management Backend API

RESTful API for user management built with Node.js, Express.js, and SQLite.

## 🚀 Quick Start

1. **Install dependencies**
npm install


2. **Set up environment**
cp .env.example .env


3. **Start the server**
Development mode with auto-reload
npm run dev

Production mode
npm start


The server will start on `http://localhost:5000`.

## 📋 API Endpoints

| Method | Endpoint         | Description       | Request Body |
|--------|------------------|-------------------|--------------|
| GET    | `/api/users`     | Get all users     | -            |
| GET    | `/api/users/:id` | Get user by ID    | -            |
| POST   | `/api/users`     | Create new user   | User object  |
| PUT    | `/api/users/:id` | Update user       | User object  |
| DELETE | `/api/users/:id` | Delete user       | -            |
| GET    | `/api/health`    | Health check      | -            |

## 📊 User Object Schema

{
"name": "string (required, min: 2 chars)",
"email": "string (required, valid email)",
"phone": "string (required, 10-20 chars)",
"company": "string (required, min: 2 chars)",
"street": "string (required, min: 5 chars)",
"city": "string (required, min: 2 chars)",
"zipcode": "string (required, 3-20 chars)",
"lat": "number (required, -90 to 90)",
"lng": "number (required, -180 to 180)"
}


## 🗃️ Database Schema

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


## 🧪 Example Requests

### Create User
curl -X POST http://localhost:5000/api/users
-H "Content-Type: application/json"
-d '{
"name": "John Doe",
"email": "john@example.com",
"phone": "1234567890",
"company": "Tech Corp",
"street": "123 Main St",
"city": "New York",
"zipcode": "10001",
"lat": 40.7128,
"lng": -74.0060
}'

text

### Response Format
{
"success": true,
"data": {
"id": 1,
"name": "John Doe",
"email": "john@example.com",
"phone": "1234567890",
"company": "Tech Corp",
"address": {
"street": "123 Main St",
"city": "New York",
"zipcode": "10001",
"geo": {
"lat": 40.7128,
"lng": -74.0060
}
},
"created_at": "2024-01-01T12:00:00.000Z",
"updated_at": "2024-01-01T12:00:00.000Z"
},
"message": "User created successfully"
}


## ⚙️ Environment Variables

PORT=5000
NODE_ENV=development
DB_NAME=users.db
CORS_ORIGIN=http://localhost:3000


## 🛡️ Security Features

- Input validation with Joi
- Helmet.js for secure HTTP headers
- CORS configured to allow frontend origin
- SQL injection prevention measures
- Centralized error handling without exposing sensitive details

## 📁 Project Structure

backend/
├── src/
│ ├── config/
│ │ └── database.js # Database configuration
│ ├── controllers/
│ │ └── userController.js # Request handlers
│ ├── middleware/
│ │ ├── errorHandler.js # Error handling
│ │ └── validation.js # Input validation
│ ├── models/
│ │ └── User.js # Data model
│ └── routes/
│ └── userRoutes.js # API routes
├── app.js # Express app initialization
├── package.json
└── .env.example


## 📝 License

MIT License
Save this as README.md in your backend folder. Let me know if you want further edits or combined frontend/backend README!

