import { useState } from "react";
import "./App.css";

function Square({ value, onClick, isWinningSquare }) {
  const className = `square ${value} ${isWinningSquare ? "win" : ""}`;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const status = winner
    ? `🏆 Winner: ${winner}`
    : squares.every(Boolean)
    ? "🤝 It's a Draw!"
    : `Next turn: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((val, idx) => (
          <Square
            key={idx}
            value={val}
            onClick={() => handleClick(idx)}
            isWinningSquare={winnerInfo?.line?.includes(idx)}
          />
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Restart</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default App;