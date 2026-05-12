# CI/CD Pipeline Configuration Guide

## Overview
This document describes how the Jenkins CI/CD pipeline was configured for the Todo List application, including frontend (React + TypeScript) and backend (Node.js + PostgreSQL) components.

## Pipeline Architecture

### Jenkinsfile Configuration
```groovy
pipeline {
    agent any
    tools { nodejs 'NodeJS' }
    stages {
        stage('Checkout') { /* Git checkout */ }
        stage('Install Backend') { /* Backend dependencies */ }
        stage('Install Frontend') { /* Frontend dependencies */ }
        stage('Build Frontend') { /* React build */ }
        stage('Test Backend') { /* Backend tests with JUnit */ }
        stage('Deploy') { /* Docker build and push */ }
    }
}
```

## Configuration Steps

### 1. Backend Configuration

#### Database Setup
- **Challenge**: Original code used MongoDB, needed PostgreSQL for production
- **Solution**: 
  - Added `pg` package to dependencies
  - Created `database-pg.js` with PostgreSQL connection
  - Updated `TaskPG.js` model for PostgreSQL operations
  - Configured SSL connection for Render PostgreSQL

#### Testing Configuration
- **Challenge**: No existing test framework
- **Solution**:
  - Installed Jest, jest-junit, supertest
  - Created `jest.config.js` with JUnit reporter
  - Added test script: `"test": "jest --ci --reporters=default --reporters=jest-junit --coverage"`
  - Created sample API tests in `tests/api.test.js`

#### Environment Configuration
```bash
# Production database
DATABASE_URL=postgresql://todo_user:password@host:port/database
DB_HOST=dpg-d80vs2jeo5us73fusdfg-a
DB_PORT=5432
DB_NAME=todo_3wgf
DB_USER=todo_user
DB_PASSWORD=mmipcg8prrwr20XScWVWzlx47ZxTqaCB
```

### 2. Frontend Configuration

#### TypeScript Compilation Issues
- **Challenge**: TypeScript errors preventing Docker build
- **Original Errors**:
  ```
  src/App.tsx(16,12): error TS6133: 'setLoading' is declared but its value is never read.
  src/App.tsx(75,7): error TS2304: Cannot find name 'loading'.
  ```
- **Solution**: Fixed state declaration from `const [, setLoading] = useState(false)` to `const [loading] = useState(false)`

#### Testing Configuration
- **Challenge**: ES module conflicts with Jest configuration
- **Solution**:
  - Renamed `jest.config.js` to `jest.config.cjs` for CommonJS
  - Renamed `babel.config.js` to `babel.config.cjs`
  - Installed `jest-environment-jsdom`, `@testing-library/react`, `@types/jest`
  - Created `jest.config.cjs` with proper JUnit reporter setup

#### Package Dependencies
```json
{
  "scripts": {
    "test": "jest --ci --reporters=default --reporters=jest-junit"
  },
  "devDependencies": {
    "jest": "^30.3.0",
    "jest-junit": "^16.0.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@types/jest": "^29.5.8"
  }
}
```

### 3. Docker Configuration

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile (Multi-stage)
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Challenges Faced and Solutions

### 1. TypeScript Compilation Errors
**Problem**: Frontend Docker build failed due to unused variables
```bash
error TS6133: 'setLoading' is declared but its value is never read
error TS2304: Cannot find name 'loading'
```
**Solution**: Fixed state variable declaration in `App.tsx`

### 2. Database Migration (MongoDB → PostgreSQL)
**Problem**: Backend was configured for MongoDB, production used PostgreSQL
**Solution**: 
- Created new PostgreSQL connection module
- Updated all database operations
- Added SSL configuration for cloud database

### 3. Jest ES Module Conflicts
**Problem**: Jest configuration failed with ES module errors
```bash
ReferenceError: module is not defined in ES module scope
```
**Solution**: 
- Renamed config files to `.cjs` extension
- Added proper Babel configuration
- Installed missing dependencies

### 4. Test Framework Setup
**Problem**: No existing test infrastructure
**Solution**:
- Backend: Jest + Supertest for API testing
- Frontend: Jest + React Testing Library
- Both configured with JUnit XML reporting for Jenkins

### 5. Docker Registry Push Issues
**Problem**: Docker push failed with 400 Bad Request
```bash
error: unexpected status from PUT request: 400 Bad request
```
**Solution**: 
- Ran `docker system prune -f` to clean cache
- Retried push operation successfully

### 6. Port Conflicts in Testing
**Problem**: Backend tests failed due to port 5000 already in use
**Solution**: Tests need to be configured with different ports or mock the server

## Jenkins Setup Requirements

### 1. Node.js Configuration
```bash
Manage Jenkins > Tools > NodeJS
Add Node.js (LTS v20.x)
```

### 2. Docker Hub Credentials
```bash
Manage Jenkins > Credentials > Add "Username & Password"
ID: docker-hub-creds
Username: Your Docker Hub username
Password: Your Docker Hub password
```

### 3. Required Plugins
- Docker Pipeline plugin
- JUnit Plugin
- Node.js Plugin

## Pipeline Output

### Test Reports
- Backend: `backend/junit.xml`
- Frontend: `frontend/junit.xml`
- Coverage reports in `coverage/` directories

### Docker Images
- Frontend: `sonambulbulwangmo/fe-todo:02240363`
- Backend: `sonambulbulwangmo/be-todo:02240363`

### Deployment
Images are pushed to Docker Hub and ready for deployment to production environments (Render, Kubernetes, etc.)

## Future Improvements

1. **Test Coverage**: Increase test coverage beyond basic API tests
2. **Integration Tests**: Add end-to-end testing with Cypress
3. **Security Scanning**: Add dependency vulnerability scanning
4. **Multi-Environment**: Support for staging/production environments
5. **Rollback Strategy**: Implement automated rollback on failure
6. **Notifications**: Add Slack/email notifications for pipeline status

## Quick Start

1. **Setup Jenkins**: Configure Node.js and Docker Hub credentials
2. **Create Pipeline Job**: Point to your GitHub repository
3. **Run Pipeline**: Execute the Jenkinsfile
4. **Monitor Results**: Check test reports and Docker image deployment

## Conclusion

The CI/CD pipeline successfully automates the build, test, and deployment process for the Todo List application. It addresses common challenges with TypeScript, database migrations, testing frameworks, and Docker deployment, providing a robust foundation for continuous integration and deployment.
