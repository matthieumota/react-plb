import Movie, { type Movie as MovieType } from "./Movie"

type MovieListProps = {
    movies: MovieType[]
}

function MovieList({ movies }: MovieListProps) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {movies.map(movie => <Movie key={movie.title} movie={movie} />)}
        </div>
    )
}

export default MovieList
