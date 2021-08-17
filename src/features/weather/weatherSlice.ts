import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//[{"title":"Milan","location_type":"City","woeid":718345,"latt_long":"45.468941,9.181030"}]
interface WeatherState {
  woeidLocation: number | null;
  status: string;
  LocationTemperature: number;
}

const initialState: WeatherState = {
  woeidLocation: null,
  status: "idle",
  LocationTemperature: 0,
};

export const fetchLocation = createAsyncThunk(
  "weather/fetchLocation",
  async (location: string) => {
    const response = await fetch(
      `https://weather.daveceddia.com/api/location/search/?query=${location}`
    );
    return response.json();
  }
);

export const fetchLocationTemperature = createAsyncThunk(
  "weather/fetchLocationTemperature",
  async (woeidLocation: number) => {
    const response = await fetch(
      `https://weather.daveceddia.com/api/location/${woeidLocation}`
    );
    return response.json();
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        const newLocation = action.payload[0];
        state.woeidLocation = newLocation.woeid;
        state.status = "idle";
      })
      .addCase(fetchLocationTemperature.fulfilled, (state, action) => {
        const newTemp = action.payload.consolidated_weather[0].the_temp;
        state.LocationTemperature = newTemp;
      });
  },
});

//export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
