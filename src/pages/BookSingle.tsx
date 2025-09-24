import { NavLink, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Book } from '../Book'
import axios from 'axios'

function BookSingle() {
  const { id } = useParams()
  const [book, setBook] = useState<Book>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean>()

  useEffect(() => {
    const loadBook = async () => {
        setLoading(true)
        setError(false)

        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            const response = await axios.get(`http://localhost:3000/books/${id}`)
            setBook(response.data)
        } catch (error: any) {
            setError(true)
        }

        setLoading(false)
    }

    loadBook()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
        <span className="ml-4 text-blue-500 font-medium">Chargement du livre...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-10 text-center">
        <strong className="font-bold">Erreur :</strong> 404
      </div>
    )
  }

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
