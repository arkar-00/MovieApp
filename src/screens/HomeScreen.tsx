import React, { useCallback, useEffect, useState, memo } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { MovieCard, ScreenWrapper, TopTab, withApiState } from '../components'
import {
  fetchPopularMoviesRequest,
  fetchUpcomingMoviesRequest,
  loadFavorites,
  toggleFavorite,
} from '../store/actions/movieActions'
import { IMovie, RootState, TopTabType } from '../types'
import { TAB_DATA } from '../constants/base'

const MovieList = memo(
  ({
    movies,
    renderMovieCard,
    currentData,
    handleRefresh,
    handleLoadMore,
    renderFooter,
  }: {
    movies: IMovie[]
    renderMovieCard: ({ item }: { item: IMovie }) => React.ReactElement | null
    currentData: any
    handleRefresh: () => void
    handleLoadMore: () => void
    renderFooter: () => React.ReactNode | null
  }) => (
    <FlatList
      data={movies}
      renderItem={renderMovieCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={currentData.api.isRefreshing || false}
          onRefresh={handleRefresh}
          colors={['#007AFF']}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  ),
)

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { upcoming, popular } = useSelector((state: RootState) => state.movies)
  const [activeTab, setActiveTab] = useState<TopTabType>('upcoming')
  const currentData = activeTab === 'upcoming' ? upcoming : popular

  useEffect(() => {
    dispatch(loadFavorites())
    if (upcoming.movies.length === 0) {
      dispatch(fetchUpcomingMoviesRequest({ page: 1 }))
    }
    if (popular.movies.length === 0) {
      dispatch(fetchPopularMoviesRequest({ page: 1 }))
    }
  }, [dispatch, upcoming.movies.length, popular.movies.length])

  const handleRefresh = useCallback(() => {
    if (activeTab === 'upcoming') {
      dispatch(fetchUpcomingMoviesRequest({ page: 1, refresh: true }))
    } else {
      dispatch(fetchPopularMoviesRequest({ page: 1, refresh: true }))
    }
  }, [dispatch, activeTab])

  const handleLoadMore = useCallback(() => {
    if (currentData.hasMore && !currentData.api.isLoading) {
      const nextPage = currentData.page + 1
      if (activeTab === 'upcoming') {
        dispatch(fetchUpcomingMoviesRequest({ page: nextPage, refresh: false }))
      } else {
        dispatch(fetchPopularMoviesRequest({ page: nextPage }))
      }
    }
  }, [dispatch, activeTab, currentData])

  const handleMoviePress = useCallback(
    (movie: IMovie) => {
      // navigation.navigate('MovieDetails', { movieId: movie.id, movie })
    },
    [navigation],
  )

  const handleToggleFavorite = useCallback(
    (movie: IMovie) => {
      dispatch(toggleFavorite({ movie }))
    },
    [dispatch],
  )

  const renderMovieCard = useCallback(
    ({ item }: { item: IMovie }) => (
      <MovieCard
        movie={item}
        onPress={handleMoviePress}
        onToggleFavorite={handleToggleFavorite}
      />
    ),
    [handleMoviePress, handleToggleFavorite],
  )

  const renderFooter = useCallback(() => {
    console.log('renderFooter called')
    if (currentData.api.isLoading && currentData.movies.length > 0) {
      return (
        <View style={styles.loadingFooter}>
          <Text>Loading more...</Text>
        </View>
      )
    }
    return null
  }, [currentData])

  const MovieListComponent = withApiState(
    ({ movies }: { movies: IMovie[] }) => (
      <MovieList
        movies={movies}
        renderMovieCard={renderMovieCard}
        currentData={currentData}
        handleRefresh={handleRefresh}
        handleLoadMore={handleLoadMore}
        renderFooter={renderFooter}
      />
    ),
  )

  return (
    <ScreenWrapper>
      <TopTab
        tabs={TAB_DATA}
        activeTab={activeTab}
        onTabPress={(key) => setActiveTab(key as TopTabType)}
      />
      <MovieListComponent
        movies={currentData.movies}
        apiState={currentData.api}
        onRetry={handleRefresh}
        showEmptyState={
          currentData.movies.length === 0 && !currentData.api.isLoading
        }
        emptyMessage={`There is no ${activeTab} movies found`}
      />
    </ScreenWrapper>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingFooter: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row', // Align items in a row
    justifyContent: 'center', // Center content horizontally
  },
})
