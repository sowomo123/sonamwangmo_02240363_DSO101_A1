# Assignment 3 – CI/CD Pipeline with Docker, GitHub Actions, and Render


# Project Overview

This project demonstrates the implementation of a CI/CD pipeline for a Node.js To-Do application using GitHub Actions, Docker Hub, and Render.com.

The pipeline automatically:
1. Builds the Docker image
2. Pushes the image to Docker Hub
3. Deploys the latest image to Render.com

---

# Technologies Used

- Node.js
- Docker
- GitHub Actions
- Docker Hub
- Render.com
- GitHub

---

# Steps Taken

## 1. GitHub Repository Setup
- Created a public GitHub repository.
- Uploaded frontend and backend source code.
- Added a `.github/workflows/deploy.yml` file.

## 2. Docker Configuration
- Created a Dockerfile for the Node.js application.
- Used the Node.js 20 Alpine image.
- Configured the application to run inside a Docker container.

## 3. Local Docker Testing
- Built the Docker image locally using:
  


## 4. Docker Hub Setup
Created a public Docker Hub repository.
Generated a Docker Hub Access Token.
Added Docker Hub credentials as GitHub Secrets.

## 5. GitHub Actions CI/CD Pipeline
Created deploy.yml workflow.
Configured workflow to:
Checkout repository
Login to Docker Hub
Build Docker image
Push Docker image
## 6. Render Deployment
Created a new Web Service in Render.
Selected deployment from existing Docker image.
Connected Render deployment webhook to GitHub Actions.

## Challenges Faced
1. Jenkins Plugin Issues

Initially, the Pipeline and Git plugins were missing in Jenkins, causing SCM configuration problems.

2. Docker Port Conflicts

Encountered port conflict errors because port 5000 was already in use locally.

Solution:

Used a different port mapping:
docker run -p 5001:5000 todo-app
3. Docker Hub Push Failures

The Docker image was not appearing in Docker Hub due to incorrect Docker credentials.

Solution:

Generated Docker Hub Access Token instead of using account password.
4. GitHub Actions Errors

Faced YAML syntax and workflow configuration issues during setup.

Solution:

Corrected indentation and verified workflow steps.
Learning Outcomes

Through this assignment, I learned:

How to create Docker containers for Node.js applications
How to automate CI/CD using GitHub Actions
How Docker Hub stores and distributes container images
How to deploy applications using Render.com
How CI/CD pipelines improve software deployment automation
The importance of GitHub Secrets for secure credential management
Screenshots
1. Successful GitHub Actions Workflow

(Add Screenshot Here)

2. Docker Hub Image Push

(Add Screenshot Here)

3. Render Deployment

(Add Screenshot Here)

GitHub Repository Link

(Add Your GitHub Repository Link Here)

Example:
https://github.com/yourusername/assignment1-node-app

Docker Hub Repository Link

(Add Your Docker Hub Repository Link Here)

Example:
https://hub.docker.com/r/yourusername/todo-app

Render Deployment Link

(Add Your Render Deployment URL Here)

Example:
https://todo-app.onrender.com

Conclusion

This assignment helped in understanding the complete CI/CD lifecycle from development to automated deployment using modern DevOps tools and practices.