import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Home from "./pages/Home";
import StarShips from "./pages/StarShips";
import StarShip from './pages/StarShip'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starships/" element={<StarShips />} />
          <Route path="/starships/:slug" element={<StarShip />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}