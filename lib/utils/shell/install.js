import { execa } from "execa";
import chalk from "chalk";
import { info, error, succeed } from "../logger.js";

export default async function installDep(dir, manager = "npm") {
  try {
    await execa(`cd ${dir} && ${manager} install`, {
      stdio: "inherit",
      shell: true,
    });
    succeed("依赖安装成功");
  } catch (err) {
    error(chalk.red("项目依赖安装失败"));
    info("错误信息");
    console.log(err);
  }
}
