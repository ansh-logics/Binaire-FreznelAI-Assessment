import Movie from '../../models/Movie'

type MoviePromoProps = {
    movie: Movie
}

const MoviePromo = ({ movie }: MoviePromoProps) => {
    const imageUrl = movie.backdropUrl ?? movie.posterUrl

    if (!imageUrl) {
        return null
    }

    return (
        <section
            aria-labelledby="promo-title"
            className="relative left-1/2 mb-8 w-screen -translate-x-1/2 overflow-hidden bg-[#0a141d] shadow-[0_0_24px_rgba(0,0,0,0.55)]"
        >
            <div className="relative h-[340px] sm:h-[420px] lg:h-[500px]">
                <img
                    src={imageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-6 py-10">
                    <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                            Spotlight movie
                        </p>

                        <h1
                            id="promo-title"
                            className="mt-3 text-3xl font-black text-white sm:text-5xl"
                        >
                            {movie.title}
                        </h1>

                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                            {movie.overview ||
                                'Discover this featured movie now.'}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="rounded bg-slate-950/70 px-3 py-1 text-sm text-slate-200">
                                {movie.releaseYear}
                            </span>

                            {movie.vote_average > 0 && (
                                <span className="rounded bg-sky-500/20 px-3 py-1 text-sm text-sky-300">
                                    TMDB score:{' '}
                                    {movie.vote_average.toFixed(1)} / 10
                                </span>
                            )}
                        </div>

                        <a
                            href={`#movie-${movie.id}`}
                            className="mt-6 inline-block rounded bg-[#2a475e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3d6c9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                            View movie details
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoviePromo