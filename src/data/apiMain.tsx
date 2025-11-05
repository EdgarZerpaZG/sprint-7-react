import getAPIResponse from "./apiConnect";
import type { ShipEntry } from "./apiTypes";

let shipsHistory: ShipEntry[] = [];

export async function ShowShipsHistory(): Promise<ShipEntry[]> {

    const shipData = await getAPIResponse();
    if (!shipData?.starships) return [];
    
    try {
        const response = await fetch(shipData.starships);
        const data = await response.json();

        shipsHistory = data.results.map((ship: any) => ({
        name: ship.name,
        model: ship.model,
        }));
    } catch (error) {
        console.error("Error loading starships:", error);
    }
    return shipsHistory;
}