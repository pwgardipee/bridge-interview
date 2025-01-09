import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 justify-center items-center mt-24">
        <img src="https://logos-world.net/wp-content/uploads/2020/07/Pokemon-Logo.jpg" alt="Pokemon Logo" className="w-24" />
        <Link href="/pokemon">
          <h1 className="text-xl font-bold">View All Pokemon</h1>
        </Link>
        <div className="text-gray-400">
          (The root path wasn&apos;t used during my interview, so this is a quick placeholder)
        </div>
      </main>
    </div>
  );
}
