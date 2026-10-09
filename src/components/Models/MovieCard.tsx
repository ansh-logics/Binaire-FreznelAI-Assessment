import Movie from '../../models/Movie'

type MovieCardProps = {
    movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const imageUrl = movie.backdropUrl ?? movie.posterUrl

    return (
        <article className="group overflow-hidden rounded bg-[#16202d] shadow-md transition hover:-translate-y-1 hover:bg-[#1f2f42]">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`${movie.title} backdrop`}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
                <div aria-hidden="true" className="aspect-video bg-slate-800" />
            )}

            <div className="p-3">
                <h3 className="line-clamp-1 font-semibold text-white">
                    {movie.title}
                </h3>

                <time className="mt-1 block text-xs text-slate-400">
                    {movie.releaseYear}
                </time>

                <div className="mt-2 flex flex-wrap gap-1">
                    {movie.genres.map((genre) => (
                        <span
                            key={genre}
                            className="rounded bg-[#243548] px-1.5 py-0.5 text-[10px]"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {movie.vote_average > 0 && (
                    <p className="mt-3 text-xs text-[#66c0f4]">
                        TMDB score: {movie.vote_average.toFixed(1)} / 10
                    </p>
                )}
            </div>
        </article>
    )
}

export default MovieCard