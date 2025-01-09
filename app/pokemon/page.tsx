"use client";
import { useEffect, useState } from "react";
import { getAllPokemon } from "./../../lib/pokemonAPI";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
// Define the number of Pokemon to fetch per page
const PAGE_SIZE = 20;

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <h1 className="text-2xl font-bold mb-4">All Pokemon</h1>
      {data && data.results && (
        <div className="max-h-[600px] overflow-y-auto">
          <Table data={data.results} />
        </div>
      )}
      <Pagination numberOfPages={numPages} currentPage={currentPage} onPageChange={setPageAndFetchPageOfPokemon} />
    </div>
  );
}
