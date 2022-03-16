import { useEffect, useRef, useState } from "react";
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import conffeti from 'canvas-confetti'
import { MainLayout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { PokemonDetails } from '../../interfaces/pokemonDetails';
import { PokemonList } from '../../interfaces';
import { getPokemonInfo,favorites } from "../../utils";

interface Props {
    pokemon: PokemonDetails;
}

const PokemonPageByName: NextPage<Props> = ({pokemon}) => {
    const [isInFavorites, setIsInFavorites] = useState(favorites.isInFavorites(pokemon.id));
    const clicked = useRef<boolean>(false);
    const onToggleFavorite = () => {
        favorites.toggleFavorite(pokemon.id);
        setIsInFavorites(favorites.isInFavorites(pokemon.id));
        clicked.current = true;
    };
    useEffect(() => {
        if(isInFavorites && clicked.current){
            conffeti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            })
        }
    },[isInFavorites])
    return (
        <MainLayout title={pokemon.name}>
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{p: 30}}>
                        <Card.Body>
                            <Card.Image 
                                src={pokemon.sprites.other?.["official-artwork"].front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={ !isInFavorites }
                                onClick={onToggleFavorite}
                            >
                                {isInFavorites ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display="flex" direction="row" gap={0}>
                                <Image 
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonList>('/pokemon?limit=494'); 
    const pokemonPaths: string[] = data.results.map((pokemon) => pokemon.name);

    return {
        paths: pokemonPaths.map(name => ({
            params:{ name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { name } = params as {name: string};
  
    return {
      props: {
        pokemon: await getPokemonInfo(name)
      }
    }
}

export default PokemonPageByName;
