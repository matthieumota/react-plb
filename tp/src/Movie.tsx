export type Movie = {
    title: string
    releasedAt: Date
    note: number
}

type MovieProps = {
    movie: Movie
}

function Movie({ movie }: MovieProps) {
    return (
        <div className="border border-dashed p-2 rounded text-center">
            <h2>{movie.title}</h2>
            <p>Sorti en {movie.releasedAt.getFullYear()}</p>
            <p>{movie.note}/10</p>
            {movie.note >= 8 && <p>⭐ Recommandé !</p>}
            {movie.note < 5 && <p>👎 À éviter</p>}
        </div>
    )
}

export default Movie
