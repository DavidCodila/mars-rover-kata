import type { MapTemplate } from "./MapTemplate";

export class Rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  private commands: string[];
  private currentComand: string;
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
    this.currentComand = "";
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
      if (this.objectDetected) return "Will hit object on move " + commandIndex;
      else {
        this.setCurrentCommand(this.commands[commandIndex]);
        this.moveRover();
      }
    }
    if (this.objectDetected) return "Will hit object on last command";
    else return "Move successful";
  }
  setCurrentCommand(command: string) {
    this.currentComand = command;
    this.formatCommand();
  }
  formatCommand() {
    switch (this.currentComand) {
      case "f":
        this.currentComand = "forward";
        break;
      case "b":
        this.currentComand = "backward";
        break;
      case "r":
        this.currentComand = "right";
        break;
      case "l":
        this.currentComand = "left";
        break;
      default:
        console.log("Error with command: " + this.currentComand);
    }
  }
  moveRover() {
    switch (this.currentComand) {
      case "forward":
        this.moveRoverForward();
        break;
      case "backward":
        this.moveRoverBackward();
        break;
      case "right":
        this.moveRoverRight();
        break;
      case "left":
        this.moveRoverLeft();
        break;
      default:
        console.log("Error in move command: " + this.currentComand);
    }
  }
  moveRoverForward() {
    if (this.roverIsNotAtTopOfMap()) {
      if (this.map.hasObstacle(this.position.x, this.position.y + 1))
        this.objectDetected = true;
      else this.position.y++;
    } else {
      if (this.map.hasObstacle(this.position.x, 0)) this.objectDetected = true;
      else this.position.y = 0;
    }
  }
  moveRoverBackward() {
    if (this.roverIsNotAtBottomOfMap()) {
      if (this.map.hasObstacle(this.position.x, this.position.y - 1))
        this.objectDetected = true;
      else this.position.y--;
    } else {
      var endOfMap = this.map.getMapColumns() - 1;
      if (this.map.hasObstacle(this.position.x, endOfMap))
        this.objectDetected = true;
      else this.moveRoverToTopOfMap();
    }
  }
  moveRoverRight() {
    if (this.roverIssNotAtRightEndOfMap()) {
      if (this.map.hasObstacle(this.position.x + 1, this.position.y))
        this.objectDetected = true;
      else this.position.x++;
    } else {
      if (this.map.hasObstacle(0, this.position.y)) this.objectDetected = true;
      else this.position.x = 0;
    }
  }
  moveRoverLeft() {
    if (this.roverIsNotAtLeftEndOfMap()) {
      if (this.map.hasObstacle(this.position.y, this.position.x - 1))
        this.objectDetected = true;
      else this.position.x--;
    } else {
      var endOfMap = this.map.getMapRows() - 1;
      if (this.map.hasObstacle(endOfMap, this.position.y))
        this.objectDetected = true;
      else this.moveRoverToRightEndOfMap();
    }
  }
  roverIsNotAtTopOfMap(): boolean {
    if (this.position.y !== this.map.getMapRows() - 1) return true;
    return false;
  }
  roverIsNotAtBottomOfMap(): boolean {
    if (this.position.y !== 0) return true;
    return false;
  }
  roverIssNotAtRightEndOfMap(): boolean {
    if (this.position.x !== this.map.getMapRows() - 1) return true;
    return false;
  }
  roverIsNotAtLeftEndOfMap(): boolean {
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

export type point = {
  x: number;
  y: number;
};
