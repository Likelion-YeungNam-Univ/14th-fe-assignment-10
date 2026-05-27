import { useState } from 'react';
import { fetchRecipes } from './api/recipeApi';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [limit, setLimit] = useState(20);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setSelectedRecipe(null);
      // Use the limit state to control the number of results
      const data = await fetchRecipes(keyword, 1, limit);
      setRecipes(data);
    } catch (error) {
      console.error('API 호출 실패:', error);
      alert('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm py-6 mb-8 flex-shrink-0">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-black text-orange-500 mb-2 tracking-tight">
            건강한 레시피 검색
          </h1>
          <p className="text-gray-500">맛있고 영양가 있는 식단을 찾아보세요!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20 flex-grow">
        {!selectedRecipe && (
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            loading={loading}
            limit={limit}
            setLimit={setLimit}
          />
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : (
          <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
        )}
      </main>

      <footer className="bg-gray-100 py-8 text-center text-gray-400 text-sm flex-shrink-0">
        <p>© 2026 건강한 레시피 서비스.</p>
        <p>
          본 웹사이트는 식품의약품안전처의 조리식품의 레시피 DB를 통해
          만들어졌습니다.
        </p>
      </footer>
    </div>
  );
};

export default App;
