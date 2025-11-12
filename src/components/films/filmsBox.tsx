import { useState, useEffect } from 'react';
import type { FilmsBoxProps } from "../../types/apiTypes";
import { getImageUrl } from "../../utils/getImgURL";

export default function FilmsBox({ filmUrls }: FilmsBoxProps) {

    const [films, setFilms] = useState<{ title: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFilms() {
        if (!filmUrls || filmUrls.length === 0) {
            setFilms([]);
            setLoading(false);
            return;
        }

        try {
            const responses = await Promise.all(filmUrls.map((url) => fetch(url)));
            const data = await Promise.all(responses.map((r) => r.json()));
            setFilms(data.map((f) => ({ title: f.title, url: f.url })));
        } catch (error) {
            console.error("Error loading films:", error);
        } finally {
            setLoading(false);
        }
        }

        fetchFilms();
    }, [filmUrls]);

    if (loading) return <p>Loading films...</p>;
    if (films.length === 0) return <p>No films</p>;

    return (
        <>
            <h2 className="text-3xl font-bold mb-3 text-center">Films</h2>
            <div className="md:flex block">
                {films.map((film, index) => (
                <div className="flex-1" key={index}>
                    <a href={`/film/${film.url.split("/").at(-2)}`} className="text-indigo-400 hover:underline" target="_blank">
                        <div className="text-center p-3">
                            <img src={getImageUrl("films", `${film.url.split("/").at(-2)}.jpg?v=2`)} alt={film.title} />
                            <h5>{film.title}</h5>
                        </div>
                    </a>
                </div>
                ))}
            </div>
        </>
    )
}