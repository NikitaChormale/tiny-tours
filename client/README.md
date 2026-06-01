
signature key

66162e8ac37469c0300d41698f4a9058165b5c247fef959dbac51bb8e847e5f4

  JWT TOKEN

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik5pa2l0YSIsImFkbWluIjp0cnVlLCJpYXQiOjE3NzU1NjE3MzksImV4cCI6MTc3NTU2NTMzOX0.gCtRoH53NtygjVrNxQcPAEi92JGxCkalmDyYPE6uaGk

# TinyTours

TinyTours is a tour management web application built using React, Node.js, Express, and MongoDB.

## Features

- User Signup & Login
- Create New Tours
- Edit Existing Tours
- Delete Tours
- Upload Tour Photos using ImageKit
- Dashboard for Managing Tours
- JWT Authentication

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Image Storage
- ImageKit

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in both frontend and backend.

### Frontend

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

## Run Project

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm start
```

## Project Structure

```
src/
├── components/
├── views/
├── utils/
├── App.jsx
├── main.jsx
```

Backend

```
controllers/
models/
routes/
middleware/
server.js
```

## API Endpoints

### Authentication

- POST /signup
- POST /login

### Tours

- GET /tours
- GET /tours/:id
- POST /tours
- PUT /tours/:id
- DELETE /tours/:id

## Author

Nikita Chormale

## License

This project is created for learning and assessment purposes.

## Screenshots

### Home Page

![Home Page](../client/src/assets/home%20page3.png)

### Sign-up Tour

![Create Tour](../client/src/assets/signup%20page.png)

### Login Page

![Login Page](../client/src/assets/login%20pahe.png)

### Dashboard

![Dashboard](../client/src/assets/dashboard%20page.png)

