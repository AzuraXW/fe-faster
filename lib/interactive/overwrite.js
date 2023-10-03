// 用户选择是否需要覆盖原目录
import inquirer from "inquirer";

export default async function () {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: `目标文件夹已经存在，请选择是否覆盖`,
      choices: [
        { name: "覆盖", value: "overwrite" },
        { name: "取消", value: "cancel" },
      ],
    },
  ]);
  return action === "overwrite";
}
