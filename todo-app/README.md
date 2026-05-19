# To-Do List Web Application - DSO101 Assignment 1

**Assignment:** Continuous Integration and Continuous Deployment (CI/CD)  
**Student Name:** Sonam Wangmo  
**Student ID:** 02240363  
**Date of Release:** 9th March  
**Date of Submission:** 12th March  

---

## Overview

This is a full-stack To-Do List web application demonstrating containerization, deployment, and continuous integration/deployment practices. The application includes a modern frontend UI, a RESTful backend API, and a PostgreSQL database, all containerized with Docker and deployed on Render.com.

### Project Features
- ✅ Add Tasks
- ✅ Edit Tasks
- ✅ Delete Tasks
- ✅ Display Task List
- ✅ Fully Containerized (Docker)
- ✅ Automated Deployment (Render Blueprint)
- ✅ Environment Variable Configuration

---

## Technology Stack

### Frontend
- **Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Testing:** Jest

### DevOps & Deployment
- **Containerization:** Docker
- **Container Registry:** Docker Hub
- **Deployment Platform:** Render.com
- **Version Control:** GitHub
- **Infrastructure as Code:** Render Blueprint (render.yaml)

---

## Project Structure

```
todo-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── .env.production
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── routes/
│   │   └── tasks.js
│   ├── models/
│   │   └── Task.js
│   ├── server.js
│   ├── database.js
│   ├── Dockerfile
│   ├── .env.production
│   ├── package.json
│   └── jest.config.js
├── render.yaml
└── README.md
```

---

## Local Setup & Configuration

### Prerequisites
- Node.js (v18+)
- Docker & Docker Hub account
- PostgreSQL (local or cloud)
- Render.com account
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd sonamwangmo_02240363_DSO101_A1/todo-app
```

### Step 2: Environment Variables Configuration

#### Backend (.env)
Create `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=5432
NODE_ENV=development
```

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 4: Run Locally

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

---

## Part A: Manual Docker Build & Push to Docker Hub

### Step 1: Build Docker Images

**Backend Image:**
```bash
cd backend
docker build -t yourusername/be-todo:02240363 .
```

**Frontend Image:**
```bash
cd frontend
docker build -t yourusername/fe-todo:02240363 .
```

### Step 2: Push to Docker Hub

**Login to Docker Hub:**
```bash
docker login
```

**Push Backend Image:**
```bash
docker push yourusername/be-todo:02240363
```

**Push Frontend Image:**
```bash
docker push yourusername/fe-todo:02240363
```

### Step 3: Deploy on Render.com

#### Backend Service
1. Go to [Render Dashboard](https://render.com)
2. Click **New** → **Web Service**
3. Select **"Existing image from Docker Hub"**
4. **Image URL:** `yourusername/be-todo:02240363`
5. **Name:** `be-todo-02240363`
6. **Environment Variables:**
   - `DB_HOST`: Your Render PostgreSQL host
   - `DB_USER`: Your database user
   - `DB_PASSWORD`: Your database password
   - `DB_NAME`: todo_db
   - `PORT`: 5000
   - `NODE_ENV`: production
7. Click **Create Web Service**

#### Frontend Service
1. Click **New** → **Web Service**
2. Select **"Existing image from Docker Hub"**
3. **Image URL:** `yourusername/fe-todo:02240363`
4. **Name:** `fe-todo-02240363`
5. **Environment Variables:**
   - `VITE_API_URL`: `https://be-todo-02240363.onrender.com` (your live backend URL)
6. Click **Create Web Service**

#### Database (PostgreSQL)
1. Click **New** → **PostgreSQL**
2. Configure database credentials
3. Copy host, user, and password to backend environment variables

### Results
- **Frontend Live URL:** https://fe-todo-02240363.onrender.com
- **Backend Live URL:** https://be-todo-02240363.onrender.com

---

## Part B: Automated Deployment with Render Blueprint

### Step 1: Configure render.yaml

The `render.yaml` file in the root directory orchestrates multi-service deployment:

```yaml
services:
  - type: web
    name: be-todo
    env: docker
    dockerfilePath: ./backend/Dockerfile
    envVars:
      - key: DB_HOST
        value: your-render-db-host
      - key: DB_USER
        value: your_db_user
      - key: DB_PASSWORD
        value: your_db_password
      - key: DB_NAME
        value: todo_db
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production

  - type: web
    name: fe-todo
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    envVars:
      - key: VITE_API_URL
        value: https://be-todo.onrender.com

databases:
  - name: todo-db
    engine: postgres
    plan: free
```

### Step 2: Deploy via Render Blueprint

1. Go to [Render Dashboard](https://render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Select the branch with `render.yaml`
5. Click **Deploy**

### Step 3: Continuous Deployment

Once configured, every time you push to GitHub:
1. Render detects the new commit
2. Automatically builds Docker images
3. Runs tests (if configured)
4. Deploys updated services
5. Updates live URLs

**Test Automation:**
```bash
git add .
git commit -m "Update feature"
git push
# Render automatically deploys!
```

---

## API Endpoints

### Base URL (Production)
```
https://be-todo-02240363.onrender.com/api
```

### Endpoints
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Example Request
```bash
curl https://be-todo-02240363.onrender.com/api/tasks
```

---

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

Coverage reports are available in the `coverage/` directory.

---

## Key Implementation Details

### Environment Variables
- ✅ Backend: `backend/.env` (never committed)
- ✅ Frontend: `frontend/.env` (never committed)
- ✅ Added to `.gitignore`
- ✅ Production values in `.env.production`

### Docker Best Practices
- Multi-stage builds for optimized images
- Non-root user for security
- Minimal base images (Node 18-Alpine)
- Health checks configured

### Security
- Environment variables for all secrets
- No credentials in code
- `.env` files in `.gitignore`
- HTTPS on all deployed services

---

## Deployment Links

| Service | Link |
|---------|------|
| Frontend | https://fe-todo-02240363.onrender.com |
| Backend API | https://be-todo-02240363.onrender.com |
| API Documentation | https://be-todo-02240363.onrender.com/api |

---

## Troubleshooting

### Images Not Displaying
- Ensure image paths use `./public/images/` (plural)
- Check file names match exactly (e.g., `backend .png` with space)

### Deployment Failures
- Check Render logs: `Render Dashboard → Service → Logs`
- Verify environment variables are set correctly
- Ensure Docker images are public on Docker Hub

### Database Connection Issues
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` are correct
- Check PostgreSQL is running and accessible
- Ensure database name exists

### Frontend Cannot Connect to Backend
- Verify `VITE_API_URL` matches live backend URL
- Check CORS headers in backend
- Ensure backend service is running

---

## References

- [Docker Documentation](https://docs.docker.com/)
- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Environment Variables Best Practices](https://12factor.net/config)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## Assignment Completion Checklist

### Step 0: Prerequisite
- ✅ Frontend UI with Add/Edit/Delete functionality
- ✅ Backend CRUD API
- ✅ Database with persistence
- ✅ Environment variables configured
- ✅ `.env` files in `.gitignore`
- ✅ Local testing completed

### Part A: Docker & Manual Deployment
- ✅ Docker images built and pushed to Docker Hub
- ✅ Student ID used as image tag (02240363)
- ✅ Backend deployed on Render with environment variables
- ✅ Frontend deployed on Render with API URL
- ✅ PostgreSQL database configured
- ✅ Services accessible via live URLs

### Part B: Automated Deployment
- ✅ `render.yaml` configured for multi-service deployment
- ✅ Render Blueprint set up for GitHub integration
- ✅ Automatic build and deployment on Git push
- ✅ All services running successfully

### Documentation
- ✅ Screenshots of deployment steps included
- ✅ README documentation complete
- ✅ Submitted via GitHub with correct folder structure

---

## Author
**Sonam Wangmo** (02240363)  
Bachelor of Engineering in Software Engineering  
DSO101: Continuous Integration and Continuous Deployment

---

**Last Updated:** May 2026
