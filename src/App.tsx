import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StarWarsProvider } from "./context/starWarsContext";
import Navbar from './components/navbar/navbar';
import Home from "./pages/Home";
import StarShips from "./pages/StarShips";
import StarShip from './pages/StarShip';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <>
      <StarWarsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/starships/" element={<StarShips />} />
            <Route path="/starships/:slug" element={<StarShip />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </StarWarsProvider>
    </>
  )
}