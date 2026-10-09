import React, { useState } from 'react'
import { TMDB_GENRES } from '../../utils/genreLabels'

type StoreToolbarProps = {
    onSearch?: (query: string) => void
}

const StoreToolbar: React.FC<StoreToolbarProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('')
    const [isGenresOpen, setIsGenresOpen] = useState(false)

    const navigationItems = [
        { label: 'FOR YOU', href: '#home' },
        { label: 'NEW RELEASES', href: '#browse?tab=nowPlaying' },
        { label: 'TOP RATED', href: '#browse?tab=topRated' },
        { label: 'UPCOMING', href: '#browse?tab=upcoming' },
        { label: 'MY LIST', href: '#my-list' },
    ]

    const genres = Object.entries(TMDB_GENRES)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSearch?.(searchValue)
    }

    return (
        <div className="relative z-40 w-full bg-gradient-to-r from-[#20364d] via-[#1d4263] to-[#172d42] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="mx-auto flex max-w-6xl flex-nowrap items-center gap-3 px-4 py-1.5 sm:px-6">
                <nav
                    aria-label="Movie navigation"
                    className="min-w-0 flex-1 overflow-x-auto py-1 lg:overflow-visible"
                >
                    <ul className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-[#dcdedf]">
                        {navigationItems.slice(0, 2).map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="rounded px-2.5 py-1.5 transition hover:bg-[#316282] hover:text-white active:bg-[#183a53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}

                        <li
                            className="relative"
                            onBlur={(event) => {
                                if (
                                    !event.currentTarget.contains(
                                        event.relatedTarget as Node,
                                    )
                                ) {
                                    setIsGenresOpen(false)
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    setIsGenresOpen(false)
                                    event.currentTarget
                                        .querySelector('button')
                                        ?.focus()
                                }
                            }}
                        >
                            <button
                                type="button"
                                aria-expanded={isGenresOpen}
                                aria-haspopup="menu"
                                aria-controls="genre-menu"
                                onClick={() => setIsGenresOpen((isOpen) => !isOpen)}
                                className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 transition ... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4] ${isGenresOpen
                                    ? 'bg-[#316282] text-white'
                                    : 'hover:bg-[#316282] hover:text-white'
                                    }`}
                            >
                                <span>GENRES</span>

                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`h-3.5 w-3.5 transition-transform ${isGenresOpen ? 'rotate-180' : ''
                                        }`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {isGenresOpen && (
                                <ul
                                    id="genre-menu"
                                    role="menu"
                                    aria-label="Browse movies by genre"
                                    className="absolute left-0 top-full mt-2 grid w-64 grid-cols-2 gap-1 rounded border border-[#40617c] bg-[#172d42] p-2 shadow-2xl"
                                >
                                    {genres.map(([genreId, genreName]) => (
                                        <li key={genreId} role="none">
                                            <a
                                                href={`#browse?genre=${genreId}`}
                                                role="menuitem"
                                                onClick={() => setIsGenresOpen(false)}
                                                className="block rounded px-3 py-2 text-xs text-slate-200 transition hover:bg-[#316282] hover:text-white focus-visible:bg-[#316282] focus-visible:text-white focus-visible:outline-none"
                                            >
                                                {genreName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {navigationItems.slice(2).map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="rounded px-2.5 py-1.5 transition hover:bg-[#316282] hover:text-white active:bg-[#183a53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <form
                    onSubmit={handleSubmit}
                    role="search"
                    className="group flex h-8 shrink-0 items-center rounded-sm bg-[#316282]/80 px-2 shadow-inner transition focus-within:bg-[#16202d] focus-within:ring-2 focus-within:ring-[#66c0f4]"
                >
                    <label htmlFor="movie-search" className="sr-only">
                        Search movies
                    </label>

                    <input
                        id="movie-search"
                        type="search"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search movies"
                        className="w-36 bg-transparent text-xs text-white placeholder-slate-400 outline-none transition-[width] sm:w-48 group-focus-within:w-60"
                    />

                    <button
                        type="submit"
                        aria-label="Search movies"
                        className="ml-1 rounded p-1 text-[#66c0f4] transition hover:text-white active:scale-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StoreToolbar