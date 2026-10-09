import React, { useState } from 'react'
import Movie from '../../models/Movie'
import MovieCard from './MovieCard'

type TabbedMovieSectionProps = {
    nowPlaying: Movie[]
    popular: Movie[]
    upcoming: Movie[]
    topRated: Movie[]
}

const TabbedMovieSection: React.FC<TabbedMovieSectionProps> = ({
    nowPlaying,
    popular,
    upcoming,
    topRated,
}) => {
    const [activeTab, setActiveTab] = useState<'trending' | 'topSellers' | 'upcoming' | 'specials'>('trending')

    const tabs = [
        { id: 'trending', label: 'New & Trending', data: nowPlaying },
        { id: 'topSellers', label: 'Top Sellers', data: popular },
        { id: 'upcoming', label: 'Popular Upcoming', data: upcoming },
        { id: 'specials', label: 'Specials', data: topRated },
    ] as const

    const currentList = tabs.find((t) => t.id === activeTab)?.data || []

    return (
        <section aria-labelledby="tabbed-section-heading" className="my-10 w-full">
            <div className="flex border-b border-[#2a475e] text-xs font-bold uppercase tracking-wider">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 transition-all ${activeTab === tab.id
                            ? 'border-b-2 border-[#1a9fff] bg-[#1a2c3d] text-white shadow-inner'
                            : 'bg-[#0f1922] text-[#66c0f4] hover:bg-[#162738] hover:text-white'
                            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {currentList.slice(0, 8).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

export default TabbedMovieSection