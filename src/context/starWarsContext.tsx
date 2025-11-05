import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface StarWarsState {
  starships: StarshipDetails[];
  films: Film[];
  people: Person[];
  loading: boolean;
  fetchStarships: () => Promise<void>;
  fetchFilms: () => Promise<void>;
  fetchPeople: () => Promise<void>;
}
const StarWarsContext = createContext<StarWarsState | undefined>(undefined);

export function StarWarsProvider({ children }: { children: ReactNode }) {
    return (
        <StarWarsContext.Provider value={undefined}>
            {children}
        </StarWarsContext.Provider>
    );
}

export function useStarWars() {
  const context = useContext(StarWarsContext);
  if (!context) {
    throw new Error("useShip must be used within a ShipProvider");
  }
  return context;
}