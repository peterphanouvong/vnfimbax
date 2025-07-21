"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  function handleClick(i: number) {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXNext(!isXNext);
    }
  }

  function calculateWinner(cells: (string | null)[]): string | null {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a];
      }
    }
    return null;
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-8 text-4xl font-bold">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus-visible:ring-blue-400 ${
              winner && `cursor-default ${cell === winner ? "bg-green-300" : "bg-gray-300"}`
            }`}
            onClick={() => handleClick(index)}
            disabled={!!winner || !!cell}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-xl">
          {winner
            ? `Winner: ${winner}`
            : `Next player: ${isXNext ? "X" : "O"}`}
        </p>
        <Button onClick={restartGame} className="px-6">
          Restart Game
        </Button>
      </div>
    </main>
  );
}

