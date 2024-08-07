import { useEffect, useState } from "react";

export const useDebounceValue = (value, delay) => {

  const [debounceValue, setDebounceValue]= useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;

};