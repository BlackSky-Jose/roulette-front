import { useState, useEffect } from "react";

interface WheelProps {
  resultNumber: number | null;
  onSpinStart: () => void;
  onSpinEnd: () => void;
}

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
  27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
  7, 28, 12, 35, 3, 26,
];

const redNumbers = new Set([
  32, 19, 21, 25, 34, 27, 36, 30, 23, 5,
  16, 1, 14, 9, 18, 7, 12, 3,
]);

export default function RouletteWheel2({ resultNumber, onSpinStart, onSpinEnd }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const segmentAngle = 360 / numbers.length;

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);
    onSpinStart();

    // Start with a random fast spin
    const randomExtra = (Math.floor(Math.random() * 60 + 6)) * 360;
    // const spinRotation = randomExtra;
    setRotation(randomExtra);
  };

  useEffect(() => {
    if (spinning && resultNumber !== null) {
      const index = numbers.indexOf(resultNumber);
      if (index === -1) return;

      // The pointer should stop pointing at the winning number.
      // So we rotate the pointer instead of the wheel.
      const stopAngle = index * segmentAngle;
      const finalRotation = rotation + stopAngle;

      console.log(
        " resultNumber=>", resultNumber,
        "index=>", index,
        "rotation=>", rotation,
        "stopAngle=>", stopAngle,
        "finalRotation=>", finalRotation
      );

      setTimeout(() => {
        setRotation(finalRotation);
        setTimeout(() => {
          setSpinning(false);
          onSpinEnd();
        }, 4000);
      }, 300);
    }
  }, [resultNumber]);

  return (
    <div className="flex flex-col items-center">
      <div className="roulette-wheel-container relative">
        
        {/* Fixed Plate (does NOT rotate) */}
        <div className="plate absolute top-1/2 left-1/2">
          <ul className="inner">
            {numbers.map((num, i) => {
              const color =
                num === 0 ? "bg-green-600" : redNumbers.has(num) ? "bg-red-600" : "bg-black";
              const rotate = i * segmentAngle;

              return (
                <li
                  key={i}
                  data-bet={num}
                  className={`number ${color}`}
                  style={{ transform: `rotateZ(${rotate}deg)` }}
                >
                  <label>
                    <input type="radio" name="pit" value={num} />
                    <span className="pit">{num}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Rotating Pointer */}
        <div
          className="pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)"
              : "none",
          }}
        >
          {/* Pointer indicator */}
          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full top-2 left-1/2 transform -translate-x-1/2 shadow-lg shadow-yellow-400/50"></div>
          {/* Pointer triangle */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[30px] border-t-yellow-500"></div>
        </div>

        {/* Center decorative hub */}
   
      </div>

      {/* Spin Button */}
      <button
        onClick={startSpin}
        disabled={spinning}
        className={`mt-6 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all transform ${
          spinning
            ? "bg-gray-600 cursor-not-allowed opacity-50"
            : "bg-red-600 hover:bg-red-700 hover:scale-105 shadow-lg"
        }`}
      >
        {spinning ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">Ͽ</span>
            Spinning...
          </span>
        ) : (
          <span className="flex items-center gap-2">
             Spin Wheel
          </span>
        )}
      </button>
    </div>
  );
}
