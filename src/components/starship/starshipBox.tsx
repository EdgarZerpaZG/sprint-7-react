import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { StarShipEntry } from "../../data/apiTypes";
import { slugify } from "../../utils/slugify";

export default function StarshipBox({ name, model }: StarShipEntry) {
  const slug = slugify(name);

  return (
    <div className="mb-5 bg-gray-800 p-5 rounded text-white">
        <div className="flex justify-between items-center">
            <div>
                <h4 className="font-bold mb-2 uppercase">{name}</h4>
                <p className="text-xs">{model}</p>
            </div>
            <div>
                <Link to={`/starships/${slug}`} className="text-white hover:text-gray-400" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                </Link>
            </div>
        </div>
    </div>
  );
}