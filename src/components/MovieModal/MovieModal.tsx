import { useEffect, type KeyboardEvent, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Movie } from '../../types/movie'
import css from './MovieModal.module.css'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const modalRoot = document.getElementById('modal-root') as HTMLElement

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose()
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {movie.poster_path ? (
          <img
            className={css.poster}
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : null}
        <div className={css.info}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.meta}>
            {movie.release_date?.slice(0, 4) || 'N/A'} · ⭐{' '}
            {movie.vote_average.toFixed(1)}
          </p>
          <p className={css.overview}>{movie.overview || 'No description available.'}</p>
        </div>
      </div>
    </div>,
    modalRoot,
  )
}

export default MovieModal
