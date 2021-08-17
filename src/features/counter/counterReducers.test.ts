import { store } from "../../app/store";
import { incremented } from "./counterSlice";

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
