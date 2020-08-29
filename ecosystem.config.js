module.exports = {
  apps : [{
    name: 'Gimp Trade Server', // 애플리케이션 이름
    script: './dist/main.js', // PM2를 실행시켜줄 스크립트 파일의 경로

    instances: 1, // 설치될 앱 인스턴스가 갯수
    autorestart: true, // 앱 크러쉬 등으로 인해 앱이 종료될 때 재시작할지 여부 (default: true)
    watch: false, // 폴더 내의 파일에 변경이 있을때, 앱이 리로딩 여부
    max_memory_restart: '1G',
    env: { // 앱의 env를 설정
      NODE_ENV: 'development',
      IS_TRADE: 'false'
    },
    env_production: {
      NODE_ENV: 'production',
      IS_TRADE: 'false'
    },
    log_date_format: "YYYY-MM-DD HH:mm Z",
    out_file: "logs/out.log"
  }],
};