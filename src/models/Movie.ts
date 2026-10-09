import { getGenreName } from '../utils/genreLabels'

export interface TmdbMovieRaw {
    id: number
    title: string
    overview: string
    release_date: string
    genre_ids: number[]
    backdrop_path: string | null
    poster_path: string | null
    vote_average?: number
}

export class Movie {
    public readonly id: number
    public readonly title: string
    public readonly overview: string
    public readonly release_date: string
    public readonly genre_ids: number[]
    public readonly backdrop_path: string | null
    public readonly poster_path: string | null
    public readonly vote_average: number

    constructor(data: TmdbMovieRaw) {
        this.id = data.id
        this.title = data.title
        this.overview = data.overview
        this.release_date = data.release_date
        this.genre_ids = data.genre_ids ?? []
        this.backdrop_path = data.backdrop_path
        this.poster_path = data.poster_path
        this.vote_average = data.vote_average ?? 0
    }

    public get releaseYear() {
        return this.release_date ? this.release_date.slice(0, 4) : 'TBA'
    }

    public get genres() {
        return this.genre_ids.map(getGenreName).slice(0, 3)
    }

    public get backdropUrl() {
        return this.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${this.backdrop_path}`
            : null
    }

    public get posterUrl() {
        return this.poster_path
            ? `https://image.tmdb.org/t/p/w500${this.poster_path}`
            : null
    }
}

export default Movie