import { useState } from "react";
import Meal from "./api/Meal";

function Home() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  async function searchMeal() {
    try {
      const response = await Meal.get(
        `/search.php?s=${search}`
      );

      setMeals(response.data.meals || []);
    } catch (error) {
      console.error(error);
    }
  }

  return (
  <div className="p-8 font-sans max-w-6xl mx-auto">
    <h1 className="text-2xl font-medium mb-6">레시피 검색</h1>

    <div className="flex gap-2 mb-8">
      <input
        type="text"
        placeholder="음식 이름 입력"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchMeal()}
        className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
      <button
        onClick={searchMeal}
        className="h-10 px-5 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        검색
      </button>
    </div>
    {meals.length === 0 && (
      <p className="text-sm text-gray-400 text-center mt-6">검색 결과가 없습니다.</p>
    )}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal) => (
        <div key={meal.idMeal} className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="relative">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
            <span className="absolute top-2 left-2 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md">
              {meal.strCategory}
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-base font-medium mb-2">{meal.strMeal}</h2>
            <div className="flex gap-3 mb-3 text-xs text-gray-400">
              <span> Category: {meal.strCategory}</span>
              <span> Area: {meal.strArea}</span>
            </div>
           <p className="text-xs text-gray-500 leading-relaxed h-16 overflow-y-auto">{meal.strInstructions}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Home;