import type { Movie } from '../../types/movie'
import css from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const NO_POSTER = 'https://placehold.co/500x750?text=No+Poster'

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : NO_POSTER

  return (
    <li className={css.card}>
      <img className={css.poster} src={posterUrl} alt={movie.title} loading="lazy" />
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
