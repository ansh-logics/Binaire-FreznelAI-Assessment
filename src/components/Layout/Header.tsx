import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#171a21] text-[#b8b6b4] shadow-md">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-10">
                    <a
                        href="#home"
                        className="flex items-center gap-2 text-2xl font-black tracking-wider text-white transition-colors duration-150 hover:text-[#66c0f4] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#66c0f4] text-xs font-bold text-[#171a21] shadow-[0_0_12px_rgba(102,192,244,0.6)]">
                            M
                        </span>
                        <span>MOVIES</span>
                    </a>

                    <nav aria-label="Main Navigation" className="hidden md:block">
                        <ul className="flex items-center gap-5 text-sm font-semibold tracking-wide uppercase">
                            <li>
                                <a
                                    href="#home"
                                    className="text-[#1a9fff] border-b-2 border-[#1a9fff] pb-1 transition-all hover:text-white active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a9fff]"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#browse?tab=popular"
                                    className="pb-1 transition-all hover:text-white active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    Discover
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="pb-1 transition-all hover:text-white active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#support"
                                    className="pb-1 transition-all hover:text-white active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    <a
                        href="#auth?mode=signup"
                        className="inline-flex items-center gap-1.5 rounded-sm bg-[#5c7e10] px-3 py-1.5 font-medium text-white shadow-sm transition-all hover:bg-[#79a317] hover:shadow-[0_0_10px_rgba(121,163,23,0.4)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#79a317]"
                    >
                        Create Account
                    </a>
                    <a
                        href="#auth?mode=signin"
                        className="rounded px-2.5 py-1 text-[#b8b6b4] transition hover:text-white active:text-[#66c0f4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                    >
                        login
                    </a>
                    <span className="text-zinc-600">|</span>
                    <button
                        type="button"
                        className="rounded px-2 py-1 text-[#8f98a0] transition hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                    >
                        language ▼
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header