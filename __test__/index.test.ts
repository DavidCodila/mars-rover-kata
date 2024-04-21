import { expect, test } from "bun:test";
import { controller } from "../src/controller";
import { rover, type point } from "../src/rover";

test("receives commands test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const initalCommands = "f f b";
  const r: rover = new rover(initalPoint, "N");
  const c: controller = new controller();
  r.move(c.sendCommands(initalCommands));
  expect(r.getCommands()).toEqual(initalCommands.split(" "));
});
