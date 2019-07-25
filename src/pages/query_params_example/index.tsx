import * as React from "react";
import * as ReactDOM from "react-dom";
import useQueryParam from '../../hooks/use-query-params';

export function Page() {
  const [x, setX] = useQueryParam('x');
  const [y, setY] = useQueryParam('y');
  const [z, setZ] = useQueryParam('z');

  React.useEffect(() => {
    setZ(Math.random().toString());
  }, [x]);

  return (
    <div>
      <h4>Use Query Params Example</h4>

      <p>x: {x}</p>
      <p>y: {y}</p>
      <p>z: {z}</p>

      <button onClick={() => setX(Math.random().toString())}>Change X</button>
      <button onClick={() => setY(Math.random().toString())}>Change Y</button>
      <button onClick={() => setX(undefined)}>Undefine X</button>
    </div>
  );
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page />, application) : false;
