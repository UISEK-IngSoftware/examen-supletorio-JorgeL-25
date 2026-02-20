// src/services/character.service.ts
import axios from "axios";
import type { Character, CharactersResponse } from "../models/character.model";

// Base URL API desde .env (Vite)
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// CDN real de imágenes (esto sí funciona)
const IMAGE_CDN_BASE = "https://cdn.thesimpsonsapi.com/500";

const api = axios.create({
  baseURL: API_BASE_URL, // https://thesimpsonsapi.com/api
  timeout: 15000,
});

export const characterService = {
  /**
   * Obtiene personajes (para el examen: solo page=1)
   * IMPORTANTE: la lista viene en response.data.results
   */
  getCharacters: async (page: number = 1): Promise<Character[]> => {
    try {
      const response = await api.get<CharactersResponse>("/characters", {
        params: { page },
      });

      const results = response.data.results;

      // Construir URL de imagen usando CDN
      // portrait_path suele venir tipo "/character/1.webp"
      return results.map((c) => {
        const portrait = c.portrait_path ?? "";

        // Si por alguna razón un día viene URL absoluta, la usamos tal cual
        const imageUrl = portrait.startsWith("http")
          ? portrait
          : `${IMAGE_CDN_BASE}${portrait}`;

        return {
          ...c,
          imageUrl,
        };
      });
    } catch (error: any) {
      console.error("Error API:", error);
      throw new Error(
        error?.message || "No se pudieron obtener los personajes"
      );
    }
  },
};
