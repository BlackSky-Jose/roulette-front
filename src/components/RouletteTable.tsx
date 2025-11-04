import { useState } from "react";
import type { Bet } from "../types";

interface Props {
  onAddBet: (bet: Bet) => void;
  betAmount: number;
  winningNumber: number | null;
}

const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

export default function RouletteTable({ onAddBet, betAmount, winningNumber }: Props) {
  const [winhover, setWinhover] = useState<number>(0)
  
  setTimeout(() => {
    if (winningNumber) {
      setWinhover(winningNumber);
    }
  }, 4200);

  const handleClick = (type: string, value: number | number[] | string) => {
    // Convert string values to appropriate number format for bet types
    let betValue: number | number[] = 0;
    if (typeof value === 'string') {
      if (value === 'odd') betValue = 0; // Use 0 as placeholder for odd
      else if (value === 'even') betValue = 0; // Use 0 as placeholder for even
      else if (value === 'red') betValue = 0; // Use 0 as placeholder for red
      else if (value === 'black') betValue = 0; // Use 0 as placeholder for black
      else if (value === '1-18') betValue = 0; // Use 0 as placeholder for low
      else if (value === '19-36') betValue = 0; // Use 0 as placeholder for high
      else betValue = Number(value);
    } else {
      betValue = value;
    }
    onAddBet({ type, value: betValue, amount: betAmount });
  };

  return (
    <div className="bg-green-800 rounded-2xl p-4 shadow-xl mt-10 text-center select-none">
      {/* Number Grid */}
      <div className="grid grid-cols-12 gap-1 mb-4">
        <div
          onClick={() => handleClick("number", 0)}
          className={`col-span-2 p-2 text-white font-bold cursor-pointer rounded transition
            ${winningNumber === 0 ? "bg-yellow-500 animate-pulse" : "bg-green-600 hover:bg-green-700"}`}
        >
          0
        </div>

        <div className="col-span-10 grid grid-cols-3 gap-1">
          {Array.from({ length: 36 }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              onClick={() => handleClick("number", n)}
              className={`p-2 rounded text-white font-semibold cursor-pointer transition
                ${redNumbers.includes(n)
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-black hover:bg-gray-800"
                }
                ${winhover === n ? "ring-4 ring-yellow-400 scale-105 animate-pulse" : ""}
              `}
            >
              {n}
            </div>
          ))}
        </div>
      </div>

      {/* Other Bets */}
      <div className="grid grid-cols-6 gap-2">
        <button
          onClick={() => handleClick("odd_even", "odd")}
          className="bg-blue-700 hover:bg-blue-800 rounded p-2 text-white font-semibold"
        >
          Odd
        </button>
        <button
          onClick={() => handleClick("odd_even", "even")}
          className="bg-blue-700 hover:bg-blue-800 rounded p-2 text-white font-semibold"
        >
          Even
        </button>
        <button
          onClick={() => handleClick("color", "red")}
          className="bg-red-600 hover:bg-red-700 rounded p-2 text-white font-semibold"
        >
          Red
        </button>
        <button
          onClick={() => handleClick("color", "black")}
          className="bg-black hover:bg-gray-800 rounded p-2 text-white font-semibold"
        >
          Black
        </button>
        <button
          onClick={() => handleClick("range", "1-18")}
          className="bg-gray-700 hover:bg-gray-800 rounded p-2 text-white font-semibold"
        >
          1–18
        </button>
        <button
          onClick={() => handleClick("range", "19-36")}
          className="bg-gray-700 hover:bg-gray-800 rounded p-2 text-white font-semibold"
        >
          19–36
        </button>
      </div>
    </div>
  );
}
