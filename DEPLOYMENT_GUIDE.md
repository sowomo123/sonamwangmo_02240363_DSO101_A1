# Complete Deployment Guide - Step by Step

## Prerequisites
- Docker Desktop installed and running
- Docker Hub account created
- Render.com account created
- Git installed and configured
- Your student ID: `02240363`

---

## Part A: Manual Build and Deploy to Docker Hub + Render.com

### Step 1: Docker Hub Setup
1. **Log in to Docker Hub:**
   ```bash
   docker login
   ```
   - Enter your Docker Hub username
   - Enter your password (or use an access token)

2. **Verify login:**
   ```bash
   docker info
   ```
   You should see your username in the output

### Step 2: Build and Push Backend Image

1. **Navigate to backend directory:**
   ```bash
   cd c:\Users\DELL\Desktop\sonamwangmo_02240363_DSO101_A1\backend
   ```

2. **Build the backend Docker image:**
   ```bash
   docker build -t yourdockerhub/be-todo:02240363 .
   ```
   - Replace `yourdockerhub` with your actual Docker Hub username
   - The `.` at the end is important (build context)

3. **Verify the image was built:**
   ```bash
   docker images | grep be-todo
   ```

4. **Push to Docker Hub:**
   ```bash
   docker push yourdockerhub/be-todo:02240363
   ```

5. **Verify on Docker Hub:**
   - Go to https://hub.docker.com/
   - Navigate to your repositories
   - You should see `be-todo` repository with tag `02240363`

### Step 3: Build and Push Frontend Image

1. **Navigate to frontend directory:**
   ```bash
   cd c:\Users\DELL\Desktop\sonamwangmo_02240363_DSO101_A1\A_1
   ```

2. **Build the frontend Docker image:**
   ```bash
   docker build -t yourdockerhub/fe-todo:02240363 .
   ```

3. **Verify the image was built:**
   ```bash
   docker images | grep fe-todo
   ```

4. **Push to Docker Hub:**
   ```bash
   docker push yourdockerhub/fe-todo:02240363
   ```

5. **Verify on Docker Hub:**
   - Go to your Docker Hub repositories
   - You should see `fe-todo` repository with tag `02240363`

### Step 4: Set Up Database on Render.com

1. **Log in to Render.com dashboard**

2. **Create PostgreSQL database:**
   - Click "New +" → "PostgreSQL"
   - Name: `todo-db`
   - Database Name: `todoapp`
   - User: `todo_user`
   - Plan: Free
   - Click "Create Database"

3. **Wait for database to be ready** (2-3 minutes)

4. **Get database connection details:**
   - Click on your database service
   - Go to "Connect" tab
   - Note down:
     - Host (DB_HOST)
     - Username (DB_USER)
     - Password (DB_PASSWORD)
     - Database name (DB_NAME)

### Step 5: Deploy Backend Service on Render.com

1. **Create backend web service:**
   - Go to Render.com dashboard
   - Click "New +" → "Web Service"
   - Select "Existing image from Docker Hub"
   - Image URL: `yourdockerhub/be-todo:02240363`
   - Name: `be-todo`
   - Click "Advanced Settings"

2. **Configure environment variables:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=your-render-db-host
   DB_USER=render_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=todoapp
   JWT_SECRET=your_jwt_secret_key_here
   CORS_ORIGIN=https://fe-todo.onrender.com
   ```
   - Replace the database values with your actual database details
   - Generate a secure JWT secret: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx

3. **Configure health check:**
   - Health Check Path: `/health`
   - Auto-deploy: Off (since we're using Docker Hub)

4. **Click "Create Web Service"**

### Step 6: Deploy Frontend Service on Render.com

1. **Create frontend web service:**
   - Go to Render.com dashboard
   - Click "New +" → "Web Service"
   - Select "Existing image from Docker Hub"
   - Image URL: `yourdockerhub/fe-todo:02240363`
   - Name: `fe-todo`
   - Click "Advanced Settings"

2. **Configure environment variables:**
   ```
   REACT_APP_API_URL=https://be-todo.onrender.com
   ```

3. **Configure health check:**
   - Health Check Path: `/`
   - Auto-deploy: Off

4. **Click "Create Web Service"**

### Step 7: Verify Manual Deployment

1. **Check backend service:**
   - Open your backend URL: `https://be-todo.onrender.com`
   - You should see the API response or health check

2. **Check frontend service:**
   - Open your frontend URL: `https://fe-todo.onrender.com`
   - The React app should load and connect to the backend

3. **Test functionality:**
   - Create a new todo
   - View the todo list
   - Update a todo
   - Delete a todo

---

## Part B: Automated Deployment with render.yaml

### Step 1: Prepare GitHub Repository

1. **Create a new GitHub repository:**
   - Go to https://github.com/new
   - Repository name: `todo-app-deployment`
   - Description: "Todo app with automated Render deployment"
   - Make it Public
   - Don't initialize with README (we have files ready)

2. **Navigate to todo-app directory:**
   ```bash
   cd c:\Users\DELL\Desktop\sonamwangmo_02240363_DSO101_A1\todo-app
   ```

3. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with render.yaml configuration"
   ```

4. **Add remote and push:**
   ```bash
   git remote add origin https://github.com/yourusername/todo-app-deployment.git
   git branch -M main
   git push -u origin main
   ```
   - Replace `yourusername` with your GitHub username

### Step 2: Connect Repository to Render.com

1. **Log in to Render.com dashboard**

2. **Connect GitHub:**
   - Click your account name → "Account Settings"
   - Go to "GitHub" tab
   - Click "Connect Account"
   - Authorize Render to access your GitHub repositories

3. **Create new service from repository:**
   - Go back to dashboard
   - Click "New +" → "Web Service"
   - Select "GitHub"
   - Choose your `todo-app-deployment` repository
   - Render will automatically detect `render.yaml`

4. **Review deployment configuration:**
   - Name: `be-todo` (backend)
   - Environment: Docker
   - Branch: main
   - Root Directory: (leave empty)
   - Render will show the services defined in render.yaml

5. **Click "Create Web Service"**

### Step 3: Automated Deployment Process

1. **Render will automatically:**
   - Build the backend Docker image
   - Build the frontend Docker image
   - Create the PostgreSQL database
   - Configure environment variables
   - Deploy both services

2. **Monitor deployment:**
   - Go to your service dashboard
   - Watch the build logs
   - Wait for both services to show "Live" status

3. **Get your service URLs:**
   - Backend: `https://be-todo.onrender.com`
   - Frontend: `https://fe-todo.onrender.com`

### Step 4: Test Automated Deployment

1. **Verify services are running:**
   - Check both service URLs in browser
   - Verify frontend connects to backend

2. **Test automatic updates:**
   - Make a small change to your code
   - Commit and push to GitHub:
     ```bash
     git add .
     git commit -m "Test automatic deployment"
     git push origin main
     ```
   - Watch Render automatically rebuild and redeploy

---

## Troubleshooting

### Common Issues and Solutions

1. **Docker Build Failures:**
   ```bash
   # Check Dockerfile syntax
   docker build -t test . --no-cache
   
   # Check for missing files
   ls -la
   ```

2. **Render Deployment Failures:**
   - Check build logs in Render dashboard
   - Verify Docker Hub images exist and are accessible
   - Check environment variable names and values

3. **Database Connection Issues:**
   - Verify database credentials in Render dashboard
   - Check if database is running
   - Test connection manually

4. **CORS Issues:**
   - Ensure backend allows frontend origin
   - Check API URL in frontend environment variables

### Useful Commands

```bash
# Check Docker images
docker images

# Remove Docker images
docker rmi yourdockerhub/be-todo:02240363

# Test Docker build locally
docker build -t test-backend ./backend
docker run -p 5000:5000 test-backend

# Check Git status
git status
git log --oneline

# Force push to GitHub
git push -f origin main
```

---

## Final Verification Checklist

### Manual Deployment:
- [ ] Docker images pushed to Docker Hub
- [ ] Backend service running on Render
- [ ] Frontend service running on Render
- [ ] Database connected
- [ ] All CRUD operations working

### Automated Deployment:
- [ ] Code pushed to GitHub
- [ ] Render connected to GitHub
- [ ] render.yaml detected and processed
- [ ] Both services deployed automatically
- [ ] Database provisioned automatically
- [ ] Application fully functional

### Security Notes:
- [ ] Environment variables are set correctly
- [ ] Database credentials are secure
- [ ] JWT secret is strong and unique
- [ ] CORS is properly configured

---

## Resources

- [Docker Hub](https://hub.docker.com/)
- [Render.com Dashboard](https://dashboard.render.com/)
- [GitHub Repository](https://github.com/)
- [Render Blueprint Documentation](https://render.com/docs/blueprint-spec)

---

**Your Student ID:** 02240363  
**Image Tag:** 02240363  
**Repository Structure:** /todo-app
