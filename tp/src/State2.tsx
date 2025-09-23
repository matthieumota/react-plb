import { useState } from 'react'

function State2() {
  const [counter, setCounter] = useState(0)
  const [text, setText] = useState('Je ne peux pas je suis à Nagano')

  /**
   * Incrémente la valeur du compteur du state
   */
  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  /**
   * Décrémente la valeur du compteur du state
   */
  const decrementCounter = (value: number) => {
    setCounter(counter - value)
  }

  /**
   * Remplace la valeur de text par "Baba"
   */
  const replaceByBaba = (newText: string) => {
    setText(newText)
  }

  return (
    <div>
      <div>
        <a href="https://react.dev/learn/responding-to-events">
          Documentation sur les gestions d'événements
        </a>
        <p>Voici un élément Counter, cliquez sur le bouton pour découvrir son comportement</p>
        <h2>Compteur : {counter}</h2>
        <button onClick={incrementCounter}>Ajouter + 1</button>
      </div>
      <div>
        <p>Remplir la fonction decrementCounter</p>
        <p>Créer un nouveau bouton "Retirer 1" qui va déclencher une fonction decrementCounter</p>
        <button onClick={() => decrementCounter(1)}>Retirer 1</button>
      </div>
      <div>
        <p>Remplir la fonction replaceByBaba</p>
        <p>Créer un nouveau bouton Remplacer qui va déclencher une fonction replaceByBaba</p>
        <h2>{text}</h2>
        <button onClick={() => replaceByBaba('Baba')}>Remplacer</button>
      </div>
    </div>
  )
}

export default State2
