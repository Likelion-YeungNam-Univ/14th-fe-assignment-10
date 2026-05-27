import React from 'react'
import axios from 'axios'

export const baseURL = "https://pokeapi.co/api/v2/pokemon-species/"

export const getPokemon =  async(pokemon = 0) => {
  try {
    const response = await axios.get(`${baseURL}?offset=${pokemon}&limit=151`);
    return response.data.results;
  } catch{
    console.error("API 오류났어요");
  }
}  

