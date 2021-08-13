import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //increment
    incremented(state) {
      state.value++;
    },
    //decrement
    decremented(state) {
      state.value--;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

export default counterSlice.reducer;
