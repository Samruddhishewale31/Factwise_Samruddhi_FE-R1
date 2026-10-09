
import { useState } from "react";
import "./App.css";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getResult(board) {
  for (const line of LINES) {
    const [a, b, c] = line;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return { winner: board[a], winningLine: line };
    }
  }

  if (board.every((cell) => cell !== "")) {
    return { winner: null, winningLine: [], isTie: true };
  }

  return { winner: null, winningLine: [], isTie: false };
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("✔");
  const result = getResult(board);

  function handleCellClick(index) {
    if (board[index] !== "" || result.winner || result.isTie) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    const nextResult = getResult(nextBoard);

    if (!nextResult.winner && !nextResult.isTie) {
      setCurrentPlayer(currentPlayer === "✔" ? "✖" : "✔");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("✔");
  }

  return (
    <main className="app">
      <h1 className="title">TIC-TAC-TOE</h1>

      <p className="status" aria-live="polite">
        {result.winner
          ? `${result.winner === "✔" ? "PLAYER 1" : "PLAYER 2"} WON!`
          : result.isTie
          ? "IT'S A TIE!"
          : `${currentPlayer === "✔" ? "PLAYER 1" : "PLAYER 2"}'S TURN`}
      </p>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            type="button"
            className={`cell ${
              result.winningLine.includes(index) ? "win" : ""
            }`}
            onClick={() => handleCellClick(index)}
            disabled={value !== "" || Boolean(result.winner) || result.isTie}
            aria-label={`Cell ${index + 1}${value ? `: ${value}` : ": empty"}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button type="button" className="reset" onClick={resetGame}>
        RESET
      </button>
    </main>
  );
}