import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const getRandomCats = async (limit = 10) => {
  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  try {
    const response = await axios.get(`${BASE_URL}/images/search`, {
      params: {
        limit: limit,
        size: 'med',  
        mime_types: 'jpg,png', 
      },
      headers: {
        'x-api-key': apiKey, 
        'Content-Type': 'application/json'
      }
    });

    console.log("고양이 데이터 로딩 성공:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("고양이 API 통신 중 에러 발생:", error);
    return [];
  }
};