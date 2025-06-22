import { IMoviesState } from '../../../types'
import {
  fetchUpcomingMoviesFailure,
  fetchUpcomingMoviesRequest,
  fetchUpcomingMoviesSuccess,
  setRefreshing,
  toggleFavorite,
} from '../../actions/movieActions'
import { movieReducer } from '../movieReducer'

// Movie factories
const createMovie = (overrides = {}) => ({
  id: 1,
  title: 'Movie A',
  overview: 'Overview A',
  vote_count: 100,
  vote_average: 8.5,
  release_date: '2023-01-01',
  backdrop_path: '/backdropA.jpg',
  poster_path: '/posterA.jpg',
  original_title: 'Movie A',
  original_language: 'en',
  popularity: 50,
  genre_ids: [1, 2],
  video: false,
  adult: false,
  ...overrides,
})

const createInitialState = (): IMoviesState => ({
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
})

const withMovies = (
  state: IMoviesState,
  type: 'upcoming' | 'popular',
  movies: any[],
) => ({
  ...state,
  [type]: {
    ...state[type],
    movies,
  },
})

describe('movieReducer', () => {
  let initialState: IMoviesState

  beforeEach(() => {
    initialState = createInitialState()
  })

  it('handles fetchUpcomingMoviesRequest with refresh', () => {
    const nextState = movieReducer(
      initialState,
      fetchUpcomingMoviesRequest({ page: 1, refresh: true }),
    )
    expect(nextState.upcoming.api).toMatchObject({
      isLoading: true,
      isRefreshing: true,
      error: null,
    })
  })

  it('handles fetchUpcomingMoviesSuccess on first page', () => {
    const movie = createMovie()
    const payload = {
      movies: [movie],
      page: 1,
      hasMore: true,
    }
    const nextState = movieReducer(
      initialState,
      fetchUpcomingMoviesSuccess(payload),
    )
    expect(nextState.upcoming.movies).toEqual([{ ...movie, isFavorite: false }])
    expect(nextState.upcoming.api.isLoading).toBe(false)
    expect(nextState.upcoming.page).toBe(1)
    expect(nextState.upcoming.hasMore).toBe(true)
  })

  it('handles fetchUpcomingMoviesFailure', () => {
    const nextState = movieReducer(
      initialState,
      fetchUpcomingMoviesFailure({ error: 'API failed' }),
    )
    expect(nextState.upcoming.api.isLoading).toBe(false)
    expect(nextState.upcoming.api.error).toBe('API failed')
  })

  describe('toggleFavorite', () => {
    it('adds a movie to favorites', () => {
      const movie = createMovie({ title: 'Fav Movie' })
      const nextState = movieReducer(initialState, toggleFavorite({ movie }))
      expect(nextState.favorites).toHaveLength(1)
      expect(nextState.favorites[0]).toMatchObject({
        id: movie.id,
        isFavorite: true,
      })
    })

    it('toggles favorite status (add/remove)', () => {
      const movie = createMovie()
      let nextState = movieReducer(initialState, toggleFavorite({ movie }))
      expect(nextState.favorites).toHaveLength(1)
      nextState = movieReducer(nextState, toggleFavorite({ movie }))
      expect(nextState.favorites).toHaveLength(0)
    })

    it('updates movie favorite status in upcoming and popular lists', () => {
      const movie = createMovie()
      const preloadedState = withMovies(
        withMovies(initialState, 'upcoming', [movie]),
        'popular',
        [movie],
      )
      let nextState = movieReducer(preloadedState, toggleFavorite({ movie }))
      expect(nextState.upcoming.movies[0]?.isFavorite).toBe(true)
      expect(nextState.popular.movies[0]?.isFavorite).toBe(true)
      nextState = movieReducer(nextState, toggleFavorite({ movie }))
      expect(nextState.upcoming.movies[0]?.isFavorite).toBe(false)
      expect(nextState.popular.movies[0]?.isFavorite).toBe(false)
    })

    it('updates movie favorite status in movie details', () => {
      const movie = createMovie()
      const initialWithDetails = {
        ...initialState,
        movieDetails: {
          [movie.id]: {
            ...movie,
            belongs_to_collection: null,
            budget: 0,
            genres: [],
            homepage: '',
            imdb_id: '',
            production_companies: [],
            production_countries: [],
            revenue: 0,
            runtime: 0,
            spoken_languages: [],
            status: '',
            tagline: '',
            origin_country: [],
          },
        },
      }
      let nextState = movieReducer(
        initialWithDetails,
        toggleFavorite({ movie }),
      )
      expect(nextState.movieDetails[movie.id]?.isFavorite).toBe(true)
      nextState = movieReducer(nextState, toggleFavorite({ movie }))
      expect(nextState.movieDetails[movie.id]?.isFavorite).toBe(false)
    })
  })

  describe('setRefreshing', () => {
    it('updates isRefreshing for upcoming', () => {
      const nextState = movieReducer(
        initialState,
        setRefreshing({ movieType: 'upcoming', isRefreshing: true }),
      )
      expect(nextState.upcoming.api.isRefreshing).toBe(true)
    })

    it('updates isRefreshing for popular', () => {
      const nextState = movieReducer(
        initialState,
        setRefreshing({ movieType: 'popular', isRefreshing: true }),
      )
      expect(nextState.popular.api.isRefreshing).toBe(true)
    })
  })

  it('does not change state for irrelevant actions', () => {
    const nextState = movieReducer(initialState, {
      type: 'IRRELEVANT_ACTION',
    } as any)
    expect(nextState).toEqual(initialState)
  })

  it('handles initial state with custom value', () => {
    const customInitialState = createInitialState()
    const nextState = movieReducer(customInitialState, {
      type: 'IRRELEVANT_ACTION',
    } as any)
    expect(nextState).toEqual(customInitialState)
  })
})
