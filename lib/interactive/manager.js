// 用户选择是否需要覆盖原目录
import inquirer from "inquirer";

export default async function () {
  const rseult = {
    autoInstall: false,
    pkgManager: "npm",
  };
  const { autoInstall } = await inquirer.prompt([
    {
      name: "autoInstall",
      type: "confirm",
      message: "是否自动安装依赖",
    },
  ]);
  rseult.autoInstall = autoInstall;

  if (autoInstall) {
    const { pkgManager } = await inquirer.prompt([
      {
        name: "pkgManager",
        type: "list",
        message: `选择你的包管理工具`,
        choices: [
          { name: "npm", value: "npm" },
          { name: "yarn", value: "yarn" },
          { name: "pnpm", value: "pnpm" },
        ],
        default: "npm",
      },
    ]);
    rseult.pkgManager = pkgManager;
  }

  return rseult;
}
