import axios from 'axios'
import type { Movie } from '../types/movie'

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export const searchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: { query, page },
    headers: { Authorization: `Bearer ${TOKEN}` },
  })

  return data
}
