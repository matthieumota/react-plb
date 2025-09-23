import { useState } from 'react'
import Button from './Button'

export type Book = {
  id: number
  title: string
  author: string
  year: number
  image?: string
}

type BookProps = {
  book: Book
  active?: boolean
  selected?: boolean
  onSelect: () => void
  onRemove: () => void
}

function Book({
  book,
  active = true,
  selected = false,
  onSelect,
  onRemove,
}: BookProps) {
  // Mettre le nombre de like sur le book...
  const [like, setLike] = useState(0)

  const handleSee = () => {
    onSelect()
  }

  const handleRemove = () => {
    onRemove()
  }

  const handleLike = () => {
    setLike(like + 1) // 0 + 1
    setLike(like + 1) // 0 + 1
    setLike(like + 1) // 0 + 1

    setLike(l => l + 1) // 0 + 1
    setLike(l => l + 1) // 1 + 1
    setLike(l => l + 1) // 2 + 1
  }

  if (!active) return

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {book.image &&
        <img
          src={book.image}
          alt={`Couverture de ${book.title}`}
          className="w-full h-64 object-cover"
        />
      }
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>

        <Button onClick={handleSee}>
          {selected ? 'Déselectionner' : 'Voir'}
        </Button>
        {/* onClick={() => setLikes(like + 1)} */}
        <Button onClick={handleLike} title={`() => setLikes(${like} + 1)`}>
          ❤️‍🔥
          {like > 0 && <>({like})</>}
        </Button>
        <Button title="Supprimer" onClick={handleRemove} className="bg-red-500 hover:bg-red-800">
          🗑️
        </Button>
      </div>
    </div>
  )
}

export default Book
