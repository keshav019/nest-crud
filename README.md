# NestJS Project

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/keshav019/nest-crud
   ```

2. Navigate to the project directory:

   ```bash
   cd nest-crud
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

### Run using Docker
You can also run the project using Docker.
Make sure Docker is installed.

```bash
docker-compose up
```

The application will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

#### Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com",
    "token": "your-jwt-token"
  }
  ```

### User Management

#### Create User

- **Endpoint:** `/user`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com"
  }
  ```

#### Get User by ID

- **Endpoint:** `/user/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com"
  }
  ```

#### Get All Users

- **Endpoint:** `/user`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com"
    },
    ...
  ]
  ```

#### Update User

- **Endpoint:** `/user/:id`
- **Method:** `PATCH`
- **Request Header:**
  ```
  Authorization: Bearer your-jwt-token
  ```
- **Request Body:**
  ```json
  {
    "firstname": "UpdatedFirstName",
    "lastname": "UpdatedLastName"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "firstname": "UpdatedFirstName",
    "lastname": "UpdatedLastName",
    "email": "user@example.com"
  }
  ```

#### Delete User

- **Endpoint:** `/user/:id`
- **Method:** `DELETE`
- **Request Header:**
  ```
  Authorization: Bearer your-jwt-token
  ```

