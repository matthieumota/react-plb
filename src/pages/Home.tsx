import { useEffect, useState } from "react"
import Book, { type Book as BookType } from "../Book"
import Button from "../Button"
import BookForm from "../BookForm"
import axios from "axios"
import { AUTHORS } from "../App"
import { useSearchParams } from "react-router"

function Home() {
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

  const handleAddBook = async () => {
    try {
      const { id, ...bookWithoutId } = newBook
      const response = await axios.post('http://localhost:3000/books', bookWithoutId)
      setBooks([...books, response.data])
      setNewBook({ id: 0, title: '', author: AUTHORS[0], year: 0, image: '' })
      toggleForm()
    } catch (err: any) {
      setError('Erreur lors de l’ajout du livre : ' + err.message)
    }
  }

  const handleRemoveBook = async (book: BookType) => {
    try {
      await axios.delete(`http://localhost:3000/books/${book.id}`)
      setBooks(books.filter(b => b.id !== book.id))
    } catch (err: any) {
      setError('Erreur lors de la suppression : ' + err.message)
    }
  }

  const handleUpdateBook = async (book: BookType) => {
    try {
      const response = await axios.put(`http://localhost:3000/books/${book.id}`, book)
      setBooks(books.map(b => b.id === book.id ? response.data : b))
    } catch (err: any) {
      setError('Erreur lors de la mise à jour : ' + err.message)
    }
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')

  return (
    <>
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        {console.log(Array.from(searchParams.entries()))}
        <ul>
          {Array.from(searchParams.entries()).map(value => (
            <li key={value[0]}>{value[0]}: {value[1]}</li>
          ))}
        </ul>

        <input
          value={search ?? ''}
          type="text"
          name="search"
          className="border border-gray-300 rounded-md py-1 px-2 w-full"
          onChange={(event) => {
            searchParams.set('search', event.target.value)
            setSearchParams(searchParams)
          }}
        />

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
            {books.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase())).map(b => 
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
    </>
  )
}

export default Home
