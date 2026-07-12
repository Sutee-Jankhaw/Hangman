import { useState,useEffect } from 'react'
import { words } from "./data/word";
import './App.css'

function App() {
  const [livePoint,setLivePoint] = useState(6);
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState("")
  const getRandomWord = (): string => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  const [word ,setWord] = useState(getRandomWord());
  const restartGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setLivePoint(6);
    setShowModal(false);
    setMessage("");
  };
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter)) return
    setGuessedLetters([...guessedLetters, letter])
    if (!word.includes(letter)) {
      setLivePoint((prev) => prev - 1);
    }
  }
  const isWin = word
    .split("")
    .every(letter => guessedLetters.includes(letter));
  useEffect(() => {
      if (livePoint <= 0) {
        setMessage("💀 Game Over")
        setShowModal(true)
      }
    }, [livePoint]);
  useEffect(() => {
    if (isWin) {
      setMessage("🎉 You Win!")
      setShowModal(true)
    }
  }, [isWin]);

  return (
    <>
      <section id="center">
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
        </div>
        <h2>Lives: {livePoint}</h2>
        <div className="grid-cols-5 gap-3">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              className="h-12 rounded border bg-blue-500 text-white hover:bg-blue-600"
            >
              {letter}
            </button>
          ))}
        </div>
      </section>
      <div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl mb-4">{message}</h2>

              <button
                onClick={restartGame}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
