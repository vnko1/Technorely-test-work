# Company Dashboard App

This repository contains the **Company Dashboard App**, a platform designed to manage users, companies, and statistics. The project is divided into two main parts:

- **Backend**: A server built with **NestJS** that handles API requests, authentication, and integration with external services.
- **Frontend**: A client-side application built with **Vite** for interacting with the platform.

---

## Features

### Backend

- **User Management**: Create, update, and manage users with roles like `Admin`, `SuperAdmin`, and `User`.
- **Company Management**: Manage companies, including uploading and editing company logos.
- **Statistics**: Generate statistics for users and companies.
- **Authentication**: Secure authentication using JWT and refresh tokens.
- **File Uploads**: Upload and manage user avatars and company logos using Cloudinary.
- **Role-Based Access Control (RBAC)**: Restrict access to endpoints based on user roles.

### Frontend

- **User-Friendly Interface**: Intuitive UI for managing users, companies, and statistics.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Integration**: Seamless integration with the backend API.

---

## Installation

### Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Node.js**: Required for local development.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/company-dashboard-app.git
   cd company-dashboard-app
   ```
2. Set up environment variables
   - Copy .env.example files in both backend and frontend directories and rename them to .env.
   - Update the variables as needed.
3. ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
4. Start the application in development mode:

```docker
  docker-compose up
```

## API Documentation

This project uses **Swagger** for API documentation. Swagger provides an
interactive interface to explore and test the API endpoints.

### Accessing Swagger

Once the application is running, you can access the Swagger documentation at:

- **Development**: `http://localhost:3000/api`
- **Production**: Replace `localhost` with your server's domain or IP.

### Features of Swagger

- View all available API endpoints.
- Test API endpoints directly from the browser.
- See detailed request and response schemas.
- Explore authentication and authorization requirements for each endpoint.

---

## Development

### Start app in dev mode:

```docker
  docker compose -f 'docker-compose.dev.yml' up -d --build
```

## Production

### Start app in prod mode:

```docker
  docker compose -f 'docker-compose.prod.yml' up -d --build
```
