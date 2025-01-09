
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { getPokemonByName } from "./../../../lib/pokemonAPI";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get the id from the params
  const id = (await params).id;

  // Get the pokemon data from the API
  const data = await getPokemonByName(id);

  // Create an array of images from the pokemon data
  const images = [data.sprites.front_default, data.sprites.back_default, data.sprites.front_shiny, data.sprites.back_shiny]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {images.map((image: string) => (
                  <Tab
                    key={image}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img alt="Image Tile" src={image} className="size-full object-cover" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {images.map((image: string) => (
                <TabPanel key={image}>
                  <img alt="Main Image" src={image} className="aspect-square w-full object-cover sm:rounded-lg" />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{data.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl tracking-tight text-gray-900">
                Base Experience: {data.base_experience}
              </p>
            </div>
            <div className="mt-6">
              <div className="space-y-6 text-base text-gray-700" >
                <b>Moves:</b> {data.moves.map((move: {move: {name: string}}) => move.move.name).join(", ")}
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">

                <Disclosure as="div">
                  <h3>
                    <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                      <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                        Statistics
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pb-6">
                    <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
                      {data.stats.map((stat: { stat: { name: string }, base_stat: number }) => (
                        <li key={stat.stat.name} className="pl-2">
                          <b>{stat.stat.name}</b>: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
