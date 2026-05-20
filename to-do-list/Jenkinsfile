pipeline { 
agent any 
tools { 
nodejs 'NodeJS' 
} 
 
stages { 
// Stage 1: Checkout Code 
stage('Checkout') { 
steps { 
git branch: 'main', 
Url: 
'https://github.com/yourusername/assignment1-node-app.git' 
} 
} 
 
// Stage 2: Install Dependencies 
■ Docker Pipeline (if using Docker) 
3. Configure Node.js in Jenkins 
○ Manage Jenkins > Tools > NodeJS 
○ Add Node.js (e.g., LTS v20.x) and ensure npm/yarn is detected. 
 
 
Task 2: GitHub Repository Setup 
1. Ensure your Node.js app is on GitHub (e.g., 
https://github.com/yourusername/assignment1-node-app). 
2. Generate a GitHub Personal Access Token (PAT): 
○ Go to GitHub > Settings > Developer Settings > Personal Access Tokens 
○ Create a token with repo and admin:repo_hook permissions. 
3. Add GitHub Credentials in Jenkins: 
○ Manage Jenkins > Credentials > Add "Username & Password" 
○ Username: Your GitHub username 
○ Password: Your GitHub PAT 
 
 
Task 3: Jenkinsfile for Node.js Pipeline 
 
Create a Jenkinsfile in your repo root with these stages: 
 
Example: Full Node.js Pipeline 
 
stage('Install') { 
steps { 
sh 'npm install' 
} 
} 
// Stage 3: Build (if applicable, e.g., for React/TypeScript) 
stage('Build') { 
steps { 
sh 'npm run build' 
} 
} 
// Stage 4: Run Unit Tests 
stage('Test') { 
steps { 
sh 'npm test'
// Runs "test" script (Jest/Mocha) 
} 
post { 
always { 
junit 'junit.xml'
} 
} 
} 
// Publish test results 
// Stage 5: Deploy (Docker Example) 
stage('Deploy') { 
steps { 
script { 
// Build Docker image 
docker.build('your-dockerhub-username/node-app:latest') 
// Push to Docker Hub (requires credentials) 
docker.withRegistry('https://registry.hub.docker.com', 
'docker-hub-creds') { 
docker.image('your-docker 
hub-username/node-app:latest').push() 
} 
} 
} 
} 
} 
} 
Key Notes for Node.js Projects 
1. package.json Must Include These Scripts: