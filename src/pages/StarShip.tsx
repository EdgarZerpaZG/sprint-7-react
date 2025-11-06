import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { StarshipDetails } from "../data/apiTypes";
import { ShowShipsHistory } from "../data/apiMain";
import { slugify } from "../utils/slugify";

export default function StarShip() {
  const { slug } = useParams();
  const [ship, setShip] = useState<StarshipDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShip() {
      let found: StarshipDetails | null = null;
      let page = 1;
      while (!found) {
        const data = await ShowShipsHistory(page);
        const match = data.find((s) => slugify(s.name) === slug);
        if (match) {
          found = match;
        } else if (data.length === 0) break;
        page++;
      }
      setShip(found);
      setLoading(false);
    }

    fetchShip();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading starship...</p>;
  if (!ship) return <p className="text-center text-gray-500 mt-5">Starship not found.</p>;

  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="bg-gray-800 text-white p-8 rounded-md w-full">
        <h2 className="text-3xl font-bold mb-3">{ship.name}</h2>
        <div className="flex">
            <div className="flex-1">
                <p><strong>Model:</strong> {ship.model}</p>
                <p><strong>Manufacturer:</strong> {ship.manufacturer}</p>
                <p><strong>Cost:</strong> {ship.cost_in_credits} credits</p>
            </div>
            <div className="flex-1">
                <p><strong>Length:</strong> {ship.length} m</p>
                <p><strong>Speed:</strong> {ship.max_atmosphering_speed}</p>
                <p><strong>Crew:</strong> {ship.crew}</p>
            </div>
        </div>
      </section>
    </main>
  );
}