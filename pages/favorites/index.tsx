import { useEffect, useState } from "react"
import { MainLayout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui"
import { favorites } from "../../utils"
import { FavoriteList } from "../../components/pokemon"

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);
  useEffect(() => {
    setFavoritePokemons(favorites.pokemons)
  }, [])
  return (
    <MainLayout title="Pokemons Favoritos">
        {
          favoritePokemons.length === 0
          ? <NoFavorites />
          : <FavoriteList pokemons={favoritePokemons} />
        }
    </MainLayout>
  )
}
export default FavoritesPage