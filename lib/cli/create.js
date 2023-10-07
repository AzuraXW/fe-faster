import create from "../create.js";

export default function (program) {
  program
    .command("create")
    .argument("project-name")
    .description("创建一个项目")
    .option("-p, --preset <presetName>", "跳过交互式询问，使用预设创建当前项目")
    .option("-i, --install", "自动安装依赖")
    .option("-g, --git", "初始化git仓库")
    .option("-f, --force", "强制覆盖原有同名目录")
    .action((name, cmd) => {
      create(name, cmd);
    });
}
