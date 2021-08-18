import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import weaterReducer from "../features/weather/weatherSlice";
import { dogsApiSlice } from "../services/dogService";
import { weatherApiSlice } from "../services/weatherService";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weaterReducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(dogsApiSlice.middleware)
      .concat(weatherApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
