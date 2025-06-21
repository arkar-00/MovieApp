import { IMovie } from '.'

// API Types
export interface BaseError {
  message: string
  status_code?: number
}

export interface MovieListResponse {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}
