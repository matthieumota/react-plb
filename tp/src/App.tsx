import Author, { type Author as AuthorType } from "./Author"
import Movie, { type Movie as MovieType } from "./Movie"
import MovieList from "./MovieList"

function App() {
  const author: AuthorType = {
    id: 1,
    name: 'J.R.R. Tolkien',
    birthday: new Date(1892, 1, 3)
  }

  const authors: AuthorType[] = [
    author,
    {
      id: 2,
      name: 'J.K. Rowling',
      birthday: new Date(1965, 7, 31)
    },
    {
      id: 3,
      name: 'George R. R. Martin',
      birthday: new Date(1948, 9, 20)
    },
  ]

  const movie: MovieType = {
    title: 'Le Seigneur des Anneaux',
    releasedAt: new Date(2001, 12, 18),
    note: 8
  }

  const movies: MovieType[] = [
    movie,
    {
      title: 'Harry Potter',
      releasedAt: new Date(2005, 6, 16),
      note: 3
    },
    {
      title: 'Game of Thrones',
      releasedAt: new Date(2011, 4, 17),
      note: 9
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <Author author={author} />

      <div className="grid grid-cols-3 gap-3">
        {authors.map(author => <Author key={author.id} author={author} />)}
      </div>

      <Movie movie={movie} />
      <MovieList movies={movies} />
    </div>
  )
}

export default App
