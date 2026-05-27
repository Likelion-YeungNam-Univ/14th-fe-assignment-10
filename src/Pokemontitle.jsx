import React from 'react'
import axios from 'axios'
import { baseURL } from './Pokemonapi'
import {getPokemon} from './Pokemonapi'
import {useState, useEffect} from 'react'

const Pokemontitle = ({pokemonId}) => {
  
  const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
      const fetchSinglePokemon = async () => {
        try {
          
          const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
          const koreanNameData = speciesRes.data.names.find(n => n.language.name === 'ko');
          const name = koreanNameData ? koreanNameData.name : speciesRes.data.name;

          //const detailInfo = await getPokemonDetail(pokemonId);
          //const image = detailInfo.sprites.front_default;
          //const type = detailInfo.types[0].type.name;

          setPokemon({ id: pokemonId, name});
        } catch (error) {
          console.error(`${pokemonId}번 포켓몬 로드 실패:`, error);
        }
      };

      fetchSinglePokemon();
    }, [pokemonId]); 

    if (!pokemon) {
      return <div className="w-[250px] h-[200px] rounded-lg bg-gray-200 animate-pulse" />;
    }

  return (
    //전체 타이틀
    <div className="w-[250px] h-[200px] rounded-lg p-1 gap-2 flex flex-col bg-[#77CC55] font-pixel">
      <div className="flex justify-between ">
        <p>no. {pokemon.id}</p>
        <p>이름: {pokemon.name}</p>
      </div>
      <div className="bg-white flex justify-center items-center h-full rounded-lg">
        <p>그림</p>
      </div>
      <div>
        <div>
          <p>타입: 불꽃</p>
        </div>
      </div>
    </div>
  )
}

export default Pokemontitle