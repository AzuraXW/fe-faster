import fs from "fs-extra";
import path from "path";
import overwritePrompt from "../interactive/overwrite.js";
import templatePrompt from "../interactive/template.js";
import { clearConsole, runningGuide } from "../utils/logger.js";
import download from "../utils/download.js";
import managerPrompt from "../interactive/manager.js";
import { installDep } from "../utils/install.js";
import runWithLoading from "../utils/run-with-loading.js";

async function create(projectName, options) {
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName);

  // 目录已存在
  if (fs.existsSync(targetDir)) {
    let isDelete = options.force;
    if (!options.force) {
      clearConsole();
      // 让用户决定是否覆盖目录
      const isOverwrite = await overwritePrompt();
      if (isOverwrite) {
        isDelete = isDelete || isOverwrite;
      } else {
        return;
      }
    }
    if (isDelete) {
      await runWithLoading(
        async () => {
          await fs.remove(targetDir);
        },
        {
          text: "正在删除原有目录......",
          succeed: "成功覆盖原有目录",
          fail: "无法覆盖原有目录",
        }
      );
    }
  }

  // 用户选择项目模版
  const templateUrl = await templatePrompt();

  // 开始下载模版
  const downloadSucceed = await runWithLoading(
    async () => {
      return await download(`direct:${templateUrl}`, targetDir, {
        clone: true,
      });
    },
    {
      text: "项目模版下载中.....",
      succeed: "项目模版下载成功",
      fail: "项目模版下载失败",
    }
  )
    .then(() => true)
    .catch(() => false);

  // 模版下载成功
  if (downloadSucceed) {
    const choices = await managerPrompt();
    if (choices.autoInstall) {
      // 自动安装依赖
      await installDep(projectName, choices.pkgManager);
    } else {
      // 不自动安装依赖，显示运行信息
      runningGuide(projectName);
    }
  }
}

export default create;
