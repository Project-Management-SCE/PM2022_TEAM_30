pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'chmod 777 ${env.WORKSPACE}'
                sh 'npm test'
            }
        }
        stage('Deliver') {
            steps {
                sh 'npm install'
            }
        }
    }
}
