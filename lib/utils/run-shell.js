import { execa } from "execa";

export default function generateRunner(cwd) {
  return function (command, args) {
    if (!args) {
      // eslint-disable-next-line no-param-reassign
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd, stdio: "inherit" });
  };
}
