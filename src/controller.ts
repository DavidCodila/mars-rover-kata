export class Controller {
  sendCommands(commands: string) {
    const commandArray = commands.split(" ");
    if (checkCommandValueError(commandArray)) return [];
    else return commandArray;
  }
}

function checkCommandValueError(commandArray: string[]): boolean {
  var flag: boolean = false;
  commandArray.forEach((command) => {
    if (!isaMoveCommand(command)) flag = true;
  });
  return flag;
}

function isaMoveCommand(input: string): boolean {
  return ["f", "b", "l", "r"].includes(input);
}
