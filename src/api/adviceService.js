import axiosInstance from './axiosInstance';

export const adviceService = {
  // 랜덤 명언을 가져오는 함수
  getRandomAdvice: async () => {
    // axiosInstance의 baseURL 뒤에 '/advice'가 붙어서 요청이 갑니다.
    const response = await axiosInstance.get('/advice');
    return response.data;
  },
  
  /* 나중에 다른 API가 생기면 여기에 추가 가능
  getAdviceById: async (id) => {
    const response = await axiosInstance.get(`/advice/${id}`);
    return response.data;
  }
  */
};