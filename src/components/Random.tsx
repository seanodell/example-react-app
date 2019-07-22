import * as React from "react";
import useFetch from "../hooks/use-fetch";

export interface Body {
  random?: number;
}

export function Random() {
  const body = useFetch<Body>("/api/random", {});

  return <p>Random number: {body.random}</p>
}
