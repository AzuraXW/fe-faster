import readline from "readline";
import { wrapline } from "./wrap.js";
import chalk from "chalk";

export function clearConsole(title) {
  if (process.stdout.isTTY) {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
}

export function runningGuide(dir, tool = "npm", cmd = "dev") {
  wrapline();
  console.log(chalk.blue("run: "));
  wrapline();
  console.log(`cd ${dir}`);
  console.log(`${tool} install`);
  console.log(`${tool} run ${cmd}`);
  wrapline();
}
