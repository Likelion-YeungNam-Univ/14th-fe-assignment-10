import { useState } from "react";
import axios from "axios";
import CatCard from "./components/CatCard";

function App() {
  const [catFact, setCatFact] = useState("아래 버튼을 누르면 고양이에 대한 상식이 와르르! 🐾");
  const [loading, setLoading] = useState(false);

  const getCatFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://catfact.ninja/fact"); //노션 참고 자료 활용하였습니다.
      
      setCatFact(response.data.fact); //서버가 준 응답 객체 데이터 안에 고양이 상식 데이터가 있음.
    } catch (error) {
      console.error(error);
      setCatFact("ㅠㅠ 고양이가 상식을 숨겼나 봐요! 다시 한 번 버튼을 눌러주세요!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center p-6">
      <CatCard 
        catFact={catFact} 
        loading={loading} 
        onFetch={getCatFact} 
      />
    </div>
  );
}

export default App;