import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Home from "./pages/Home";
import StarShips from "./pages/StarShips";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starships" element={<StarShips />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}