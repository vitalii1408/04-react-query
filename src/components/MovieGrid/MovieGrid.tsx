import type { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'
import css from './MovieGrid.module.css'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  )
}

export default MovieGrid
