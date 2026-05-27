import React from 'react';

const RecipeList = ({ recipes, onSelectRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.RCP_SEQ}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectRecipe(recipe)}
        >
          <div className="h-48 overflow-hidden bg-gray-100">
            <img
              src={recipe.ATT_FILE_NO_MAIN || recipe.ATT_FILE_NO_MK}
              alt={recipe.RCP_NM}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          </div>
          <div className="p-4">
            <div className="text-xs text-orange-500 font-semibold mb-1">
              {recipe.RCP_PAT2} | {recipe.RCP_WAY2}
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {recipe.RCP_NM}
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              {recipe.INFO_ENG} kcal
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
