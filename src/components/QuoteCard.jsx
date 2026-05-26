import React from 'react';

const QuoteCard = ({ advice, loading, fetchAdvice, toggleBookmark, isCurrentBookmarked }) => {
  return (
    <div className="flex-1 bg-[#161b22]/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
      
      {/* 상단 레이저 장식 */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

      {/* 카드 상단 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <h1 className="text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold">
            Wise Saying
          </h1>
        </div>
        
        {/* 네온 하트 버튼 */}
        <button
          onClick={toggleBookmark}
          disabled={loading || !advice}
          className={`text-2xl transition-all duration-300 transform active:scale-75 p-2 rounded-xl border ${
            isCurrentBookmarked 
              ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
              : 'bg-gray-800/40 border-gray-700 hover:border-gray-500'
          }`}
        >
          {isCurrentBookmarked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* 명언 본문 콘텐츠 영역 */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-mono text-gray-500">Requesting data...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center min-h-[200px] py-4">
          {advice && (
            <>
              <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-6 font-sans tracking-wide">
                "{advice.message}"
              </p>
              <p className="text-sm md:text-base text-cyan-300/90 font-mono font-medium">
                &gt; {advice.author} <span className="text-xs text-gray-500 font-sans ml-2">[{advice.authorProfile}]</span>
              </p>
            </>
          )}
        </div>
      )}

      {/* 하단 생성 버튼 */}
      <button
        onClick={fetchAdvice}
        disabled={loading}
        className="mt-8 w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:scale-[0.98] text-white py-3.5 rounded-xl font-medium font-mono tracking-wider shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all duration-200 disabled:opacity-40"
      >
        NEXT
      </button>
    </div>
  );
};

export default QuoteCard;