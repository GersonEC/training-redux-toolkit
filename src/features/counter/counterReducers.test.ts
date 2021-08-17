import { store } from "../../app/store";
import { decremented, incremented } from "./counterSlice";

test("Incremented counter reducer", () => {
  //arrange
  let counter = store.getState().counter.value;
  expect(counter).toBe(0);
  //act
  store.dispatch(incremented());
  //assert
  counter = store.getState().counter.value;
  expect(counter).toBe(1);
});

test("Decremented counter reducer", () => {
  //arrange
  let counter = store.getState().counter.value;
  expect(counter).toBe(1);
  //act
  store.dispatch(decremented());
  //assert
  counter = store.getState().counter.value;
  expect(counter).toBe(0);
});
