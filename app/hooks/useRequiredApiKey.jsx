import { useEffect } from "react";

export const useRequiredApiKey = () => {
  useEffect(() => {
    let cleanup = false;
    const localStorageApiKey = localStorage.getItem('omdbApiKey');

    if (!localStorageApiKey) {
      while (!localStorage.getItem('omdbApiKey')) {
        const apiKey = prompt('Please enter your OMDB API key');
        if (apiKey) {
          localStorage.setItem('omdbApiKey', apiKey);
        }
        if (cleanup) break;
      }
    }
    return () => {
      cleanup = true;
    };
  }, []);
};