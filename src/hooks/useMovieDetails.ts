import { useEffect, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import Movie from '../models/Movie'

const useMovieDetails = (movieId: number | null) => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!movieId) {
            setMovie(null)
            return
        }

        let cancelled = false
        const client = new TmdbClient()

        const loadMovie = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await client.getMovieDetails(movieId)

                if (!cancelled) {
                    setMovie(result)
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : 'Unable to load movie details',
                    )
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void loadMovie()

        return () => {
            cancelled = true
        }
    }, [movieId])

    return { movie, isLoading, error }
}

export default useMovieDetails