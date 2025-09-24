import { useEffect, useState } from "react"
import Book, { type Book as BookType } from "./Book"
import Button from "./Button"
import BookForm from "./BookForm"
import axios from "axios"

let nextId = 11
export const BOOKS = [
  {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    year: 1954,
    image: '/assets/le-seigneur-des-anneaux.jpg',
  },
  {
    id: 2,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    image: '/assets/le-petit-prince.jpg',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    image: '/assets/1984.jpeg',
  },
  {
    id: 4,
    title: 'L\'Étranger',
    author: 'Albert Camus',
    year: 1942,
    image: '/assets/l-etranger.jpg',
  },
  {
    id: 5,
    title: 'Harry Potter à l\'école des sorciers',
    author: 'J.K. Rowling',
    year: 1997,
    image: '/assets/harry-potter-a-l-ecole-des-sorciers.jpg',
  },
  {
    id: 6,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    image: '/assets/fahrenheit-451.jpg',
  },
  {
    id: 7,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
    image: '/assets/les-miserables.jpg',
  },
  {
    id: 8,
    title: 'Orgueil et Préjugés',
    author: 'Jane Austen',
    year: 1813,
    image: '/assets/orgueil-et-prejuges.jpg',
  },
  {
    id: 9,
    title: 'Le Comte de Monte-Cristo',
    author: 'Alexandre Dumas',
    year: 1844,
    image: '/assets/le-comte-de-monte-cristo.jpeg',
  },
  {
    id: 10,
    title: 'La Peste',
    author: 'Albert Camus',
    year: 1947,
    image: '/assets/la-peste.jpg',
  }
]
export const AUTHORS = Array.from(new Set(BOOKS.map(b => b.author)))

function App() {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [showForm, setShowForm] = useState(false)
  const [newBook, setNewBook] = useState<BookType>({
    id: 0,
    title: '',
    author: AUTHORS[0],
    year: 0,
    image: '',
  })

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const response = await axios.get('http://localhost:3000/books')
        setBooks(response.data)
      } catch (error: any) {
        setError(error.message)
      }

      setLoading(false)
    }

    loadBooks()
  }, [])

  useEffect(() => {
    if (!selectedBook) return

    const loadBook = async (id: number) => {
      const response = await axios.get(`http://localhost:3000/books/${id}`)
      console.log(response.data)
      setSelectedBook(response.data)
    }

    loadBook(selectedBook.id)
  }, [selectedBook?.id])

  // Créer un useEffect qui se déclenche si selectedBook change...
  // Vérifier que le selectedBook existe...
  // S'il existe, on fait un get sur http://localhost:3000/books/8 où 8 est l'id du selectedBook
  // Faire un console.log du livre

  const toggleForm = () => {
    setShowForm(!showForm) // showForm est pas modifié, il est modifié plus tard
  }

  const handleAddBook = () => {
    setBooks([
      ...books,
      { ...newBook, id: nextId++ }
    ])
    setNewBook({ id: 0, title: '', author: AUTHORS[0], year: 0, image: '' })
    toggleForm()
  }

  const handleRemoveBook = (book: BookType) => {
    setBooks(books.filter(b => b.id !== book.id))
  }

  const handleUpdateBook = (book: BookType) => {
    setBooks(books.map(b => b.id === book.id ? book : b))
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        {selectedBook && <div className="flex justify-center mb-4">
          <div className="w-1/3">
            <Book
              key={selectedBook.id} // reset du state...
              book={selectedBook}
              onSelect={() => setSelectedBook(undefined)}
              selected
              onRemove={() => {
                handleRemoveBook(selectedBook)
                setSelectedBook(undefined)
              }}
              onSave={(book) => {
                handleUpdateBook(book)
                setSelectedBook(book)
              }}
            />
          </div>
        </div>}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-4 text-blue-500 font-medium">Chargement des livres...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto mb-4">
            <strong className="font-bold">Erreur :</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {books.map(b => 
            <Book
              key={b.id}
              book={b}
              onSelect={() => setSelectedBook(b)}
              active={selectedBook?.id !== b.id}
              onRemove={() => handleRemoveBook(b)}
              onSave={handleUpdateBook}
            />
          )}
        </div>

        {!showForm && <div className="text-center py-10">
          <Button onClick={toggleForm}>
            Ajouter un livre
          </Button>
        </div>}

        {showForm && <div className="mt-4">
          <pre>{JSON.stringify(newBook, null, 2)}</pre>
          <BookForm
            book={newBook}
            onCancel={toggleForm}
            onChange={(book: BookType) => setNewBook(book)}
            onSave={handleAddBook}
          />
        </div>}
      </div>
    </div>
  )
}

export default App
