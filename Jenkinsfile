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
  
