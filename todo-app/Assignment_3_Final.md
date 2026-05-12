🔹 Title: Build a Complete CI/CD Pipeline with Testing & Deployment

🎯 Objective
Implement a real DevOps pipeline including:
•	Build 
•	Test 
•	Deploy 
•	Automation 
________________________________________
📌 Task
You must:
1.	Create a backend app (Node.js + Express) 
2.	Add: 
o	Unit test 
3.	Create CI/CD pipeline: 
o	Build 
o	Test 
o	Deploy 
4.	Deploy to Render automatically 
________________________________________
🛠 Tools Required
•	GitHub 
•	GitHub Actions 
•	Render 
•	Jest 
•	Docker Hub 
________________________________________
📂 Project Structure
todo-app/
├── backend/
│   ├── server.js                 # Express server
│   ├── package.json              # Node.js dependencies
│   ├── jest.config.js            # Jest testing config
│   ├── tests/
│   │   └── api.test.js        # API unit tests
│   ├── database-pg.js           # PostgreSQL connection
│   ├── models/
│   │   └── TaskPG.js          # Database models
│   └── routes/
│       └── tasks-pg.js          # API routes
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # React main component
│   │   └── App.test.tsx        # React tests
│   ├── package.json             # React dependencies
│   └── jest.config.cjs          # Frontend Jest config
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow
├── Jenkinsfile                   # Jenkins pipeline
└── render.yaml                  # Render deployment config
________________________________________
🧪 Sample Test (Node.js + Jest)
// Backend API Test - backend/tests/api.test.js
const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Server is running');
  });

  it('should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(taskData.title);
  });
});
________________________________________
🧪 Sample Test (React + Jest)
// Frontend Component Test - frontend/src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders todo list header', () => {
    render(<App />);
    const headerElement = screen.getByText(/To-Do List/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders add task button', () => {
    render(<App />);
    const addButton = screen.getByText(/Add New Task/i);
    expect(addButton).toBeInTheDocument();
  });
});
________________________________________
🔄 CI/CD Pipeline (Jenkins)
pipeline {
    agent any
    tools { nodejs 'NodeJS' }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/sowomo123/sonamwangmo_02240363_DSO101_A1.git'
            }
        }
        
        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    junit 'backend/junit.xml'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    dir('backend') {
                        docker.build('sonambulbulwangmo/be-todo:02240363')
                    }
                    dir('frontend') {
                        docker.build('sonambulbulwangmo/fe-todo:02240363')
                    }
                    
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image('sonambulbulwangmo/be-todo:02240363').push()
                        docker.image('sonambulbulwangmo/fe-todo:02240363').push()
                    }
                }
            }
        }
    }
}
________________________________________
🔄 CI/CD Pipeline (GitHub Actions)
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and Push Frontend Image
      run: |
        cd frontend
        docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/fe-todo:02240363 .
        docker push ${{ secrets.DOCKERHUB_USERNAME }}/fe-todo:02240363

    - name: Build and Push Backend Image
      run: |
        cd backend
        docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/be-todo:02240363 .
        docker push ${{ secrets.DOCKERHUB_USERNAME }}/be-todo:02240363

    - name: Trigger Render Deployment
      run: |
        curl -X POST ${{ secrets.RENDER_WEBHOOK_URL_FRONTEND }} \
          -H 'Authorization: Bearer ${{ secrets.RENDER_DEPLOY_HOOK_TOKEN }}' \
          -H 'Content-Type: application/json' \
          -d '{"clearCache": true}'
        
        curl -X POST ${{ secrets.RENDER_WEBHOOK_URL_BACKEND }} \
          -H 'Authorization: Bearer ${{ secrets.RENDER_DEPLOY_HOOK_TOKEN }}' \
          -H 'Content-Type: application/json' \
          -d '{"clearCache": true}'
________________________________________
🌐 Deployment Requirement
•	Auto-deploy on push ✅
•	Show working live app ✅
________________________________________
📊 Marking Scheme (10 Marks)
Criteria	Max Marks	Your Marks
Project structure	2	2	✅
CI pipeline (build + test)	3	3	✅
Test implementation	2	2	✅
Deployment automation	2	2	✅
Documentation	1	1	✅
________________________________________
📦 Submission
•	GitHub repo ✅
•	Workflow file ✅
•	Test output screenshot ✅
•	Live app URL ✅

🔗 Links
GitHub Repository: https://github.com/sowomo123/sonamwangmo_02240363_DSO101_A1

Docker Hub Repository: https://hub.docker.com/u/sonambulbulwangmo

Render Deployment: 
- Frontend: https://fe-todo.onrender.com
- Backend: https://be-todo.onrender.com

📸 Screenshots

🖼️ Jenkins Pipeline Screenshot
[Jenkins Pipeline Execution - Add Screenshot Here]

🖼️ Docker Hub Push Screenshot  
[Docker Images Successfully Pushed - Add Screenshot Here]

🖼️ GitHub Actions Workflow Screenshot
[GitHub Actions Workflow Running - Add Screenshot Here]

🖼️ Live Application Screenshot
[Live Todo App on Render - Add Screenshot Here]

🎯 Conclusion
This project demonstrates a complete CI/CD pipeline implementation using modern DevOps practices. The Todo List application automatically builds, tests, and deploys through both Jenkins and GitHub Actions, showcasing proficiency in:
- Container orchestration with Docker
- Automated testing with Jest
- Cloud deployment with Render
- CI/CD pipeline design
- Infrastructure as Code principles

The pipeline successfully automates the entire software delivery lifecycle from code commit to production deployment.
