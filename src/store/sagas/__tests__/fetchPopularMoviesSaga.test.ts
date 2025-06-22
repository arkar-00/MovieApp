import { expectSaga } from 'redux-saga-test-plan'
import { fetchPopularMoviesSaga } from '../movieSagas'
import {
  fetchPopularMoviesFailure,
  fetchPopularMoviesRequest,
  fetchPopularMoviesSuccess,
} from '../../actions/movieActions'
import { MovieServices } from '../../../services/MovieServices'
import { of, throwError } from 'rxjs'

jest.mock('../../../services/MovieServices', () => ({
  MovieServices: {
    getPopularMovies: jest.fn(),
  },
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}))

describe('fetchPopularMoviesSaga - success', () => {
  it('dispatches success action when API call succeeds', () => {
    const fakeResponse = {
      page: 1,
      total_pages: 2,
      results: [
        {
          id: 1,
          title: 'Popular Movie A',
          overview: 'Overview of Popular Movie A',
          poster_path: '/path/to/poster.jpg',
          backdrop_path: '/path/to/backdrop.jpg',
          release_date: '2023-01-01',
          vote_average: 8.5,
          vote_count: 100,
          popularity: 150.5,
          original_language: 'en',
          original_title: 'Popular Movie A',
          genre_ids: [28, 12],
          adult: false,
          video: false,
        },
      ],
    }

    ;(MovieServices.getPopularMovies as jest.Mock).mockReturnValue(
      of(fakeResponse),
    )

    return expectSaga(
      fetchPopularMoviesSaga,
      fetchPopularMoviesRequest({ page: 1 }),
    )
      .put(
        fetchPopularMoviesSuccess({
          movies: fakeResponse.results,
          page: fakeResponse.page,
          hasMore: true,
        }),
      )
      .run()
  })
})

describe('fetchPopularMoviesSaga - failure', () => {
  it('dispatches failure action when API call fails', () => {
    const error = new Error('Network error')
    ;(MovieServices.getPopularMovies as jest.Mock).mockReturnValue(
      throwError(() => error),
    )

    return expectSaga(
      fetchPopularMoviesSaga,
      fetchPopularMoviesRequest({ page: 1 }),
    )
      .put(
        fetchPopularMoviesFailure({
          error: 'Network error',
        }),
      )
      .run()
  })
})
