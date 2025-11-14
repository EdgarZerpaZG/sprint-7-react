import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl } from "../utils/getImgURL";

export default function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState<any>(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}/`)
      .then((res) => res.json())
      .then(setFilm);
  }, [id]);

  if (!film) return <p>Loading film...</p>;

  const imageUrl = getImageUrl("films", `${id}.jpg?v=2`);

  return (
    <main className="text-white p-8">
      <section className="md:flex block">
        <div className="flex-1 justify-center mb-5">
           <img
            src={imageUrl}
            alt={film.title}
            className="w-80 h-auto object-cover rounded-xl mx-auto"
            onError={(e) => ((e.target as HTMLImageElement).src = "/default-film.png")}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3 text-amber-300 uppercase">{film.title}</h2>
          <p><strong className="text-amber-300">Episode:</strong> {film.episode_id}</p>
          <p><strong className="text-amber-300">Director:</strong> {film.director}</p>
          <p><strong className="text-amber-300">Release Date:</strong> {film.release_date}</p>
        </div>
      </section>
    </main>
  );
}