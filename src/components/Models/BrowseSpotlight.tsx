import Movie from '../../models/Movie'

type BrowseSpotlightProps = {
    movies: Movie[]
    title: string
}

const BrowseSpotlight = ({ movies, title }: BrowseSpotlightProps) => {
    const spotlightMovies = movies.slice(0, 2)

    if (spotlightMovies.length === 0) {
        return null
    }

    return (
        <section aria-labelledby="spotlight-heading" className="mt-8">
            <h2
                id="spotlight-heading"
                className="sr-only"
            >
                Featured {title}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
                {spotlightMovies.map((movie) => {
                    const imageUrl = movie.backdropUrl ?? movie.posterUrl

                    return (
                        <article
                            key={movie.id}
                            className="overflow-hidden rounded bg-[#16202d] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                        >
                            <a
                                href={`#movie-${movie.id}`}
                                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                            >
                                <div className="aspect-video overflow-hidden bg-slate-800">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={`${movie.title} backdrop`}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-slate-800" />
                                    )}
                                </div>

                                <div className="bg-[#2d6284] px-4 py-3">
                                    <p className="text-xs text-slate-200">
                                        Featured now
                                    </p>

                                    <h3 className="mt-1 line-clamp-1 font-semibold text-white">
                                        {movie.title}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-200">
                                        <span>{movie.releaseYear}</span>
                                        <span aria-hidden="true">•</span>
                                        <span>
                                            {movie.genres[0] || 'Featured'}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default BrowseSpotlight