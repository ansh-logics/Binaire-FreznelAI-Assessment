import React, { useState } from 'react'

type StoreToolbarProps = {
    onSearch?: (query: string) => void
}

const StoreToolbar: React.FC<StoreToolbarProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSearch) onSearch(searchValue)
    }

    return (
        <div className="w-full bg-gradient-to-r from-[#20364d] via-[#1d4263] to-[#172d42] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 sm:px-6">
                <nav aria-label="Store Submenu" className="overflow-x-auto py-1">
                    <ul className="flex items-center gap-1 text-xs font-medium text-[#dcdedf]">
                        {['Your Store', 'New & Noteworthy', 'Categories', 'Points Shop', 'News', 'Labs'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                    className="rounded px-2.5 py-1.5 transition-all hover:bg-[#316282] hover:text-white active:bg-[#183a53] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <form
                    onSubmit={handleSubmit}
                    role="search"
                    className="group flex h-8 items-center rounded-sm bg-[#316282]/80 px-2 shadow-inner transition-all duration-150 focus-within:bg-[#16202d] focus-within:ring-2 focus-within:ring-[#66c0f4]"
                >
                    <label htmlFor="steam-search" className="sr-only">
                        Search the store
                    </label>
                    <input
                        id="steam-search"
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="search"
                        className="w-36 bg-transparent text-xs text-white placeholder-slate-400 italic outline-none transition-[width] sm:w-48 group-focus-within:w-60 focus:not-italic"
                    />
                    <button
                        type="submit"
                        aria-label="Search"
                        className="ml-1 rounded p-1 text-[#66c0f4] transition hover:text-white active:scale-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#66c0f4]"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StoreToolbar