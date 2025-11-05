import { useEffect, useState } from "react";
import StarWars from "../assets/star_wars.svg";
import T1 from "../components/title/tOne";
import T2 from "../components/title/tTwo";
import { ShowShipsHistory } from "../data/apiMain";
import StarshipBox from "../components/starship/starshipBox";
import type { ShipEntry } from "../data/apiTypes";

export default function StarShips() {
  const [ships, setShips] = useState<ShipEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShips() {
      const data = await ShowShipsHistory();
      setShips(data);
      setLoading(false);
    }
    fetchShips();
  }, []);

  return (
    <main className="flex justify-center items-center h-full">
      <section className="text-center w-full max-w-2xl relative">
        <img
          src={StarWars}
          alt="Star Wars logo"
          className="mx-auto mb-3 h-auto w-28"
        />
        <T1
          style="text-center text-3xl font-bold underline pb-5"
          title="StarShips 🚀"
        />
        <T2 style="text-center text-xl" title="Starships collection" />

        {loading ? (
          <p className="text-gray-500 mt-5">Loading starships...</p>
        ) : (
          <div className="mt-10 space-y-5">
            {ships.length > 0 ? (
              ships.map((ship, index) => (
                <StarshipBox key={index} name={ship.name} model={ship.model} />
              ))
            ) : (
              <p className="text-gray-500 mt-5">No starships found.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}