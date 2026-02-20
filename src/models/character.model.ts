// src/models/character.model.ts

export interface Character {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;
  gender: string;
  occupation: string;
  status: string;

  // La API entrega un path como "/character/1.webp"
  portrait_path: string;

  phrases: string[];

  // Nosotros lo armamos para la UI (CDN)
  imageUrl?: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Character[];
}
