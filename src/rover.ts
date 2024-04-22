import type { MapTemplate } from "./MapTemplate";

export class Rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  private commands: string[];
  private map: MapTemplate;
  private objectDetected: boolean;
  constructor(
    initalPosition: point,
    initalorientation: string,
    map: MapTemplate
  ) {
    this.position = initalPosition;
    this.orientation = initalorientation;
    this.commands = [""];
    this.map = map;
    if (map.getMapColumns() === 4) map.createObstacles();
    this.objectDetected = false;
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
  move(commandToMove: string[]): string {
    this.commands = commandToMove;
    for (var commandIndex in this.commands) {
      if (this.objectDetected)
        //flags before last command
        return "Will hit object on move " + commandIndex;
      else {
        var command = this.commands[commandIndex];
        this.moveRoverRelativeTo(command);
      }
    }
    if (this.objectDetected)
      //flags last command
      return "Will hit object on last command";
    else return "Move successful";
  }
  moveRoverRelativeTo(command: string) {
    if (moveForward(command)) {
      if (this.isNotAtTopOfMap()) {
        if (this.map.hasObstacle(this.position.x, this.position.y + 1))
          this.objectDetected = true;
        else this.position.y++;
      } else {
        if (this.map.hasObstacle(this.position.x, 0))
          this.objectDetected = true;
        else this.position.y = 0;
      }
    } else if (moveBack(command)) {
      if (this.isNotAtBottomOfMap()) {
        if (this.map.hasObstacle(this.position.x, this.position.y - 1))
          this.objectDetected = true;
        else this.position.y--;
      } else {
        var endOfMap = this.map.getMapColumns() - 1;
        if (this.map.hasObstacle(this.position.x, endOfMap))
          this.objectDetected = true;
        else this.moveRoverToTopOfMap();
      }
    } else if (moveRight(command)) {
      if (this.isNotAtRightEndOfMap()) {
        if (this.map.hasObstacle(this.position.x + 1, this.position.y))
          this.objectDetected = true;
        else this.position.x++;
      } else {
        if (this.map.hasObstacle(0, this.position.y))
          this.objectDetected = true;
        else this.position.x = 0;
      }
    } else if (moveLeft(command)) {
      if (this.isNotAtLeftEndOfMap()) {
        if (this.map.hasObstacle(this.position.y, this.position.x - 1))
          this.objectDetected = true;
        else this.position.x--;
      } else {
        var endOfMap = this.map.getMapRows() - 1;
        if (this.map.hasObstacle(endOfMap, this.position.y))
          this.objectDetected = true;
        else this.moveRoverToRightEndOfMap();
      }
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
