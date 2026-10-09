import { useEffect, useState } from 'react'
import Movie from '../../models/Movie'

type FeaturedCarouselProps = {
    movies: Movie[]
}

const FeaturedCarousel = ({ movies }: FeaturedCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0)

    useEffect(() => {
        if (!movies || movies.length < 2) return

        const timer = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length)
            setActiveScreenshotIndex(0)
        }, 6000)

        return () => window.clearInterval(timer)
    }, [movies?.length, currentIndex])

    if (!movies || movies.length === 0) return null

    const currentMovie = movies[currentIndex]
    if (!currentMovie) return null

    const mainImageUrl = currentMovie.backdropUrl || currentMovie.posterUrl

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
        setActiveScreenshotIndex(0)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length)
        setActiveScreenshotIndex(0)
    }

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Featured and Recommended"
            className="relative mx-auto my-6 w-full max-w-6xl"
        >
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    Featured &amp; Recommended
                </h2>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>{currentIndex + 1}</span> / <span>{movies.length}</span>
                </div>
            </div>

            <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded bg-[#0a141d] shadow-[0_0_20px_rgba(0,0,0,0.8)] lg:flex-row">
                <div className="relative min-h-[260px] flex-1 bg-black lg:min-h-0 lg:w-[65%]">
                    {mainImageUrl ? (
                        <img
                            key={`main-${currentMovie.id}-${activeScreenshotIndex}`}
                            src={mainImageUrl}
                            alt={`${currentMovie.title} preview`}
                            className="h-full w-full object-cover transition-opacity duration-300 animate-fade-in"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
                            No Preview Available
                        </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                </div>

                <div className="flex w-full flex-col justify-between bg-gradient-to-b from-[#0f1922] to-[#070b10] p-5 lg:w-[35%]">
                    <div>
                        <h3 className="text-xl font-bold text-white transition hover:text-[#66c0f4]">
                            {currentMovie.title}
                        </h3>

                        <div className="my-3 grid grid-cols-2 gap-2">
                            {[0, 1, 2, 3].map((slot) => {
                                const thumbUrl = currentMovie.backdropUrl || currentMovie.posterUrl
                                return (
                                    <button
                                        key={`thumb-slot-${currentMovie.id}-${slot}`}
                                        type="button"
                                        onClick={() => setActiveScreenshotIndex(slot)}
                                        aria-label={`View preview ${slot + 1}`}
                                        className={`relative aspect-video overflow-hidden rounded-xs border-2 bg-slate-800 transition-all ${activeScreenshotIndex === slot
                                            ? 'border-[#66c0f4] shadow-[0_0_8px_rgba(102,192,244,0.6)]'
                                            : 'border-transparent opacity-60 hover:opacity-100 focus-visible:border-white'
                                            }`}
                                    >
                                        {thumbUrl ? (
                                            <img
                                                src={thumbUrl}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-slate-700" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        <p className="line-clamp-3 text-xs leading-relaxed text-[#c6d4df]">
                            {currentMovie.overview || 'Now available on Steam.'}
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

                            <button
                                type="button"
                                className="mt-3 rounded bg-[#2a475e] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#3d6c9e]"
                            >
                                View details
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Featured Movie"
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white/70 backdrop-blur-xs transition hover:bg-black/90 hover:text-white active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                >
                    ❮
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Featured Movie"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-black/50 p-2 text-white/70 backdrop-blur-xs transition hover:bg-black/90 hover:text-white active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                >
                    ❯
                </button>
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="mt-3 flex justify-center gap-1.5">
                {movies.map((m, idx) => (
                    <button
                        key={`bullet-${m.id}-${idx}`}
                        type="button"
                        onClick={() => {
                            setCurrentIndex(idx)
                            setActiveScreenshotIndex(0)
                        }}
                        aria-label={`Go to slide ${idx + 1}: ${m.title}`}
                        className={`h-2 rounded-xs transition-all ${idx === currentIndex
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