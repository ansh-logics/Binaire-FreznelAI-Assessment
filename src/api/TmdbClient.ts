import Movie, { type TmdbMovieRaw } from '../models/Movie'

type TmdbMovieResponse = {
    page: number
    total_pages: number
    total_results: number
    results: TmdbMovieRaw[]
}

type MoviePage = {
    movies: Movie[]
    page: number
    totalPages: number
    totalResults: number
}

class TmdbClient {
    private readonly baseUrl = 'https://api.themoviedb.org/3'
    private readonly readAccessToken =
        import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN

    private toMovie(movie: TmdbMovieRaw): Movie {
        return new Movie(movie)
    }

    private async request<T>(path: string): Promise<T> {
        if (!this.readAccessToken) {
            throw new Error('TMDB read access token is missing')
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
            headers: {
                Authorization: `Bearer ${this.readAccessToken}`,
                Accept: 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`)
        }

        return response.json() as Promise<T>
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
}

export default TmdbClient