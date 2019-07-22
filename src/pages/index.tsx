import * as React from 'react';
import * as ReactDOM from "react-dom";

import { Message } from "../components/Message";
import { Random } from "../components/Random";
import { Count } from "../components/Count";
import { Pages } from "../components/Pages";

import useFetch from "../hooks/use-fetch";

export interface Props {
  text: string;
}

export interface Body {
  pages: string[];
}

export function Page (props: Props) {
  const body = useFetch<Body>("/api/pages", {pages: []});

  return (
    <div>
      <h3>Header</h3>

      <Message text={props.text} />
      <Random />
      <Count />

      <h4>Pages</h4>
      <Pages pages={body.pages} />
    </div>
  );
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page text="This is the root page" />, application) : false;
