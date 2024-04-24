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
        this.moveRoverForwardComand();
        break;
      case "backward":
        this.moveRoverBackwardCommand();
        break;
      case "right":
        this.moveRoverRightCommand();
        break;
      case "left":
        this.moveRoverLeftCommand();
        break;
      default:
        console.log("Error in move command: " + this.currentComand);
    }
  }
  moveRoverForwardComand() {
    if (this.roverIsNotAtTopOfMap()) {
      if (this.forwardObsitcleDetected()) this.objectDetected = true;
      else this.moveRoverForward();
    } else {
      if (this.topOfPageToBottomWrapObsticleDetected())
        this.objectDetected = true;
      else this.wrapRoverPositionFromTopOfPageToBottom();
    }
  }
  forwardObsitcleDetected(): boolean {
    return this.map.hasObstacle(this.position.x, this.position.y + 1);
  }
  topOfPageToBottomWrapObsticleDetected(): boolean {
    return this.map.hasObstacle(this.position.x, 0);
  }
  moveRoverForward() {
    this.position.y++;
  }
  wrapRoverPositionFromTopOfPageToBottom() {
    this.position.y = 0;
  }
  moveRoverBackwardCommand() {
    if (this.roverIsNotAtBottomOfMap()) {
      if (this.backwardObsitcleDetected()) this.objectDetected = true;
      else this.moveRoverBackward();
    } else {
      if (this.bottomOfPagToTopWrapObsticleDetected())
        this.objectDetected = true;
      else this.wrapRoverPositionFromBottomOfPageToTop();
    }
  }
  backwardObsitcleDetected(): boolean {
    return this.map.hasObstacle(this.position.x, this.position.y - 1);
  }
  bottomOfPagToTopWrapObsticleDetected(): boolean {
    var endOfMap = this.map.getMapColumns() - 1;
    return this.map.hasObstacle(this.position.x, endOfMap);
  }
  moveRoverBackward() {
    this.position.y--;
  }
  wrapRoverPositionFromBottomOfPageToTop() {
    this.position.y = this.map.getMapColumns();
  }
  moveRoverRightCommand() {
    if (this.roverIsNotAtRightEndOfMap()) {
      if (this.obsitcleDetectedToTheRight()) this.objectDetected = true;
      else this.moveRoverRight();
    } else {
      if (this.rightOfPageToLeftWrapObsticleDetected())
        this.objectDetected = true;
      else this.wrapRoverPositionFromRightOfPageToLeft();
    }
  }
  obsitcleDetectedToTheRight(): boolean {
    return this.map.hasObstacle(this.position.x + 1, this.position.y);
  }
  rightOfPageToLeftWrapObsticleDetected(): boolean {
    return this.map.hasObstacle(0, this.position.y);
  }
  moveRoverRight() {
    this.position.x++;
  }
  wrapRoverPositionFromRightOfPageToLeft() {
    this.position.x = 0;
  }
  moveRoverLeftCommand() {
    if (this.roverIsNotAtLeftEndOfMap()) {
      if (this.obsitcleDetectedToTheLeft()) this.objectDetected = true;
      else this.moveRoverLeft();
    } else {
      if (this.leftOfPageToRightWrapObsticleDetected())
        this.objectDetected = true;
      else this.wrapRoverPositionFromLeftOfPageToRight();
    }
  }
  obsitcleDetectedToTheLeft(): boolean {
    return this.map.hasObstacle(this.position.y, this.position.x - 1);
  }
  leftOfPageToRightWrapObsticleDetected(): boolean {
    var endOfMap = this.map.getMapRows() - 1;
    return this.map.hasObstacle(endOfMap, this.position.y);
  }
  moveRoverLeft() {
    this.position.x--;
  }
  wrapRoverPositionFromLeftOfPageToRight() {
    this.position.x = this.map.getMapRows();
  }
  roverIsNotAtTopOfMap(): boolean {
    if (this.position.y !== this.map.getMapRows() - 1) return true;
    return false;
  }
  roverIsNotAtBottomOfMap(): boolean {
    if (this.position.y !== 0) return true;
    return false;
  }
  roverIsNotAtRightEndOfMap(): boolean {
    if (this.position.x !== this.map.getMapRows() - 1) return true;
    return false;
  }
  roverIsNotAtLeftEndOfMap(): boolean {
    if (this.position.x !== 0) return true;
    return false;
  }
}

export type point = {
  x: number;
  y: number;
};
