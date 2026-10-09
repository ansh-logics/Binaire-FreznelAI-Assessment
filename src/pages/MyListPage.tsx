import { useEffect, useState } from 'react'
import TmdbClient from '../api/TmdbClient'
import MovieCard from '../components/Models/MovieCard'
import useWatchlist from '../hooks/useWatchlist'
import Movie from '../models/Movie'

const tmdbClient = new TmdbClient()

const MyListPage = () => {
    const { user, movieIds } = useWatchlist()
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user || movieIds.length === 0) {
            setMovies([])
            setIsLoading(false)
            return
        }

        let isActive = true

        setIsLoading(true)
        setError(null)

        Promise.all(
            movieIds.map((movieId) =>
                tmdbClient.getMovieDetails(movieId).catch(() => null),
            ),
        )
            .then((savedMovies) => {
                if (!isActive) return

                setMovies(
                    savedMovies.filter(
                        (movie): movie is Movie => movie !== null,
                    ),
                )
            })
            .catch(() => {
                if (isActive) {
                    setError('Your saved movies could not be loaded.')
                }
            })
            .finally(() => {
                if (isActive) {
                    setIsLoading(false)
                }
            })

        return () => {
            isActive = false
        }
    }, [user, movieIds])

    if (!user) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <h1 className="text-2xl font-bold text-white">My List</h1>
                <p className="mt-3 text-slate-300">
                    Sign in to save movies and access your personal list.
                </p>
                <a
                    href="#auth?mode=signin"
                    className="mt-5 inline-block rounded bg-[#2a475e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6c9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                    Sign in
                </a>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                        Your account
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-white">My List</h1>
                </div>

                <a
                    href="#browse"
                    className="text-sm font-semibold text-sky-400 transition hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                    Discover movies →
                </a>
            </div>

            {isLoading && (
                <p role="status" className="mt-8 text-slate-400">
                    Loading your saved movies…
                </p>
            )}

            {error && (
                <p role="alert" className="mt-8 text-red-300">
                    {error}
                </p>
            )}

            {!isLoading && !error && movies.length === 0 && (
                <section className="mt-8 rounded border border-slate-700 bg-[#0f1922] p-6">
                    <h2 className="text-lg font-semibold text-white">
                        Your list is empty
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Open a movie and choose “Save to My List” to add it here.
                    </p>
                </section>
            )}

            {movies.length > 0 && (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    )
}

export default MyListPage;