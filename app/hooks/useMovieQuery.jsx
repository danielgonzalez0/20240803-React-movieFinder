import useSWR from "swr"

export const useMovieQuery = (search) => {

  return useSWR(`movie-query-${search}`, async () => {
    if (search.length < 3) throw new Error('Search term must be at least 3 characters long');

    const apiKey = localStorage.getItem('omdbApiKey');

    if (!apiKey) throw new Error('OMDB API key is required');

    // return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)

    const url = new URL('https://www.omdbapi.com/');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('s', search);

    const json = await fetch(url.toString()).then((res) => res.json());

    return json;
  })

}