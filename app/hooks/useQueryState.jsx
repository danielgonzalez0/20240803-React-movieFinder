

import React, { useEffect, useState } from 'react';

export const useQueryState = (queryKey, initialValue) => {
  const [queryState, setQueryState] = useState(initialValue);

  // permet de faire persister l'url avec les paramètres de recherche en rafrasichissant la page
  useEffect(() => {
  const newUrl = new URL(window.location);
  const urlSearchParams = newUrl.searchParams;

if(urlSearchParams.get(queryKey)){
  setQueryState(urlSearchParams.get(queryKey));
}

  },[queryKey, initialValue]);

// permet de faire persister l'url avec les paramètres de recherche en changeant la valeur de l'input
  useEffect(() => {

  if (queryState === initialValue) return;
  
   const newUrl = new URL(window.location);
    const urlSearchParams = newUrl.searchParams;

    if (!queryState) { 
      urlSearchParams.delete(queryKey); 
    } else {
      urlSearchParams.set(queryKey, queryState);
    }
    console.log(newUrl.toString());
    window.history.replaceState(null, '', newUrl.toString());

  }, [queryKey, queryState]);
  return [queryState, setQueryState];
};

