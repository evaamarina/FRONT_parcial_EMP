//Página dinámica de detalle: obtiene el id de la URL, llama a la API para su coktail y muestra su información completa

"use client";

import { getCocktailById } from "../lib/api/cocktail";
import type { Cocktail } from "../types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CocktailDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    if (id) {
      getCocktailById(Number(id)).then((res) => {
        setCocktail(res);
      });
    }
  }, [id]);

  if (!cocktail) return <p>Cargando...</p>;

  const ingredients = [
    cocktail.strIngredient1,
    cocktail.strIngredient2,
    cocktail.strIngredient3,
    cocktail.strIngredient4,
    cocktail.strIngredient5,
    cocktail.strIngredient6,
    cocktail.strIngredient7,
    cocktail.strIngredient8,
  ].filter(Boolean);

  return (
    <div className="detailContainer">
      <button className="backButton" onClick={() => router.back()}> Volver </button>

      <div className="detailCard">
        <img src={cocktail.strDrinkThumb} />

        <div className="detailInfo">
          <h1>{cocktail.strDrink}</h1>
          <p><strong>Categoría:</strong> {cocktail.strCategory}</p>
          <p><strong>Alcohol:</strong> {cocktail.strAlcoholic}</p>
          <p><strong>Vaso:</strong> {cocktail.strGlass}</p>
          <p><strong>Instrucciones:</strong> {cocktail.strInstructions}</p>
          <p><strong>Ingredientes:</strong> </p>
          {ingredients.map((ing, index) => (
            <p key={index}>{ing}</p>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;