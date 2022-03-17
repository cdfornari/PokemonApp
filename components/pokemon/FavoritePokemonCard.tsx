import { Grid, Card } from "@nextui-org/react"
import { useRouter } from "next/router"

interface Props {
    pokemonId: number;
}

export const FavoritePokemonCard = ({pokemonId}: Props) => {
    const {push} = useRouter()
    const onClick = () => {
        push(`/pokemon/${pokemonId}`)
    }
    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId}>
            <Card hoverable clickable css={{padding: 10}} onClick={onClick}>
                <Card.Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ pokemonId }.png`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    )
}