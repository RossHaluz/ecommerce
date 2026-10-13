import { describe, expect, it } from "vitest";
import { forgetCar, myCarReducer, rememberCar } from "./slice";

const q8 = { modelName: "q8-2018--2023", name: "Q8 2018- 2023" };

describe("my car slice", () => {
  it("remembers the chosen car and replaces it with the next choice", () => {
    let state = myCarReducer(undefined, rememberCar(q8));
    expect(state.car).toEqual(q8);
    state = myCarReducer(state, rememberCar({ modelName: "a6-c8", name: "A6 C8" }));
    expect(state.car?.modelName).toBe("a6-c8");
  });

  it("forgets it", () => {
    expect(myCarReducer({ car: q8 }, forgetCar()).car).toBeNull();
  });
});
