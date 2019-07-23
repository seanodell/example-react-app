import * as React from "react";
import * as ReactDOM from "react-dom";
import useQueryParam from '../../hooks/use-query-params';

export function Page() {
  const [x, setX] = useQueryParam('x');
  const [y, setY] = useQueryParam('y');

  return (
    <div>
      <h4>Use Query Params Example</h4>

      <p>x: {x}</p>
      <p>y: {y}</p>

      <button onClick={() => {setX(Math.random().toString()); setY(Math.random().toString())}}>Change</button>
      <button onClick={() => setX(undefined)}>Undefine</button>
    </div>
  );
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page />, application) : false;
