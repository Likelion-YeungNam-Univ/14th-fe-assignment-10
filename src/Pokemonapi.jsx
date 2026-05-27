import React from 'react'
import axios from 'axios'

const baseURL = "https://pokeapi.co/api/v2/pokemon/"

export async function getPokemon(pokemon) {
  try {
    const response = await axios.get(`${baseURL}${pokemon}`);
  } catch{
    console.error("API 오류났어요");
  }
}  
const Pokemonapi = () => {
  return (
    <div>pokemonapi</div>
  )
}

export default Pokemonapi