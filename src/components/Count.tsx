import * as React from "react";
import useFetch from "../hooks/use-fetch";

export interface Body {
  count?: number;
}

export function Count() {
  const body = useFetch<Body>("/api/count", {});

  return <p>Counter: {body.count}</p>
}
