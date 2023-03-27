#!/usr/bin/env node

// 使用默认浏览器自动打开某个页面

import open from "open";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

if (argv.url) {
  open(argv.url);
}
