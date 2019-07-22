import * as React from "react";

export function Profile(props: any) {
  return (
    <div>
      <h5>Welcome {props.match.params.username}!</h5>
    </div>
  );
};
