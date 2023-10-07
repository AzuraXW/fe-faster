import readline from "readline";
import chalk from "chalk";
import logSymbols from "log-symbols";
import { wrapline } from "./wrap.js";

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

export function error(msg) {
  console.log(logSymbols.error, chalk.red(msg));
}

export function info(msg) {
  console.log(logSymbols.info, chalk.cyan(msg));
}

export function succeed(msg) {
  console.log(logSymbols.success, chalk.green(msg));
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
