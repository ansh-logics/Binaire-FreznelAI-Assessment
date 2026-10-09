import { useEffect, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import Movie from '../models/Movie'

type MovieCollections = {
    nowPlaying: Movie[]
    popular: Movie[]
    upcoming: Movie[]
    topRated: Movie[]
}

const emptyCollections: MovieCollections = {
    nowPlaying: [],
    popular: [],
    upcoming: [],
    topRated: [],
}

const useMovieCollections = () => {
    const [collections, setCollections] =
        useState<MovieCollections>(emptyCollections)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        const client = new TmdbClient()

        const loadCollections = async () => {
            try {
                const [nowPlaying, popular, upcoming, topRated] = await Promise.all([
                    client.getNowPlayingMovies(),
                    client.getPopularMovies(),
                    client.getUpcomingMovies(),
                    client.getTopRatedMovies(),
                ])

                if (!cancelled) {
                    setCollections({
                        nowPlaying: nowPlaying.movies,
                        popular: popular.movies,
                        upcoming: upcoming.movies,
                        topRated: topRated.movies,
                    })
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : 'Unable to load movie collections',
                    )
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void loadCollections()

        return () => {
            cancelled = true
        }
    }, [])

    return {
        ...collections,
        isLoading,
        error,
    }
}

export default useMovieCollections