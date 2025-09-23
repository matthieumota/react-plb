import { useState } from 'react'

type Animal = {
  name: string,
  type: string
}

function StateChallenge() {
  const [animals, setAnimals] = useState<Animal[]>([
    {
      name: 'Trolilo',
      type: 'troll'
    },
    {
      name: 'Sheep sheep',
      type: 'poisson'
    },
    {
      name: 'Donald Trump',
      type: 'orange'
    }
  ])
  const [newAnimalType, setNewAnimalType] = useState('')
  const [newAnimalName, setNewAnimalName] = useState('')

  const saveAnimal = () => {
    setAnimals([
      ...animals,
      { name: newAnimalName, type: newAnimalType }
    ])

    setNewAnimalName('')
    setNewAnimalType('')
  }

  return (
    <div>
      <ul>
        <li>
          Afficher la liste des animaux dans une boucle map. Pour chaque animal, afficher son nom et son type.
        </li>
        <li>
          Créer un input texte qui permet de saisir la valeur du state newAnimalType. Quand sa valeur change, la valeur de newAnimalType est mise à jour.
        </li>
        <li>
          Créer un autre input texte qui permet de saisir la valeur du state newAnimalName, avec le même fonctionnement.
        </li>
        <li>
          Créer une fonction vide saveAnimal, et l'appeler depuis un bouton que vous créerez également.
        </li>
        <li>
          Remplir la fonction saveAnimal tel que les valeurs newAnimalType et newAnimalName sont sauvegardées dans un nouvel objet animal,
          que la fonction mette le tableau des animaux à jour en ajoutant le nouvel objet animal à la fin et qu'une fois que l'animal a été créé,
          la fonction vide les champs newAnimalType et newAnimalName.
        </li>
        <li>Bon courage !</li>
      </ul>

      <div className="max-w-3xl mx-auto mb-16">
        <div className="divide-y-2 mb-8">
          {animals.map((animal, index) =>
            <div key={index} className="pt-3 mt-3">
              <h2 className="text-xl font-bold inline-block">{animal.name}</h2> - {animal.type}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input className="border-gray-300 rounded-md" type="text"
            value={newAnimalType} placeholder="Type"
            onChange={(event) => setNewAnimalType(event.target.value)} />
        </div>
        <div className="mb-3">
          <input className="border-gray-300 rounded-md" type="text"
            value={newAnimalName} placeholder="Nom"
            onChange={(event) => setNewAnimalName(event.target.value)} />
        </div>

        <button className="bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 duration-300"
          onClick={saveAnimal}
          disabled={!newAnimalName || !newAnimalType}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  )
}

export default StateChallenge
