import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl } from "../utils/getImgURL";

export default function Pilot() {
  const { id } = useParams();
  const [pilot, setPilot] = useState<any>(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then(setPilot);
  }, [id]);

  if (!pilot) return <p>Loading pilot...</p>;

  const imageUrl = getImageUrl("pilots", `${id}.jpg`);

  return (
    <main className="text-white p-8">
      <section className="md:flex block">
        <div className="flex-1 justify-center mb-5">
           <img
            src={imageUrl}
            alt={pilot.name}
            className="w-80 h-auto object-cover rounded-xl mx-auto"
            onError={(e) => ((e.target as HTMLImageElement).src = "/default-pilot.png")}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3 text-amber-300 uppercase">{pilot.name}</h2>
          <p><strong className="text-amber-300">Height:</strong> {pilot.height}</p>
          <p><strong className="text-amber-300">Mass:</strong> {pilot.mass}</p>
          <p><strong className="text-amber-300">Birth year:</strong> {pilot.birth_year}</p>
        </div>
      </section>
    </main>
  );
}