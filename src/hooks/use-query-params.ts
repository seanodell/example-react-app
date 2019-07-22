import { useState, useEffect } from "react";
import { parseUrl, stringify } from 'query-string';
import { createBrowserHistory } from "history";

export default function useQueryParam(param: string) {
  const history = createBrowserHistory();

  const parsed = parseUrl(location.search);
  let value = parsed.query[param];
  let initial = value instanceof Array ? value[0] : value;

  const state = useState<string>(initial);

  useEffect(() => {
    const parsed = parseUrl(location.search);

    parsed.query[param] = state[0];

    history.replace(parsed.url + '?' + stringify(parsed.query));
  });

  return state;
}
