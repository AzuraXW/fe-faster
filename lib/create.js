import fs from "fs-extra";
import path from "path";
import overwritePrompt from "./interactive/overwrite.js";
import templatePrompt from "./interactive/template.js";
import {
  clearConsole, runningGuide, error, succeed,
} from "./utils/logger.js";
import download from "./utils/download.js";
import managerPrompt from "./interactive/manager.js";
import runWithLoading from "./utils/run-with-loading.js";
import { getTemplateUrlByName } from "./utils/get-template.js";
import generateRunner from "./utils/run-shell.js";

async function create(projectName, options) {
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName);
  const runShell = generateRunner(targetDir);

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
        },
      );
    }
  }

  let templateUrl = "";
  if (options.preset) {
    // 直接使用预设，跳过prompt
    templateUrl = getTemplateUrlByName(options.preset);
    if (!templateUrl) {
      error(`不存在预设 ${options.preset}`);
      return;
    }
  } else {
    // 用户选择项目模版
    templateUrl = await templatePrompt();
  }

  // 开始下载模版
  const downloadSucceed = await runWithLoading(
    async () => {
      await download(`direct:${templateUrl}`, targetDir, {
        clone: true,
      });
    },
    {
      text: "项目模版下载中.....",
      succeed: "项目模版下载成功",
      fail: "项目模版下载失败",
    },
  )
    .then(() => true)
    .catch(() => false);

  // 模版下载成功
  if (downloadSucceed) {
    // 初始化git仓库
    if (options.git) {
      await runShell("git init");
    }

    let choices = {
      pkgManager: "npm",
      autoInstall: options.install,
    };
    if (!options.install) {
      choices = await managerPrompt();
    }
    if (choices.autoInstall) {
      // 自动安装依赖
      await runShell(choices.pkgManager, ["install"]);
      succeed("成功安装依赖！");
    } else {
      // 不自动安装依赖，显示运行信息
      runningGuide(projectName);
    }
  }
}

export default create;
