import React, { useState, useEffect } from 'react';
import { getRandomCats } from './catApi';

const CatPage = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCats = async () => {
    setIsLoading(true);
    const data = await getRandomCats(12); 
    setCats(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐱</span>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">랜덤 고양이 갤러리</h1>
        </div>
        <button
          onClick={fetchCats}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:bg-indigo-400 disabled:scale-100 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              로딩 중...
            </>
          ) : (
            <>🔄 다른 고양이 보기</>
          )}
        </button>
      </div>
      {cats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cats.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden relative">
                <img
                  src={cat.url}
                  alt="Cute cat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-white">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  ID: {cat.id}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors text-lg">
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">고양이 사진을 불러오지 못했습니다.</p>
          </div>
        )
      )}
    </div>
  );
};

export default CatPage;