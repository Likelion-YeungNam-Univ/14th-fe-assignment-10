import React from "react";
import Pokemontitle from "./Pokemontitle";
import Navbar from "./Navbar";

const App = () => {
  const createPokemontemplate = () => {
    const result = [];
    for(let i = 0; i < 151; i++) {
      result.push(<Pokemontitle key={i} pokemonId={i + 1} />);
    }
    return result;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center bg-[#F0FDF4] p-5">
        <div className="w-[800px] h-full flex flex-wrap gap-5 justify-center items-center">
          {createPokemontemplate()}
        </div>
      </div>
    </div>
  );
};

export default App;
