"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPokemon } from "./../../lib/pokemonAPI";
import Pagination from "@/components/pagination";
// Define the number of Pokemon to fetch per page
const PAGE_SIZE = 20;

export default function page() {
  const [data, setData] = useState<any>();
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchPageOfPokemon = async (page: number) => {
    const data = await getAllPokemon(page, PAGE_SIZE);
    const count = data.count;
    const numPages = Math.round(count / PAGE_SIZE);
    setNumPages(numPages);
    setData(data);
  };

  const setPageAndFetchPageOfPokemon = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchPageOfPokemon(pageNumber);
  };

  useEffect(() => {
    fetchPageOfPokemon(0);
  }, []);

  return (
    <div>
      {data && data.results && (
        <ul>
          {data.results.map((result: any) => {
            return (
              <li key={result.name}>
                <Link href={`/pokemon/${result.name}`}>{result.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
      <Pagination numberOfPages={numPages} currentPage={currentPage} onPageChange={setPageAndFetchPageOfPokemon} />
    </div>
  );
}
