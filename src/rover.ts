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
  move(commandToMove: string[]): boolean {
    var passesCommandSyntax = true;
    this.commands = commandToMove;
    for (var commandIndex in this.commands) {
      var command = this.commands[commandIndex];
      if (command === "f") {
        if (this.position.y !== this.map.getMapRows() - 1) this.position.y++;
        else {
          this.position.y = 0;
        }
      } else if (command === "b") this.position.y--;
      else if (command === "r") {
        if (this.position.x !== this.map.getMapRows() - 1) this.position.x++;
        else {
          this.position.x = 0;
        }
      } else if (command === "l") {
        if (this.position.x !== 0) this.position.x--;
        else this.position.x = this.map.getMapRows();
      } else {
        passesCommandSyntax = false;
      }
    }
    return passesCommandSyntax;
  }
  getCommands(): string[] {
    return this.commands;
  }
}

export type point = {
  x: number;
  y: number;
};
