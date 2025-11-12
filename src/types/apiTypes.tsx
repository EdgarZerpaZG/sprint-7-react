export interface APIResponse {
    films: string;
    people: string;
    planets: string;
    species: string;
    starships: string;
    vehicles: string;
}

export interface StarShipEntry {
    name: string;
    model: string;
}

export interface StarshipDetails {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    pilots: string[];
    films: string[];
}

export interface PilotsBoxProps {
  pilotUrls: string[];
}

export interface FilmsBoxProps {
  filmUrls: string[];
}