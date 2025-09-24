import { useContext } from "react"
import { NavLink, Outlet } from "react-router"
import { UserContext } from "./contexts/UserContext"
import { useCart } from "./stores/useCart"

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
  const { user, setUser } = useContext(UserContext)
  const cart = useCart(state => state.cart)

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between">
          <nav className="flex gap-4">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-500' : ''} end>Accueil</NavLink>
            <NavLink to="/a-propos" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>A propos</NavLink>
          </nav>

          {user &&
            <div>
              <h1>Bonjour {user.name}</h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => setUser(null)}
              >
                Déconnexion
              </button>
            </div>
          }

          {!user && <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setUser({ name: 'Fiorella' })}
          >
            Connexion
          </button>}

          <NavLink to="/panier">Panier ({cart.length})</NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default App
