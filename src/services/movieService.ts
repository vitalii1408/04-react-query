import axios from 'axios'
import type { MoviesResponse } from '../types/movie'

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
