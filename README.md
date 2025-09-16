# Project API Server

This is the backend server for the application, providing a RESTful API for user authentication and contact management.

## Features

- User registration and authentication with JWT.
- CRUD operations for contacts.
- Protected routes.
- API documentation with Swagger.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd JS/SERVER
npm install
```

### 2. Configuration

Create a `.env` file in the root of the `JS/SERVER` directory and add the following environment variables. You can use the `.env.example` file as a template.

```
MONGO_DB_HOST=localhost
MONGO_DB_PORT=27017
MONGO_DB_NAME=mydatabase
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Running the Server

To start the server in development mode (with auto-reloading), run:

```bash
npm run start:dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## API Documentation

Once the server is running, you can access the Swagger documentation in your browser at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and receive a JWT.

### User

- `GET /api/profile`: Get the profile of the currently logged-in user (requires authentication).

### Contacts

- `POST /api/contacts`: Create a new contact (requires authentication).
- `GET /api/contacts`: Get all contacts for the logged-in user (requires authentication).
- `PATCH /api/contacts/:id`: Update a contact (requires authentication).
- `DELETE /api/contacts/:id`: Delete a contact (requires authentication).