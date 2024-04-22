export class Controller {
  sendCommands(commands: string) {
    const commandArray = commands.split(" ");
    const error = checkCommandSyntax(commandArray);
    if (error) return [];
    else return commandArray;
  }
}

function checkCommandSyntax(commandArray: string[]): boolean {
  var error: boolean = false;
  commandArray.forEach((command) => {
    if (!isaMoveCommand(command)) error = true;
  });
  return error;
}

function isaMoveCommand(input: string): boolean {
  return ["f", "b", "l", "r"].includes(input);
}
