import { setNetworkStatus } from '../../actions/movieActions'
import { networkReducer } from '../networkReducer'

// Test suite for the networkReducer
describe('networkReducer', () => {
  // Test: Should return the initial state when state is undefined
  it('should return the initial state', () => {
    const initialState = undefined
    const action = { type: '' } // irrelevant action
    const state = networkReducer(initialState, action)
    expect(state).toEqual({ isConnected: true })
  })

  // Test: Should handle setNetworkStatus action with isConnected: false
  it('should handle setNetworkStatus with isConnected: false', () => {
    const prevState = { isConnected: true }
    const action = setNetworkStatus({ isConnected: false })
    const newState = networkReducer(prevState, action)
    expect(newState).toEqual({ isConnected: false })
  })

  // Test: Should handle setNetworkStatus action with isConnected: true
  it('should handle setNetworkStatus with isConnected: true', () => {
    const prevState = { isConnected: false }
    const action = setNetworkStatus({ isConnected: true })
    const newState = networkReducer(prevState, action)
    expect(newState).toEqual({ isConnected: true })
  })

  // Test: Should not change state for irrelevant actions
  it('should not change state for irrelevant actions', () => {
    const prevState = { isConnected: true }
    const action = { type: 'IRRELEVANT_ACTION' }
    const newState = networkReducer(prevState, action)
    expect(newState).toEqual(prevState)
  })

  // Test: Should handle multiple setNetworkStatus actions in sequence
  it('should handle multiple actions correctly', () => {
    const prevState = { isConnected: true }
    const action1 = setNetworkStatus({ isConnected: false })
    const action2 = setNetworkStatus({ isConnected: true })
    let newState = networkReducer(prevState, action1)
    expect(newState).toEqual({ isConnected: false })
    newState = networkReducer(newState, action2)
    expect(newState).toEqual({ isConnected: true })
  })

  // Test: Should handle initial state with a custom value
  it('should handle initial state with custom value', () => {
    const initialState = { isConnected: false }
    const action = { type: '' } // irrelevant action
    const state = networkReducer(initialState, action)
    expect(state).toEqual({ isConnected: false })
  })
})
