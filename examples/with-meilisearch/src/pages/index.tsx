import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  InstantSearch,
  Hits,
  Highlight,
  connectSearchBox,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import logo from "../assets/meilisearch.svg";

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
  { primaryKey: "id" },
);

interface HitProps {
  hit: {
    name: string;
    image: string;
    description: string;
    genres: string[];
  };
}

interface SearchBoxProps {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: Function;
}

const SearchBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
}: SearchBoxProps) => (
  <form noValidate action="" role="search" className="mb-12">
    <input
      type="search"
      value={currentRefinement}
      placeholder="Search Steam video games"
      onChange={(event) => refine(event.currentTarget.value)}
      className="w-full h-10 px-3 overflow-hidden rounded-lg shadow-md"
    />
    {isSearchStalled ? (
      <div className="my-5 text-center text-primary">Loading...</div>
    ) : (
      ""
    )}
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Hit = ({ hit }: HitProps) => {
  return (
    <div className="p-5 mb-5 space-y-6 bg-gray-100 border sm:flex sm:space-y-0 sm:space-x-8 sm:flex-row border-white/25 bg-opacity-5 backdrop-blur-sm rounded-xl">
      <Image
        src={hit.image}
        width="0"
        height="0"
        sizes="100vw"
        alt={hit.name + " steam banner"}
        className="w-full sm:max-w-[230px] h-auto rounded-xl"
      ></Image>
      <div className="flex flex-col justify-center">
        <div className="mb-3 text-lg leading-5 text-gray-100">
          <Highlight attribute="name" hit={hit} tagName="span" />
        </div>
        <div className="text-sm text-gray-300">
          <Highlight attribute="genres" hit={hit} tagName="span" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <main className="py-12 mx-3 font-sans sm:mx-auto sm:max-w-md">
        <h1 className="mb-12">
          <Link href="https://meilisearch.com/docs" target="_blank">
            <Image
              src={logo}
              alt="Meilisearch"
              title="Meilisearch docs"
            ></Image>
          </Link>
        </h1>
        <InstantSearch
          indexName="steam-video-games"
          searchClient={searchClient}
        >
          <CustomSearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </main>
    </div>
  );
}
