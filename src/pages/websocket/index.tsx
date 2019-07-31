import * as React from 'react';
import * as ReactDOM from "react-dom";
import useWebSocket from '../../hooks/use-websocket';

export interface Body {
  count?: number;
}

export function Page() {
  const body = useWebSocket<Body>(`${location.protocol}//${location.hostname}:9001/example_socket`, {});

  return (
    <div>
      <h3>Websocket Counter</h3>

      <p>Counter: {body.count}</p>
    </div>
  );
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page />, application) : false;
