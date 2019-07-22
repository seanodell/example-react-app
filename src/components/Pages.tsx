import * as React from "react";

export interface Props {
  pages?: string[];
}

export function Pages(props: Props) {
  if (props.pages === undefined) return undefined;

  let pages = props.pages.map(page =>
    <li><a href={page}>{page}</a></li>
  );

  return <ul>
    {pages}
  </ul>;
}
