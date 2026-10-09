import React from 'react'

const StoreSidebar: React.FC = () => {
    return (
        <aside aria-label="Store Quick Links" className="hidden w-52 shrink-0 lg:block">
            <div className="mb-6 rounded bg-[#101822] p-3 shadow-md border border-[#2a3f5a]/30">
                <a
                    href="#gift-cards"
                    className="block text-xs font-bold text-[#66c0f4] transition hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                >
                    STEAM GIFT CARDS
                </a>
                <p className="mt-1 text-[11px] text-slate-400">Give the gift of entertainment</p>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recommended
                </h3>
                <ul className="space-y-1 text-xs">
                    {['By Friends', 'By Curators', 'Tags'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block rounded px-2 py-1 text-[#66c0f4] transition hover:bg-[#20364d] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Browse Categories
                </h3>
                <ul className="space-y-1 text-xs">
                    {['Top Sellers', 'New Releases', 'Upcoming', 'Specials'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block rounded px-2 py-1 text-[#66c0f4] transition hover:bg-[#20364d] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Browse by Genre
                </h3>
                <ul className="space-y-1 text-xs">
                    {['Action', 'Adventure', 'Sci-Fi', 'Animation', 'Comedy', 'Drama', 'Horror'].map((genre) => (
                        <li key={genre}>
                            <a
                                href={`#genre-${genre.toLowerCase()}`}
                                className="block rounded px-2 py-1 text-slate-300 transition hover:bg-[#20364d] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                            >
                                {genre}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default StoreSidebar