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
      <section>
        <div className="flex justify-center mb-5">
           <img
            src={imageUrl}
            alt={pilot.name}
            className="w-50 h-auto object-cover rounded-xl"
            onError={(e) => ((e.target as HTMLImageElement).src = "/default-pilot.png")}
          />
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-amber-300 uppercase">{pilot.name}</h2>
        <p><strong className="text-amber-300">Height:</strong> {pilot.height}</p>
        <p><strong className="text-amber-300">Mass:</strong> {pilot.mass}</p>
      </section>
    </main>
  );
}