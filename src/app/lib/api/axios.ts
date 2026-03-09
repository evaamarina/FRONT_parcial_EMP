//Crea una instancia con la URL base de la API y timeout para hacer peticiones HTTP
import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
  timeout: 5000,
});