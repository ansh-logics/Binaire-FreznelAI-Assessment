import { useRef } from 'react'
import BrowseSpotlight from '../components/Models/BrowseSpotlight'
import MovieCard from '../components/Models/MovieCard'
import TabbedMovieSection, {
    type BrowseTab,
} from '../components/Models/TabbedMovieSection'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useMovieCollection, {
    type MovieCollection,
} from '../hooks/useMovieCollection'
import useMovieSearch from '../hooks/useMovieSearch'
import { getGenreName } from '../utils/genreLabels'

const collectionLabels: Record<MovieCollection, string> = {
    nowPlaying: 'New Releases',
    popular: 'Popular Movies',
    upcoming: 'Upcoming Movies',
    topRated: 'Top Rated Movies',
}

const BrowsePage = () => {
    const searchParams = new URLSearchParams(
        window.location.hash.split('?')[1] ?? '',
    )

    const query = searchParams.get('q')?.trim() ?? ''
    const requestedTab = searchParams.get('tab')

    const activeTab: MovieCollection =
        requestedTab === 'popular' ||
            requestedTab === 'upcoming' ||
            requestedTab === 'topRated'
            ? requestedTab
            : 'nowPlaying'

    const requestedGenreId = Number(searchParams.get('genre'))
    const genreId = Number.isInteger(requestedGenreId)
        ? requestedGenreId
        : null

    const {
        movies,
        isLoading: collectionLoading,
        error: collectionError,
        hasMore,
        loadMore,
    } = useMovieCollection(activeTab)

    const {
        movies: searchResults,
        isLoading: searchLoading,
        error: searchError,
        hasMore: searchHasMore,
        loadMore: loadMoreSearchResults,
    } = useMovieSearch(query)

    const loadMoreTarget = useRef<HTMLDivElement>(null)
    const searchLoadMoreTarget = useRef<HTMLDivElement>(null)

    useInfiniteScroll(
        loadMoreTarget,
        !query && hasMore && !collectionLoading && !collectionError,
        loadMore,
    )

    useInfiniteScroll(
        searchLoadMoreTarget,
        Boolean(query) && searchHasMore && !searchLoading && !searchError,
        loadMoreSearchResults,
    )

    const displayedMovies = genreId
        ? movies.filter((movie) => movie.genre_ids.includes(genreId))
        : movies

    const pageTitle = genreId
        ? `${getGenreName(genreId)} Movies`
        : collectionLabels[activeTab]

    if (query) {
        if (searchLoading && searchResults.length === 0) {
            return (
                <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                    <p role="status" className="text-[#66c0f4]">
                        Searching for “{query}”…
                    </p>
                </main>
            )
        }

        if (searchError && searchResults.length === 0) {
            return (
                <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                    <p role="alert" className="text-red-300">
                        Search failed: {searchError}
                    </p>
                </main>
            )
        }

        return (
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <p className="text-sm text-slate-500">Discover / Search</p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Search results for “{query}”
                </h1>

                {searchResults.length === 0 && !searchLoading ? (
                    <p className="mt-8 text-slate-300">No movies found.</p>
                ) : (
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {searchResults.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                <div
                    ref={searchLoadMoreTarget}
                    className="flex min-h-16 items-center justify-center"
                >
                    {searchLoading && searchResults.length > 0 && (
                        <p role="status" className="text-sm text-slate-400">
                            Loading more results…
                        </p>
                    )}

                    {searchError && searchResults.length > 0 && (
                        <button
                            type="button"
                            onClick={loadMoreSearchResults}
                            className="text-sm font-semibold text-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                            Try loading more results
                        </button>
                    )}

                    {!searchHasMore && searchResults.length > 0 && (
                        <p className="text-sm text-slate-500">
                            You have reached the end of these results.
                        </p>
                    )}
                </div>
            </main>
        )
    }

    if (collectionLoading && movies.length === 0) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <p role="status" className="text-[#66c0f4]">
                    Loading movies…
                </p>
            </main>
        )
    }

    if (collectionError && movies.length === 0) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <p role="alert" className="text-red-300">
                    Failed to load movies: {collectionError}
                </p>
            </main>
        )
    }

    const handleTabChange = (tab: BrowseTab) => {
        const nextParams = new URLSearchParams()

        nextParams.set('tab', tab)

        if (genreId) {
            nextParams.set('genre', String(genreId))
        }

        window.location.hash = `#browse?${nextParams.toString()}`
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <p className="text-sm text-slate-500">
                Discover / {genreId ? 'Genres' : 'Collections'} / {pageTitle}
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white">{pageTitle}</h1>

            {!genreId && (
                <BrowseSpotlight movies={displayedMovies} title={pageTitle} />
            )}

            <section className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                        More to explore
                    </h2>

                    <span className="text-sm text-slate-400">
                        {genreId ? getGenreName(genreId) : pageTitle}
                    </span>
                </div>

                <TabbedMovieSection
                    nowPlaying={
                        activeTab === 'nowPlaying'
                            ? displayedMovies.slice(2)
                            : []
                    }
                    popular={
                        activeTab === 'popular' ? displayedMovies.slice(2) : []
                    }
                    upcoming={
                        activeTab === 'upcoming'
                            ? displayedMovies.slice(2)
                            : []
                    }
                    topRated={
                        activeTab === 'topRated'
                            ? displayedMovies.slice(2)
                            : []
                    }
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </section>

            {displayedMovies.length === 0 && !collectionLoading && (
                <p className="mt-8 text-slate-300">
                    No movies found in this category yet.
                </p>
            )}

            <div
                ref={loadMoreTarget}
                className="flex min-h-16 items-center justify-center"
            >
                {collectionLoading && movies.length > 0 && (
                    <p role="status" className="text-sm text-slate-400">
                        Loading more movies…
                    </p>
                )}

                {collectionError && movies.length > 0 && (
                    <button
                        type="button"
                        onClick={loadMore}
                        className="text-sm font-semibold text-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        Try loading more movies
                    </button>
                )}

                {!hasMore && movies.length > 0 && (
                    <p className="text-sm text-slate-500">
                        You have reached the end of this collection.
                    </p>
                )}
            </div>
        </main>
    )
}

export default BrowsePage