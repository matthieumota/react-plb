import Author, { type Author as AuthorType } from "./Author"
import Counter from "./Counter"
import EventListenerChallenge from "./EventListenerChallenge"
import Movie, { type Movie as MovieType } from "./Movie"
import MovieList from "./MovieList"
import State2 from "./State2"
import StateChallenge from "./StateChallenge"

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

      <h2>Exercice State 2</h2>
      <State2 />

      <h2>Exercice Counter</h2>
      <Counter />
      <Counter initialValue={5} maxValue={10} />

      <h2>Exercice State Challenge</h2>
      <StateChallenge />

      <h2>Exercice Event Listener Challenge</h2>
      <EventListenerChallenge />
    </div>
  )
}

export default App
