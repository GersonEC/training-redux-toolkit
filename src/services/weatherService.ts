import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherState {
  woeidLocation: number | null;
  status: string;
  LocationTemperature: number;
}

export const weatherApiSlice = createApi({
  reducerPath: "apiWeather",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weather.daveceddia.com/api/location",
  }),
  endpoints(builder) {
    return {
      fetchLocation: builder.query({
        query(location) {
          return `/search/?query=${location}`;
        },
      }),
      fetchLocationTemperature: builder.query({
        query(woeidLocation) {
          return `/${woeidLocation}`;
        },
      }),
    };
  },
});

export const { useFetchLocationQuery, useFetchLocationTemperatureQuery } =
  weatherApiSlice;
