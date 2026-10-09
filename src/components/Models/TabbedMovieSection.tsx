import Movie from '../../models/Movie'
import MovieCard from './MovieCard'

export type BrowseTab = 'nowPlaying' | 'popular' | 'upcoming' | 'topRated'

type TabbedMovieSectionProps = {
    nowPlaying: Movie[]
    popular: Movie[]
    upcoming: Movie[]
    topRated: Movie[]
    activeTab: BrowseTab
    onTabChange: (tab: BrowseTab) => void
}

const TabbedMovieSection = ({
    nowPlaying,
    popular,
    upcoming,
    topRated,
    activeTab,
    onTabChange,
}: TabbedMovieSectionProps) => {
    const tabs = [
        { id: 'nowPlaying' as const, label: 'Now Playing', data: nowPlaying },
        { id: 'popular' as const, label: 'Popular', data: popular },
        { id: 'upcoming' as const, label: 'Upcoming', data: upcoming },
        { id: 'topRated' as const, label: 'Top Rated', data: topRated },
    ]

    const currentList = tabs.find((tab) => tab.id === activeTab)?.data ?? []

    return (
        <section aria-labelledby="tabbed-section-heading" className="my-10 w-full">
            <h2 id="tabbed-section-heading" className="sr-only">
                Browse movie collections
            </h2>

            <div role="tablist" className="flex border-b border-[#2a475e]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        id={`tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === tab.id
                                ? 'border-b-2 border-[#1a9fff] bg-[#1a2c3d] text-white'
                                : 'bg-[#0f1922] text-[#66c0f4] hover:bg-[#162738] hover:text-white'
                            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            >
                {currentList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

export default TabbedMovieSection