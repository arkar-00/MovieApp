import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types'
import { fetchMovieDetailsRequest } from '../store/actions/movieActions'

const useMovieDetails = (movieId: number) => {
  const dispatch = useDispatch()
  const movieDetails = useSelector(
    (state: RootState) => state.movies.movieDetails[movieId],
  )

  useEffect(() => {
    if (movieId && !movieDetails) {
      dispatch(fetchMovieDetailsRequest({ movieId }))
    }
  }, [dispatch, movieId, movieDetails])

  return useMemo(() => movieDetails, [movieDetails])
}

export default useMovieDetails
