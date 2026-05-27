import React, { useState, useEffect } from 'react';
import { getRandomCats } from './catApi';

const CatPage = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const fetchCats = async () => {
    setIsLoading(true);
    const data = await getRandomCats(12);
    // 💡 가져온 고양이 데이터에 각각 'isLiked: false' 상태를 기본값으로 주입합니다.
    const customizedData = data.map(cat => ({ ...cat, isLiked: false }));
    setCats(customizedData);
    setIsLoading(false);
  };

  // 💡 하트 클릭 시 해당 고양이의 좋아요 상태만 반전시키는 함수
  const toggleLike = (e, catId) => {
    e.stopPropagation(); // 💥 중요: 카드를 클릭해서 모달이 열리는 버블링 현상을 완전히 막습니다.
    
    setCats(prevCats =>
      prevCats.map(cat =>
        cat.id === catId ? { ...cat, isLiked: !cat.isLiked } : cat
      )
    );
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 relative">
      {/* 타이틀 및 갱신 버튼 */}
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

      {/* 고양이 이미지 그리드 리스트 */}
      {cats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cats.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCat(cat)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              {/* 이미지 영역 */}
              <div className="aspect-square bg-gray-50 overflow-hidden relative">
                <img
                  src={cat.url}
                  alt="Cute cat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              {/* 하단 태그/아이콘 영역 */}
              <div className="p-4 flex justify-between items-center bg-white">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  ID: {cat.id}
                </span>
                
                {/* 💡 하트 버튼 상태 분기 */}
                <button 
                  onClick={(e) => toggleLike(e, cat.id)} 
                  className="transition-transform active:scale-125 duration-200 text-xl"
                >
                  {cat.isLiked ? (
                    // 좋아요 상태일 때: 빨간 채워진 하트
                    <span className="text-red-500 animate-heartBeat">❤️</span>
                  ) : (
                    // 기본 상태일 때: 비어있는 회색 하트
                    <span className="text-gray-300 hover:text-red-400 transition-colors">♡</span>
                  )
                }
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

      {/* 크게 보기 모달 팝업창 */}
      {selectedCat && (
        <div 
          onClick={() => setSelectedCat(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform scale-95"
          >
            <button
              onClick={() => setSelectedCat(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white text-xl font-bold hover:bg-black/70 transition-all"
            >
              ✕
            </button>
            
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={selectedCat.url} 
                alt="Selected Cat Large" 
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            <div className="p-5 bg-white border-t border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-gray-800">고양이 상세 정보</h3>
                <p className="text-xs text-gray-400 mt-0.5">고유식별번호: {selectedCat.id}</p>
              </div>
              <a 
                href={selectedCat.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                원본 주소 열기 ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatPage;