import { Container, Image, Text } from "@nextui-org/react"

export const NoFavorites = () => {
  return (
    <Container css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }}>
    <Text h1>No hay favoritos</Text>
    <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
        alt="favorites list empty"
        width={250}
        height={250}
        css={{
        opacity: 0.1
        }}
    />
    </Container>
)
}