import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { API_CONFIG } from '../config/api'
import { IMovie } from '../types'

interface MovieCardProps {
  movie: IMovie
  onPress: (movie: IMovie) => void
  onToggleFavorite: (movie: IMovie) => void
}

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  onToggleFavorite,
}) => {
  const posterUrl = movie.poster_path
    ? `${API_CONFIG.imageBaseUrl}${movie.poster_path}`
    : null

  const handlePress = () => onPress(movie)
  const handleToggleFavorite = () => onToggleFavorite(movie)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.placeholderPoster]}>
            <Ionicons name="film-outline" size={40} color="#ccc" />
          </View>
        )}

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
          activeOpacity={0.7}
        >
          <Ionicons
            name={movie.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={movie.isFavorite ? '#FF3B30' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
        </View>

        <Text style={styles.releaseDate}>
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderPoster: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#999',
  },
})

export default MovieCard
