# WriteFlow Full-Stack Blog Platform

WriteFlow is a professional-grade, full-stack blog platform developed with a focus on modern web standards, secure backend architecture, and a premium user experience. The project utilizes a decoupled architecture, featuring a high-performance Java Spring Boot REST API and a sophisticated React frontend.

## 1. Project Overview

The primary objective of WriteFlow is to provide a scalable and secure environment for content publishing. The platform implements a complete authentication lifecycle, robust security measures, and a design system centered on high-fidelity glassmorphism aesthetics.

### Key Capabilities & Features
- **Cinematic UI/UX**: Distinct, responsive interfaces for authenticated vs. guest users, complete with subtle animations, a custom typewriter-style loader, and a highly polished dark-mode aesthetic.
- **Native Profile Management**: Advanced profile handling allowing users to update their name, bio, and profile pictures dynamically.
- **Client-Side Image Processing**: An intelligent `ProfileModal` utilizing HTML5 Canvas to instantly resize and compress local images before converting them to Base64 strings for optimized backend storage.
- **Dynamic State Synchronization**: Seamless global React state syncing ensuring immediate UI updates across all components (like the Navbar and Dashboard) upon profile changes without requiring a page reload.

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
4. **CORS Policy & Method Support**: Restrictive Cross-Origin Resource Sharing (CORS) policy limited to trusted development and production origins, explicitly supporting required HTTP methods like `PATCH` for incremental resource updates.
5. **Security Headers**: Configured Content Security Policy (CSP), Referrer Policy, and HSTS headers.
6. **Payload Capacity Management**: Configured robust backend support and entity mapping (e.g. `@Lob`) to safely handle large `Base64` image payloads while rejecting maliciously oversized requests.

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

---

## 9. Engagement Module

WriteFlow includes a comprehensive post-engagement system backed by dedicated persistence layers and REST endpoints.

### Supported Interactions

| Interaction | Endpoint | Auth Required |
|-------------|----------|---------------|
| Like / Unlike | `POST /api/posts/{id}/like` | Yes |
| Bookmark / Unbookmark | `POST /api/posts/{id}/bookmark` | Yes |
| React (emoji) | `POST /api/posts/{id}/reaction` | Yes |
| Remove Reaction | `DELETE /api/posts/{id}/reaction` | Yes |
| Record View | `POST /api/posts/{id}/view` | No |
| Record Share | `POST /api/posts/{id}/share` | No |
| Get Summary | `GET /api/posts/{id}/engagement` | No |

### Frontend Behavior

- **Optimistic UI**: All interactions update the UI immediately before the API call completes. If the API call fails, the UI gracefully retains the local state change.
- **Fallback Data**: When a post is a demonstration article (not backed by a backend record), the `EngagementBar` renders with stable seeded values instead of random numbers, ensuring visual consistency on every render.
- **Bookmark Persistence**: Bookmarks are stored in `localStorage` under the key `wf_bookmarks` and synchronized across open tabs via the `storage` and `wf_bookmark_changed` browser events. The Bookmarks tab on the dashboard reflects this state in real time.
- **Reaction Picker**: A floating picker allows users to select from six reaction types (`LIKE`, `LOVE`, `HAHA`, `WOW`, `SAD`, `ANGRY`). Selecting the same reaction twice removes it.

---

## 10. Content Authoring

### Write Editor

The write page (`/write`) provides a distraction-free authoring environment with the following capabilities:

- **Cover Image**: A prominent image zone accepts any publicly accessible image URL. A live preview is rendered immediately after the URL is entered.
- **Markdown-style Formatting**: The editor supports `**bold**`, `*italic*`, and `` `inline code` `` conventions, rendered correctly on the article page.
- **Live Preview**: A toggle switches between write and preview modes, rendering the final article layout including the cover image and formatted text.
- **Word Count and Read Time**: A live statistics bar displays the current word count, estimated read time (at 200 words per minute), and remaining character count.
- **Tab Indentation**: The Tab key inserts two spaces instead of moving focus.

### Cover Image Storage Strategy

The cover image URL is embedded at the top of the content field using the following marker format, requiring no backend schema changes:

```
[cover:https://example.com/image.jpg]

<rest of post content>
```

The `parseCoverImage()` utility in `postsApi.js` extracts and strips this marker transparently before rendering.

---

## 11. Post Feed and My Posts

### Feed Architecture

The authenticated feed fetches real backend posts via `GET /api/posts` and merges them with demonstration articles. Backend posts appear first. A demonstration article is excluded from the merged list only if a backend post with the same numeric ID already exists.

### My Posts Tab

A dedicated dashboard tab displays only the authenticated user's published articles, powered by:

```
GET /api/posts/my
```

This endpoint resolves the user ID from the JWT token via `@AuthenticationPrincipal` and returns a paginated list of posts authored by that user. This approach is reliable and does not depend on client-side author string matching.

### Article Routing

- **Numeric IDs** (e.g., `/post/4`): The backend is queried first. If a backend post is found, it is shown regardless of whether a demonstration article with the same ID exists. If the backend returns an error, the system falls back to the matching demonstration article. If neither exists, a "not found" state is shown.
- **Non-numeric slugs**: Only demonstration articles are checked.

---

## 12. Bug Fixes and Stability Improvements

### Lazy-Loading Transaction Fix

`Post.author` is a `@ManyToOne(fetch = FetchType.LAZY)` association. The original `PostServiceImpl` had no `@Transactional` annotation, which caused the Hibernate session to close before `ModelMapper` accessed `post.getAuthor()`. This produced a `LazyInitializationException` on every read operation, resulting in HTTP 500 responses on `GET /api/posts` and `GET /api/posts/{id}`, and silently degraded the entire frontend to render demonstration data exclusively.

**Resolution**: `@Transactional` was added to `PostServiceImpl` at the class level. All service methods now execute within a single Hibernate session, allowing lazy associations to be resolved correctly.

### Author Field Mapping

`PostDto` carries a `@Null` Bean Validation constraint on the `author` field to prevent clients from supplying an author during creation. This annotation has no effect on Jackson serialization. With the transaction fix in place, `ModelMapper` now correctly maps the `User` entity to `UserDto` in all responses.

### Engagement Number Stability

Demonstration articles previously computed `likes` and `views` using `Math.random()` inside `ArticleCard`. Since React can re-render components on parent re-renders or hover events, this produced different values on every render cycle. All eight demonstration articles now carry fixed, seeded engagement values in `dummyData.js`. `ArticleCard` reads `post.likes ?? 0` and `post.views ?? 0` directly.
