import type { NextPage,GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';
import { pokeApi } from '../api'
import { MainLayout } from '../components/layouts'
import { PokemonList, Pokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: Pokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  return (
    <MainLayout title='Pokemon App'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))
        }
      </Grid.Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonList>('/pokemon?limit=898') 

  const pokemons: Pokemon[] = data.results.map( (pokemon,i) => ({
    ...pokemon,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ i+1 }.png`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
