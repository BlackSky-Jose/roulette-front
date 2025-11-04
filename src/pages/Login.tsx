import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { useremail, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("balance", res.data.balance);
      navigate("/game");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Roulette
          </h1>
          <p className="text-gray-300 text-sm">Welcome back! Please login to continue</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-600 border border-red-500 rounded-xl text-white text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
        </form>
        
        <p className="text-sm mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
