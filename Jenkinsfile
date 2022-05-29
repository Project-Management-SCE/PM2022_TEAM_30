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
                sh 'chmod -R 777 node_modules'
                sh 'npm test'
            }
        }
        stage('Deliver') {
            steps {

              echo 'Finished using the web site? (Click "Proceed" to continue)'

            }
        }
    }
}
