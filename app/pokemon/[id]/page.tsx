import { getPokemonByName } from "./../../../lib/pokemonAPI";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const data = await getPokemonByName(id);

  return <div>{JSON.stringify(data)}</div>;
}
