import { useState, useEffect } from "react";

export default function useFetch<T = any>(url: string, initial?: T) {
  const state = useState<T>(initial);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(body => {
        return state[1](body);
      });
  }, []);

  return state[0];
}
