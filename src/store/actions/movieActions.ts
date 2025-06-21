import { createAction } from '@reduxjs/toolkit'
import { IMovie, IMovieDetails } from '../../types'

// Upcoming Movies Actions
export const fetchUpcomingMoviesRequest = createAction<{
  page: number
  refresh?: boolean
}>('movies/fetchUpcomingMoviesRequest')

export const fetchUpcomingMoviesSuccess = createAction<{
  movies: IMovie[]
  page: number
  hasMore: boolean
}>('movies/fetchUpcomingMoviesSuccess')

export const fetchUpcomingMoviesFailure = createAction<{ error: string }>(
  'movies/fetchUpcomingMoviesFailure',
)

// Popular Movies Actions
export const fetchPopularMoviesRequest = createAction<{
  page: number
  refresh?: boolean
}>('movies/fetchPopularMoviesRequest')

export const fetchPopularMoviesSuccess = createAction<{
  movies: IMovie[]
  page: number
  hasMore: boolean
}>('movies/fetchPopularMoviesSuccess')

export const fetchPopularMoviesFailure = createAction<{ error: string }>(
  'movies/fetchPopularMoviesFailure',
)

// Movie Details Actions
export const fetchMovieDetailsRequest = createAction<{ movieId: number }>(
  'movies/fetchMovieDetailsRequest',
)

export const fetchMovieDetailsSuccess = createAction<{
  movieDetails: IMovieDetails
}>('movies/fetchMovieDetailsSuccess')

export const fetchMovieDetailsFailure = createAction<{
  error: string
  movieId: number
}>('movies/fetchMovieDetailsFailure')

// Favorites Actions
export const toggleFavorite = createAction<{ movie: IMovie }>(
  'movies/toggleFavorite',
)

export const loadFavorites = createAction('movies/loadFavorites')

export const loadFavoritesSuccess = createAction<{ favorites: IMovie[] }>(
  'movies/loadFavoritesSuccess',
)

// Network Actions
export const setNetworkStatus = createAction<{ isConnected: boolean }>(
  'network/setNetworkStatus',
)

// UI Actions
export const setRefreshing = createAction<{
  movieType: 'upcoming' | 'popular'
  isRefreshing: boolean
}>('movies/setRefreshing')
