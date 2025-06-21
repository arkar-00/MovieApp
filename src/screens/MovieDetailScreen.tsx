import React, { useCallback, useMemo } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import {
  fetchMovieDetailsRequest,
  toggleFavorite,
} from '../store/actions/movieActions'
import { RootStackParamList } from '../types'
import { ScreenWrapper, withApiStateView } from '../components'
import MovieDetailsContent from './components/MovieDetailsContent'
import useMovieDetails from '../hooks/useMovieDetails'
import { COLORS, DIMENSIONS } from '../constants/base'

const MovieDetailsScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>()
  const dispatch = useDispatch()
  const { movieId } = route.params

  const movieDetails = useMovieDetails(movieId)

  const handleToggleFavorite = useCallback(() => {
    if (movieDetails) {
      dispatch(toggleFavorite({ movie: movieDetails }))
    }
  }, [dispatch, movieDetails])

  const handleRetry = useCallback(() => {
    dispatch(fetchMovieDetailsRequest({ movieId }))
  }, [dispatch, movieId])

  const MovieDetailsComponent = useMemo(
    () =>
      withApiStateView(() => (
        <MovieDetailsContent
          movie={movieDetails}
          onToggleFavorite={handleToggleFavorite}
        />
      )),
    [movieDetails, handleToggleFavorite],
  )

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    )
  }

  return (
    <ScreenWrapper edges={['left', 'right']}>
      <MovieDetailsComponent
        apiState={{ isLoading: false, error: null }}
        onRetry={handleRetry}
      />
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.overlayBackButton}
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
})

export default React.memo(MovieDetailsScreen)
