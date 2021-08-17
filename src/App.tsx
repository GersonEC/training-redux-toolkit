import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { Counter } from "./components/Counter";
import {
  decremented,
  incremented,
  resetted,
} from "./features/counter/counterSlice";
import {
  fetchLocation,
  fetchLocationTemperature,
} from "./features/weather/weatherSlice";

function App() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const temperature = useAppSelector(
    (state: RootState) => state.weather.LocationTemperature
  );
  const woeidLocation = useAppSelector(
    (state: RootState) => state.weather.woeidLocation
  );
  const status = useAppSelector((state: RootState) => state.weather.status);
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState("");
  const onIncrement = () => {
    dispatch(incremented());
  };

  const onDecrement = () => {
    dispatch(decremented());
  };

  const onResetSteps = () => {
    dispatch(resetted());
  };

  const onGetWeather = () => {
    dispatch(fetchLocation(location));
  };

  useEffect(() => {
    if (woeidLocation !== null) {
      dispatch(fetchLocationTemperature(woeidLocation));
    }
  }, [woeidLocation]);

  const onLocationChange = (event: any) => {
    event.preventDefault();
    setLocation(event.target.value);
  };

  return (
    <div className="App">
      <Counter
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onResetSteps={onResetSteps}
      />
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <h1>Weather App</h1>
      <h3>Current weather at: </h3>{" "}
      <input name="location" value={location} onChange={onLocationChange} />
      <button onClick={onGetWeather}>Get It</button>
      <h1>
        {status === "loading" ? "Loading..." : `${temperature.toFixed(2)}°C`}
      </h1>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <h1>The Dog App</h1>
    </div>
  );
}

export default App;
