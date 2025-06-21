import { createReducer } from '@reduxjs/toolkit'
import {
  fetchUpcomingMoviesRequest,
  fetchUpcomingMoviesSuccess,
  fetchUpcomingMoviesFailure,
  fetchPopularMoviesRequest,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  toggleFavorite,
  loadFavoritesSuccess,
  setRefreshing,
} from '../actions/movieActions'
import { IMoviesState } from '../../types'

const initialState: IMoviesState = {
  upcoming: {
    movies: [],
    api: {
      isLoading: false,
      error: null,
      isRefreshing: false,
    },
    page: 0,
    hasMore: true,
  },
  popular: {
    movies: [],
    api: {
      isLoading: false,
      error: null,
      isRefreshing: false,
    },
    page: 0,
    hasMore: true,
  },
  movieDetails: {},
  favorites: [],
}

function updateMoviesWithFavorites(movies: any[], favorites: any[]) {
  return movies.map((movie) => ({
    ...movie,
    isFavorite: favorites.some((fav) => fav.id === movie.id),
  }))
}

function updateMovieFavoriteStatus(movies: any[], movieId: number, isFavorite: boolean) {
  const idx = movies.findIndex((m) => m.id === movieId)
  if (idx >= 0) {
    movies[idx] = { ...movies[idx], isFavorite }
  }
}

export const movieReducer = createReducer(initialState, (builder) => {
  builder
    // Upcoming Movies
    .addCase(fetchUpcomingMoviesRequest, (state, action) => {
      state.upcoming.api.isLoading = true
      state.upcoming.api.error = null
      if (action.payload.refresh) {
        state.upcoming.api.isRefreshing = true
      }
    })
    .addCase(fetchUpcomingMoviesSuccess, (state, action) => {
      state.upcoming.api.isLoading = false
      state.upcoming.api.isRefreshing = false
      state.upcoming.api.error = null
      state.upcoming.page = action.payload.page
      state.upcoming.hasMore = action.payload.hasMore

      state.upcoming.movies =
        action.payload.page === 1
          ? action.payload.movies
          : [...state.upcoming.movies, ...action.payload.movies]

      state.upcoming.movies = updateMoviesWithFavorites(state.upcoming.movies, state.favorites)
    })
    .addCase(fetchUpcomingMoviesFailure, (state, action) => {
      state.upcoming.api.isLoading = false
      state.upcoming.api.isRefreshing = false
      state.upcoming.api.error = action.payload.error
    })

    // Popular Movies
    .addCase(fetchPopularMoviesRequest, (state, action) => {
      state.popular.api.isLoading = true
      state.popular.api.error = null
      if (action.payload.refresh) {
        state.popular.api.isRefreshing = true
      }
    })
    .addCase(fetchPopularMoviesSuccess, (state, action) => {
      state.popular.api.isLoading = false
      state.popular.api.isRefreshing = false
      state.popular.api.error = null
      state.popular.page = action.payload.page
      state.popular.hasMore = action.payload.hasMore

      state.popular.movies =
        action.payload.page === 1
          ? action.payload.movies
          : [...state.popular.movies, ...action.payload.movies]

      state.popular.movies = updateMoviesWithFavorites(state.popular.movies, state.favorites)
    })
    .addCase(fetchPopularMoviesFailure, (state, action) => {
      state.popular.api.isLoading = false
      state.popular.api.isRefreshing = false
      state.popular.api.error = action.payload.error
    })

    // Movie Details
    .addCase(fetchMovieDetailsRequest, () => {})
    .addCase(fetchMovieDetailsSuccess, (state, action) => {
      const movieDetails = action.payload.movieDetails
      state.movieDetails[movieDetails.id] = {
        ...movieDetails,
        isFavorite: state.favorites.some((fav) => fav.id === movieDetails.id),
      }
    })
    .addCase(fetchMovieDetailsFailure, () => {})

    // Favorites
    .addCase(toggleFavorite, (state, action) => {
      const movie = action.payload.movie
      const existingFavoriteIndex = state.favorites.findIndex((fav) => fav.id === movie.id)
      const isNowFavorite = existingFavoriteIndex < 0

      if (isNowFavorite) {
        state.favorites.push({ ...movie, isFavorite: true })
      } else {
        state.favorites.splice(existingFavoriteIndex, 1)
      }

      updateMovieFavoriteStatus(state.upcoming.movies, movie.id, isNowFavorite)
      updateMovieFavoriteStatus(state.popular.movies, movie.id, isNowFavorite)

      if (state.movieDetails[movie.id]) {
        state.movieDetails[movie.id] = {
          ...state.movieDetails[movie.id],
          isFavorite: isNowFavorite,
        }
      }
    })
    .addCase(loadFavoritesSuccess, (state, action) => {
      state.favorites = action.payload.favorites
    })

    // UI
    .addCase(setRefreshing, (state, action) => {
      if (action.payload.movieType === 'upcoming') {
        state.upcoming.api.isRefreshing = action.payload.isRefreshing
      } else {
        state.popular.api.isRefreshing = action.payload.isRefreshing
      }
    })
})
