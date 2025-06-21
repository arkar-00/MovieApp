import { combineReducers } from '@reduxjs/toolkit'
import { movieReducer } from './movieReducer'
import { networkReducer } from './networkReducer'

export const rootReducer = combineReducers({
  movies: movieReducer,
  network: networkReducer,
})
