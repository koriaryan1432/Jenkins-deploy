// Import the shared library we defined in Phase 3
@Library('my-shared-lib') _

pipeline {
    agent any 
    
    environment {
        // REPLACE THIS with your actual Docker Hub username and repository name
        DOCKER_IMAGE = 'yourdockerhubusername/my-web-app' 
        
        // This automatically tags the image with the Jenkins Build Number (e.g., v1, v2)
        DOCKER_TAG = "v${env.BUILD_ID}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                // A built-in command that pulls the code from the repo configured in the job
                checkout scm 
            }
        }
        
        stage('Docker Login (Shared Library)') {
            steps {
                // Calling the custom function from our vars/dockerLogin.groovy file!
                dockerLogin('docker-hub-creds')
            }
        }
        
        stage('Build & Tag Image') {
            steps {
                echo 'Building Docker image...'
                // Build the image and give it TWO tags: the build number, and 'latest'
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -t ${DOCKER_IMAGE}:latest ."
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing images to Docker Hub...'
                bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                bat "docker push ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy (Pull & Run locally)') {
            steps {
                echo 'Cleaning up old containers...'
                // We use || exit 0 so the build doesn't fail if the container doesn't exist yet
                bat 'docker stop my-live-app || exit 0'
                bat 'docker rm my-live-app || exit 0'
                
                echo 'Pulling fresh image and running...'
                bat "docker pull ${DOCKER_IMAGE}:latest"
                bat "docker run -d -p 8081:80 --name my-live-app ${DOCKER_IMAGE}:latest"
            }
        }
    }
    
    post {
        always {
            echo 'Logging out of Docker Hub for security...'
            bat 'docker logout'
        }
    }
}