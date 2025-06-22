import { expectSaga } from 'redux-saga-test-plan'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { toggleFavorite } from '../../actions/movieActions'
import { toggleFavoriteSaga } from '../movieSagas'
import { call } from 'redux-saga/effects'
import { throwError } from 'rxjs'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}))

const mockState = {
  movies: {
    favorites: [{ id: 1, title: 'Movie A' }],
  },
}

describe('toggleFavoriteSaga', () => {
  it('should save favorites to AsyncStorage', () => {
    const movie = {
      id: 1,
      title: 'Movie A',
      overview: 'Test overview',
      poster_path: '/test-poster.jpg',
      backdrop_path: '/test-backdrop.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
      vote_count: 100,
      popularity: 50,
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Movie A',
      adult: false,
      video: false,
    }

    return expectSaga(toggleFavoriteSaga, toggleFavorite({ movie }))
      .withState(mockState)
      .call(
        AsyncStorage.setItem,
        'favorites',
        JSON.stringify(mockState.movies.favorites),
      )
      .run()
  })
})

it('should handle error when saving to AsyncStorage fails', () => {
  const movie = {
    id: 1,
    title: 'Movie A',
    overview: 'Test overview',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 100,
    popularity: 50,
    genre_ids: [1, 2],
    original_language: 'en',
    original_title: 'Movie A',
    adult: false,
    video: false,
  }

  const error = new Error('AsyncStorage error')

  return expectSaga(toggleFavoriteSaga, toggleFavorite({ movie }))
    .withState(mockState)
    .provide([
      [
        call(
          AsyncStorage.setItem,
          'favorites',
          JSON.stringify(mockState.movies.favorites),
        ),
        throwError(error),
      ],
    ])
    .run()
    .catch((e) => {
      expect(e.message).toBe('AsyncStorage error')
    })
})
