#! /usr/bin/env node

import { program } from "commander";
import create from "../lib/action/create.js";
import pkg from "../lib/utils/get-pkg.js";

program.name(pkg.name).usage("<command> [options]");
program.version(`${pkg.name} ${pkg.version}`);

// create命令
program
  .command("create")
  .argument("project-name")
  .description("create a new project")
  .option(
    "-p, --preset <presetName>",
    "Skip prompts and use saved or remote preset"
  )
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, cmd) => {
    create(name, cmd);
  });

program.parse(process.argv);
