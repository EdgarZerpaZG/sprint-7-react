import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import getAPIResponse from "../data/apiConnect";
import type { APIResponse, StarshipDetails } from "../types/apiTypes";

interface StarWarsContextType {
  baseUrls: APIResponse | null;
  starships: StarshipDetails[];
  films: any[];
  people: any[];
  loading: boolean;
  error: string | null;
  fetchStarships: () => Promise<void>;
  fetchFilms: () => Promise<void>;
  fetchPeople: () => Promise<void>;
}

const StarWarsContext = createContext<StarWarsContextType | undefined>(undefined);

export function StarWarsProvider({ children }: { children: ReactNode }) {

  const [baseUrls, setBaseUrls] = useState<APIResponse | null>(null);
  const [starships, setStarships] = useState<StarshipDetails[]>([]);
  const [films, setFilms] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBaseUrls() {
      const data = await getAPIResponse();
      setBaseUrls(data);
      setLoading(false);
    }
    loadBaseUrls();
  }, []);

  async function fetchStarships() {
    if (!baseUrls?.starships) return;
    setLoading(true);
    try {
      const res = await fetch(baseUrls.starships);
      const data = await res.json();
      setStarships(data.results);
    } catch (err) {
      setError("Error fetching starships");
    } finally {
      setLoading(false);
    }
  }

  async function fetchFilms() {
    if (!baseUrls?.films) return;
    setLoading(true);
    try {
      const res = await fetch(baseUrls.films);
      const data = await res.json();
      setFilms(data.results);
    } catch (err) {
      setError("Error fetching films");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPeople() {
    if (!baseUrls?.people) return;
    setLoading(true);
    try {
      const res = await fetch(baseUrls.people);
      const data = await res.json();
      setPeople(data.results);
    } catch (err) {
      setError("Error fetching people");
    } finally {
      setLoading(false);
    }
  }


    return (
    <StarWarsContext.Provider
      value={{
        baseUrls,
        starships,
        films,
        people,
        loading,
        error,
        fetchStarships,
        fetchFilms,
        fetchPeople,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
}

export function useStarWars() {
  const context = useContext(StarWarsContext);
  if (!context) throw new Error("useStarWars must be used within a StarWarsProvider");
  return context;
}