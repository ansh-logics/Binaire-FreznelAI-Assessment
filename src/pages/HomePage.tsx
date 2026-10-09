import FeaturedCarousel from '../components/Models/FeaturedCarousel'
import MoviePromo from '../components/Models/MoviePromo'
import MovieCard from '../components/Models/MovieCard'
import StoreSidebar from '../components/Layout/StoreSidebar'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'

const HomePage = () => {
    const { movies, isLoading, error } = useNowPlayingMovies()

    const homeMovies = movies.slice(0, 12)

    return (
        <div id="store-home" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {isLoading && movies.length === 0 && (
                <div
                    role="status"
                    className="my-8 flex justify-center text-sm text-[#66c0f4]"
                >
                    Loading movies...
                </div>
            )}

            {error && (
                <div
                    role="alert"
                    className="my-8 rounded bg-red-950/60 p-4 text-center text-sm text-red-300"
                >
                    Failed to load movie content: {error}
                </div>
            )}

            {movies.length > 0 && (
                <>
                    <MoviePromo movie={movies[0]} />
                    <FeaturedCarousel movies={movies.slice(0, 10)} />
                </>
            )}

            <div className="mt-8 flex gap-8">
                <StoreSidebar />

                <main className="flex-1">
                    <section
                        id="now-playing"
                        aria-labelledby="now-playing-heading"
                        className="movie-target-highlight"
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
                            <h2
                                id="now-playing-heading"
                                className="text-sm font-bold uppercase tracking-wider text-white"
                            >
                                New Releases
                            </h2>

                            <a
                                href="#browse?tab=nowPlaying"
                                className="text-xs text-[#66c0f4] transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                Explore all ❯
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {homeMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {homeMovies.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <a
                                    href="#browse?tab=nowPlaying"
                                    className="rounded bg-[#2a475e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6c9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    Explore all new releases
                                </a>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

export default HomePage