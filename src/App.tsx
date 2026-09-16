import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState, type ComponentType } from 'react'
import ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import MovieGrid from './components/MovieGrid/MovieGrid'
import SearchBar from './components/SearchBar/SearchBar'
import { searchMovies } from './services/movieService'
import css from './App.module.css'

type ModuleWithDefault<T> = { default: T }

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

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

      {isLoading ? <p className={css.message}>Loading...</p> : null}
      {isError ? (
        <p className={css.message}>Something went wrong. Please try again.</p>
      ) : null}
      {!isLoading && !isError && query !== '' && movies.length === 0 ? (
        <p className={css.message}>No movies found for your request.</p>
      ) : null}

      <MovieGrid movies={movies} />

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
    </div>
  )
}

export default App
