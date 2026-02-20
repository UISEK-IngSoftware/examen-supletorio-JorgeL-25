[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/MEusb-t9)
# Examen Final - Aplicación Ionic The Simpsons

## Datos del estudiantes
- Nombre: ______________________

## 📋 Objetivo

Desarrollar una aplicación móvil utilizando Ionic + React que muestre una lista de personajes de The Simpsons consumiendo datos de una API REST externa, implementando una arquitectura en capas.

## 🎯 Requisitos del Proyecto

### Funcionalidad Principal

Los estudiantes deberán implementar una aplicación que:

1. **Consuma la API de The Simpsons** para obtener la lista de personajes de la primera página
2. **Muestre los personajes** en una lista ordenada
3. **Implemente arquitectura en capas**: servicios, interfaces (modelos) y vistas

### API a Utilizar

**Documentación Oficial:** [https://thesimpsonsapi.com/#docs](https://thesimpsonsapi.com/#docs)

**Endpoint:** `https://thesimpsonsapi.com/api/characters`

#### Configuración con Variables de Entorno

**IMPORTANTE:** La URL base de la API debe estar configurada en un archivo `.env` en la raíz del proyecto.

**Archivo `.env`:**
```env
VITE_API_BASE_URL=https://thesimpsonsapi.com/api
```

**NOTA:** En Vite, las variables de entorno deben tener el prefijo `VITE_` para estar disponibles en el cliente.

#### Parámetros de la API

La API soporta los siguientes parámetros para el endpoint de characters:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `page` | number | Número de página (cada página contiene 20 items) |

#### Ejemplo de URL para la primera página:
```
https://thesimpsonsapi.com/api/characters?page=1
```

#### Estructura de la Respuesta

La API retorna un **objeto** con información de paginación y un array de personajes en el campo `results`:

```json
{
  "count": 1182,
  "next": "https://thesimpsonsapi.com/api/characters?page=2",
  "prev": null,
  "pages": 60,
  "results": [
    {
      "id": 1,
      "age": 39,
      "birthdate": "1956-05-12",
      "gender": "Male",
      "name": "Homer Simpson",
      "occupation": "Safety Inspector",
      "portrait_path": "/character/1.webp",
      "phrases": [
        "Doh!",
        "Why you little...!",
        "Woo-hoo!",
        "Mmm... (food)... *drooling*"
      ],
      "status": "Alive"
    },
    {
      "id": 2,
      "age": 39,
      "birthdate": null,
      "gender": "Female",
      "name": "Marge Simpson",
      "occupation": "Unemployed",
      "portrait_path": "/character/2.webp",
      "phrases": [
        "Hrmmm...",
        "Now its Marges time to shine!"
      ],
      "status": "Alive"
    },
    {
      "id": 3,
      "age": 10,
      "birthdate": "1980-02-23",
      "gender": "Male",
      "name": "Bart Simpson",
      "occupation": "Student at Springfield Elementary School",
      "portrait_path": "/character/3.webp",
      "phrases": [
        "¡Ay Caramba!",
        "Eat my shorts!",
        "I didnt do it!"
      ],
      "status": "Alive"
    }
  ]
}
```

**Nota:** 
- Cada página contiene exactamente 20 personajes en el array `results`
- Los personajes están en la propiedad `results`, no en la raíz
- Para este examen, solo se debe mostrar la primera página
- Algunos campos pueden ser `null` (ej: `birthdate`, `age`)

#### Campos del Objeto de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `count` | number | Número total de personajes en la base de datos |
| `next` | string \| null | URL de la siguiente página (null si es la última) |
| `prev` | string \| null | URL de la página anterior (null si es la primera) |
| `pages` | number | Número total de páginas disponibles |
| `results` | Character[] | Array con los personajes de la página actual |

#### Campos de Cada Personaje (en `results`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | Identificador único del personaje |
| `name` | string | Nombre del personaje |
| `age` | number \| null | Edad del personaje (puede ser null) |
| `birthdate` | string \| null | Fecha de nacimiento (formato: YYYY-MM-DD, puede ser null) |
| `gender` | string | Género (Male, Female) |
| `occupation` | string | Ocupación del personaje |
| `status` | string | Estado vital (Alive, Deceased) |
| `portrait_path` | string | Ruta de la imagen (debe concatenarse con base URL) |
| `phrases` | string[] | Array de frases icónicas del personaje |

#### URL Completa de las Imágenes

Las imágenes deben construirse concatenando:
```
https://thesimpsonsapi.com + portrait_path
```

Ejemplo: `https://thesimpsonsapi.com/character/1.webp`

## 🛠️ Requisitos Técnicos

### Tecnologías Obligatorias
- **Framework:** Ionic 8.5.0 (ya instalado)
- **Librería UI:** React 19.0.0 (ya instalado)
- **Lenguaje:** TypeScript 5.9 (ya configurado)
- **HTTP Client:** Axios (**OBLIGATORIO** - debe instalarse)

### Instalación de Dependencias

**IMPORTANTE:** Antes de empezar, instala las dependencias necesarias:

```bash
npm install axios
```

### Componentes Ionic Recomendados
- `IonList` / `IonItem` - Para la lista de personajes
- `IonCard` - Para mostrar información del personaje
- `IonAvatar` - Para la imagen del personaje
- `IonHeader` / `IonToolbar` - Para el encabezado
- `IonContent` - Para el contenido principal
- `IonLoading` - Para indicar carga de datos

## 🏗️ Arquitectura del Proyecto (OBLIGATORIO)

El proyecto debe implementar una arquitectura en capas separando responsabilidades:

### 1. Capa de Modelos (Interfaces)

Crear archivo: `src/models/character.model.ts`

Define las interfaces TypeScript que representan la estructura de datos:

```typescript
// Interfaz para cada personaje
export interface Character {
  id: number;
  name: string;
  age: number | null;        // Puede ser null
  birthdate: string | null;  // Puede ser null
  gender: string;
  occupation: string;
  status: string;
  portrait_path: string;
  phrases: string[];
}

// Interfaz para la respuesta completa de la API
export interface CharactersResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Character[];
}
```

### 2. Capa de Servicios

Crear archivo: `src/services/character.service.ts`

Contiene la lógica de negocio y las llamadas a la API:

- Configurar Axios con la URL base desde `.env`
- Implementar función para obtener personajes de la primera página
- Manejar errores de la API
- Transformar datos si es necesario

**Estructura básica esperada:**
```typescript
import axios from 'axios';
import { Character, CharactersResponse } from '../models/character.model';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const characterService = {
  getCharacters: async (page: number = 1): Promise<Character[]> => {
    // Implementar llamada a la API
    // IMPORTANTE: La respuesta tiene la estructura CharactersResponse
    // Los personajes están en response.data.results
  }
};
```

### 3. Capa de Vistas

Archivo: `src/pages/Home.tsx`

Componente React que:
- Consume el servicio de characters
- Maneja estados (loading, error, data)
- Renderiza la UI con componentes Ionic
- Muestra la información de los personajes

## 📱 Funcionalidades Esperadas

### 1. Configuración de Variables de Entorno

**Crear archivo `.env` en la raíz del proyecto:**
```env
VITE_API_BASE_URL=https://thesimpsonsapi.com/api
```

**IMPORTANTE:** No olvidar agregar `.env` al `.gitignore` si contiene datos sensibles.

### 2. Implementar Capa de Modelos

**Archivo:** `src/models/character.model.ts`

- Definir interface `Character` con todos los campos de cada personaje
- Definir interface `CharactersResponse` para la respuesta completa de la API
- Usar tipos TypeScript apropiados para cada campo
- Marcar campos opcionales con `| null` cuando corresponda (age, birthdate)

### 3. Implementar Capa de Servicios

**Archivo:** `src/services/character.service.ts`

- Configurar instancia de Axios con la URL base desde `.env`
- Implementar función `getCharacters()` que:
  - Realice petición GET a `/characters?page=1`
  - La respuesta será un objeto con la estructura `CharactersResponse`
  - Extraer el array `results` de la respuesta
  - Retorne el array de tipo `Character[]` (campo `results`)
  - Maneje errores apropiadamente
- Construir URLs completas para las imágenes (base URL + portrait_path)

**IMPORTANTE:** Los personajes están en `response.data.results`, no en la raíz de la respuesta

### 4. Modificar Vista Home (`src/pages/Home.tsx`)

**IMPORTANTE:** Debes modificar la página Home existente para que cargue y muestre los personajes de The Simpsons desde la API.

#### Requisitos de la Vista Home:

- **Importar el servicio** de characters y el modelo
- **Usar hooks de React** (useState, useEffect) para:
  - Almacenar la lista de personajes
  - Manejar estado de carga
  - Manejar errores
- **Consumir la API** al cargar el componente (useEffect)
- **Mostrar una lista** de los personajes obtenidos (solo primera página)
- La API retorna un objeto con el campo `results` que contiene el array de 20 personajes
- Cada ítem de la lista debe mostrar:
  - **Imagen** del personaje (URL completa: `https://thesimpsonsapi.com` + portrait_path)
  - **Nombre** del personaje
  - **Ocupación** (occupation)
  - **Estado vital** (status: Alive/Deceased)
  - **Edad** (age) - OPCIONAL (puede ser null, manejar con `?? 'N/A'`)

#### Ejemplo de estructura de ítem:
```
┌─────────────────────────────────────┐
│ [Imagen]  Homer Simpson             │
│           Ocupación: Safety Inspector│
│           Estado: Alive              │
│           Edad: 39                   │
└─────────────────────────────────────┘
```

### 5. Manejo de Estados
- **Estado de carga (loading):** Mostrar `IonLoading` o spinner mientras se cargan los datos
- **Estado de error:** Mostrar mensaje si la API falla
- **Estado vacío:** Mostrar mensaje si no hay datos (aunque la API siempre retorna datos)

## 🎨 Criterios de Evaluación

**Total: 90 puntos**

| Criterio | Puntos |
|----------|--------|
| **Arquitectura en Capas** | **25 pts** |
| - Archivo .env con URL base de la API | 5 pts |
| - Capa de modelos (interfaces Character y CharactersResponse) | 7 pts |
| - Capa de servicios con Axios, consumo correcto y extracción de `results` | 10 pts |
| - Separación clara de responsabilidades | 3 pts |
| **Vista Home** | **30 pts** |
| - Integración correcta del servicio | 8 pts |
| - Visualización: imagen, nombre, ocupación, estado | 15 pts |
| - Construcción correcta de URLs de imágenes | 7 pts |
| **Manejo de Estados** | **18 pts** |
| - Estado de carga (loading) | 6 pts |
| - Manejo de errores | 6 pts |
| - Estado vacío o datos | 6 pts |
| **Diseño UI/UX** | **9 pts** |
| - Uso apropiado de componentes Ionic | 5 pts |
| - Diseño responsive y atractivo | 4 pts |
| **Calidad de Código** | **8 pts** |
| - TypeScript: tipos correctos y sin errores | 4 pts |
| - Código limpio y comentado | 4 pts |
| **TOTAL** | **90 pts** |

## 🚀 Instrucciones de Inicio

### Instalación
```bash
npm install
```

### Configurar Variables de Entorno
1. Crear archivo `.env` en la raíz del proyecto
2. Agregar: `VITE_API_BASE_URL=https://thesimpsonsapi.com/api`

### Ejecutar en Desarrollo
```bash
ionic serve
```


## 📝 Notas Importantes

1. **Variables de Entorno:** La URL base de la API **DEBE** estar en el archivo `.env` usando el prefijo `VITE_` para Vite
2. **Arquitectura en Capas:** Es **OBLIGATORIO** separar el código en:
   - **Modelos** (interfaces): `src/models/character.model.ts`
   - **Servicios** (lógica): `src/services/character.service.ts`
   - **Vistas** (UI): `src/pages/Home.tsx`
3. **Estructura de la Respuesta:** La API retorna un objeto, NO un array directo. Los personajes están en el campo `results`
4. **Solo Primera Página:** Mostrar únicamente la primera página de personajes (20 personajes del campo `results`)
5. **URLs de Imágenes:** Construir URL completa concatenando base URL + portrait_path
6. **Campos Nullable:** Algunos campos pueden ser `null` (age, birthdate), usar tipos `| null` en TypeScript
7. **Instalación de Axios:** Lo primero es instalar Axios con `npm install axios`
8. **Uso de Axios:** Todas las llamadas a la API deben hacerse con Axios, no con Fetch API
9. **TypeScript:** Utilizar tipos e interfaces para todo el código
10. **Tiempo de desarrollo:** [Especificar duración del examen]
11. **Entrega:** Subir proyecto a repositorio Git (GitHub/GitLab)
12. **Documentación:** Incluir comentarios en el código TypeScript

## 💡 Consejos

- Comenzar por crear el archivo `.env` y las interfaces (ambas: `Character` y `CharactersResponse`)
- Luego implementar el servicio con Axios
- **RECORDAR:** Los personajes están en `response.data.results`, no en `response.data` directamente
- Finalmente, modificar la vista Home para consumir el servicio
- Probar cada capa antes de continuar con la siguiente
- Usar `console.log()` para verificar los datos que retorna la API
- Las imágenes se construyen como: `https://thesimpsonsapi.com${portrait_path}`
- Manejar campos que pueden ser `null` con operador opcional: `character.age ?? 'N/A'`

## 🆘 Recursos de Ayuda

- [Documentación Ionic](https://ionicframework.com/docs)
- [Documentación React](https://react.dev)
- [The Simpsons API Docs](https://thesimpsonsapi.com/#docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🔍 Ejemplo de Flujo de Datos

```
.env (VITE_API_BASE_URL)
    ↓
character.service.ts (Axios + API call)
    ↓
Respuesta API: { count, next, prev, pages, results: [...] }
    ↓
Extraer array "results"
    ↓
Iterfaz (modelo) (TypeScript interfaces)
    ↓
Home.tsx (React component + Ionic UI)
    ↓
Usuario ve lista de personajes
```
