import type { Movie } from '../../types/movie'
import css from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  onSelect: (movie: Movie) => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <li className={css.card} onClick={() => onSelect(movie)}>
      {movie.poster_path ? (
        <img
          className={css.poster}
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className={css.noPoster}>No poster</div>
      )}
      <div className={css.info}>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date?.slice(0, 4) || 'N/A'} · ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </li>
  )
}

export default MovieCard
