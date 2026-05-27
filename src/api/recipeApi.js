import axios from 'axios';

const API_KEY = import.meta.env.VITE_RECIPE_API_KEY;
const BASE_URL = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`;

/*
  rcpNm: 검색어
  endIdx - startIdx + 1: 한번에 가져올 데이터 수
 */
export const fetchRecipes = async (rcpNm, startIdx = 1, endIdx = 20) => {
  try {
    const url = `${BASE_URL}/${startIdx}/${endIdx}${rcpNm ? `/RCP_NM=${rcpNm}` : ''}`;

    const response = await axios.get(url);

    // 응답 구조가 COOKRCP01 객체 안에 row 배열이 있는 형태.
    const data = response.data.COOKRCP01;

    if (data && data.row) {
      return data.row;
    } else {
      console.warn('검색 결과가 없습니다.', data?.RESULT?.MSG);
      return [];
    }
  } catch (error) {
    console.error('레시피 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};
