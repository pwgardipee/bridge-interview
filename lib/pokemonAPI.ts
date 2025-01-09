// Define constants
const BASE_URL = "https://pokeapi.co/api/v2/pokemon"; // Base URL for the Pokemon API


/**
 * Fetches all Pokemon from the API
 * @param page - The page number to fetch
 * @returns The Pokemon data
 */
export async function getAllPokemon(page: number, limit: number) {
  try {
    // Calculate the offset
    const offset = page * limit;
    // Fetch the Pokemon
    const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);

    // Throw an error if the response fails
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.status} ${response.statusText}`);
    }

    // Return the Pokemon data
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    // Throw an error if the response fails
    throw new Error(`Failed to fetch Pokemon list: ${error}`);
  }
}

/**
 * Fetches a Pokemon by its name
 * @param name - The name of the Pokemon to fetch
 * @returns The Pokemon data
 */
export async function getPokemonByName(name: string) {
  try {
    // Fetch the Pokemon
    const response = await fetch(`${BASE_URL}/${name}`);

    // Throw an error if the response fails
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${response.status} ${response.statusText}`);
    }

    // Return the Pokemon data
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    // Throw an error if the response fails
    throw new Error(`Failed to fetch Pokemon details: ${error}`);
  }
}
