import { useEffect, useState } from 'react'
import Movie from '../../models/Movie'
import TmdbClient from '../../api/TmdbClient'

type FeaturedCarouselProps = {
    movies: Movie[]
}

const tmdbClient = new TmdbClient()

const FeaturedCarousel = ({ movies }: FeaturedCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0)
    const [screenshots, setScreenshots] = useState<string[]>([])
    const [screenshotsMovieId, setScreenshotsMovieId] = useState<number | null>(null)
    const [isCarouselPaused, setIsCarouselPaused] = useState(false)

    const currentMovie = movies[currentIndex]

    useEffect(() => {
        if (currentIndex >= movies.length) {
            setCurrentIndex(0)
        }
    }, [currentIndex, movies.length])

    useEffect(() => {
        if (movies.length < 2) return

        const timer = window.setInterval(() => {
            setCurrentIndex((previousIndex) => {
                return (previousIndex + 1) % movies.length
            })
            setActiveScreenshotIndex(0)
        }, 6000)

        return () => window.clearInterval(timer)
    }, [movies.length])

    useEffect(() => {
        if (!currentMovie) return

        let isActive = true

        setScreenshots([])
        setScreenshotsMovieId(null)
        setActiveScreenshotIndex(0)

        tmdbClient
            .getMovieBackdrops(currentMovie.id)
            .then((movieScreenshots) => {
                if (isActive) {
                    setScreenshots(movieScreenshots)
                    setScreenshotsMovieId(currentMovie.id)
                }
            })
            .catch(() => {
                if (isActive) {
                    setScreenshots([])
                    setScreenshotsMovieId(currentMovie.id)
                }
            })

        return () => {
            isActive = false
        }
    }, [currentMovie?.id])

    if (!currentMovie) return null;
    const currentMovieScreenshots =
        screenshotsMovieId === currentMovie.id ? screenshots : []

    const mainImageUrl =
        currentMovieScreenshots[activeScreenshotIndex] ??
        currentMovie.backdropUrl ??
        currentMovie.posterUrl

    const handlePreviousMovie = () => {
        setCurrentIndex(
            (previousIndex) => (previousIndex - 1 + movies.length) % movies.length,
        )
        setActiveScreenshotIndex(0)
    }

    const handleNextMovie = () => {
        setCurrentIndex((previousIndex) => (previousIndex + 1) % movies.length)
        setActiveScreenshotIndex(0)
    }

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Featured and recommended movies"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocusCapture={() => setIsCarouselPaused(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setIsCarouselPaused(false)
                }
            }}
            className="relative mx-auto my-6 w-full max-w-6xl"
        >
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    Featured &amp; Recommended
                </h2>

                <p className="text-xs text-slate-400">
                    {currentIndex + 1} / {movies.length}
                </p>
            </div>

            <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded bg-[#0a141d] shadow-[0_0_20px_rgba(0,0,0,0.8)] lg:flex-row">
                <div className="relative min-h-[260px] flex-1 bg-black lg:min-h-0 lg:w-[65%]">
                    {mainImageUrl ? (
                        <img
                            key={`${currentMovie.id}-${activeScreenshotIndex}`}
                            src={mainImageUrl}
                            alt={`${currentMovie.title} preview`}
                            className="h-full w-full object-cover animate-fade-in"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-slate-800 text-slate-500">
                            No preview available
                        </div>
                    )}
                </div>

                <div className="flex w-full flex-col justify-between bg-gradient-to-b from-[#0f1922] to-[#070b10] p-5 lg:w-[35%]">
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            {currentMovie.title}
                        </h3>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {screenshots.length > 0 ? (
                                screenshots.slice(0, 4).map((screenshot, index) => (
                                    <button
                                        key={screenshot}
                                        type="button"
                                        onClick={() => setActiveScreenshotIndex(index)}
                                        aria-label={`Show preview ${index + 1} for ${currentMovie.title}`}
                                        aria-pressed={activeScreenshotIndex === index}
                                        className={`overflow-hidden rounded border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${activeScreenshotIndex === index
                                            ? 'border-sky-400'
                                            : 'border-slate-700 hover:border-sky-400'
                                            }`}
                                    >
                                        <img
                                            src={screenshot}
                                            alt=""
                                            className="h-24 w-full object-cover"
                                        />
                                    </button>
                                ))
                            ) : (
                                <p className="col-span-2 text-xs text-slate-500">
                                    Extra previews are unavailable for this movie.
                                </p>
                            )}
                        </div>

                        <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-[#c6d4df]">
                            {currentMovie.overview || 'Now available to explore.'}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1">
                            <span className="rounded bg-[#384959]/60 px-2 py-0.5 text-[11px] text-[#66c0f4]">
                                Released: {currentMovie.releaseYear}
                            </span>

                            <span className="rounded bg-[#384959]/60 px-2 py-0.5 text-[11px] text-slate-300">
                                {currentMovie.genres[0] || 'Featured'}
                            </span>
                        </div>

                        <div className="mt-4 border-t border-slate-800 pt-3">
                            {currentMovie.vote_average > 0 && (
                                <p className="text-xs text-[#66c0f4]">
                                    TMDB score: {currentMovie.vote_average.toFixed(1)} / 10
                                </p>
                            )}

                            <a
                                href={`#movie-${currentMovie.id}`}
                                className="mt-3 inline-block rounded bg-[#2a475e] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#3d6c9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                            >
                                View details
                            </a>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handlePreviousMovie}
                    aria-label="Previous featured movie"
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white/70 transition hover:bg-black/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                >
                    ❮
                </button>

                <button
                    type="button"
                    onClick={handleNextMovie}
                    aria-label="Next featured movie"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white/70 transition hover:bg-black/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                >
                    ❯
                </button>
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
                {movies.map((movie, index) => (
                    <button
                        key={movie.id}
                        type="button"
                        onClick={() => {
                            setCurrentIndex(index)
                            setActiveScreenshotIndex(0)
                        }}
                        aria-label={`Go to slide ${index + 1}: ${movie.title}`}
                        aria-current={index === currentIndex}
                        className={`h-2 rounded transition-all ${index === currentIndex
                            ? 'w-8 bg-[#66c0f4]'
                            : 'w-3 bg-slate-700 hover:bg-slate-500'
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default FeaturedCarousel