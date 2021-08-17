import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import weaterReducer from "../features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weaterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
