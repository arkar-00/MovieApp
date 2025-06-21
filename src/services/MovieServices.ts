import { API_ENDPOINTS } from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { Observable, from, throwError } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import apiClient from '../utils/apiClient'
import { MovieListResponse } from '../types/api.response'
import { IMovieDetails } from '../types'
import { CACHE_DURATION, STORAGE_KEYS } from '../constants/base'

export const MovieServices = {
  isOnline: async (): Promise<boolean> => {
    const net = await NetInfo.fetch()
    return net.isConnected ?? false
  },

  getCachedData: async <T>(key: string): Promise<T | null> => {
    try {
      const cached = await AsyncStorage.getItem(key)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data
        }
      }
    } catch (e) {
      console.error('getCachedData error:', e)
    }
    return null
  },

  setCachedData: async <T>(key: string, data: T): Promise<void> => {
    try {
      const value = {
        data,
        timestamp: Date.now(),
      }
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('setCachedData error:', e)
    }
  },

  getOfflineData: async <T>(key: string): Promise<T | null> => {
    try {
      const cached = await AsyncStorage.getItem(key)
      return cached ? JSON.parse(cached).data : null
    } catch (e) {
      console.error('getOfflineData error:', e)
      return null
    }
  },

  getUpcomingMovies: (page = 1): Observable<MovieListResponse> => {
    const key = `${STORAGE_KEYS.UPCOMING_MOVIES}_${page}`
    return fetchWithCache<MovieListResponse>(API_ENDPOINTS.upcoming, key, {
      page,
    })
  },

  getPopularMovies: (page = 1): Observable<MovieListResponse> => {
    const key = `${STORAGE_KEYS.POPULAR_MOVIES}_${page}`
    return fetchWithCache<MovieListResponse>(API_ENDPOINTS.popular, key, {
      page,
    })
  },

  getMovieDetails: (id: number): Observable<IMovieDetails> => {
    const key = `${STORAGE_KEYS.MOVIE_DETAILS}${id}`
    return fetchWithCache<IMovieDetails>(API_ENDPOINTS.movieDetails(id), key)
  },
}

const fetchWithCache = <T>(
  url: string,
  cacheKey: string,
  params: Record<string, any> = {},
): Observable<T> => {
  return from(MovieServices.isOnline()).pipe(
    mergeMap(async (online) => {
      const cached = await MovieServices.getCachedData<T>(cacheKey)
      if (!online) {
        return (
          cached ??
          (await MovieServices.getOfflineData<T>(cacheKey)) ??
          (() => {
            throw new Error('Offline and no cached data available')
          })()
        )
      }

      try {
        const { data } = await apiClient.get<T>(url, { params })
        await MovieServices.setCachedData(cacheKey, data)
        return data
      } catch (error) {
        return (
          cached ??
          (await MovieServices.getOfflineData<T>(cacheKey)) ??
          (() => {
            throw error
          })()
        )
      }
    }),
    catchError((err) => throwError(() => err)),
  )
}
