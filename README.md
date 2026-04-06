# WriteFlow

WriteFlow is a robust, full-stack blog platform. It is engineered with a separation of concerns in mind, utilizing a modern React (Vite) frontend with a highly curated glassmorphism design system alongside a high-performance Spring Boot API layer backend.

## Architecture

The platform follows a modern client-server architecture pattern split within a monorepo structure:

- **frontend**: A single-page application built on React, Vite, and Tailwind CSS.
- **backend**: A REST API layer built on Java Spring Boot utilizing Spring Security and JWT.

## Features

- **Decoupled System**: Clean separation between the UI and API endpoints. 
- **Authentication**: JWT-based session management handling user registration, login, and robust cross-origin resource sharing (CORS).
- **Glassmorphism Interface**: A premium dark-themed design system ensuring soft blurs, distinct gradients, and intuitive user experiences.
- **State Management**: Centralized React Context providing global user synchronization and authorization barriers.
- **Scalability**: Backend dependencies established for Role-Based Access Control, extensible models, and global exception handling.

## Technology Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Lucide React

### Backend
- Java 17+
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Maven

## Getting Started

### Prerequisites

- Node.js (v18+)
- Java JDK (17+)
- Maven (Embedded wrapper available within `/backend`)

### Running the Backend

Ensure you are located at the root of the repository.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start and listen on `http://localhost:8080`.

### Running the Frontend

Ensure you are located at the root of the repository.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will start and listen on `http://localhost:5173`.

## Authentication Flow

The system employs stateless JWT-based authentication. 

1. Clients submit credentials to `/api/auth/login`.
2. The server verifies and returns a signed `Bearer` token.
3. The frontend captures the token into browser LocalStorage.
4. An Axios HTTP interceptor automatically appends the `Authorization: Bearer <token>` header to all outgoing secure requests.
5. Unauthorized operations resulting in a `401 HTTP` response automatically trigger state purging and routing fallback to the login panel.

## Development Constraints

When pushing modifications, maintain consistent coding practices:
- Commit structures should follow the conventional commits standard (e.g., `feat:`, `fix:`, `chore:`, `docs:`).
- Validate dependencies and testing integrations prior to merging into foundational branches.
