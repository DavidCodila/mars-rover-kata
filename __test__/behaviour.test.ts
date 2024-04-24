import { expect, test } from "bun:test";
import { Controller } from "../src/Controller";
import { Rover, type point } from "../src/Rover";
import { MarsMap } from "../src/MarsMap";

const controller: Controller = new Controller();

test("receives commands test", () => {
  const initalCommands = "f f b";
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  rover.move(controller.sendCommands(initalCommands));
  expect(rover.getCommands()).toEqual(initalCommands.split(" "));
});

test("Rover wraps around left edge", () => {
  const initalCommands = "l l";
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  rover.move(controller.sendCommands(initalCommands));
  expect(rover.getPosition().x).toEqual(3);
});

test("Rover wraps around right edge", () => {
  const initalCommands = "r r";
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  rover.move(controller.sendCommands(initalCommands));
  expect(rover.getPosition().x).toEqual(0);
});

test("Rover wraps around top edge", () => {
  const initalCommands = "f f";
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  rover.move(controller.sendCommands(initalCommands));
  expect(rover.getPosition().y).toEqual(0);
});

test("Rover wraps around bottom edge", () => {
  const initalCommands = "b b";
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  rover.move(controller.sendCommands(initalCommands));
  expect(rover.getPosition().y).toEqual(3);
});

test("Rover encounters obstacle on last command", () => {
  const initalCommands = "f f l";
  const initalPoint: point = { x: 1, y: 1 };
  const marsMap: MarsMap = new MarsMap("4 4");
  marsMap.createObstacles();
  const rover: Rover = new Rover(initalPoint, "N", marsMap);
  expect(rover.move(controller.sendCommands(initalCommands))).toEqual(
    "Will hit object on last command"
  );
});

test("Rover encounters obstacle on a non last command", () => {
  const initalCommands = "f f l r";
  const initalPoint: point = { x: 1, y: 1 };
  const marsMap: MarsMap = new MarsMap("4 4");
  marsMap.createObstacles();
  const rover: Rover = new Rover(initalPoint, "N", marsMap);
  expect(rover.move(controller.sendCommands(initalCommands))).toEqual(
    "Will hit object on move 3"
  );
});
