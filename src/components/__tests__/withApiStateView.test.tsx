import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import withApiStateView from '../hoc/withApiStateView'
import { Text, View } from 'react-native'

const Wrapped = withApiStateView(() => (
  <View testID="wrapped-content">
    <Text>Wrapped Component</Text>
  </View>
))

describe('withApiStateView HOC', () => {
  it('shows loading state when isLoading is true and isRefreshing is false', () => {
    const { getByText, getByTestId } = render(
      <Wrapped
        apiState={{ isLoading: true, isRefreshing: false, error: null }}
      />,
    )

    expect(getByText('Loading...')).toBeTruthy()
    expect(getByTestId('ActivityIndicator')).toBeTruthy()
  })

  it('shows error message and retry button when error is present', () => {
    const onRetry = jest.fn()
    const { getByText } = render(
      <Wrapped
        apiState={{
          isLoading: false,
          isRefreshing: false,
          error: 'Something went wrong',
        }}
        onRetry={onRetry}
      />,
    )

    expect(getByText(/⚠️ Something went wrong/)).toBeTruthy()

    const retryButton = getByText('Retry')
    fireEvent.press(retryButton)
    expect(onRetry).toHaveBeenCalled()
  })

  it('shows empty message and refresh button when showEmptyState is true', () => {
    const onRetry = jest.fn()
    const { getByText } = render(
      <Wrapped
        apiState={{ isLoading: false, isRefreshing: false, error: null }}
        showEmptyState
        emptyMessage="Nothing to see here"
        onRetry={onRetry}
      />,
    )

    expect(getByText('Nothing to see here')).toBeTruthy()

    const refreshButton = getByText('Refresh')
    fireEvent.press(refreshButton)
    expect(onRetry).toHaveBeenCalled()
  })

  it('renders wrapped component when no state flags are active', () => {
    const { getByTestId } = render(
      <Wrapped
        apiState={{ isLoading: false, isRefreshing: false, error: null }}
      />,
    )

    expect(getByTestId('wrapped-content')).toBeTruthy()
  })
})
