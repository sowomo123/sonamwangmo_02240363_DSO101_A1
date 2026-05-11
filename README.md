(node:9036) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/DELL/Desktop/sonamwangmo_02240363_DSO101_A1/A_1/postcss.config.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\DELL\Desktop\sonamwangmo_02240363_DSO101_A1\A_1\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)  # Todo App Deployment Guide

This repository contains a full-stack Todo application with automated deployment to Render.com using Docker containers.

## Project Structure

```
sonamwangmo_02240363_DSO101_A1/
├── backend/                 # Node.js/Express API
│   ├── Dockerfile          # Backend Docker configuration
│   ├── .dockerignore       # Docker ignore file
│   ├── .env.production     # Production environment variables
│   └── server.js           # Main server file
├── A_1/                    # React frontend
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── .dockerignore       # Docker ignore file
│   ├── .env.production     # Production environment variables
│   ├── nginx.conf          # Nginx configuration
│   └── src/                # React source code
└── render.yaml             # Render deployment blueprint
```

## Part A: Manual Build and Deploy to Docker Hub + Render.com

### Step 1: Prerequisites

1. Install Docker Desktop on your machine
2. Create a Docker Hub account
3. Create a Render.com account
4. Install Git and have your repository ready

### Step 2: Build and Push Backend Image

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the Docker image (replace `yourdockerhub` with your Docker Hub username):
   ```bash
   docker build -t yourdockerhub/be-todo:02240363 .
   ```

3. Push to Docker Hub:
   ```bash
   docker push yourdockerhub/be-todo:02240363
   ```

### Step 3: Build and Push Frontend Image

1. Navigate to the frontend directory:
   ```bash
   cd ../A_1
   ```

2. Build the Docker image:
   ```bash
   docker build -t yourdockerhub/fe-todo:02240363 .
   ```

3. Push to Docker Hub:
   ```bash
   docker push yourdockerhub/fe-todo:02240363
   ```

### Step 4: Deploy Backend Service on Render.com

1. Log into Render.com dashboard
2. Click "New +" → "Web Service"
3. Select "Existing image from Docker Hub"
4. Image: `yourdockerhub/be-todo:02240363`
5. Set Environment Variables:
   ```
   DB_HOST=your-render-db-host
   DB_USER=render_db_user
   DB_PASSWORD=your_db_password
   PORT=5000
   NODE_ENV=production
   ```

### Step 5: Deploy Frontend Service on Render.com

1. Create another Web Service
2. Select "Existing image from Docker Hub"
3. Image: `yourdockerhub/fe-todo:02240363`
4. Set Environment Variables:
   ```
   REACT_APP_API_URL=https://be-todo.onrender.com
   ```

### Step 6: Set Up Database

1. In Render.com, create a new PostgreSQL database
2. Note the connection details from the database dashboard
3. Update the backend environment variables with your database credentials

## Part B: Automated Deployment with render.yaml

### Step 1: Repository Setup

The project is already structured for automated deployment with the following key files:

- `render.yaml` - Blueprint for multi-service deployment
- `backend/Dockerfile` - Backend container configuration
- `A_1/Dockerfile` - Frontend container configuration
- Production environment files for both services

### Step 2: Automated Deployment Setup

1. **Connect GitHub Repository to Render.com**:
   - Go to Render.com dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **Automatic Deployment Process**:
   - Every push to your GitHub repository triggers a new build
   - Render builds both backend and frontend containers
   - Database is automatically provisioned
   - Environment variables are automatically configured

### Step 3: render.yaml Configuration

The `render.yaml` file contains:

```yaml
services:
  - type: web
    name: be-todo
    env: docker
    dockerfilePath: ./backend/Dockerfile
    # ... backend configuration
  
  - type: web
    name: fe-todo
    env: docker
    dockerfilePath: ./A_1/Dockerfile
    # ... frontend configuration

databases:
  - name: todo-db
    # ... database configuration
```

### Step 4: Environment Variables

**Backend (.env.production)**:
- `NODE_ENV=production`
- `PORT=5000`
- Database credentials (auto-populated by Render)
- JWT secret key

**Frontend (.env.production)**:
- `REACT_APP_API_URL=https://be-todo.onrender.com`

## Deployment Verification

### Step 1: Check Service Status

1. Go to your Render.com dashboard
2. Verify both services are running:
   - `be-todo` (Backend API)
   - `fe-todo` (Frontend)
3. Check database status

### Step 2: Test the Application

1. Visit your frontend URL: `https://fe-todo.onrender.com`
2. Test CRUD operations:
   - Create new todos
   - View todo list
   - Update todo status
   - Delete todos

### Step 3: Monitor Logs

1. In Render.com dashboard, click on each service
2. View "Logs" tab to monitor:
   - Build logs
   - Runtime logs
   - Error messages

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Dockerfile syntax
   - Verify all dependencies are in package.json
   - Check .dockerignore files

2. **Runtime Errors**:
   - Verify environment variables
   - Check database connection strings
   - Review service logs

3. **CORS Issues**:
   - Ensure backend allows frontend origin
   - Check API URL configuration

### Debug Commands:

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test frontend locally
cd A_1
npm install
npm run dev

# Test Docker builds
docker build -t test-backend ./backend
docker build -t test-frontend ./A_1
```

## Important Notes

- Replace `yourdockerhub` with your actual Docker Hub username
- Student ID `02240363` is used as the image tag
- Environment variables should be kept secure
- Monitor your Render.com usage to avoid exceeding free tier limits
- Always test locally before deploying to production

## Resources

- [Render Docker Deployment Guide](https://render.com/docs/deploying-an-image)
- [Docker Build and Push Guide](https://docs.docker.com/get-started/introduction/build-and-push-first-image/)
- [Render Environment Variables](https://render.com/docs/configure-environment-variables)
- [Render Blueprint Specification](https://render.com/docs/blueprint-spec)

## GitHub Repository

https://github.com/sowomo123/sonamwangmo_02240363_DSO101_A1
