import useMovieDetails from '../hooks/useMovieDetails';
import useWatchlist from '../hooks/useWatchlist';

type MovieDetailsPageProps = {
    movieId: number
}

const MovieDetailsPage = ({ movieId }: MovieDetailsPageProps) => {
    const { user, isSaved, toggleMovie } = useWatchlist()

    const handleWatchlistToggle = () => {
        if (!user) {
            window.location.hash = '#auth?mode=signin'
            return
        }

        toggleMovie(movieId)
    }
    const { movie, isLoading, error } = useMovieDetails(movieId)

    if (isLoading) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <p role="status" className="text-[#66c0f4]">
                    Loading movie details…
                </p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <p role="alert" className="text-red-300">
                    Failed to load movie details: {error}
                </p>
            </main>
        )
    }

    if (!movie) {
        return null
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <a
                href="#home"
                className="text-sm text-[#66c0f4] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
            >
                ← Back to Movies
            </a>

            <article className="mt-6 overflow-hidden rounded bg-[#16202d] shadow-xl">
                {movie.backdropUrl && (
                    <img
                        src={movie.backdropUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-64 w-full object-cover opacity-60 md:h-96"
                    />
                )}

                <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
                    {movie.posterUrl ? (
                        <img
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
                            className="w-full rounded object-cover shadow-lg"
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="aspect-[2/3] w-full rounded bg-slate-800"
                        />
                    )}

                    <div>
                        <h1 className="text-3xl font-bold text-white">{movie.title}</h1>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                            <time dateTime={movie.release_date}>{movie.releaseYear}</time>

                            {movie.vote_average > 0 && (
                                <span className="text-[#66c0f4]">
                                    TMDB score: {movie.vote_average.toFixed(1)} / 10
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleWatchlistToggle}
                            aria-pressed={isSaved(movie.id)}
                            className={`mt-5 rounded px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${isSaved(movie.id)
                                ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                                : 'bg-[#2a475e] text-white hover:bg-[#3d6c9e]'
                                }`}
                        >
                            {isSaved(movie.id) ? '✓ Saved to My List' : '+ Save to My List'}
                        </button>

                        <ul className="mt-4 flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <li
                                    key={genre}
                                    className="rounded bg-[#243548] px-2 py-1 text-xs text-slate-200"
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>

                        <h2 className="mt-8 text-lg font-semibold text-white">About</h2>
                        <p className="mt-2 leading-relaxed text-slate-300">
                            {movie.overview || 'No description is available for this movie.'}
                        </p>
                    </div>
                </div>
            </article>
        </main>
    )
}

export default MovieDetailsPage