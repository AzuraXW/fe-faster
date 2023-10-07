#! /usr/bin/env node

import { program } from "commander";
import create from "../lib/cli/create.js";
import pkg from "../lib/utils/get-pkg.js";

program.name(pkg.name).usage("<command> [options]");
program.version(`${pkg.name} ${pkg.version}`);

// create命令
create(program);

program.parse(process.argv);
