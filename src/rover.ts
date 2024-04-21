export class rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  private commands: string[];
  constructor(initalPosition: point, initalorientation: string) {
    this.position = initalPosition;
    this.orientation = initalorientation;
    this.commands = [""];
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
      else if (command === "l") this.position.x--;
      else {
        console.log("Error in move command");
        console.log(this.commands[0]);
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
