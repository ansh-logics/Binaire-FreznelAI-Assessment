class Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    backdrop_path: string | null;
    poster_path: string | null;

    constructor(id: number, title: string, overview: string, releaseDate: string, genreIds: number[], backdropPath: string | null, posterPath: string | null) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.release_date = releaseDate;
        this.genre_ids = genreIds;
        this.backdrop_path = backdropPath;
        this.poster_path = posterPath;
    }
    get ReleaseYear() {
        return this.release_date ? this.release_date.slice(0, 4) : "Unknown";
    }
}
export default Movie
