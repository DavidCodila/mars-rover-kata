import type { MapTemplate } from "./MapTemplate";

export class Rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  private commands: string[];
  private map: MapTemplate;
  constructor(
    initalPosition: point,
    initalorientation: string,
    map: MapTemplate
  ) {
    this.position = initalPosition;
    this.orientation = initalorientation;
    this.commands = [""];
    this.map = map;
  }

  getPosition() {
    return this.position;
  }
  getOrientation() {
    return this.orientation;
  }
  getCommands(): string[] {
    return this.commands;
  }
  move(commandToMove: string[]) {
    this.commands = commandToMove;
    for (var commandIndex in this.commands) {
      var command = this.commands[commandIndex];
      this.moveRoverRelativeTo(command);
    }
  }
  moveRoverRelativeTo(command: string) {
    if (moveForward(command)) {
      if (this.isNotAtTopOfMap()) this.position.y++;
      else {
        this.position.y = 0;
      }
    } else if (moveBack(command)) {
      if (this.isNotAtBottomOfMap()) this.position.y--;
      else {
        this.moveRoverToTopOfMap();
      }
    } else if (moveRight(command)) {
      if (this.isNotAtRightEndOfMap()) this.position.x++;
      else {
        this.position.x = 0;
      }
    } else if (moveLeft(command)) {
      if (this.isNotAtLeftEndOfMap()) this.position.x--;
      else this.moveRoverToRightEndOfMap();
    } else {
      console.log("Error in move command: " + command);
    }
  }
  isNotAtTopOfMap(): boolean {
    if (this.position.y !== this.map.getMapRows() - 1) return true;
    return false;
  }
  isNotAtBottomOfMap(): boolean {
    if (this.position.y !== 0) return true;
    return false;
  }
  isNotAtRightEndOfMap(): boolean {
    if (this.position.x !== this.map.getMapRows() - 1) return true;
    return false;
  }
  isNotAtLeftEndOfMap(): boolean {
    if (this.position.x !== 0) return true;
    return false;
  }
  moveRoverToTopOfMap() {
    this.position.y = this.map.getMapColumns();
  }
  moveRoverToRightEndOfMap() {
    this.position.x = this.map.getMapRows();
  }
}

function moveForward(command: string): boolean {
  if (command == "f") return true;
  return false;
}

function moveBack(command: string): boolean {
  if (command == "b") return true;
  return false;
}

function moveRight(command: string): boolean {
  if (command == "r") return true;
  return false;
}

function moveLeft(command: string): boolean {
  if (command == "l") return true;
  return false;
}

export type point = {
  x: number;
  y: number;
};
