import { useEffect, useState } from 'react'
import useAuth from './useAuth'

const getStorageKey = (userId: string | undefined) => {
    return `movie-discovery:watchlist:${userId ?? 'guest'}`
}

const readMovieIds = (storageKey: string): number[] => {
    try {
        const savedValue = localStorage.getItem(storageKey)

        if (!savedValue) {
            return []
        }

        const movieIds = JSON.parse(savedValue)

        return Array.isArray(movieIds)
            ? movieIds.filter((id): id is number => typeof id === 'number')
            : []
    } catch {
        return []
    }
}

const useWatchlist = () => {
    const { user } = useAuth()
    const storageKey = getStorageKey(user?.uid)

    const [movieIds, setMovieIds] = useState<number[]>(() =>
        readMovieIds(storageKey),
    )

    useEffect(() => {
        setMovieIds(readMovieIds(storageKey))
    }, [storageKey])

    const saveMovieIds = (nextMovieIds: number[]) => {
        setMovieIds(nextMovieIds)
        localStorage.setItem(storageKey, JSON.stringify(nextMovieIds))
    }

    const isSaved = (movieId: number) => movieIds.includes(movieId)

    const toggleMovie = (movieId: number) => {
        const nextMovieIds = isSaved(movieId)
            ? movieIds.filter((id) => id !== movieId)
            : [...movieIds, movieId]

        saveMovieIds(nextMovieIds)
    }

    return {
        user,
        movieIds,
        isSaved,
        toggleMovie,
    }
}

export default useWatchlist