# Perplexity Chat Application

## Overview

This project is a full-stack AI chat application built using the MERN stack. It allows users to register, verify their email, log in, create conversations, and interact with an AI assistant. Google Gemini is used to generate responses, while Mistral AI is used to generate chat titles.

## Features

### Backend

* User registration and login
* Email verification
* JWT authentication
* Chat creation and deletion
* Message management
* AI response generation
* MongoDB integration
* Input validation
* REST API for authentication and chat management

### Frontend

* React with Vite
* Redux Toolkit for state management
* Login and registration pages
* Protected routes
* Chat dashboard
* Chat history sidebar
* Send and receive messages
* Delete chats
* Loading states and error handling
* Responsive layout

## Getting Started

### Requirements

* Node.js
* MongoDB
* npm

### Backend

Install dependencies:

```bash
cd Backend
npm install
```

Start the server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

### Frontend

Install dependencies:

```bash
cd Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Routes

### Authentication

* POST `/api/auth/register`
* GET `/api/auth/verify-email`
* POST `/api/auth/login`
* GET `/api/auth/getMe`
* POST `/api/auth/logout`

### Chat

* POST `/api/chat/message`
* GET `/api/chat`
* GET `/api/chat/:chatId/messages`
* DELETE `/api/chat/delete/:chatId`

## Environment Variables

Create a `.env` file inside the Backend folder and add the required values.

Required variables:

* PORT
* MONGO_URI
* JWT_SECRET
* JWT_EMAIL_VERIFICATION_TOKEN
* GOOGLE_API_KEY
* MISTRAL_API_KEY
* EMAIL_USER
* EMAIL_PASSWORD

## Database Models

### User

* username
* email
* password
* verified

### Chat

* user
* title

### Message

* chat
* role
* content

## Technologies Used

### Frontend

* React
* Vite
* Redux Toolkit
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer

### AI Services

* Google Gemini API
* Mistral AI API

## Common Issues

### MongoDB connection error

* Check the MongoDB connection string.
* Make sure MongoDB is running or your Atlas cluster is accessible.

### API not working

* Make sure the backend server is running.
* Verify the frontend is using the correct API URL.

### Email verification

* Check your Gmail credentials.
* Use an App Password instead of your normal Gmail password.

## Future Improvements

* User profile page
* Chat search
* File uploads
* Chat export
* Theme switcher
* Message editing
* Voice input

## License

This project is for learning and personal portfolio purposes.
