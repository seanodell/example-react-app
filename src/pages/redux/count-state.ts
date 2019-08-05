import { Action, } from "redux";
import { useSelector, useDispatch } from "react-redux";

export interface CountState {
  count: number;
}

export function countReducer(state: CountState = { count: 0 }, action: Action): CountState {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1
      }
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

export function useCountStore() {
  const dispatch = useDispatch();

  return {
    count: useSelector((state: any) => ({ ...state.countReducer })).count,

    incrementCount: () => {
      dispatch({
        type: "INCREMENT_COUNT"
      })
    },

    decrementCount: () => {
      dispatch({
        type: "DECREMENT_COUNT"
      })
    }
  };
}
