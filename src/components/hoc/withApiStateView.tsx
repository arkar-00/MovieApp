import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { IApiState } from '../../types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
} from '../../constants/base'

interface WithApiStateProps {
  apiState: IApiState
  onRetry?: () => void
  emptyMessage?: string
  showEmptyState?: boolean
}

function ApiStateView({
  isLoading,
  isRefreshing,
  error,
  onRetry,
  emptyMessage,
  showEmptyState,
}: {
  isLoading: boolean
  isRefreshing: boolean
  error?: string
  onRetry?: () => void
  emptyMessage?: string
  showEmptyState?: boolean
}) {
  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          testID="ActivityIndicator"
          size="large"
          color={COLORS.PRIMARY}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  if (showEmptyState) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          {emptyMessage || 'No data available'}
        </Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Refresh</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

function withApiStateView<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithApiStateComponent(props: P & WithApiStateProps) {
    const { apiState, onRetry, emptyMessage, showEmptyState, ...otherProps } =
      props

    const shouldShowState =
      (apiState.isLoading && !apiState.isRefreshing) ||
      !!apiState.error ||
      showEmptyState

    if (shouldShowState) {
      return (
        <ApiStateView
          isLoading={apiState.isLoading}
          isRefreshing={apiState.isRefreshing ?? false}
          error={apiState.error ?? undefined}
          onRetry={onRetry}
          emptyMessage={emptyMessage}
          showEmptyState={showEmptyState}
        />
      )
    }

    return <WrappedComponent {...(otherProps as P)} />
  }
}

export default withApiStateView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
  },
  errorText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.ERROR,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
})
