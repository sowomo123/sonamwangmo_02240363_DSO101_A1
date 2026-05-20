pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    environment {
        DOCKERHUB_USERNAME = 'sonambulbulwangmo'
        IMAGE_NAME = 'sonambulbulwangmo/node-app'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sowomo123/sonamwangmo_02240363_DSO101_A1.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install') {
            steps {
                dir('to-do-list/backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('to-do-list/backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('to-do-list/backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    junit 'to-do-list/backend/junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('to-do-list/backend') {
                    script {
                        docker.build("${IMAGE_NAME}:${IMAGE_TAG}")

                        docker.withRegistry(
                            'https://registry.hub.docker.com',
                            'docker-hub-creds'
                        ) {
                            docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}