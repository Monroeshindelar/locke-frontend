import axios from "axios";

export const getPokemonSpecies = (nationalDexNumber) =>  {
    return axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${nationalDexNumber}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}