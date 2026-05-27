//화면에 보여줌
function CatCard({ catFact, loading, onFetch }) {
  return (
    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 text-center">
      
      {/* 헤더 */}
      <div className="mb-6">
        <span className="text-6xl block mb-2 animate-bounce">🐱😽😼</span> {/*바운스 효과를 줘서 귀여운 느낌을 줬습니당*/}
        <h1 className="text-4xl font-extrabold text-orange-400 "> 
          고양이의 숨겨진 비밀
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          알아두면 쓸데있는 신기한 고양이 사전
        </p>
      </div>

      {/* 상식 카드*/}
      <div className="min-h-[140px] flex items-center justify-center bg-amber-50/50 rounded-2xl p-6 mb-8 border border-amber-100/60"> {/* 회색같아 보이지만 호박색 연하게 한 거예용 */}
        {loading ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div> {/*로딩 중 구현: animate-spin으로 동그랗게 돌면서 진짜 로딩 중과 같은 효과, border-t-tarnsparent rounded full로 동그랗게*/}
            <p className="text-orange-300">고양이 생각 중...</p>
          </div>
        ) : (
          <p className="text-gray-700 font-medium">
            {catFact}
          </p>
        )}
      </div>

      {/* 상식 뽑기 버튼 */}
      <button
        onClick={onFetch}
        disabled={loading}
        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg shadow-amber-200/50 transition-all duration-200 transform active:scale-95"
      >
        {loading ? "뽑는 중... 🐾 캬웅...캬웅...." : "new"}
      </button>

    </div>
  );
}

export default CatCard;