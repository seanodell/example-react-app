import * as Redux from "redux";
import { countReducer, useCountStore } from "./count-state";

export function createStore() {
  const rootReducer = Redux.combineReducers({
    countReducer
  });

  const rootStore = Redux.createStore(rootReducer, {});

  return {
    rootReducer: rootReducer,
    rootStore: rootStore,
    useCountStore: useCountStore
  }
}
