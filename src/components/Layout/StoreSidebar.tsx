import React from 'react'

const StoreSidebar: React.FC = () => {
    const genres = [
        { label: 'Action', id: 28 },
        { label: 'Adventure', id: 12 },
        { label: 'Sci-Fi', id: 878 },
        { label: 'Animation', id: 16 },
        { label: 'Comedy', id: 35 },
        { label: 'Drama', id: 18 },
        { label: 'Horror', id: 27 },
    ]
    const collectionLinks = [
        { label: 'Popular', href: '#browse?tab=popular' },
        { label: 'Now Playing', href: '#browse?tab=nowPlaying' },
        { label: 'Upcoming', href: '#browse?tab=upcoming' },
        { label: 'Top Rated', href: '#browse?tab=topRated' },
    ]
    return (
        <aside aria-label="Store Quick Links" className="hidden w-52 shrink-0 lg:block">
            <div className="mb-6 rounded bg-[#101822] p-3 shadow-md border border-[#2a3f5a]/30">
                <a
                    href="#gift-cards"
                    className="block text-xs font-bold text-[#66c0f4] transition hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                >
                    MOVIE PICKS
                </a>
                <p className="mt-1 text-[11px] text-slate-400">Find your next watch</p>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    DISCOVER
                </h3>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    EXPLORE MOVIES
                </h3>
                <ul className="space-y-1 text-xs">
                    {collectionLinks.map((item) => (
                        <li key={item.label}>
                            <a
                                href={`${item.href.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block rounded px-2 py-1 text-[#66c0f4] transition hover:bg-[#20364d] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    BROWSE BY GENRE
                </h3>
                <ul className="space-y-1 text-xs">
                    {genres.map((genre) => (
                        <a
                            key={genre.id}
                            href={`#browse?genre=${genre.id}`}
                            className="block rounded px-4 py-2 text-slate-200 transition-colors hover:bg-sky-500/10 hover:text-sky-400 focus-visible:bg-sky-500/10 focus-visible:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                            {genre.label}
                        </a>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default StoreSidebar