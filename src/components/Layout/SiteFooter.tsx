const SiteFooter = () => {
    return (
        <footer className="mt-16 border-t border-slate-800 bg-[#0b1219]">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="flex flex-col justify-between gap-8 md:flex-row">
                    <div className="max-w-md">
                        <a
                            href="#home"
                            className="text-lg font-black tracking-wide text-white transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                            MOVIE DISCOVERY
                        </a>

                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            Explore new releases, popular movies, upcoming titles,
                            and personal watchlists powered by TMDB data.
                        </p>
                    </div>

                    <nav aria-label="Footer navigation">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                            Explore
                        </h2>

                        <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                            <li>
                                <a
                                    href="#home"
                                    className="text-slate-400 transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#browse?tab=popular"
                                    className="text-slate-400 transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    Discover
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#my-list"
                                    className="text-slate-400 transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    My List
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#about"
                                    className="text-slate-400 transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#support"
                                    className="text-slate-400 transition hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Movie Discovery. Built for
                        movie exploration.
                    </p>

                    <p>
                        This product uses the TMDB API but is not endorsed or
                        certified by TMDB.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter