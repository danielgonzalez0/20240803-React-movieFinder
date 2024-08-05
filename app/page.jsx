"use client"

import SearchInput from "@/components/SearchInput";
import { useDebounceValue } from '@/app/hooks/useDebounceValue';
import { useQueryState } from '@/app/hooks/useQueryState';
import { useRequiredApiKey } from '@/app/hooks/useRequiredApiKey';
import { useMovieQuery } from "./hooks/useMovieQuery";

export default function Home() {
  const [query, setQuery] = useQueryState('s', '');
  const debounceQuery = useDebounceValue(query, 500);
  useRequiredApiKey();
  const { data, error,isLoading} = useMovieQuery(debounceQuery);
  return (
    <div className="flex flex-col gap-4 py-8 max-w-3xl m-auto px-4">
      <header>
        <h1 className="text-4xl font-bold text-center">MovieFinder</h1>
      </header>
      <main>
        <fieldset className="border p-4 w-full rounded-lg border-neutral">
          <legend>Search</legend>
          <SearchInput query={query} setQuery={setQuery}/>
        </fieldset>
       
        {error ? <p>{error.message}</p>:null}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? <p>Loading...</p> : null}
          {data?.Search?.length > 0 ? data.Search.map((movie) => (
            <div key={movie.imdbID} className="flex flex-col gap-4">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover rounded-md shadow aspect-[2/3]"/>
              <div>
                <p className="text-sm font-medium ">{movie.Title}</p>
                <p className="text-xs font-medium ">{movie.Year} | {movie.Type}</p>
              </div>
            </div>
          )) : null}
        </div>
      </main>
    </div>
  );
}
