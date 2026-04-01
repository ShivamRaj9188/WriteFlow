# WriteFlow - Blog Platform Backend

WriteFlow is a scalable, modern backend for a comprehensive Blog Platform, built with Java Spring Boot.

## Current State (Project Skeleton)

This repository currently houses the foundational skeleton of the WriteFlow backend. It has been structured with best practices in mind, utilizing a layered architecture to ensure scalability, maintainability, and clean code principles.

### Key Technologies Integrated:
*   **Java 17+**
*   **Spring Boot 3.x** (Web, Data JPA, Security, Validation)
*   **PostgreSQL** (Database)
*   **JWT (JSON Web Tokens)** (via `jjwt`)
*   **Hibernate** (ORM)
*   **Lombok** (Boilerplate reduction)
*   **ModelMapper** (DTO Mapping)

### Project Structure Diagram

```text
src/main/java/com/in/Blog_app
├── BlogApplication.java                # Main application class
├── config/                             # Global configurations (e.g., ModelMapper)
├── controller/                         # REST API Controllers (Auth, Post, Comment)
├── dto/                                # Data Transfer Objects for API requests/responses
├── entity/                             # JPA Entities mapping to database tables
├── exception/                          # Global Exception Handling mechanism
├── repository/                         # Spring Data JPA Repository interfaces
├── security/                           # Spring Security and JWT configuration
│   ├── jwt/                            # JWT utilities, filters, and entry points
│   └── services/                       # Custom UserDetailsService implementation
└── service/                            # Business logic interfaces
    └── impl/                           # Business logic implementations
src/main/resources
└── application.properties              # Application configuration (Database, JWT, Server)
```

### Implemented Architectural Layers:
*   **Controller**: Defines the REST API endpoints (`/api/auth`, `/api/posts`, `/api/posts/{postId}/comments`).
*   **Service**: Contains the core business logic interfaces and implementations (`PostService`, `CommentService`).
*   **Repository**: Spring Data JPA interfaces for database interaction.
*   **Entity / Model**: Database mappings (`User`, `Role`, `Post`, `Comment`).
*   **DTO (Data Transfer Object)**: Decouples the API contract from the database entities.
*   **Security**: Fully configured JWT request filter, entry point, and web security config.
*   **Exception**: A global exception handler (`@RestControllerAdvice`) for standardized error responses.

---

## Future State (Finished Project)

When fully implemented, WriteFlow will serve as a robust API backend supporting a feature-rich blogging application.

### Planned Features:

1.  **Robust Authentication and Authorization**:
    *   Secure user registration and login endpoints.
    *   Role-Based Access Control (RBAC) supporting `USER` and `ADMIN` roles.
    *   Secure stateless session management using JWTs.

2.  **Comprehensive Blog Management (CRUD)**:
    *   Users can create, read, update, and delete their own blog posts.
    *   Admins will have elevated privileges allowing them to manage all content.
    *   Advanced querying including pagination and sorting of posts for performance optimization.

3.  **Engagement System**:
    *   **Comments**: Users can engage in discussions by adding comments to specific posts.
    *   **Likes**: (Upcoming) A structured system for users to 'like' posts, driving engagement metrics.

4.  **Production-Ready Quality**:
    *   Strict input validation using `@Valid` annotations.
    *   Complete DTO mapping ensuring sensitive entity data (like passwords or internal IDs) is never exposed directly.
    *   Comprehensive and consistent error handling across all API routes.

## Setup and Local Development

1.  **Prerequisites**:
    *   Java 17 or higher
    *   Maven
    *   PostgreSQL running locally or accessible remotely.

2.  **Database Configuration**:
    *   Create a PostgreSQL database named `blog_db` (or update `src/main/resources/application.properties` with your preferred setup).
    *   Update the database username and password in `application.properties`.

3.  **Running the Application**:
    ```bash
    ./mvnw spring-boot:run
    ```

## API Documentation (Coming Soon)
*(Swagger / OpenAPI integration planned for future phases to document all available endpoints dynamically).*
