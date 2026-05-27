import React from "react";
import Pokemontitle from "./Pokemontitle";

const App = () => {
  //const pokemon = useContext();
  const createPokemontemplate = () => {
    const result = [];
    for(let i = 0; i < 151; i++) {
      result.push(<Pokemontitle key={i} pokemonId={i + 1} />);
    }
    return result;
  }
  return (
    <div className="flex justify-center bg-[#F0FDF4]">
      <div className="w-[800px] h-full flex flex-wrap gap-5 justify-center items-center">
        {createPokemontemplate()}
      </div>
    </div>
  );
};

export default App;
