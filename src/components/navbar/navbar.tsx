import { Link } from "react-router-dom";
import StarWars from './../../assets/star_wars.svg';
import '../../App.css';

export default function Navbar() {
  return (
    <>
      <nav className="navbar flex justify-between py-5 fixed w-full bg-black z-10">
        <div>
          <Link className="px-4 py-2 mx-2 text-white font-bold text-xl" to="/">
            <img src={StarWars} alt="Star Wars Logo" className="h-auto w-24 inline-block ml-4" />
          </Link>
        </div>
        <div className="flex items-center uppercase">
          <Link className="px-4 py-2 mx-2 text-white hover:text-gray-500" to="/">Home</Link>
          <Link className="px-4 py-2 mx-2 text-white hover:text-gray-500" to="/starships">Starships</Link>
        </div>
      </nav>
    </>
  );
}