export async function getAllPokemon(page: number) {
  try {
    const limit = 20;
    const offset = page * limit;
    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    return await result.json();
  } catch {
    console.log("error");
  }
}

export async function getPokemonByName(name: string) {
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await result.json();
  } catch {
    console.log("error");
  }
}
