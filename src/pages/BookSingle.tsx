import { NavLink, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Book } from '../Book'
import axios from 'axios'

function BookSingle() {
  const params = useParams()
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    const loadBook = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/books/${params.id}`)
            setBook(response.data)
        } catch (error: any) {
            // On affiche une 404 ou on redirige
        }
    }

    loadBook()
  }, [params.id])

  return book && (
    <div className="flex gap-8 mt-8">
      {book.image &&
        <div className="w-1/2">
          <img
            src={book.image}
            alt={`Couverture de ${book.title}`}
            className="w-full object-cover"
          />
        </div>
      }
      <div className="w-1/2">
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>
      </div>

      <NavLink to="/livre/5">test</NavLink>
    </div>
  )
}

export default BookSingle
