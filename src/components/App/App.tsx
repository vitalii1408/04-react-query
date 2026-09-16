import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState, type ComponentType } from 'react'
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  })

  const handleSearchSubmit = (newQuery: string) => {
    if (!newQuery) return
    setQuery(newQuery)
    setPage(1)
  }

  const totalPages = data?.total_pages ?? 0
  const movies = data?.results ?? []

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

      {isLoading ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {!isLoading && !isError && query !== '' && movies.length === 0 ? (
        <ErrorMessage message="No movies found for your request." />
      ) : null}

      <MovieGrid movies={movies} onSelect={setSelectedMovie} />

      {selectedMovie ? (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : null}
    </div>
  )
}

export default App
