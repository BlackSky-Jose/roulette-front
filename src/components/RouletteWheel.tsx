import { useState, useEffect } from "react";

interface WheelProps {
  resultNumber: number | null;
  onSpinStart: () => void;
  onSpinEnd: () => void;
}

export default function RouletteWheel({ resultNumber, onSpinStart, onSpinEnd }: WheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segmentAngle = 360 / 37; // 37 segments for numbers 0–36

  // Start spinning immediately when "Spin" is clicked
  const spin = () => {
    if (spinning) return;
    onSpinStart();
    setSpinning(true);

    // initial fast random spin while waiting for backend
    const quickSpin = rotation + 360 * 4 + Math.random() * 360;
    setRotation(quickSpin);
  };

  // When backend result arrives
  useEffect(() => {
    if (resultNumber !== null && spinning) {
      const stopAngle = 360 - resultNumber * segmentAngle;
      const finalRotation = rotation + 360 * 4 + stopAngle; // 4 more full spins before stopping

      setTimeout(() => {
        setRotation(finalRotation);
        setTimeout(() => {
          setSpinning(false);
          onSpinEnd();
        }, 4200); // wait for animation
      }, 300);
    }
  }, [resultNumber]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-lg"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
        }}
      >
        <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-2 left-1/2 transform -translate-x-1/2"></div>
        <span className="text-white text-3xl font-bold"></span>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-4 px-4 py-2 rounded-xl text-white font-semibold transition 
          ${spinning ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
      >
        {spinning ? "Spinning..." : "Spin Wheel"}
      </button>
    </div>
  );
}
