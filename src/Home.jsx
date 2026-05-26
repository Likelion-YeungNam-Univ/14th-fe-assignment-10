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
    <div>
      <h1>레시피 검색</h1>

      <input
        type="text"
        placeholder="음식 이름 입력"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchMeal}>
        검색
      </button>

      <div>
        {meals.map((meal) => (
          <div key={meal.idMeal}>
            <h2>{meal.strMeal}</h2>

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={300}
            />

            <p>{meal.strCategory}</p>

            <p>{meal.strArea}</p>

            <p>{meal.strInstructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;