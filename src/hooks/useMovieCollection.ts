import { useCallback, useEffect, useRef, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import Movie from '../models/Movie'
import { PaginationController } from '../models/paginationController'

export type MovieCollection =
    | 'nowPlaying'
    | 'popular'
    | 'upcoming'
    | 'topRated'

type MoviePage = {
    movies: Movie[]
    page: number
    totalPages: number
    totalResults: number
}

const getCollectionPage = (
    client: TmdbClient,
    collection: MovieCollection,
    page: number,
): Promise<MoviePage> => {
    switch (collection) {
        case 'popular':
            return client.getPopularMovies(page)
        case 'upcoming':
            return client.getUpcomingMovies(page)
        case 'topRated':
            return client.getTopRatedMovies(page)
        case 'nowPlaying':
        default:
            return client.getNowPlayingMovies(page)
    }
}

const useMovieCollection = (collection: MovieCollection) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const client = useRef(new TmdbClient()).current
    const pagination = useRef(new PaginationController()).current
    const activeCollection = useRef<MovieCollection>(collection)

    activeCollection.current = collection

    const loadMore = useCallback(async () => {
        if (!pagination.startLoading()) {
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const result = await getCollectionPage(
                client,
                collection,
                pagination.page,
            )

            if (activeCollection.current !== collection) {
                return
            }

            setMovies((currentMovies) => {
                const knownIds = new Set(currentMovies.map((movie) => movie.id))

                return [
                    ...currentMovies,
                    ...result.movies.filter((movie) => !knownIds.has(movie.id)),
                ]
            })

            pagination.finishLoading(result.totalPages)
            setHasMore(pagination.hasMore)
            pagination.nextPage()
        } catch (error) {
            if (activeCollection.current !== collection) {
                return
            }

            pagination.failLoading()
            setError(
                error instanceof Error
                    ? error.message
                    : 'Unable to load movies',
            )
        } finally {
            if (activeCollection.current === collection) {
                setIsLoading(false)
            }
        }
    }, [client, collection, pagination])

    useEffect(() => {
        pagination.reset()

        setMovies([])
        setError(null)
        setHasMore(true)

        void loadMore()
    }, [collection, loadMore, pagination])

    return {
        movies,
        isLoading,
        error,
        hasMore,
        loadMore,
    }
}

export default useMovieCollection