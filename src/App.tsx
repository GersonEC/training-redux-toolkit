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
import { useFetchBreedsQuery } from "./services/dogService";
import {
  useFetchLocationQuery,
  useFetchLocationTemperatureQuery,
} from "./services/weatherService";

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
  const [numDogs, setNumDogs] = useState(10);
  const { data: dogs = [], isFetching: isDogFetching } =
    useFetchBreedsQuery(numDogs);
  const { data: dataLocation, isFetching: isLocFetching } =
    useFetchLocationQuery(location);
  const { data: dataLocationTemp, isFetching: isLocTempFetching } =
    useFetchLocationTemperatureQuery(718345);

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

  console.log("location; ", dataLocation);
  console.log("location Temp; ", dataLocationTemp);

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
        {/*status === "loading" ? "Loading..." : `${temperature.toFixed(2)}°C`*/}
        {status === "loading"
          ? "Loading..."
          : `${dataLocationTemp && dataLocationTemp.toFixed(2)}°C`}
      </h1>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <p>-------------DIVIDER-----------------</p>
      <h1>The Dog App</h1>
      <div>
        <h3>Dogs to fetch:</h3>
        <select
          value={numDogs}
          onChange={(e) => setNumDogs(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        {isDogFetching ? (
          <h3>Is fetching</h3>
        ) : (
          <>
            <h3>Number of dogs fetched: {dogs.length}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {dogs.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img
                        src={breed.image.url}
                        alt={breed.name}
                        height="250"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
