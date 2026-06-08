pipeline {
    agent any 
    
    stages {
        stage('Verify Workspace') {
            steps {
                echo 'Checking pulled files...'
                bat 'dir'
            }
        }
        stage('Deploy to Local Docker') {
            steps {
                echo 'Building and starting the application via Docker Compose...'
                // --build forces Docker to grab your latest code changes
                // -d runs it in "detached" mode so Jenkins can finish the job without hanging
                bat 'docker-compose up -d --build'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful! The container is running.'
        }
        failure {
            echo 'The deployment failed. Check the Docker logs or Jenkins console.'
        }
    }
}