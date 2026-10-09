import Movie from "../models/Movie"

type TmdbMovie = {
    id: number
    title: string
    overview: string
    release_date: string
    genre_ids: number[]
    poster_path: string | null
    backdrop_path: string | null
}
class TmdbClient {
    private toMovie(movie: TmdbMovie): Movie {
        return new Movie(
            movie.id,
            movie.title,
            movie.overview,
            movie.release_date,
            movie.genre_ids,
            movie.backdrop_path,
            movie.poster_path
        )
    }
    private readonly baseUrl = 'https://api.themoviedb.org/3'
    private readonly readAccessToken =
        import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN

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
    async getNowPlayingMovies(page = 1): Promise<{ movies: TmdbMovie[], page: number, totalPages: number, totalResults: number }> {
        const response = await this.request<{
            page: number
            results: TmdbMovie[]
            total_pages: number
            total_results: number
        }>(`/movie/now_playing?language=en-US&page=${page}`);
        return { movies: response.results, page: response.page, totalPages: response.total_pages, totalResults: response.total_results }
    }
    async getUpcomingMovies(page = 1): Promise<{ movies: TmdbMovie[], page: number, totalPages: number, totalResults: number }> {
        const response = await this.request<{
            page: number
            results: TmdbMovie[]
            total_pages: number
            total_results: number
        }>(`/movie/upcoming?language=en-US&page=${page}`);
        return { movies: response.results, page: response.page, totalPages: response.total_pages, totalResults: response.total_results }
    }
    async getPopularMovies(page = 1): Promise<{ movies: TmdbMovie[], page: number, totalPages: number, totalResults: number }> {
        const response = await this.request<{
            page: number
            results: TmdbMovie[]
            total_pages: number
            total_results: number
        }>(`/movie/popular?language=en-US&page=${page}`);
        return { movies: response.results, page: response.page, totalPages: response.total_pages, totalResults: response.total_results }
    }
    async getTopRatedMovies(page = 1): Promise<{ movies: TmdbMovie[], page: number, totalPages: number, totalResults: number }> {
        const response = await this.request<{
            page: number
            results: TmdbMovie[]
            total_pages: number
            total_results: number
        }>(`/movie/top_rated?language=en-US&page=${page}`);
        return { movies: response.results.map((movie) => this.toMovie(movie)), page: response.page, totalPages: response.total_pages, totalResults: response.total_results }
    }
}
export default TmdbClient;