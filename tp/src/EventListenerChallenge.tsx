import clsx from "clsx"
import { useState } from "react"

type Bird = {
  name: string
  age: number
  color: string
  isColorDisplayed: boolean
}

function EventListenerChallenge() {
  const [birds, setBirds] = useState<Bird[]>([
    {
      name: 'Pingouin',
      age: 18,
      color: 'Noir',
      isColorDisplayed: true,
    },
    {
      name: 'Manchot',
      age: 15,
      color: 'Blanc',
      isColorDisplayed: false,
    },
    {
      name: 'Autruche',
      age: 8555,
      color: 'Blanc',
      isColorDisplayed: false,
    },
    {
      name: 'Colibri',
      age: 85,
      color: 'Bleu',
      isColorDisplayed: true,
    },
  ])

  const [newBird, setNewBird] = useState<Bird>({ name: "", age: 0, color: "", isColorDisplayed: false })

  const [errors, setErrors] = useState<string[]>([])

  const handleAddBird = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: string[] = []

    if (newBird.name.length < 4 || newBird.name.length > 12) {
      newErrors.push("Nom : entre 4 et 12 caractères")
    }

    const validColors = ["bleu", "noir", "blanc"]
    if (!validColors.includes(newBird.color.toLowerCase())) {
      newErrors.push("Couleur : veuillez entrer bleu, noir ou blanc")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setBirds([...birds, newBird])
    setNewBird({ name: "", age: 0, color: "", isColorDisplayed: false })
    setErrors([])
  }

  const handleDeleteBird = (name: string) => {
    setBirds(birds.filter((bird) => bird.name !== name))
  }

  const handleColorChange = (name: string, color: string) => {
    setBirds(birds.map((bird) => bird.name === name ? { ...bird, color } : bird))
  }

  return (
    <div>
      <ul>
        <li>Afficher chaque oiseau dans une boucle map</li>
      </ul>
      <h2>Pour chaque oiseau</h2>
      <ul>
        <li>Afficher son age, son nom, sa couleur</li>
        <li>Si sa propriété isColorDisplayed n'est pas égale à true, ne pas afficher sa couleur</li>
      </ul>
      <ul>
        <li>Créer un mécanisme qui permet d'ajouter un oiseau en utilisant un formulaire et des states</li>
        <li>Créer un mécanisme qui permet de supprimer un oiseau en utilisant un bouton supprimer</li>
        <li>Créer un mécanisme qui permet de modifier la couleur d'un oiseau en utilisant un input texte</li>
      </ul>
      <p>Dans le mécanisme d'ajout, ajouter des conditions qui empêchent la sauvegarde de l'oiseau</p>
      <ul>
        <li>Si son nom mesure moins de 4 caractères de long, ou plus de 12 caractères de long, alerter "Veuillez entrer un nom entre 4 et 12 caractères"</li>
        <li>Si sa couleur n'est ni "bleu", ni "noir", ni "blanc", alerter "Veuillez entrer une de ces trois couleurs : bleu, noir, blanc"</li>
      </ul>

      {JSON.stringify(birds)}

      <div className="grid gap-4 p-4 bg-gray-50">
          {birds.map((bird) => (
              <div 
                  key={bird.name}
                  className={clsx("p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300", {
                    'border border-blue-500': bird.color.toLowerCase() === 'bleu',
                    'border border-slate-500': bird.color.toLowerCase() === 'noir',
                    'border border-green-500': bird.color.toLowerCase() === 'blanc',
                  })}
              >
                  <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">{bird.name}</p>
                      <button
                        onClick={() => handleDeleteBird(bird.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                  </div>
                  {bird.age > 0 && <p className="text-sm text-gray-500">Âge: {bird.age}</p>}
                  {bird.isColorDisplayed && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Couleur:</span>
                        <input
                          type="text"
                          value={bird.color}
                          onChange={(e) => handleColorChange(bird.name, e.target.value)}
                          className="border p-1 rounded w-24"
                        />
                      </div>
                  )}
              </div>
          ))}
      </div>

      {JSON.stringify(newBird)}

      <form onSubmit={handleAddBird} className="mb-6 space-y-2">
          <input
              type="text"
              placeholder="Nom"
              value={newBird.name}
              onChange={(e) => setNewBird({ ...newBird, name: e.target.value })}
              className="w-full p-2 border rounded"
          />
          <input
              type="number"
              placeholder="Âge"
              value={newBird.age}
              onChange={(e) => setNewBird({ ...newBird, age: Number(e.target.value) })}
              className="w-full p-2 border rounded"
          />
          <input
              type="text"
              placeholder="Couleur"
              value={newBird.color}
              onChange={(e) => setNewBird({ ...newBird, color: e.target.value })}
              className="w-full p-2 border rounded"
          />

          <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                  id="isColorDisplayed"
                  checked={newBird.isColorDisplayed}
                  onChange={(e) => setNewBird({ ...newBird, isColorDisplayed: e.target.checked })}
                  className="mr-2"
              />
              <label htmlFor="isColorDisplayed">Afficher la couleur</label>
          </div>

          {errors.length > 0 && (
            <ul className="text-red-500 text-sm border">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 duration-300">
              Ajouter Oiseau
          </button>
      </form>
    </div>
  )
}

export default EventListenerChallenge
