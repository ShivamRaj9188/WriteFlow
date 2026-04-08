# WriteFlow Full-Stack Blog Platform

WriteFlow is a professional-grade, full-stack blog platform developed with a focus on modern web standards, secure backend architecture, and a premium user experience. The project utilizes a decoupled architecture, featuring a high-performance Java Spring Boot REST API and a sophisticated React frontend.

## 1. Project Overview

The primary objective of WriteFlow is to provide a scalable and secure environment for content publishing. The platform implements a complete authentication lifecycle, robust security measures, and a design system centered on high-fidelity glassmorphism aesthetics.

## 2. Technical Stack

### Backend Architecture
- **Framework**: Spring Boot 3
- **Security**: Spring Security with Stateless JWT Authentication
- **Persistence**: Spring Data JPA with H2 Database (Local) / PostgreSQL (Production ready)
- **Validation**: Jakarta Bean Validation (Hibernate Validator)
- **Build Tool**: Maven

### Frontend Architecture
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (Vanilla CSS configuration)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Networking**: Axios with HTTP Interceptors

## 3. Architecture Design

The repository is organized as a monorepo to ensure seamless coordination between the client and server layers.

- `/backend`: Contains the Spring Boot application, security configurations, and REST controllers.
- `/frontend`: Contains the React source code, design system tokens, and service layers.

### 4. Security Hardening (OWASP Compliance)

The platform has been audited and hardened according to OWASP best practices:

1. **Rate Limiting**: Implemented sliding-window throttling on all public endpoints (Login/Register) to mitigate brute-force and credential-stuffing attacks.
2. **Input Validation**: Strict schema-based validation on all DTOs. The system explicitly rejects payloads containing unexpected or malicious fields.
3. **JWT Security**: Requires a minimum 256-bit (32 character) HMAC-SHA secret key for token signing.
4. **CORS Policy**: Restrictive Cross-Origin Resource Sharing (CORS) policy limited to trusted development and production origins.
5. **Security Headers**: Configured Content Security Policy (CSP), Referrer Policy, and HSTS headers.

## 5. Installation and Setup

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Node.js v18 or higher
- Maven (Included via ./mvnw)
- **Docker & Docker Compose** (Recommended for easiest deployment)

### Deployment via Docker (Recommended)

The entire application stack (Frontend, Backend, PostgreSQL database) is fully dockerized.

1. Ensure Docker is running.
2. From the root directory, run:
   ```bash
   docker compose up --build -d
   ```
3. Access the application natively at `http://localhost`.

### Backend Configuration (Manual)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Define the mandatory JWT Secret environment variable:
   ```bash
   export BLOG_JWT_SECRET=your_minimum_32_character_secret_key
   ```
3. Boot the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The API will initialize at `http://localhost:8080`.

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
   The UI will be accessible at `http://localhost:5173` or `http://localhost:5174`.

## 6. Authentication Credentials for Testing

To facilitate immediate testing of the authenticated routes, the following test account is available in the local environment:

- **Username/Email**: `shivamtest@example.com`
- **Password**: `Password123`

## 7. Development Guidelines

- **Branching Strategy**: All feature development should occur on dedicated feature branches before merging into `main`.
- **Commit Messages**: Follow standard conventional commit prefixes (`feat:`, `fix:`, `docs:`, `style:`).
- **Environment Management**: Never commit actual secrets to the repository; utilize environment variables or `.env` files (git-ignored) for local configuration.

## 8. Docker Configurations

To easily launch, scale, and integrate the system across platforms, a 3-tier containerization setup is provided.

```text
Blog/
├── docker-compose.yml     # Root orchestration (DB, Backend, Frontend)
├── backend/
│   └── Dockerfile         # Multi-stage Maven + JRE build
├── frontend/
│   ├── Dockerfile         # Multi-stage Node Vite + Nginx build
│   └── nginx.conf         # Static file serving & /api/ reverse proxy
└── ...
```

### Advantages of the setup:
1.  **PostgreSQL by Default:** Runs a dedicated `postgres:15-alpine` container with persistent data volumes (`postgres_data`).
2.  **No CORS Issues:** The Frontend serves static files via Nginx. Any request to `http://localhost/api/*` is internally routed through the secure Docker network to the Spring Boot backend (`http://backend:8080/api/*`) by the Nginx reverse proxy.
3.  **Multi-stage Builds:** Extremely lightweight production images with no build-time overhead (e.g. Maven/Node) in the final containers.

