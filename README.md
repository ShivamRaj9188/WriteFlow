# WriteFlow

WriteFlow is a professional-grade, full-stack content publishing platform engineered with a focus on modern web standards, secure backend architecture, and a premium user experience. The system utilizes a decoupled architecture, featuring a high-performance Java Spring Boot REST API and a highly optimized React frontend

## 1. Key Features

- **Cinematic User Experience**: High-fidelity glassmorphism aesthetics, responsive layouts, and dynamic state synchronization that ensures immediate UI updates across components without page reloads.
- **Robust Content Authoring**: A distraction-free markdown editor featuring live previews, automatic read-time calculation, and integrated cover image handling.
- **Advanced Engagement System**: A comprehensive interaction module supporting bookmarks, dynamic reactions, and localized view/share analytics with optimistic UI updates.
- **Profile Management**: Native profile handling featuring client-side HTML5 Canvas image compression, reducing bandwidth and storage requirements before backend transmission.
- **Secure Architecture**: Stateless JWT authentication, role-based access control, and stringent OWASP-compliant security headers and payload constraints.

## 2. Technical Stack

### Backend Architecture
- **Framework**: Spring Boot 3
- **Security**: Spring Security (Stateless JWT Authentication)
- **Persistence**: Spring Data JPA with H2 (Local) / PostgreSQL (Production)
- **Validation**: Jakarta Bean Validation (Hibernate Validator)
- **Build Tool**: Maven

### Frontend Architecture
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Networking**: Axios with centralized HTTP Interceptors

## 3. Architecture Design

The project is structured as a monorepo to ensure seamless coordination between the client and server layers.

- `/backend`: Contains the Spring Boot application, domain entities, and REST controllers.
- `/frontend`: Contains the React source code, design system tokens, and API integration services.

## 4. Security Hardening

The platform has been audited and hardened according to OWASP best practices:

1. **Rate Limiting**: Sliding-window throttling is enforced on all authentication endpoints to mitigate credential-stuffing attacks.
2. **Input Validation**: Strict schema-based validation on all Data Transfer Objects (DTOs). The system explicitly rejects payloads containing unexpected or malicious fields.
3. **JWT Security**: Requires a minimum 256-bit (32 character) HMAC-SHA secret key for token signing.
4. **CORS Policy**: Restrictive Cross-Origin Resource Sharing (CORS) configuration limited to trusted origins.
5. **Security Headers**: Enforced Content Security Policy (CSP), Referrer Policy, and HSTS headers.
6. **Payload Management**: Configured backend constraints to safely handle large Base64 image payloads while actively rejecting maliciously oversized requests.

## 5. Local Setup and Deployment

### Prerequisites
- Docker and Docker Compose (Recommended)
- Java Development Kit (JDK) 17 or higher
- Node.js v18 or higher

### Docker Deployment (Recommended)

The entire application stack (Frontend, Backend, PostgreSQL database) is fully containerized.

1. Ensure the Docker daemon is running.
2. From the project root, execute:
   ```bash
   docker compose up --build -d
   ```
3. Access the platform at `http://localhost`.

*Note: The frontend serves static files via Nginx, and all API requests to `/api/*` are securely reverse-proxied to the backend container, eliminating CORS overhead in production.*

### Manual Deployment

#### Backend Setup
1. Navigate to the `/backend` directory.
2. Export the required JWT secret:
   ```bash
   export BLOG_JWT_SECRET=your_minimum_32_character_secret_key
   ```
3. Boot the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The API will initialize at `http://localhost:8080`.*

#### Frontend Setup
1. Navigate to the `/frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
   *The UI will be accessible at `http://localhost:5173`.*

## 6. Authentication Credentials for Local Testing

To facilitate immediate evaluation of the authenticated routes, the following pre-seeded test account is available:

- **Email**: `shivamtest@example.com`
- **Password**: `Password123`

## 7. Development Guidelines

- **Branching Strategy**: All feature development must occur on dedicated feature branches before merging into the main branch.
- **Commit Standards**: Utilize standard conventional commit prefixes (`feat:`, `fix:`, `docs:`, `refactor:`).
- **Environment Management**: Secrets must never be committed to version control. Utilize environment variables or git-ignored `.env` files for all local configurations.
