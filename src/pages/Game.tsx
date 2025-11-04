import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RouletteWheel from "../components/RouletteWheel2";
import RouletteTable from "../components/RouletteTable2";
import type { Bet, SpinResult } from "../types";

export default function Game() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [message, setMessage] = useState<string>("");
  const [totalBetAmount, setTotalBetAmount] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    
    // Fetch balance from backend on page load
    const fetchBalance = async () => {
      try {
        const res = await api.get("/game/balance");
        setBalance(res.data.balance);
        localStorage.setItem("balance", res.data.balance.toString());
      } catch (err) {
        console.error("Failed to fetch balance:", err);
        // Fallback to localStorage if API call fails
        const storedBalance = localStorage.getItem("balance");
        if (storedBalance) setBalance(parseFloat(storedBalance));
      }
    };
    
    fetchBalance();
  }, [navigate]);

  useEffect(() => {
    const total = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setTotalBetAmount(total);
  }, [bets]);

  const handleSpinStart = async () => {
    setMessage("Spinning the wheel...");
    try {
      const res = await api.post("/game/spin", { bets });
      const { result, newBalance, totalPayout, totalBet } = res.data;

      setResult(result);
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance);

      // Wait until the spin ends to show message
      setTimeout(() => {
        // Success: payout > bet amount (player got more money than they bet)
        // Failure: payout < bet amount (player got less money than they bet)
        const isSuccess = totalPayout > totalBet;
        const netWin = totalPayout - totalBet;
        const netLoss = totalBet - totalPayout;
        
        if (isSuccess) {
          setMessage(`🎉 Success! You won $${netWin.toFixed(2)}! Total payout: $${totalPayout.toFixed(2)}. Number: ${result.number} (${result.color})`);
        } else {
          setMessage(`❌ Failed! You lost $${netLoss.toFixed(2)}. Refunded: $${totalPayout.toFixed(2)}. Number: ${result.number} (${result.color})`);
        }
      }, 4000); // same as wheel animation duration
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setMessage(error.response?.data?.message || "Spin failed");
    }
  };

  const removeBet = (index: number) => {
    setBets(bets.filter((_, i) => i !== index));
  };

  const clearAllBets = () => {
    setBets([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Roulette Game
            </h1>
            <p className="text-gray-300 text-sm">Welcome, <span className="text-yellow-400 font-semibold">{localStorage.getItem("username")}</span></p>
          </div>
          <div className="bg-yellow-500 p-4 rounded-2xl shadow-lg border-2 border-yellow-400">
            <div className="text-sm text-gray-900 font-medium mb-1">Balance</div>
            <div className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Wheel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <RouletteWheel
                resultNumber={result ? result.number : null}
                onSpinStart={handleSpinStart}
                onSpinEnd={() => setBets([])}
              />
            </div>
          </div>

          {/* Center Column - Table */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <RouletteTable
                winningNumber={result ? result.number : null}
                onAddBet={(b) => setBets([...bets, b])}
                betAmount={betAmount}
              />
            </div>
          </div>
        </div>

        {/* Betting Panel */}
        <div className="mt-6 bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bet Amount Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Bet Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={balance}
                  value={betAmount}
                  onChange={(e) => setBetAmount(Math.min(Number(e.target.value), balance))}
                  className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                  placeholder="Enter bet amount"
                />
                <div className="flex gap-2">
                  {[10, 50, 100, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105 ${
                        betAmount === amount
                          ? 'bg-yellow-500 text-gray-900 shadow-lg'
                          : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Bet Summary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-300">Total Bet</span>
                <span className="text-2xl font-bold text-yellow-400">${totalBetAmount.toFixed(2)}</span>
              </div>
              {totalBetAmount > 0 && (
                <button
                  onClick={clearAllBets}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white transition-all transform hover:scale-105 shadow-lg"
                >
                  Clear All Bets
                </button>
              )}
            </div>
          </div>

          {/* Active Bets List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Your Active Bets</h3>
            {bets.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {bets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${b.type === 'red' ? 'bg-red-500' : b.type === 'black' ? 'bg-black' : 'bg-green-500'}`}></div>
                      <span className="text-sm text-gray-300">
                        <span className="font-semibold text-white">{b.type}</span>
                        {Array.isArray(b.value) ? ` [${b.value.join(', ')}]` : ` ${b.value}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-semibold">${b.amount}</span>
                      <button
                        onClick={() => removeBet(i)}
                        className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg transition-all font-bold text-lg leading-none"
                        title="Remove bet"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No bets placed yet. Click on the table above to add bets.</p>
              </div>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center font-semibold ${
              message.includes('Success') || message.includes('won')
                ? 'bg-green-600 border border-green-500 text-white' 
                : message.includes('Failed') || message.includes('Lost') || message.includes('failed')
                ? 'bg-red-600 border border-red-500 text-white'
                : 'bg-blue-600 border border-blue-500 text-white'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
