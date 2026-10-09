import { useEffect, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import Movie from '../models/Movie'

const useMovieSearch = (query: string) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const normalizedQuery = query.trim()

        if (!normalizedQuery) {
            setMovies([])
            setError(null)
            setIsLoading(false)
            return
        }

        let cancelled = false
        const client = new TmdbClient()

        const searchMovies = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await client.getSearchMovies(normalizedQuery)

                if (!cancelled) {
                    setMovies(result.movies)
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : 'Unable to search movies',
                    )
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void searchMovies()

        return () => {
            cancelled = true
        }
    }, [query])

    return { movies, isLoading, error }
}

export default useMovieSearch