// Jenkinsfile (no Docker registry / no Docker Hub)

// ต้องไปตั้งใน Jenkins (ไม่ใช่ในไฟล์นี้):
// Environment variables:
//   - MAJOR_VERSION
//   - MINOR_VERSION
//   - APP_NAME               (เช่น smart-asset)
//   - TARGET_BASE_DIR        (เช่น /srv/docker)
//   - BACKEND_ALLOWED_ORIGIN (เช่น https://app-smart.kridcharid.com,http://localhost:3000)
//   - BACKEND_JWT_EXPIRATION (เช่น 168h)
//   - BACKEND_URL            (เช่น https://api-smart.kridcharid.com)
//   - FRONTEND_BASE_PATH     (เช่น https://app-smart.kridcharid.com)
//
// Credentials (Secret text):
//   - BACKEND_DATABASE_URL
//   - BACKEND_JWT_SECRET
//   - ETCD_ROOT_PASSWORD

pipeline {
    agent any

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['dev', 'uat', 'prod'],
            description: 'เลือก environment ที่ต้องการ deploy (มีผลกับ TARGET_DIR)'
        )
        booleanParam(
            name: 'RUN_DEPLOY',
            defaultValue: true,
            description: 'ถ้า false จะ build images อย่างเดียว ไม่ deploy'
        )
    }

    stages {

        stage('Prepare Vars') {
            steps {
                script {

                    if (!env.MAJOR_VERSION || !env.MINOR_VERSION) {
                        error "MAJOR_VERSION / MINOR_VERSION ยังไม่ได้ตั้งใน Jenkins environment"
                    }
                    if (!env.APP_NAME) {
                        error "APP_NAME ยังไม่ได้ตั้งใน Jenkins environment"
                    }
                    if (!env.TARGET_BASE_DIR) {
                        error "TARGET_BASE_DIR ยังไม่ได้ตั้งใน Jenkins environment"
                    }


                    env.VERSION_NUMBER = "${env.MAJOR_VERSION}.${env.MINOR_VERSION}.${env.BUILD_NUMBER}"
                    env.BUILD_TAG      = "build-${env.BUILD_NUMBER}"

                    def branch = env.BRANCH_NAME ?: 'unknown'
                    def slug   = branch.toLowerCase()
                                       .replaceAll('[^a-z0-9]+', '-')
                                       .replaceAll(/^-+|-+$/, '')     
                    env.BRANCH_SLUG = slug

                    env.IMAGE_FRONTEND = "${env.APP_NAME}-frontend"
                    env.IMAGE_BACKEND  = "${env.APP_NAME}-backend"

                    echo "==== Build Info ===="
                    echo "Build Tag     : ${env.BUILD_TAG}"
                    echo "Branch        : ${branch}"
                    echo "BRANCH_SLUG   : ${env.BRANCH_SLUG}"
                    echo "VERSION       : ${env.VERSION_NUMBER}"
                    echo "IMAGE_FRONTEND: ${env.IMAGE_FRONTEND}"
                    echo "IMAGE_BACKEND : ${env.IMAGE_BACKEND}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building local Docker images (no registry)..."

                    sh '''
                        set -e

                        cd apps

                        echo "[Docker] Building frontend image (local)..."
                        docker build \
                          -t "${IMAGE_FRONTEND}:v${VERSION_NUMBER}" \
                          -t "${IMAGE_FRONTEND}:${BRANCH_SLUG}" \
                          -f frontend/Dockerfile .

                        echo "[Docker] Building backend image (local)..."
                        docker build \
                          -t "${IMAGE_BACKEND}:v${VERSION_NUMBER}" \
                          -t "${IMAGE_BACKEND}:${BRANCH_SLUG}" \
                          -f backend/Dockerfile .

                        echo "[Docker] Local images built:"
                        docker images "${IMAGE_FRONTEND}" | head -n 5 || true
                        docker images "${IMAGE_BACKEND}"  | head -n 5 || true
                    '''
                }
            }
        }

        stage('Deploy') {
            when {
                expression { return params.RUN_DEPLOY }
            }
            steps {
                script {
                    def envSlug = params.DEPLOY_ENV.toLowerCase()

                    env.TARGET_DIR = "${env.TARGET_BASE_DIR}/${env.APP_NAME}-${envSlug}"

                    echo "Deploying to environment: ${envSlug}"
                    echo "TARGET_DIR = ${env.TARGET_DIR}"

                    input message: "Deploy to ${envSlug} ?", ok: "Deploy"

                    withCredentials([
                        string(credentialsId: 'BACKEND_DATABASE_URL', variable: 'BACKEND_DATABASE_URL'),
                        string(credentialsId: 'BACKEND_JWT_SECRET',    variable: 'BACKEND_JWT_SECRET'),
                        string(credentialsId: 'ETCD_ROOT_PASSWORD',    variable: 'ETCD_ROOT_PASSWORD')
                    ]) {
                        sh '''
                            set -e

                            mkdir -p "$TARGET_DIR"

                            echo "[Deploy] Generating docker-compose.yml from ci/docker-compose.yml ..."

                            # ณ จุดนี้ env จะมี:
                            # - BACKEND_ALLOWED_ORIGIN, BACKEND_JWT_EXPIRATION,
                            #   BACKEND_URL, FRONTEND_BASE_PATH       (จาก Jenkins env ปกติ)
                            # - BACKEND_DATABASE_URL, BACKEND_JWT_SECRET,
                            #   ETCD_ROOT_PASSWORD                    (จาก Credentials)
                            #
                            # docker compose จะอ่าน ${...} ใน ci/docker-compose.yml จาก env เหล่านี้

                            docker compose -f ci/docker-compose.yml config --no-path-resolution > "$TARGET_DIR/docker-compose.yml"

                            cd "$TARGET_DIR"

                            echo "[Deploy] Starting services via docker compose..."
                            docker compose -f docker-compose.yml up -d --remove-orphans

                            echo "[Deploy] Current containers:"
                            docker compose -f docker-compose.yml ps
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deploy success"
            echo "Build  : ${env.BUILD_TAG}"
            echo "Version: ${env.VERSION_NUMBER}"
            echo "Branch : ${env.BRANCH_NAME} (slug: ${env.BRANCH_SLUG})"
        }
        failure {
            script {
                echo "❌ Pipeline failed. Showing docker compose logs (if any)..."
                sh 'docker compose logs --tail=50 || true'
            }
        }
        always {
            script {
                echo "Cleaning unused docker resources..."
                sh '''
                    docker image prune -f || true
                    docker container prune -f || true
                '''
            }
        }
    }
}
