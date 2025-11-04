import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Game from "./pages/Game";
import './style.css'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
