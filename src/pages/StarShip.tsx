import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { StarshipDetails } from "../types/apiTypes";
import { ShowShipsHistory } from "../data/apiMain";
import { getImageUrl } from "../utils/getImgURL";
import { Slugify } from "../utils/slugify";
import PilotsBox from './../components/pilots/pilotsBox';
import FilmsBox from './../components/films/filmsBox';

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
        const match = data.find((s) => Slugify(s.name) === slug);
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

  const imageUrl = getImageUrl("starships", `${Slugify(ship.name)}.png`);

  return (
    <main className="h-full">
      <section className="bg-gray-800 text-white p-8 rounded-md w-full mb-5">
        <h2 className="text-3xl font-bold mb-5 text-center text-amber-300 uppercase">{ship.name}</h2>
        <div className="flex justify-center mb-5">
           <img
            src={imageUrl}
            alt={ship.name}
            className="w-96 h-auto object-cover rounded-xl"
            onError={(e) => ((e.target as HTMLImageElement).src = "/default-starship.png")}
          />
        </div>
        <div className="md:flex block">
            <div className="flex-1">
                <p><strong className="text-amber-300">Model:</strong> {ship.model}</p>
                <p><strong className="text-amber-300">Manufacturer:</strong> {ship.manufacturer}</p>
                <p><strong className="text-amber-300">Cost:</strong> {ship.cost_in_credits} credits</p>
            </div>
            <div className="flex-1">
                <p><strong className="text-amber-300">Length:</strong> {ship.length} m</p>
                <p><strong className="text-amber-300">Speed:</strong> {ship.max_atmosphering_speed}</p>
                <p><strong className="text-amber-300">Crew:</strong> {ship.crew}</p>
            </div>
        </div>
      </section>
      <section className="bg-gray-800 text-white p-8 rounded-md w-full mb-5">
        <PilotsBox pilotUrls={ship.pilots} />
      </section>
      <section className="bg-gray-800 text-white p-8 rounded-md w-full mb-5">
        <FilmsBox filmUrls={ship.films} />
      </section>
    </main>
  );
}