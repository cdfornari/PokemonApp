import { pokeApi } from "../api";
import { PokemonDetails } from "../interfaces";

export const getPokemonInfo = async (query: string) => {
    const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${query}`);
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    } 
}