import { useState, useEffect } from 'react';
import type { PilotsBoxProps } from "../../types/apiTypes";
import { getImageUrl } from "../../utils/getImgURL";

export default function PilotsBox({ pilotUrls }: PilotsBoxProps) {

    const [pilots, setPilots] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPilots() {
        if (!pilotUrls || pilotUrls.length === 0) {
            setPilots([]);
            setLoading(false);
            return;
        }

        try {
            const responses = await Promise.all(pilotUrls.map((url) => fetch(url)));
            const data = await Promise.all(responses.map((r) => r.json()));
            setPilots(data.map((p) => ({ name: p.name, url: p.url })));
        } catch (error) {
            console.error("Error loading pilots:", error);
        } finally {
            setLoading(false);
        }
        }

        fetchPilots();
    }, [pilotUrls]);

    if (loading) return <p>Loading pilots...</p>;
    if (pilots.length === 0) return <p>No pilots</p>;

    return (
        <>
            <h2 className="text-3xl font-bold mb-3 text-center">Pilots</h2>
            <div className="md:flex block">
                {pilots.map((pilot, index) => (
                <div className="flex-1" key={index}>
                    <a href={`/pilot/${pilot.url.split("/").at(-2)}`} className="text-indigo-400 hover:underline" target="_blank">
                        <div className="text-center p-3">
                            <img src={getImageUrl("pilots", `${pilot.url.split("/").at(-2)}.jpg`)} alt={pilot.name} />
                            <h5>{pilot.name}</h5>
                        </div>
                    </a>
                </div>
                ))}
            </div>
        </>
    )
}