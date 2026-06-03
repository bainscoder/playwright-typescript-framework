pipeline {

    agent any

    tools {
        nodejs "NodeJS20"
    }

    environment {
        BASE_URL = "https://demowebshop.tricentis.com"
        EMAIL = "test+20@gmail.com"
        PASSWORD = "Test@123"
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

        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])
    }
}
}