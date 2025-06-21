import { ApiConfig } from '../types'

export const API_CONFIG: ApiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  imageBaseUrl: process.env.EXPO_PUBLIC_IMAGE_BASE_URL,
}

export const API_ENDPOINTS = {
  upcoming: '/movie/upcoming',
  popular: '/movie/popular',
  movieDetails: (id: number) => `/movie/${id}`,
  genres: '/genre/movie/list',
}
