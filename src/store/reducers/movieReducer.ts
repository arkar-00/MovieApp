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

      if (action.payload.page === 1) {
        state.upcoming.movies = action.payload.movies
      } else {
        state.upcoming.movies = [
          ...state.upcoming.movies,
          ...action.payload.movies,
        ]
      }

      // Update favorites status
      state.upcoming.movies = state.upcoming.movies.map((movie) => ({
        ...movie,
        isFavorite: state.favorites.some((fav) => fav.id === movie.id),
      }))
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

      if (action.payload.page === 1) {
        state.popular.movies = action.payload.movies
      } else {
        state.popular.movies = [
          ...state.popular.movies,
          ...action.payload.movies,
        ]
      }

      // Update favorites status
      state.popular.movies = state.popular.movies.map((movie) => ({
        ...movie,
        isFavorite: state.favorites.some((fav) => fav.id === movie.id),
      }))
    })
    .addCase(fetchPopularMoviesFailure, (state, action) => {
      state.popular.api.isLoading = false
      state.popular.api.isRefreshing = false
      state.popular.api.error = action.payload.error
    })

    // Movie Details
    .addCase(fetchMovieDetailsRequest, (state, action) => {
      // You can add loading state for specific movie details if needed
    })
    .addCase(fetchMovieDetailsSuccess, (state, action) => {
      const movieDetails = action.payload.movieDetails
      state.movieDetails[movieDetails.id] = {
        ...movieDetails,
        isFavorite: state.favorites.some((fav) => fav.id === movieDetails.id),
      }
    })
    .addCase(fetchMovieDetailsFailure, (state, action) => {
      // Handle movie details error if needed
    })

    // Favorites
    .addCase(toggleFavorite, (state, action) => {
      const movie = action.payload.movie
      const existingFavoriteIndex = state.favorites.findIndex(
        (fav) => fav.id === movie.id,
      )

      if (existingFavoriteIndex >= 0) {
        // Remove from favorites
        state.favorites.splice(existingFavoriteIndex, 1)
      } else {
        // Add to favorites
        state.favorites.push({ ...movie, isFavorite: true })
      }

      // Update movie in upcoming list
      const upcomingIndex = state.upcoming.movies.findIndex(
        (m) => m.id === movie.id,
      )
      if (upcomingIndex >= 0) {
        state.upcoming.movies[upcomingIndex] = {
          ...state.upcoming.movies[upcomingIndex],
          isFavorite: existingFavoriteIndex < 0,
        }
      }

      // Update movie in popular list
      const popularIndex = state.popular.movies.findIndex(
        (m) => m.id === movie.id,
      )
      if (popularIndex >= 0) {
        state.popular.movies[popularIndex] = {
          ...state.popular.movies[popularIndex],
          isFavorite: existingFavoriteIndex < 0,
        }
      }

      // Update movie in details
      if (state.movieDetails[movie.id]) {
        state.movieDetails[movie.id] = {
          ...state.movieDetails[movie.id],
          isFavorite: existingFavoriteIndex < 0,
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
