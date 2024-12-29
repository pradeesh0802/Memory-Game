import React, { useState, useEffect } from 'react';
import './App.css';

const generateCardPairs = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const cards = [...numbers, ...numbers];
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCardPairs());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedCards, cards.length]);

  const flipCard = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameOver) {
      return;
    }

    setFlippedCards((prev) => [...prev, index]);

    if (flippedCards.length === 1) {
      const [firstIndex] = flippedCards;
      if (cards[firstIndex] === cards[index]) {
        setMatchedCards((prev) => [...prev, cards[firstIndex]]);
      }
      setMoves((prev) => prev + 1);
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(generateCardPairs());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <div className="game-info">
        <p>Moves: {moves}</p>
        {gameOver && <p>Game Over! You won!</p>}
      </div>
      <div className="board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(card) ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
          >
            {(flippedCards.includes(index) || matchedCards.includes(card)) && <span>{card}</span>}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default MemoryGame;
