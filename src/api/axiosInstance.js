import axios from 'axios';

// 공통 설정을 적용한 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://korean-advice-open-api.vercel.app/api',
  timeout: 5000, // 5초 동안 응답이 없으면 연결 종료
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;