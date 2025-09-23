import { useEffect, useState } from 'react'
import { type Book } from './Book'
import Button from './Button'
import clsx from 'clsx'
import { AUTHORS } from './App'
import Clock from './Clock'

type BookFormProps = {
  book: Book
  onCancel: () => void
  onChange: (book: Book) => void
  onSave: () => void
}

function BookForm({ book, onCancel, onChange, onSave }: BookFormProps) {
  const [localBook, setLocalBook] = useState(book)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    console.log('Le composant est monté')

    return () => console.log('Le composant est démonté')
  }, [])

  useEffect(() => {
    console.log('On a changé localBook avec', localBook)

    return () => console.log('La valeur de localBook va changer', localBook)
  }, [localBook])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const book = { ...localBook, [event.target.name]: event.target.value }
    setLocalBook(book)
    onChange(book)
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()

    setErrors({})

    const errors: Record<string, string> = {}

    if (!localBook.title) {
      errors.title = 'Le titre est obligatoire'
    }

    if (localBook.title && localBook.title.length < 2) {
      errors.title = 'Le titre doit avoir au moins 2 caractères'
    }

    if (!localBook.year) {
      errors.year = `L'année est obligatoire`
    }

    if (localBook.year < 1900 || localBook.year > 2023) {
      errors.year = `L'année n'est pas correcte`
    }

    if (!localBook.image || !localBook.image.startsWith('http')) {
      errors.image = `L'url n'est pas correcte`
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    onSave()
  }

  return (
    <form onSubmit={handleSave}>
      <Clock />
      <div className="mb-2">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.title && 'border-red-500')}
          value={localBook.title}
          name="title"
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="author">Auteur</label>
        <select
          id="author"
          className="border border-gray-300 rounded-md py-1 px-2 w-full"
          value={localBook.author}
          name="author"
          onChange={handleChange}
        >
          {Array.from(AUTHORS).map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="year">Année</label>
        <input
          id="year"
          type="number"
          className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.year && 'border-red-500')}
          value={localBook.year}
          name="year"
          onChange={handleChange}
        />
        {errors.year && <p className="text-red-500">{errors.year}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="text"
          className={clsx('border border-gray-300 rounded-md py-1 px-2 w-full', errors.image && 'border-red-500')}
          value={localBook.image}
          name="image"
          onChange={handleChange}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button title="Annuler" onClick={handleCancel} className="bg-red-500 hover:bg-red-800" type="button">
          Annuler
        </Button>
        <Button title="Sauvegarder">
          Sauvegarder
        </Button>
      </div>
    </form>
  )
}

export default BookForm
