export type RootStackParamList = {
  BottomTab: undefined
  Home: undefined
}

export type BottomTabParamList = {
  Home: undefined
  Wallet: undefined
  More: undefined
}

export type TopTabType = 'upcoming' | 'popular'

export interface ApiConfig {
  baseUrl: string
  apiKey: string
  imageBaseUrl: string
}

export interface IApiState {
  isLoading: boolean
  error: string | null
  isRefreshing?: boolean
}
export interface IMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  isFavorite?: boolean
}
export interface MovieListResponse {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}

export interface IGenre {
  id: number
  name: string
}

export interface ICollection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface IProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface IProductionCountry {
  iso_3166_1: string
  name: string
}

export interface ISpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IMovieDetails extends IMovie {
  belongs_to_collection: ICollection | null
  budget: number
  genres: IGenre[]
  homepage: string
  imdb_id: string
  origin_country: string[]
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string
}

// Redux State Types
export interface IMoviesState {
  upcoming: {
    movies: IMovie[]
    api: IApiState
    page: number
    hasMore: boolean
  }
  popular: {
    movies: IMovie[]
    api: IApiState
    page: number
    hasMore: boolean
  }
  movieDetails: {
    [key: number]: IMovieDetails
  }
  favorites: IMovie[]
}

export interface RootState {
  movies: IMoviesState
  network: {
    isConnected: boolean
  }
}
