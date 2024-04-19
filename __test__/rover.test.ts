import { expect, test } from "bun:test";
import { rover, type point } from "../src/rover";

test("initial starting position test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const r: rover = new rover(initalPoint, "N");
  expect(r.getPosition()).toEqual(initalPoint);
});
