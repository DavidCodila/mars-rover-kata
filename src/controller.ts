export class Controller {
  sendCommands(commands: string) {
    const commandArray = commands.split(" ");
    const error = checkCommandSyntax(commandArray);
    if (error) return [];
    else return commandArray;
  }
}

function checkCommandSyntax(commandArray: string[]): boolean {
  commandArray.forEach((command) => {
    if (!isaMoveCommand(command)) return true;
  });
  return false;
}

function isaMoveCommand(input: string): boolean {
  return ["f", "b", "l", "r"].includes(input);
}
