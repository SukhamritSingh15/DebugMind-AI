<div align="center">

# 🧠 DebugMind AI
### AI-powered debugging assistant and GitHub repository analyzer
**Understand the error. Find the cause. Fix the code.**

<p>

  <a href="https://debug-mind-ai-nine.vercel.app/">🌐 Live Demo</a> •

  <a href="https://github.com/SukhamritSingh15/DebugMind-AI">💻 GitHub</a> •

  <a href="#-features">✨ Features</a> •

  <a href="#-tech-stack">🛠 Tech Stack</a> •

  <a href="#-architecture">🏗 Architecture</a> •

  <a href="#-getting-started">🚀 Getting Started</a>

</p>

<br>

![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white)

![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

![Gemini](https://img.shields.io/badge/Gemini-AI-8E75FF?style=for-the-badge&logo=google&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 📌 Overview
**DebugMind AI** is a full-stack AI-powered debugging assistant built to help developers understand programming errors, identify root causes, generate fixes, and improve their code.

Instead of searching through documentation and forums for every error, users can submit source code and error information and receive a structured AI-powered analysis.

DebugMind AI also includes a **GitHub Repository Analyzer** that can inspect a public repository and generate insights about its architecture, code quality, bugs, security, performance, and possible improvements.

The project combines a modern React frontend with a Spring Boot backend, PostgreSQL persistence, JWT authentication, Gemini AI, and GitHub REST APIs.

> 💡 **Turn confusing errors and unfamiliar repositories into actionable engineering insights.**
---

# ✨ Features
| | **Feature** | **Description** |

|---|---|---|

| 🤖 | **AI Debugging** | Analyze programming errors and source code using Google Gemini |

| 🧠 | **Root Cause Analysis** | Understand why an error occurs instead of only seeing the fix |

| 🔧 | **Fix Generation** | Generate practical solutions and corrected code |

| 📚 | **Best Practices** | Receive recommendations for avoiding similar problems |

| 🔐 | **JWT Authentication** | Secure registration and login using JWT |

| 🔒 | **BCrypt Password Hashing** | Securely hash user passwords before storage |

| 📝 | **Debug History** | Save and revisit previous debugging sessions |

| 📄 | **Pagination** | Efficiently retrieve debugging history |

| 🔍 | **Search & Filtering** | Search history and filter by programming language |

| 🐙 | **GitHub Analyzer** | Analyze public GitHub repositories |

| 🌳 | **Repository Intelligence** | Detect default branches and inspect relevant repository files |

| 🏛️ | **Architecture Analysis** | Understand repository structure and architecture |

| 🐞 | **Bug Analysis** | Identify potential bugs and suspicious implementation patterns |

| 🔒 | **Security Analysis** | Identify possible security concerns |

| ⚡ | **Performance Analysis** | Identify possible performance bottlenecks |

| 🧹 | **Code Quality Analysis** | Review maintainability and code quality |

| 📖 | **Swagger / OpenAPI** | Interactive API documentation with JWT support |

| 📱 | **Responsive UI** | Desktop and mobile-friendly interface |

| 🐳 | **Dockerized Backend** | Run the Spring Boot backend inside Docker |

| 🧪 | **Automated Testing** | Backend tests using JUnit and Mockito |

| ☁️ | **Cloud Deployment** | Frontend, backend, and database deployed separately |

---

# 🌐 Live Demo
### [**→ Open DebugMind AI**](https://debug-mind-ai-nine.vercel.app/)
### Production Backend
https://debugmind-ai-i1rh.onrender.com/

### GitHub Repository
https://github.com/SukhamritSingh15/DebugMind-AI

---

# 🧠 AI Debugging
DebugMind AI generates structured debugging responses rather than returning a simple one-line answer.

## AI Response Structure
| **Section** | **Purpose** |

|---|---|

| **Error Explanation** | Explains what the error means |

| **Root Cause** | Identifies why the error occurred |

| **Exact Fix** | Explains what needs to change |

| **Corrected Code** | Provides a corrected implementation |

| **Best Practices** | Suggests ways to avoid similar issues |

### Example
```text

Error:

NullPointerException

Root Cause:

A String reference was null and the program attempted

to call .length() on that reference.

Fix:

Check whether the reference is null before invoking

the method.

Corrected Code:

...

Best Practices:

...

```

---

# 🐙 GitHub Repository Analyzer
DebugMind AI can analyze public GitHub repositories and generate structured AI-powered insights.

## Analysis Areas
| **Section** | **Description** |

|---|---|

| 📌 **Overview** | High-level repository summary |

| 🏗️ **Architecture** | Project structure and architectural patterns |

| 🐞 **Bugs** | Potential bugs and suspicious patterns |

| 🔒 **Security** | Security risks and implementation concerns |

| 🧹 **Quality** | Maintainability and code quality |

| ⚡ **Performance** | Possible performance improvements |

| 🚀 **Improvements** | Suggested engineering enhancements |

## Repository Analysis Flow
```text

GitHub Repository URL

        │

        ▼

Repository Validation

        │

        ▼

Repository Metadata

        │

        ▼

Default Branch Detection

        │

        ▼

Repository Tree

        │

        ▼

Relevant File Filtering

        │

        ▼

Repository Context

        │

        ▼

Gemini AI Analysis

        │

        ▼

Structured Repository Report

```

---

# 🛠 Tech Stack
## Frontend
\- React

\- Vite

\- JavaScript

\- Tailwind CSS

\- Axios

\- CodeMirror

\- React Markdown

\- remark-gfm

## Backend
\- Java 21

\- Spring Boot 4.1.1

\- Spring Security

\- Spring Data JPA

\- Hibernate

\- JWT

\- BCrypt

\- Maven

\- RestClient

## Database
\- PostgreSQL

\- Supabase

## AI & External APIs
\- Google Gemini API

\- GitHub REST API

## Testing
\- JUnit

\- Mockito

\- Spring Boot Test

\- MockMvc

## DevOps & Deployment
\- Docker

\- Docker Compose

\- Git

\- GitHub

\- Vercel

\- Render

\- Supabase

---

# 🏗 Architecture
DebugMind AI follows a layered full-stack architecture with separate frontend and backend services.

```text

                         ┌──────────────────────┐

                         │         USER         │

                         └──────────┬───────────┘

                                    │

                                    ▼

                  ┌───────────────────────────────┐

                  │        React Frontend         │

                  │                               │

                  │ React + Vite + Tailwind CSS   │

                  │ Axios + CodeMirror            │

                  └──────────────┬────────────────┘

                                 │

                              REST API

                                 │

                                 ▼

                  ┌───────────────────────────────┐

                  │      Spring Boot Backend      │

                  │                               │

                  │ Controllers                   │

                  │ Services                      │

                  │ Spring Security               │

                  │ JWT Authentication            │

                  │ Validation                    │

                  │ Exception Handling            │

                  └──────────────┬────────────────┘

                                 │

               ┌─────────────────┼─────────────────┐

               │                 │                 │

               ▼                 ▼                 ▼

      ┌────────────────┐ ┌───────────────┐ ┌────────────────┐

      │   PostgreSQL   │ │  Gemini API   │ │   GitHub API   │

      │    Supabase    │ │               │ │                │

      │                │ │ AI Debugging  │ │ Repository     │

      │ Users          │ │ AI Analysis   │ │ Metadata       │

      │ Debug Sessions │ │               │ │ Source Files   │

      └────────────────┘ └───────────────┘ └────────────────┘

```

---

# 🔄 Debugging Flow
```text

User

 │

 ▼

React Frontend

 │

 │ POST /api/debug

 ▼

DebugController

 │

 ▼

DebugService

 │

 ├── Validate request

 │

 ├── Identify authenticated user

 │

 ├── Build AI prompt

 │

 ├── Call Gemini API

 │

 ├── Process AI response

 │

 └── Save DebugSession

          │

          ▼

     PostgreSQL

          │

          ▼

     DebugResponse

          │

          ▼

     React Interface

```

---

# 🔐 Authentication Architecture
```text

Registration

     │

     ▼

Request Validation

     │

     ▼

BCrypt Password Hash

     │

     ▼

PostgreSQL

     │

     ▼

Login

     │

     ▼

JWT Generation

     │

     ▼

Frontend

     │

     ▼

Axios Interceptor

     │

     ▼

Authorization: Bearer <JWT>

     │

     ▼

JwtAuthenticationFilter

     │

     ▼

Protected API Endpoint

```

---

# ☁️ Production Architecture
```text

                         INTERNET

                             │

                             ▼

                ┌──────────────────────────┐

                │          Vercel          │

                │       React Frontend     │

                └────────────┬─────────────┘

                             │

                             │ HTTPS / REST

                             ▼

                ┌──────────────────────────┐

                │          Render          │

                │     Spring Boot API      │

                │     Docker + Java 21     │

                └────────────┬─────────────┘

                             │

              ┌──────────────┼──────────────┐

              │              │              │

              ▼              ▼              ▼

       ┌────────────┐ ┌────────────┐ ┌────────────┐

       │  Supabase  │ │   Gemini   │ │  GitHub    │

       │ PostgreSQL │ │    API     │ │ REST API   │

       └────────────┘ └────────────┘ └────────────┘

```

---

# 📁 Project Structure
```text

DebugMind-AI/

│

├── backend/

│   │

│   ├── src/

│   │   ├── main/

│   │   │   ├── java/

│   │   │   │   └── com/debugmind/backend/

│   │   │   │       ├── config/

│   │   │   │       ├── controller/

│   │   │   │       ├── dto/

│   │   │   │       ├── entity/

│   │   │   │       ├── exception/

│   │   │   │       ├── filter/

│   │   │   │       ├── repository/

│   │   │   │       ├── security/

│   │   │   │       └── service/

│   │   │   │

│   │   │   └── resources/

│   │   │       └── application.properties

│   │   │

│   │   └── test/

│   │       └── java/

│   │

│   ├── Dockerfile

│   ├── pom.xml

│   └── mvnw

│

├── frontend/

│   │

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── App.jsx

│   │   └── main.jsx

│   │

│   ├── public/

│   ├── vercel.json

│   ├── package.json

│   └── vite.config.js

│

├── docker-compose.yml

├── .gitignore

└── README.md

```

---

# 📡 API Endpoints
## Authentication
```http

POST /api/auth/register

POST /api/auth/login

```

## Debugging
```http

POST /api/debug

GET /api/debug/history

DELETE /api/debug/{id}

```

## GitHub Analyzer
```http

POST /api/github/analyze

```

## Health / Test
```http

GET /api/test

```

---

# 📖 Swagger / OpenAPI
DebugMind AI includes interactive API documentation using Swagger / OpenAPI.

### Local Swagger UI
```text

http://localhost:8080/swagger-ui/index.html

```

### OpenAPI Specification
```text

http://localhost:8080/v3/api-docs

```

Swagger supports JWT Bearer authentication for protected endpoints.

---

# 🚀 Getting Started
## Prerequisites
Make sure you have the following installed:

\- Java 21

\- Node.js 20+

\- npm

\- Docker Desktop

\- Git

---

## 1. Clone the Repository
```bash

git clone https://github.com/SukhamritSingh15/DebugMind-AI.git

cd DebugMind-AI

```

---

## 2. Start PostgreSQL
The local development environment uses PostgreSQL through Docker.

```bash

docker compose up -d

```

Verify that the container is running:

```bash

docker ps

```

---

## 3. Start the Backend
Navigate to the backend:

```bash

cd backend

```

Configure the required environment variables:

```text

POSTGRES_PASSWORD=<your-postgres-password>

JWT_SECRET=<your-jwt-secret>

GEMINI_API_KEY=<your-gemini-api-key>

GITHUB_TOKEN=<your-github-token>

CORS_ALLOWED_ORIGINS=http://localhost:5173

```

### Run Spring Boot
Windows:

```powershell

.\mvnw.cmd spring-boot:run

```

Backend:

```text

http://localhost:8080

```

---

## 4. Start the Frontend
Open another terminal:

```bash

cd frontend

npm install

```

Create:

```text

.env.development

```

Add:

```env

VITE_API_BASE_URL=http://localhost:8080

```

Run:

```bash

npm run dev

```

Frontend:

```text

http://localhost:5173

```

---

# ⚙️ Environment Variables
## Backend
```text

POSTGRES_PASSWORD

JWT_SECRET

GEMINI_API_KEY

GITHUB_TOKEN

CORS_ALLOWED_ORIGINS

```

## Frontend
```text

VITE_API_BASE_URL

```

### Local Frontend
```env

VITE_API_BASE_URL=http://localhost:8080

```

### Production Frontend
```text

VITE_API_BASE_URL=https://debugmind-ai-i1rh.onrender.com

```

> ⚠️ Never commit passwords, API keys, JWT secrets, or GitHub tokens to the repository.*
---

# 🧪 Testing
The backend includes automated tests covering important application behavior.

## Test Areas
\- Controller validation

\- Debug creation

\- Debug history

\- Pagination

\- AI service failure handling

\- Resource-not-found handling

\- GitHub analysis

\- GitHub controller validation

\- Service-layer logic

\- Application startup

## Run Tests
```powershell

cd backend

$env:GITHUB_TOKEN="test-token"

$env:JAVA_TOOL_OPTIONS="-Duser.timezone=UTC"

.\mvnw.cmd clean test

```

---

# 🐳 Docker
The Spring Boot backend is containerized using Docker.

## Build the Image
```bash

docker build -t debugmind-backend ./backend

```

## Docker Architecture
```text

Build Stage

    │

    ├── Maven

    ├── Java 21

    └── Build Spring Boot JAR

            │

            ▼

Runtime Stage

    │

    ├── Java 21 JRE

    └── Run app.jar

```

Using a multi-stage build separates build dependencies from the runtime environment.

---

# 🚢 Deployment
DebugMind AI is deployed using separate services.

| **Service** | **Platform** | **Directory** |

|---|---|---|

| Frontend | Vercel | `frontend/` |

| Backend | Render | `backend/` |

| Database | Supabase | PostgreSQL |

### Frontend
https://debug-mind-ai-nine.vercel.app/

### Backend
https://debugmind-ai-i1rh.onrender.com/

### Production Flow
```text

GitHub

  │

  ├──────────────► Vercel

  │                   │

  │                   ▼

  │              React Frontend

  │

  └──────────────► Render

                      │

                      ▼

                 Spring Boot API

                      │

             ┌────────┼─────────┐

             │        │         │

             ▼        ▼         ▼

          Supabase  Gemini    GitHub

          PostgreSQL  API      API

```

---

# 🔒 Security
DebugMind AI implements several security practices.

## Authentication
\- JWT-based authentication

\- Stateless Spring Security

\- BCrypt password hashing

\- Protected API endpoints

## Application Security
\- Request validation

\- Centralized exception handling

\- CORS configuration

\- Environment-based configuration

\- Secrets kept outside source code

## External API Security
\- Gemini API key stored through environment variables

\- GitHub token stored through environment variables

\- Database credentials stored outside the repository

> ⚠️ Never commit passwords, API keys, JWT secrets, or GitHub tokens to the repository.

---

# ⚡ Production-Oriented Improvements
DebugMind AI includes several improvements beyond a basic CRUD application.

### Server-Side Pagination
Debug history uses pagination so large histories do not need to be loaded in a single request.

### GitHub Repository Limits
The GitHub analyzer limits file count, file size, and total repository context size before sending data to the AI service.

### AI Retry Handling
Temporary Gemini API failures can be retried, while quota-related failures are handled separately.

### Centralized Error Handling
Backend exceptions are mapped to meaningful HTTP responses.

### Reusable HTTP Clients
The backend uses reusable REST clients for external API communication.

### Dockerized Backend
The production backend runs inside a Java 21 Docker container.

---

# 💡 Engineering Decisions
## Why React + Vite?
React provides a component-based frontend architecture while Vite provides a fast development and production build workflow.

## Why Spring Boot?
Spring Boot provides strong support for:

\- REST APIs

\- Dependency Injection

\- Spring Security

\- Validation

\- Database Integration

\- Production deployment

## Why PostgreSQL?
PostgreSQL provides reliable relational persistence for users and debugging sessions.

## Why JWT?
JWT allows the backend API to remain stateless while authenticating protected requests.

## Why Gemini?
Gemini provides the generative AI capabilities required for debugging and repository analysis.

## Why GitHub REST API?
The GitHub API provides repository metadata, branch information, repository trees, and source files required for repository analysis.

## Why Docker?
Docker provides a reproducible runtime environment and simplifies backend deployment.

## Why Vercel + Render?
The frontend and backend have different runtime requirements, so they are deployed independently.

---

# 🎯 Why I Built This Project
Debugging is one of the most common activities in software development, but identifying the **actual root cause** of an issue can often take more time than implementing the fix.

I built DebugMind AI to combine multiple areas of modern software development into a single production-style application:

\- Full-stack development

\- REST API design

\- Authentication

\- Database design

\- Generative AI

\- GitHub API integration

\- Automated testing

\- Docker

\- Cloud deployment

\- Error handling

\- API documentation

The goal was to build more than a simple AI interface and create an end-to-end engineering system that demonstrates how modern frontend, backend, AI, database, security, testing, and deployment technologies work together.

---

# 📈 Future Improvements
Potential future enhancements include:

\- 🚀 Streaming AI responses

\- 📂 Multi-file debugging

\- 🔀 Code diff visualization

\- 🧪 Automatic unit-test generation

\- 🛠️ AI-generated code patches

\- 🐙 GitHub Pull Request analysis

\- 📦 Repository dependency analysis

\- ⚡ Redis caching

\- 🔄 Background AI processing

\- 🧪 Code execution sandbox

\- 👥 Team collaboration

\- 📚 Saved repository analyses

\- 🌐 Additional programming language support

---

# 🤝 Contributing
Contributions and improvements are welcome.

```bash

git checkout -b feature/your-feature-name

git add .

git commit -m "feat: describe your change"

git push origin feature/your-feature-name

```

Then open a Pull Request.

---

# 👨‍💻 Author
<div align="center">

## Sukhamrit Singh
**Computer Science & Engineering Student**

[GitHub](https://github.com/SukhamritSingh15)

</div>

---

<div align="center">

# ⭐ DebugMind AI
### Understand the error. Find the cause. Fix the code.
[🌐 Live Demo](https://debug-mind-ai-nine.vercel.app/) •

[💻 GitHub](https://github.com/SukhamritSingh15/DebugMind-AI)

</div>
