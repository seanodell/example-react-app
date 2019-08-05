import * as React from "react";
import {render} from "react-dom";

import { Provider } from "react-redux";

import {createStore} from "./use-store";

const store = createStore();

export function Page() {
  const countStore = store.useCountStore();

  return (
    <div>
      <h4>Redux with Hooks Example</h4>
      <button onClick={countStore.incrementCount}>+</button>
      <button onClick={countStore.decrementCount}>-</button>

      <p>Count: {countStore.count}</p>
    </div>
  );
}

const application = document.getElementById("application");
application ? render(<Provider store={store.rootStore}><Page /></Provider>, application) : false;
