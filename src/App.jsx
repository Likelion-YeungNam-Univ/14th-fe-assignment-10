import { useState } from "react";
import CatCard from "./components/CatCard";

function App() {
  const [catFact, setCatFact] = useState("아래 버튼을 누르면 고양이에 대한 상식이 와르르! 🐾");
  const [loading, setLoading] = useState(false);

  const getCatFact = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://catfact.ninja/fact"); //노션에 나와있는 자료 참고하였습니다!
      if (!response.ok) throw new Error("네트워크 응답 오류");
      
      const data = await response.json();
      setCatFact(data.fact);
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