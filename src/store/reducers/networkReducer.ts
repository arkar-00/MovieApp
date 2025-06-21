import { createReducer } from '@reduxjs/toolkit'
import { setNetworkStatus } from '../actions/movieActions'

interface NetworkState {
  isConnected: boolean
}

const initialState: NetworkState = {
  isConnected: true,
}

export const networkReducer = createReducer(initialState, (builder) => {
  builder.addCase(setNetworkStatus, (state, action) => {
    state.isConnected = action.payload.isConnected
  })
})
