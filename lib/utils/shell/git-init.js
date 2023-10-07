import { execa } from "execa";
import chalk from "chalk";
import { info, error, succeed } from "../logger.js";

export default async function gitInit(dir) {
  try {
    await execa(`cd ${dir} && git init`, {
      stdio: "inherit",
      shell: true,
    });
    succeed("成功初始化git仓库");
  } catch (err) {
    error(chalk.red("git仓库初始化失败"));
    info("错误信息:");
    console.log(err);
  }
}
