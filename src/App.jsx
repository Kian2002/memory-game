import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // STATE
  const [cardArray, setCardArray] = useState([
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" },
    { name: "F" },
  ]);

  const [clickedItems, setClickedItems] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Shuffle Method

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const clickHandler = (e) => {
    if (clickedItems.find((foundItem) => foundItem === e.target.id)) {
      setClickedItems([]);
      setCurrentScore(0);
      setHighScore((prevHighScore) => {
        return prevHighScore > currentScore ? prevHighScore : currentScore;
      });
    } else {
      setClickedItems((prevClickedItems) => {
        return [...prevClickedItems, e.target.id];
      });
      setCurrentScore((prevScore) => {
        return prevScore + 1;
      });
    }
  };

  // activates shuffle

  useEffect(() => {
    setCardArray((prevCardArray) => {
      shuffleArray(prevCardArray);
      return [...prevCardArray];
    });
    console.log(clickedItems);
  }, [clickedItems]);

  return (
    <div className="app">
      <div className="score-container">
        <h1>Score: {currentScore}</h1>
        <h1>highScore: {highScore}</h1>
      </div>
      {cardArray.map((card) => (
        <div
          className="card"
          key={card.name}
          onClick={clickHandler}
          id={card.name}
        >
          <h2>{card.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
