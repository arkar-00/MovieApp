import { expectSaga } from 'redux-saga-test-plan'
import { fetchUpcomingMoviesSaga } from '../movieSagas'
import {
  fetchUpcomingMoviesFailure,
  fetchUpcomingMoviesRequest,
  fetchUpcomingMoviesSuccess,
} from '../../actions/movieActions'
import { MovieServices } from '../../../services/MovieServices'

// mock service
jest.mock('../../../services/MovieServices', () => ({
  MovieServices: {
    getUpcomingMovies: jest.fn(),
  },
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}))

describe('fetchUpcomingMoviesSaga', () => {
  it('should dispatch success action when API call succeeds', () => {
    const fakeResponse = {
      page: 1,
      total_pages: 2,
      results: [
        {
          id: 1,
          title: 'Movie A',
          overview: 'Overview of Movie A',
          poster_path: '/path/to/poster.jpg',
          backdrop_path: '/path/to/backdrop.jpg',
          release_date: '2023-01-01',
          vote_average: 8.5,
          vote_count: 100,
          genre_ids: [12, 18],
          original_language: 'en',
          original_title: 'Movie A',
          popularity: 50.5,
          adult: false,
          video: false,
        },
      ],
    }

    // simulate observable
    ;(MovieServices.getUpcomingMovies as jest.Mock).mockReturnValue({
      subscribe(observer: any) {
        observer.next(fakeResponse)
        observer.complete()
        return { unsubscribe: () => {} }
      },
    })

    return expectSaga(
      fetchUpcomingMoviesSaga,
      fetchUpcomingMoviesRequest({ page: 1 }),
    )
      .put(
        fetchUpcomingMoviesSuccess({
          movies: fakeResponse.results,
          page: 1,
          hasMore: true,
        }),
      )
      .run()
  })
})
import { throwError } from 'rxjs'

describe('fetchUpcomingMoviesSaga - failure', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should dispatch failure action when API call fails', () => {
    ;(MovieServices.getUpcomingMovies as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error')),
    )

    return expectSaga(
      fetchUpcomingMoviesSaga,
      fetchUpcomingMoviesRequest({ page: 1 }),
    )
      .put(
        fetchUpcomingMoviesFailure({
          error: 'Network error',
        }),
      )
      .run()
  })
})
