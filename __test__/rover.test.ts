import { expect, test } from "bun:test";
import { Rover, type point } from "../src/Rover";
import { MarsMap } from "../src/MarsMap";

test("initial starting position test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  expect(rover.getPosition()).toEqual(initalPoint);
});

test("moves forward test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  const command = ["f"];
  rover.move(command);
  expect(rover.getPosition().y).toEqual(2);
});

test("moves back test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  const command = ["b"];
  rover.move(command);
  expect(rover.getPosition().y).toEqual(0);
});

test("moves left test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  const command = ["l"];
  rover.move(command);
  expect(rover.getPosition().x).toEqual(0);
});

test("moves right test", () => {
  const initalPoint: point = { x: 1, y: 1 };
  const rover: Rover = new Rover(initalPoint, "N", new MarsMap("3 3"));
  const command = ["r"];
  rover.move(command);
  expect(rover.getPosition().x).toEqual(2);
});
