"use client";

import { useEffect, useState } from "react";
import { searchCocktailByName, getRandomCocktail } from "./lib/api/cocktail";
import type { Cocktail } from "./types";
import { useRouter } from "next/navigation";
import CocktailCard from "./components/Cocktail";

const Home = () => {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const router = useRouter();

  useEffect(() => {
    searchCocktailByName("margarita").then((data) => {
      setCocktails(data || []);
    });
  }, []);

  const handleSearch = async () => {
    const data = await searchCocktailByName(search);
    setCocktails(data || []);
  };

  const handleRandom = async () => {
    const cocktail = await getRandomCocktail();
    router.push(`/${cocktail.idDrink}`);
  };

  return (
    <div className="container">
      <h1>Buscador de Cocktails</h1>
      <div className="searchContainer">
        <input type="text"
          placeholder="Buscar cocktail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <button onClick={handleRandom}>Dime algo bonito</button>
      
      <div className="cocktailGrid">
        {cocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;