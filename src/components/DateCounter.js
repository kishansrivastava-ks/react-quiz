import { useReducer } from "react";
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  // state => current state
  // action => how the current state should be updated (receives a type and a payload)

  console.log(state, action);
  // return state + action;
  // this would become the new state
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step }; // this returning of the new state would cause the re render
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("unkown action");
  }
}

function DateCounter() {
  // useReducer(<reducer fn>,<initial state>)
  const [state, dispatch] = useReducer(reducer, initialState);
  // useReducer returns a dispatch fn which is used to trigger state update (as a setState)
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" }); // this object is the action
    // setCount((count) => count - 1);
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
