# FitZone Gym & Class Booking System

## Description
FitZone is a web application where members can reserve trainer-led classes. Members can view trainers, book classes, and view their bookings.

## Technology Stack
- **Frontend**: React, Vite, React Router DOM, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT

## Folder Structure
```
FitZone/
├── frontend/ (React Vite application)
├── backend/  (Express.js API)
```

## MongoDB Setup
1. Create a MongoDB Atlas account or run a local MongoDB instance.
2. Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/fitzone`).

## Backend Installation
1. `cd backend`
2. `npm install`
3. Create `.env` file based on `.env.example` and add your MongoDB connection string and JWT secret.

## Backend Run Command
```bash
npm start
```

## Seed Command
```bash
node seed.js
```
Run this command inside the `backend` folder to populate initial trainers and a test user.

## Frontend Installation
1. `cd frontend`
2. `npm install`
3. Create `.env` file based on `.env.example`.

## Frontend Run Command
```bash
npm run dev
```

## Environment Variables
### Backend
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

### Frontend
- `VITE_API_URL`

## API Endpoints
- `POST /api/v1/auth/login` - Authenticate member and receive JWT
- `GET /api/v1/trainers` - Get all trainers (Public)
- `POST /api/v1/bookings` - Create a new booking (Protected)
- `GET /api/v1/bookings/my` - Get current member's bookings (Protected)
- `PATCH /api/v1/bookings/:id/status` - Update booking status (Protected)

## Authentication Explanation
The application uses JSON Web Tokens (JWT) for authentication. When a user logs in, the backend generates a JWT and sends it back. The frontend stores this token in localStorage. For protected routes (like booking a class or viewing bookings), the frontend sends this token in the `Authorization` header (`Bearer <token>`). The backend's `authGuard` middleware intercepts these requests, verifies the token, and attaches the member data to the request object.
