import { MarsMap } from "./MarsMap";

export class Rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  private commands: string[];
  private MarsMap: MarsMap;
  constructor(initalPosition: point, initalorientation: string) {
    this.position = initalPosition;
    this.orientation = initalorientation;
    this.commands = [""];
    this.MarsMap = new MarsMap("3 3");
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
      if (command === "f") this.position.y++;
      else if (command === "b") this.position.y--;
      else if (command === "r") this.position.x++;
      else if (command === "l") {
        if (this.position.x !== 0) this.position.x--;
        else this.position.x = this.MarsMap.getMapRows();
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
