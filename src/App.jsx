import React, { useState } from 'react';
import { fetchRecipes } from './api/recipeApi';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    if (!keyword.trim()) {
      console.log('검색어를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      console.log(`"${keyword}" 검색 중...`);

      const data = await fetchRecipes(keyword);

      console.log('--- API 응답 데이터 ---');
      console.log(data);
      console.log('-----------------------');

      if (data.length > 0) {
        alert('검색 성공');
      } else {
        alert('검색 결과 없음');
      }
    } catch (error) {
      console.error('API 테스트 실패:', error);
      alert('API 호출 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4">API 연결 테스트</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어 입력 (예: 김치)"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={testApi}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? '검색 중...' : '데이터 가져오기'}
        </button>
      </div>
    </div>
  );
};

export default App;
