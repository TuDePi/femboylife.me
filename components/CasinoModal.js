
import { useState, useEffect } from 'react';

const Roulette = ({ onWin, onLose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState(null);

  const spin = (betType, betValue) => {
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      const winningColor = winningNumber === 0 ? 'green' : (winningNumber % 2 === 0 ? 'black' : 'red');
      let isWin = false;

      if (betType === 'color') {
        isWin = winningColor === betValue;
      } else if (betType === 'number') {
        isWin = winningNumber === betValue;
      }

      setResult(`The ball landed on ${winningNumber} ${winningColor}. You ${isWin ? 'win!' : 'lose.'}`);
      if (isWin) {
        onWin(betType === 'number' ? 1000 : 100);
      } else {
        onLose(50);
      }
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Roulette</h3>
      <div className="w-40 h-40 animate-rainbow-bg rounded-full mx-auto mb-4 flex items-center justify-center">
        {isSpinning ? (
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        ) : (
          <div className="text-white text-2xl">Roulette</div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button onClick={() => spin('color', 'red')} disabled={isSpinning} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Red</button>
        <button onClick={() => spin('color', 'black')} disabled={isSpinning} className="p-2 bg-black text-white rounded-lg hover:bg-gray-700">Black</button>
        <button onClick={() => spin('color', 'green')} disabled={isSpinning} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Green</button>
      </div>
      <div className="flex items-center mb-4">
        <input type="number" min="0" max="36" placeholder="Bet on a number" className="w-full p-2 border rounded-lg" />
        <button onClick={() => spin('number', parseInt(document.querySelector('input[type=number]').value))} disabled={isSpinning} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Bet</button>
      </div>
      {result && <p className="mt-4 text-center">{result}</p>}
    </div>
  );
};

const Card = ({ card }) => (
  <div className="w-16 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-2xl font-bold transform transition-transform duration-500 hover:scale-105">
    {card}
  </div>
);

const Blackjack = ({ onWin, onLose }) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dealCard = (hand) => {
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return cards[Math.floor(Math.random() * cards.length)];
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;
    hand.forEach(card => {
      if (card === 'A') {
        aceCount += 1;
        score += 11;
      } else if (['K', 'Q', 'J'].includes(card)) {
        score += 10;
      } else {
        score += parseInt(card);
      }
    });
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }
    return score;
  };

  const startGame = () => {
    onLose(75, 'I played a game of Blackjack.'); // Bet $75
    const newPlayerHand = [dealCard(), dealCard()];
    const newDealerHand = [dealCard(), dealCard()];
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayerScore(calculateScore(newPlayerHand));
    setDealerScore(calculateScore(newDealerHand));
    setGameOver(false);
  };

  const hit = () => {
    if (gameOver) return;
    const newPlayerHand = [...playerHand, dealCard()];
    setPlayerHand(newPlayerHand);
    const newPlayerScore = calculateScore(newPlayerHand);
    setPlayerScore(newPlayerScore);
    if (newPlayerScore > 21) {
      setGameOver(true);
    }
  };

  const stand = () => {
    if (gameOver) return;
    let newDealerHand = [...dealerHand];
    let newDealerScore = calculateScore(newDealerHand);
    while (newDealerScore < 17) {
      newDealerHand.push(dealCard());
      newDealerScore = calculateScore(newDealerHand);
    }
    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    setGameOver(true);

    if (newDealerScore > 21 || playerScore > newDealerScore) {
      onWin(225, 'I won $75 in Blackjack!');
    } else {
      onLose(0, 'I lost $75 in Blackjack.');
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Blackjack</h3>
      <div className="mb-4">
        <h4 className="font-bold">Dealer's Hand ({dealerScore})</h4>
        <div className="flex space-x-2">
          {dealerHand.map((card, i) => <Card key={i} card={gameOver ? card : (i === 0 ? card : '?')} />)}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-bold">Your Hand ({playerScore})</h4>
        <div className="flex space-x-2">
          {playerHand.map((card, i) => <Card key={i} card={card} />)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={hit} disabled={gameOver || playerScore >= 21} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Hit</button>
        <button onClick={stand} disabled={gameOver} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Stand</button>
      </div>
      {gameOver && (
        <div className="mt-4 text-center">
          <p>Game Over! {playerScore > 21 ? 'You busted!' : (dealerScore > 21 || playerScore > dealerScore) ? 'You win!' : 'You lose.'}</p>
          <button onClick={startGame} className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Play Again</button>
        </div>
      )}
    </div>
  );
};

const Slots = ({ onWin, onLose }) => {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    const newReels = [];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const symbols = ['🍑', '🍆', '💦', '🐮'];
        newReels[i] = symbols[Math.floor(Math.random() * symbols.length)];
        setReels([...newReels]);
      }, (i + 1) * 500);
    }

    setTimeout(() => {
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        onWin(500);
        alert('Jackpot! You win $500!');
      } else {
        onLose(20);
      }
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Slots</h3>
      <div className="flex justify-center items-center text-5xl mb-4 space-x-4">
        <div className="p-4 bg-gray-200 rounded-lg">{reels[0]}</div>
        <div className="p-4 bg-gray-200 rounded-lg">{reels[1]}</div>
        <div className="p-4 bg-gray-200 rounded-lg">{reels[2]}</div>
      </div>
      <button onClick={spin} disabled={isSpinning} className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};


export default function CasinoModal({ onClose, onWin, onLose }) {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { name: "Roulette", component: Roulette },
    { name: "Blackjack", component: Blackjack },
    { name: "Slots", component: Slots },
  ];

  const renderGame = () => {
    const GameComponent = activeGame.component;
    return <GameComponent onWin={onWin} onLose={onLose} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{activeGame ? activeGame.name : 'Casino'}</h2>
          <button onClick={activeGame ? () => setActiveGame(null) : onClose} className="text-2xl font-bold">{activeGame ? '‹' : '×'}</button>
        </div>
        {activeGame ? (
          renderGame()
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.name} className="mb-2">
                <button
                  onClick={() => setActiveGame(game)}
                  className="w-full flex items-center p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                >
                  <span className="text-2xl mr-4">{game.name === 'Slots' ? '🎰' : game.name === 'Blackjack' ? '🃏' : '🌕'}</span>
                  <span>{game.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
