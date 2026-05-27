import React from 'react';

const RecipeDetail = ({ recipe, onBack }) => {
  if (!recipe) return null;

  const steps = [];
  for (let i = 1; i <= 20; i++) {
    // API 필드명이 MANUAL01, MANUAL02, .. 와 같기에, 이를 반복문으로 처리하기 위함.
    const stepNum = i.toString().padStart(2, '0');
    const manualText = recipe[`MANUAL${stepNum}`];
    const manualImg = recipe[`MANUAL_IMG${stepNum}`];

    if (manualText) {
      // 첫 번째 마침표(.)의 위치를 찾아 그 다음부터의 텍스트만 추출.
      // ex) "1.양파를 채썬다."   ->   "양파를 채썬다."
      const dotIndex = manualText.indexOf('.');
      const cleanText =
        dotIndex > 0 && dotIndex < 5
          ? manualText.slice(dotIndex + 1).trim()
          : manualText;

      steps.push({
        text: cleanText,
        img: manualImg,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <button
        onClick={onBack}
        className="mb-6 text-gray-500 hover:text-orange-500 flex items-center gap-1 transition-colors cursor-pointer"
      >
        ← 목록으로 돌아가기
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/2">
          <img
            src={recipe.ATT_FILE_NO_MK || recipe.ATT_FILE_NO_MAIN}
            alt={recipe.RCP_NM}
            className="w-full rounded-2xl shadow-md object-cover aspect-video"
          />
        </div>
        <div className="md:w-1/2">
          <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
            {recipe.RCP_PAT2}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {recipe.RCP_NM}
          </h2>
          <p className="text-gray-600 mb-4">
            {recipe.RCP_WAY2} | {recipe.INFO_ENG} kcal
          </p>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h4 className="font-bold text-gray-800 mb-2">영양정보 (1인분)</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>중량: {recipe.INFO_WGT}g</div>
              <div>탄수화물: {recipe.INFO_CAR}g</div>
              <div>단백질: {recipe.INFO_PRO}g</div>
              <div>지방: {recipe.INFO_FAT}g</div>
              <div>나트륨: {recipe.INFO_NA}mg</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
          재료
        </h3>
        <p className="bg-orange-50 p-4 rounded-xl text-gray-700 leading-relaxed">
          {recipe.RCP_PARTS_DTLS}
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
          조리 순서
        </h3>
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <p className="text-gray-800 pt-1">{step.text}</p>
              </div>
              {step.img && (
                <div className="ml-12 max-w-sm">
                  <img
                    src={step.img}
                    alt={`Step ${idx + 1}`}
                    className="rounded-lg shadow-sm w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {recipe.RCP_NA_TIP && (
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            조리법 Tip
          </h4>
          <p className="text-blue-700 text-sm">{recipe.RCP_NA_TIP}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
