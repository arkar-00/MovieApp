import React, { memo, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

import { IGenre, IMovieDetails, IProductionCompany } from '../../types'
import { API_CONFIG } from '../../config/api'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
} from '../../constants/base'

const { width: WIDTH } = Dimensions.get('window')
const BACKDROP_HEIGHT = 250

const GenreChips = memo(({ genres }: { genres: IGenre[] }) => (
  <View style={styles.genresContainer}>
    {genres.map((genre) => (
      <View key={genre.id} style={styles.genreChip}>
        <Text style={styles.genreText}>{genre.name}</Text>
      </View>
    ))}
  </View>
))

const Section = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  ),
)

const MovieDetailsContent: React.FC<{
  movie: IMovieDetails
  onToggleFavorite: () => void
}> = ({ movie, onToggleFavorite }) => {
  const backdropUrl = useMemo(
    () =>
      movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : null,
    [movie.backdrop_path],
  )

  const posterUrl = useMemo(
    () =>
      movie.poster_path
        ? `${API_CONFIG.imageBaseUrl}${movie.poster_path}`
        : null,
    [movie.poster_path],
  )

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const animatedBackdropStyles = useAnimatedStyle(() => {
    const backdropTranslateY = interpolate(
      scrollY.value,
      [0, BACKDROP_HEIGHT],
      [0, -BACKDROP_HEIGHT / 2],
      Extrapolate.CLAMP,
    )
    const backdropOpacity = interpolate(
      scrollY.value,
      [0, BACKDROP_HEIGHT / 2],
      [1, 0.7],
      Extrapolate.CLAMP,
    )
    return {
      transform: [{ translateY: backdropTranslateY }],
      opacity: backdropOpacity,
    }
  })

  const handleFavoritePress = useCallback(() => {
    onToggleFavorite()
  }, [onToggleFavorite])

  const productionCompanies = useMemo(
    () =>
      movie.production_companies?.length
        ? movie.production_companies.map((c) => c.name).join(', ')
        : null,
    [movie.production_companies],
  )

  return (
    <Animated.ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
    >
      {backdropUrl && (
        <Animated.View
          style={[styles.backdropContainer, animatedBackdropStyles]}
        >
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
        </Animated.View>
      )}

      <View style={styles.content}>
        <View style={styles.movieInfo}>
          <View style={styles.movieHeader}>
            {posterUrl && (
              <Image source={{ uri: posterUrl }} style={styles.poster} />
            )}

            <View style={styles.movieBasicInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              {!!movie.tagline && (
                <Text style={styles.tagline}>{movie.tagline}</Text>
              )}

              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={COLORS.YELLOW} />
                <Text style={styles.rating}>
                  {movie.vote_average.toFixed(1)}
                </Text>
                <Text style={styles.voteCount}>({movie.vote_count} votes)</Text>
              </View>

              <View style={styles.metaInfo}>
                <Text style={styles.releaseDate}>
                  {new Date(movie.release_date).getFullYear()}
                </Text>
                {movie.runtime ? (
                  <>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.runtime}>{movie.runtime} min</Text>
                  </>
                ) : null}
              </View>

              {!!movie.genres?.length && <GenreChips genres={movie.genres} />}
            </View>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.8}
          >
            <Ionicons
              name={movie.isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={movie.isFavorite ? COLORS.RED : COLORS.PRIMARY}
            />
            <Text
              style={[
                styles.favoriteButtonText,
                { color: movie.isFavorite ? COLORS.RED : COLORS.PRIMARY },
              ]}
            >
              {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>

          <Section title="Overview">
            <Text style={styles.overview}>{movie.overview}</Text>
          </Section>

          {movie.budget > 0 && (
            <Section title="Budget">
              <Text style={styles.detailText}>
                ${movie.budget.toLocaleString()}
              </Text>
            </Section>
          )}

          {movie.revenue > 0 && (
            <Section title="Revenue">
              <Text style={styles.detailText}>
                ${movie.revenue.toLocaleString()}
              </Text>
            </Section>
          )}

          {productionCompanies && (
            <Section title="Production Companies">
              <Text style={styles.detailText}>{productionCompanies}</Text>
            </Section>
          )}
        </View>
      </View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backdropContainer: {
    position: 'relative',
    height: WIDTH * 0.7,
    width: '100%',
    overflow: 'hidden',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop: -50,
  },
  movieInfo: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: DIMENSIONS.SPACING_XL,
    flex: 1,
  },
  movieHeader: {
    flexDirection: 'row',
    marginBottom: DIMENSIONS.SPACING_XL,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    marginRight: DIMENSIONS.SPACING_LG,
  },
  movieBasicInfo: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: COLORS.GRAY_TEXT,
    marginBottom: 4,
  },
  tagline: {
    fontSize: FONT_SIZES.MEDIUM,
    fontStyle: 'italic',
    color: COLORS.GRAY_TEXT,
    marginBottom: DIMENSIONS.SPACING_SM,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DIMENSIONS.SPACING_SM,
  },
  rating: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.GRAY_TEXT,
    marginLeft: DIMENSIONS.SPACING_XS,
  },
  voteCount: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    marginLeft: DIMENSIONS.SPACING_XS,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DIMENSIONS.SPACING_MD,
  },
  releaseDate: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_TEXT,
  },
  separator: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_TEXT,
    marginHorizontal: DIMENSIONS.SPACING_SM,
  },
  runtime: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_TEXT,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DIMENSIONS.SPACING_SM,
  },
  genreChip: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    paddingVertical: DIMENSIONS.SPACING_SM,
    borderRadius: DIMENSIONS.SPACING_LG,
    marginRight: DIMENSIONS.SPACING_SM,
    marginBottom: DIMENSIONS.SPACING_SM,
  },
  genreText: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_TEXT,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingHorizontal: DIMENSIONS.SPACING_XL,
    paddingVertical: DIMENSIONS.SPACING_MD,
    borderRadius: DIMENSIONS.BORDER_RADIUS_BUTTON,
    alignSelf: 'flex-start',
    marginBottom: DIMENSIONS.SPACING_XL,
  },
  favoriteButtonText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    marginLeft: DIMENSIONS.SPACING_SM,
  },
  section: {
    marginBottom: DIMENSIONS.SPACING_XL,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.GRAY_TEXT,
    marginBottom: DIMENSIONS.SPACING_SM,
  },
  overview: {
    fontSize: FONT_SIZES.MEDIUM,
    lineHeight: 20,
    color: COLORS.GRAY_TEXT,
  },
  detailText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
  },
})

export default memo(MovieDetailsContent)
