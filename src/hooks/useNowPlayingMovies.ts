import { useCallback, useEffect, useRef, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import Movie from '../models/Movie'
import { PaginationController } from '../models/paginationController'

const useNowPlayingMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const client = useRef(new TmdbClient()).current
    const pagination = useRef(new PaginationController()).current

    const loadMore = useCallback(async () => {
        if (!pagination.startLoading()) {
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const result = await client.getNowPlayingMovies(pagination.page)

            setMovies((currentMovies) => {
                const knownIds = new Set(currentMovies.map((movie) => movie.id))
                const newMovies = result.movies.filter(
                    (movie) => !knownIds.has(movie.id),
                )

                return [...currentMovies, ...newMovies]
            })

            pagination.finishLoading(result.totalPages)
            setHasMore(pagination.hasMore)
            pagination.nextPage()
        } catch (error) {
            pagination.failLoading()
            setError(
                error instanceof Error ? error.message : 'Unable to load movies',
            )
        } finally {
            setIsLoading(false)
        }
    }, [client, pagination])

    useEffect(() => {
        void loadMore()
    }, [loadMore])

    return {
        movies,
        isLoading,
        error,
        hasMore,
        loadMore,
    }
}

export default useNowPlayingMovies