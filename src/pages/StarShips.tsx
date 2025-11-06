import { useEffect, useState } from "react";
import T1 from "../components/title/tOne";
import T2 from "../components/title/tTwo";
import { ShowShipsHistory } from "../data/apiMain";
import StarshipBox from "../components/starship/starshipBox";
import type { StarShipEntry } from "../data/apiTypes";

export default function StarShips() {
  const [ships, setShips] = useState<StarShipEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    async function fetchShips() {
      setLoading(true);
      const data = await ShowShipsHistory(page);
      setShips((prev) => [...prev, ...data]);
      setHasNext(data.length > 0);
      setLoading(false);
    }
    fetchShips();
  }, [page]);

  return (
    <main className="h-full pb-20">
      <section className="text-center">
        <T1 style="text-center text-3xl font-bold underline pb-5 text-amber-300" title="StarShips 🚀"/>
        <T2 style="text-center text-xl text-amber-300" title="Starships collection" />
      </section>
      <section className="w-full max-w-2xl mx-auto">
        <div className="mt-10 space-y-5">
          {ships.length > 0 ? (
            ships.map((ship, index) => (
              <StarshipBox key={index} name={ship.name} model={ship.model} />
            ))
          ) : (
            <p className="text-gray-500 mt-5">No starships found.</p>
          )}
        </div>

        {hasNext && (
          <div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="mt-10 bg-blue-600 hover:bg-blue-700 text-white mx-auto block px-5 py-2 rounded cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}