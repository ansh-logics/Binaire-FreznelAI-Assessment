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
    const [screenshotsMovieId, setScreenshotsMovieId] = useState<number | null>(
        null,
    )
    const [isCarouselPaused, setIsCarouselPaused] = useState(false)

    const currentMovie = movies[currentIndex]

    useEffect(() => {
        if (currentIndex >= movies.length) {
            setCurrentIndex(0)
        }
    }, [currentIndex, movies.length])

    useEffect(() => {
        if (movies.length < 2 || isCarouselPaused) {
            return
        }

        const timer = window.setInterval(() => {
            setCurrentIndex((previousIndex) => {
                return (previousIndex + 1) % movies.length
            })
            setActiveScreenshotIndex(0)
        }, 6000)

        return () => window.clearInterval(timer)
    }, [movies.length, isCarouselPaused])

    useEffect(() => {
        if (!currentMovie) {
            return
        }

        let isActive = true

        setActiveScreenshotIndex(0)
        setScreenshots([])
        setScreenshotsMovieId(null)

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

    if (!currentMovie) {
        return null
    }

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

            <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded bg-[#0a141d] shadow-[0_0_20px_rgba(0,0,0,0.8)] lg:h-[520px] lg:min-h-0 lg:flex-row">
                <div className="relative h-72 bg-black sm:h-96 lg:h-full lg:w-[65%] lg:flex-none">
                    {mainImageUrl ? (
                        <img
                            key={`${currentMovie.id}-${activeScreenshotIndex}`}
                            src={mainImageUrl}
                            alt={`${currentMovie.title} preview`}
                            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-slate-800 text-slate-500">
                            No preview available
                        </div>
                    )}
                </div>

                <div className="w-full bg-gradient-to-b from-[#0f1922] to-[#070b10] p-5 lg:h-full lg:w-[35%] lg:flex-none">
                    <div className="flex h-full flex-col">
                        <div>
                            <h3 className="min-h-14 line-clamp-2 text-xl font-bold text-white">
                                {currentMovie.title}
                            </h3>

                            <div className="mt-4 grid h-[196px] grid-cols-2 grid-rows-2 gap-3">
                                {[0, 1, 2, 3].map((index) => {
                                    const screenshot =
                                        currentMovieScreenshots[index]

                                    return (
                                        <button
                                            key={screenshot ?? index}
                                            type="button"
                                            disabled={!screenshot}
                                            onClick={() =>
                                                setActiveScreenshotIndex(index)
                                            }
                                            aria-label={
                                                screenshot
                                                    ? `Show preview ${index + 1} for ${currentMovie.title}`
                                                    : undefined
                                            }
                                            aria-pressed={
                                                Boolean(screenshot) &&
                                                activeScreenshotIndex === index
                                            }
                                            className={`overflow-hidden rounded border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${screenshot
                                                    ? activeScreenshotIndex === index
                                                        ? 'border-sky-400'
                                                        : 'border-slate-700 hover:border-sky-400'
                                                    : 'cursor-default border-slate-800 bg-slate-800'
                                                }`}
                                        >
                                            {screenshot && (
                                                <img
                                                    src={screenshot}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>

                            <p className="mt-4 h-[60px] overflow-hidden text-xs leading-5 text-[#c6d4df]">
                                {currentMovie.overview ||
                                    'Now available to explore.'}
                            </p>

                            <div className="mt-3 flex h-6 flex-wrap gap-1 overflow-hidden">
                                <span className="rounded bg-[#384959]/60 px-2 py-0.5 text-[11px] text-[#66c0f4]">
                                    Released: {currentMovie.releaseYear}
                                </span>

                                <span className="rounded bg-[#384959]/60 px-2 py-0.5 text-[11px] text-slate-300">
                                    {currentMovie.genres[0] || 'Featured'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-slate-800 pt-3">
                            {currentMovie.vote_average > 0 && (
                                <p className="text-xs text-[#66c0f4]">
                                    TMDB score:{' '}
                                    {currentMovie.vote_average.toFixed(1)} / 10
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