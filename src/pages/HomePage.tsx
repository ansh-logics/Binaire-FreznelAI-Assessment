import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import FeaturedCarousel from "../components/Models/FeaturedCarousel"
import StoreSidebar from "../components/Layout/StoreSidebar"
import MovieCard from "../components/Models/MovieCard"
import { useRef } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import MoviePromo from '../components/Models/MoviePromo'

const HomePage = () => {
    const { movies, isLoading, error, hasMore, loadMore } = useNowPlayingMovies()
    const loadMoreTarget = useRef<HTMLDivElement>(null)

    useInfiniteScroll(loadMoreTarget, hasMore && !isLoading, loadMore)
    return (
        <div id="store-home" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {isLoading && (
                <div role="status" className="my-8 flex justify-center text-sm text-[#66c0f4]">
                    Loading Movies...
                </div>
            )}

            {error && (
                <div role="alert" className="my-8 rounded bg-red-950/60 p-4 text-center text-sm text-red-300">
                    Failed to load store content: {error}
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
                    <section aria-labelledby="now-playing-heading" className="steam-target-highlight" id="now-playing">
                        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
                            <h2 id="now-playing-heading" className="text-sm font-bold uppercase tracking-wider text-white">
                                Now Playing
                            </h2>
                            <a
                                href="#see-more"
                                className="text-xs text-[#66c0f4] transition hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                See more ❯
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <div ref={loadMoreTarget} aria-hidden="true" />
                        {hasMore && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={isLoading}
                                    className="rounded bg-[#2a475e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6c9e] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? 'Loading movies…' : 'Load more'}
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

export default HomePage