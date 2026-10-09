import Movie, { type TmdbMovieRaw } from '../models/Movie'

type TmdbMovieResponse = {
    page: number
    total_pages: number
    total_results: number
    results: TmdbMovieRaw[]
}

type TmdbMovieImagesResponse = {
    backdrops: Array<{
        file_path: string
        width: number
    }>
}

type TmdbMovieDetailResponse = Omit<TmdbMovieRaw, 'genre_ids'> & {
    genre_ids?: number[]
    genres?: Array<{ id: number }>
}

type MoviePage = {
    movies: Movie[]
    page: number
    totalPages: number
    totalResults: number
}

type CachedResponse<T> = {
    savedAt: number
    data: T
}

class TmdbClient {
    private readonly baseUrl = 'https://api.themoviedb.org/3'
    private readonly readAccessToken =
        import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
    private readonly cachePrefix = 'movie-discovery:tmdb:'

    private toMovie(movie: TmdbMovieRaw): Movie {
        return new Movie(movie)
    }

    private getCacheKey(path: string) {
        return `${this.cachePrefix}${encodeURIComponent(path)}`
    }

    private getCachedResponse<T>(path: string): T | null {
        try {
            const savedValue = localStorage.getItem(this.getCacheKey(path))

            if (!savedValue) {
                return null
            }

            const cachedResponse = JSON.parse(savedValue) as CachedResponse<T>

            return cachedResponse.data
        } catch {
            return null
        }
    }

    private saveResponse<T>(path: string, data: T) {
        try {
            const cachedResponse: CachedResponse<T> = {
                savedAt: Date.now(),
                data,
            }

            localStorage.setItem(
                this.getCacheKey(path),
                JSON.stringify(cachedResponse),
            )
        } catch {
            // Caching is optional; the API request can still succeed normally.
        }
    }

    private async request<T>(path: string): Promise<T> {
        if (!this.readAccessToken) {
            throw new Error('TMDB read access token is missing')
        }

        const cachedResponse = this.getCachedResponse<T>(path)

        if (!navigator.onLine) {
            if (cachedResponse) {
                return cachedResponse
            }

            throw new Error(
                'You are offline and this movie data has not been loaded before.',
            )
        }

        try {
            const response = await fetch(`${this.baseUrl}${path}`, {
                headers: {
                    Authorization: `Bearer ${this.readAccessToken}`,
                    Accept: 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`TMDB request failed: ${response.status}`)
            }

            const data = (await response.json()) as T

            this.saveResponse(path, data)

            return data
        } catch (error) {
            if (cachedResponse) {
                return cachedResponse
            }

            if (error instanceof Error) {
                throw error
            }

            throw new Error('Unable to load movie data.')
        }
    }

    private async getMoviePage(path: string): Promise<MoviePage> {
        const response = await this.request<TmdbMovieResponse>(path)

        return {
            movies: response.results.map((movie) => this.toMovie(movie)),
            page: response.page,
            totalPages: response.total_pages,
            totalResults: response.total_results,
        }
    }

    public getNowPlayingMovies(page = 1) {
        return this.getMoviePage(`/movie/now_playing?language=en-US&page=${page}`)
    }

    public getUpcomingMovies(page = 1) {
        return this.getMoviePage(`/movie/upcoming?language=en-US&page=${page}`)
    }

    public getPopularMovies(page = 1) {
        return this.getMoviePage(`/movie/popular?language=en-US&page=${page}`)
    }

    public getTopRatedMovies(page = 1) {
        return this.getMoviePage(`/movie/top_rated?language=en-US&page=${page}`)
    }

    public async getMovieDetails(id: number): Promise<Movie> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('Invalid movie ID')
        }

        const movie = await this.request<TmdbMovieDetailResponse>(
            `/movie/${id}?language=en-US`,
        )

        return new Movie({
            ...movie,
            genre_ids: movie.genre_ids ?? movie.genres?.map((genre) => genre.id) ?? [],
        })
    }

    public getSearchMovies(query: string, page = 1) {
        const normalizedQuery = query.trim()

        if (!normalizedQuery) {
            return Promise.resolve({
                movies: [],
                page: 1,
                totalPages: 0,
                totalResults: 0,
            })
        }

        return this.getMoviePage(
            `/search/movie?language=en-US&query=${encodeURIComponent(normalizedQuery)}&page=${page}`,
        )
    }

    public async getMovieBackdrops(movieId: number): Promise<string[]> {
        const response = await this.request<TmdbMovieImagesResponse>(
            `/movie/${movieId}/images`,
        )

        return response.backdrops
            .sort((first, second) => second.width - first.width)
            .slice(0, 4)
            .map(
                (backdrop) =>
                    `https://image.tmdb.org/t/p/w780${backdrop.file_path}`,
            )
    }
}

export default TmdbClient