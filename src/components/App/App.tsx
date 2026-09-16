import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState, type ComponentType } from 'react'
import toast from 'react-hot-toast'
import ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import SearchBar from '../SearchBar/SearchBar'
import { searchMovies } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import css from './App.module.css'

type ModuleWithDefault<T> = { default: T }

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.total_pages ?? 0
  const movies = data?.results ?? []

  useEffect(() => {
    if (isSuccess && movies.length === 0) {
      toast.error('No movies found for your request.')
    }
  }, [isSuccess, movies.length])

  const handleSearchSubmit = (newQuery: string) => {
    if (!newQuery) return
    setQuery(newQuery)
    setPage(1)
  }

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearchSubmit} />

      {totalPages > 1 ? (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      ) : null}

      {isFetching ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}

      <MovieGrid movies={movies} onSelect={setSelectedMovie} />

      {selectedMovie ? (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : null}
    </div>
  )
}

export default App
