import { Link } from "react-router-dom";
import Vite from '/vite.svg'
import '../../App.css';

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between py-5 shadow-lg fixed w-full bg-white z-10">
        <div>
          <Link className="px-4 py-2 mx-2 text-black font-bold text-xl" to="/">
            <img src={Vite} alt="Vite Logo" className="h-8 w-8 inline-block ml-4" />
          </Link>
        </div>
        <div>
          <Link className="px-4 py-2 mx-2 text-black hover:text-gray-500" to="/">Home</Link>
        </div>
      </nav>
    </>
  );
}