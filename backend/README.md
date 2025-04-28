# Сompany Dashboard App Server

This is the backend server for the **Сompany Dashboard App**, a platform
designed to manage users, companies, and statistics. The server is built using
**NestJS** and integrates with various services like PostgreSQL, Cloudinary, and
JWT for authentication.

## Features

- **User Management**: Create, update, and manage users with roles like `Admin`,
  `SuperAdmin`, and `User`.
- **Company Management**: Manage companies, including uploading and editing
  company logos.
- **Statistics**: Generate statistics for users and companies.
- **Authentication**: Secure authentication using JWT and refresh tokens.
- **File Uploads**: Upload and manage user avatars and company logos using
  Cloudinary.
- **Role-Based Access Control (RBAC)**: Restrict access to endpoints based on
  user roles.

---

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

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **PostgreSQL**: A PostgreSQL database instance is required.
- **Cloudinary**: A Cloudinary account for file uploads.
- **Docker**: Ensure Docker and Docker Compose are installed.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/technorely-server.git
   cd technorely-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and configure the following
   variables:

   ```properties
   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret

   # Cloudinary Configuration
   CLOUDINARY_API_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Super Admin Credentials
   SUPER_ADMIN_EMAIL=your_super_admin_email
   SUPER_ADMIN_PASSWORD=your_super_admin_password

   # PostgreSQL Configuration
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_DB=mydb
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=myPassword
   ```

4. Run the application using Docker:

   Build and start the application with Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Start the NestJS server.
   - Spin up a PostgreSQL database container.

5. Access the application:

   - The server will be available at `http://localhost:3000`.
   - PostgreSQL will be accessible at `localhost:5432`.

---

## Docker Configuration

### Docker Compose

The `docker-compose.yml` file is configured to run the application and
PostgreSQL database. Below is an example configuration:

```yaml
version: "3.8"
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - postgres
  postgres:
    image: postgres:14
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

### Dockerfile

The `Dockerfile` is used to build the application image. Below is an example:

```dockerfile
# Use Node.js LTS as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
```

---

## Development

### Running in Development Mode

```bash
npm run start:dev
```

### Running Tests

```bash
npm run test
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

---

## Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start:prod
   ```

---
