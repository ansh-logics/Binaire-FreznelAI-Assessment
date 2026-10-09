type InfoPageProps = {
    page: 'about' | 'support'
}

const InfoPage = ({ page }: InfoPageProps) => {
    const isAboutPage = page === 'about'

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                Movie Discovery
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white">
                {isAboutPage ? 'About Movie Discovery' : 'Support'}
            </h1>

            {isAboutPage ? (
                <div className="mt-6 space-y-4 leading-relaxed text-slate-300">
                    <p>
                        Movie Discovery is a TMDB-powered movie browsing experience
                        designed to help users explore new releases, popular movies,
                        upcoming titles, and highly rated films.
                    </p>

                    <p>
                        Users can search movies, filter by genre, save movies to their
                        personal list, and revisit previously loaded content while
                        offline.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-4 leading-relaxed text-slate-300">
                    <p>
                        Need help using Movie Discovery? Start by searching for a
                        movie, browsing a collection, or selecting a genre.
                    </p>

                    <p>
                        If content cannot load, check your internet connection. When
                        offline, the app can still show movie data saved from earlier
                        visits.
                    </p>
                </div>
            )}

            <a
                href="#home"
                className="mt-8 inline-block rounded bg-[#2a475e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6c9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
                Back to Home
            </a>
        </main>
    )
}

export default InfoPage