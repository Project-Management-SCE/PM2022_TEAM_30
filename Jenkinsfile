// pipline script
pipeline {
    agent {
        docker {
            //version maven 
            image 'maven:3-alpine' 
            args '-v /root/.m2:/root/.m2' 
        }
    }


//Log stages ( step by step)

    stages {

       // Build Project - the build target is removed before a new build, add the clean target.
        stage('Build') { 
            steps {
                sh 'mvn clean install'
            }
        }
        
    }
