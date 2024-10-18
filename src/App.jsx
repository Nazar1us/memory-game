import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
// import { Test } from './Test'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com//users', {
      method: 'POST',
      body: JSON.stringify({
        "userId": 10,
        "id": 101,
        "title": "Toby",
        "body": "asdasfgdsgsdfdsfsdfsdfasdasblah"
      })
    })
      .then(response => response.json())
      .then(json => console.log(json))

  }, [])


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages,]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }



  const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log('those cards do not match')
        setTimeout(() => {
          resetTurn()
        }, 1000)
      }
    }

  }, [choiceOne, choiceTwo])


  console.log(cards)


  //reset choices
  const resetTurn = () => {
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }

  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disable}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
