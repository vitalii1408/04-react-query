import { type FormEvent } from 'react'
import css from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const input = form.elements.namedItem('query') as HTMLInputElement
    const query = input.value.trim()

    onSubmit(query)
    form.reset()
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search movies"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  )
}

export default SearchBar
