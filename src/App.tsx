import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import { Counter } from "./components/Counter";
import { decremented, incremented } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onIncrement = () => {
    dispatch(incremented());
  };

  const onDecrement = () => {
    dispatch(decremented());
  };

  return (
    <div className="App">
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}

export default App;
