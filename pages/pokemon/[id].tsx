import { useEffect, useRef, useState } from "react";
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import conffeti from 'canvas-confetti'
import { MainLayout } from "../../components/layouts";
import { PokemonDetails } from '../../interfaces/pokemonDetails';
import { getPokemonInfo,favorites } from "../../utils";

interface Props {
    pokemon: PokemonDetails;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
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
    
    const pokemonPaths = [...Array(494)].map((value,i) => `${i+1}`)

    return {
        paths: pokemonPaths.map(id => ({
            params:{ id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { id } = params as {id: string};

    return {
      props: {
        pokemon: await getPokemonInfo(id)
      }
    }
}

export default PokemonPage;
