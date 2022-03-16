import { Grid, Card } from "@nextui-org/react"
import { FavoritePokemonCard } from "./FavoritePokemonCard"

interface Props{
  pokemons: number[];
}

export const FavoriteList = ({pokemons}: Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify='flex-start'>
        {
          pokemons.map(id => <FavoritePokemonCard pokemonId={id} key={id}/>)
        }
    </Grid.Container>
  )
}