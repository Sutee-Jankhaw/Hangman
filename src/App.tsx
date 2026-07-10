import { useState } from 'react'
import { words } from "./data/word";
import './App.css'

function App() {
  const getRandomWord = (): string => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  const [word ,setWord] = useState(getRandomWord());
  const restartGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([])
  };
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters([...guessedLetters, letter])
  }

  return (
    <>
      <section id="center">
        <div className="hero">
        </div>
        <div>
          <button onClick={restartGame}>
            Reset
          </button>
          <h1>
            {word.split("").map((letter, index) => (
              <span key={index}>
                {guessedLetters.includes(letter) ? letter : " _"}
              </span>
            ))}
          </h1>
          <br></br>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
