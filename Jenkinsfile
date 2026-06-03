pipeline {

    agent any

    tools {
        nodejs "NodeJS20"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
        }
    }
}