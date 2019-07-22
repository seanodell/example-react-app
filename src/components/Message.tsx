import * as React from "react";

export interface Props {
  text?: string;
}

export function Message(props: Props) {
  return <p>Message: {props.text}</p>;
}
