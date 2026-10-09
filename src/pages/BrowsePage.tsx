import MovieCard from '../components/Models/MovieCard'
import TabbedMovieSection, {
    type BrowseTab,
} from '../components/Models/TabbedMovieSection'
import useMovieCollections from '../hooks/useMovieCollections'
import useMovieSearch from '../hooks/useMovieSearch'
import { getGenreName } from '../utils/genreLabels'

const BrowsePage = () => {
    const searchParams = new URLSearchParams(
        window.location.hash.split('?')[1] ?? '',
    )

    const query = searchParams.get('q')?.trim() ?? ''
    const requestedTab = searchParams.get('tab')

    const activeTab: BrowseTab =
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
        nowPlaying,
        popular,
        upcoming,
        topRated,
        isLoading: collectionsLoading,
        error: collectionsError,
    } = useMovieCollections()

    const {
        movies: searchResults,
        isLoading: searchLoading,
        error: searchError,
    } = useMovieSearch(query)

    const filterByGenre = (movies: typeof nowPlaying) => {
        if (!genreId) {
            return movies
        }

        return movies.filter((movie) => movie.genre_ids.includes(genreId))
    }

    if (query) {
        if (searchLoading) {
            return (
                <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <p role="status" className="text-[#66c0f4]">
                        Searching for “{query}”…
                    </p>
                </main>
            )
        }

        if (searchError) {
            return (
                <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <p role="alert" className="text-red-300">
                        Search failed: {searchError}
                    </p>
                </main>
            )
        }

        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <h1 className="text-2xl font-bold text-white">
                    Search results for “{query}”
                </h1>

                {searchResults.length === 0 ? (
                    <p className="mt-6 text-slate-300">No movies found.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {searchResults.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </main>
        )
    }

    if (collectionsLoading) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <p role="status" className="text-[#66c0f4]">
                    Loading movie collections…
                </p>
            </main>
        )
    }

    if (collectionsError) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <p role="alert" className="text-red-300">
                    Failed to load movie collections: {collectionsError}
                </p>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h1 className="text-2xl font-bold text-white">
                {genreId ? `${getGenreName(genreId)} Movies` : 'New & Noteworthy'}
            </h1>

            <TabbedMovieSection
                nowPlaying={filterByGenre(nowPlaying)}
                popular={filterByGenre(popular)}
                upcoming={filterByGenre(upcoming)}
                topRated={filterByGenre(topRated)}
                activeTab={activeTab}
                onTabChange={(tab) => {
                    window.location.hash = `#browse?tab=${tab}`
                }}
            />
        </main>
    )
}

export default BrowsePage