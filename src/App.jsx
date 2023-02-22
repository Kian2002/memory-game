import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // STATE
  const [cardArray, setCardArray] = useState([]);
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
    if (currentScore === 20) {
      alert("You Win!");
    }

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

  // Get Data

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setCardArray(data.results);
      });
    console.log(cardArray);
  }, []);

  // activates shuffle

  useEffect(() => {
    setCardArray((prevCardArray) => {
      shuffleArray(prevCardArray);
      return [...prevCardArray];
    });
  }, [clickedItems]);

  return (
    <div className="app">
      <div className="score-container">
        <h1>Score: {currentScore}</h1>
        <h1>highScore: {highScore}</h1>
      </div>
      <div className="card-container">
        {cardArray.map((card) => (
          <div
            className="card"
            key={card.id}
            onClick={clickHandler}
            id={card.id}
          >
            <img
              className="card__image"
              src={card.image}
              alt="image of character"
              id={card.id}
            />
            <span id={card.id} className="card__name">
              {card.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
