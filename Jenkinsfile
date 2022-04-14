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
        

       //Compiles the source code of the project

        stage('Compile') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
                            

       

	
	//creat reports File - Unit Test
        stage('Unit Tests') {
            steps {
                sh 'mvn surefire-report:report'
                sh 'mvn surefire:test'
            }
        }

        //create Integration Test RestApi 
         stage('Integration Tests') {
            steps   {
                     sh 'mvn verify -Psurefire'

                     }
            //Display total Tests Trend Graph

            post {
        always {

                    junit 'target/surefire-reports/TEST-*.xml'
            
               }
        failure {
            mail to: 'elddawork@gmail.com', subject: 'The Pipeline failed :(', body:'The Pipeline failed :('
        }
    }

        }
        //check a clean code - measure clean code
         stage('Checkstyle')
                                     {
                            steps
                            {
                                      
                              sh 'mvn checkstyle:check'
                                
                            }
                                     } 

        // find bugs measure 

                stage('FindBugs'){
                        steps
                        {
                        sh 'mvn findbugs:check'
                        
                        }
                }

        // spot bugs measure

                stage('spotBugs'){
                        steps
                                 {
                                         sh 'mvn spotbugs:check'
                        
                                }
                    
                              }

        // Pmd measure
      stage('PmdCheck'){
                        steps
                        {
                                     sh 'mvn pmd:check'
                        
                        }
                    
           
            
            }
    
    
                                   
    // send report file with log test details      
	stage('send report') {
            steps {
	publishHTML target: [
              allowMissing: false,
              alwaysLinkToLastBuild: false,
              keepAll: true,
              reportDir: '/var/jenkins_home/workspace/Team_25/sports/target/site',
              reportFiles: 'surefire-report.html',
              reportName: 'RCov Report'
            ]

		emailext attachmentsPattern: '**/surefire-report.html', body: 'Find attachments', subject: 'test', to: 'elddawork@gmail.com,Yairle11@ac.sce.ac.il,mohamab29@ac.sce.ac.il,moataat@ac.sce.ac.il'


    }
}

}
        post {
                    always {
                        //Display all graph Trend
                        recordIssues(
                            enabledForFailure: true, 
                            tools: [
                                checkStyle(pattern: '**/checkstyle-result.xml'),
                                findBugs(pattern: '**/findbugsXml.xml', useRankAsPriority: true),
                                spotBugs(pattern: '**/spotbugsXml.xml'),
                                pmdParser(pattern: '**/pmd.xml')
                                

                                    ]
                    )
           
            
            echo 'Sending email.'
            // send mail - Integration Test details
            emailext(
                to: 'adamel2@ac.sce.ac.il',
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                //recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            )
            
         }
    }
    
}
