// 模版选择
import inquirer from "inquirer";
import { loadJsonFileSync } from "load-json-file";

const templates = loadJsonFileSync(
  new URL("../../data/temp.json", import.meta.url),
);

export default async function () {
  const { template } = await inquirer.prompt([
    {
      name: "template",
      type: "list",
      message: "请选择项目模版",
      choices: templates.map((item) => ({ name: item.name, value: item.url })),
    },
  ]);
  return template;
}
