import getAPIResponse from "./apiConnect";
import type { StarshipDetails } from "../types/apiTypes";

export async function ShowShipsHistory(page: number = 1): Promise<StarshipDetails[]> {
  const shipData = await getAPIResponse();
  if (!shipData?.starships) return [];

  try {
    const response = await fetch(`${shipData.starships}?page=${page}`);
    const data = await response.json();

    return data.results.map((ship: any) => ({
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      cost_in_credits: ship.cost_in_credits,
      length: ship.length,
      max_atmosphering_speed: ship.max_atmosphering_speed,
      crew: ship.crew,
      pilots: ship.pilots.map((pilots: string) => pilots),
      films: ship.films.map((films: string) => films),
    }));
  } catch (error) {
    console.error("Error loading starships:", error);
    return [];
  }
}