import { execa } from "execa";
import chalk from "chalk";
import logSymbols from "log-symbols";

export async function installDep(dir, manager = "npm") {
  try {
    await execa(`cd ${dir} && ${manager} install`, {
      stdio: "inherit",
      shell: true,
    });
    console.log(logSymbols.success, chalk.cyan("依赖安装成功"));
  } catch (err) {
    console.log(logSymbols.error, chalk.red("项目依赖安装失败"));
    console.log(logSymbols.info, chalk.red("错误信息"));
    console.log(err);
  }
}
