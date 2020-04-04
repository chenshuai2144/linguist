#!/usr/bin/env node

import chalk from 'chalk';
import program from 'commander';
// @ts-ignore
import slash from 'slash2';
import fs from 'fs-extra';
import path from 'path';

import { LocDir } from './directory';
import { LocFile, LineInfo } from './file';
import { getVersion } from './utils';

program
  .version(getVersion(), '-v')
  .command('file <path>')
  .description('detect a file')
  .action((pathPattern) => {
    const info = new LocFile(pathPattern).getFileInfo();
    // eslint-disable-next-line no-console
    console.log(
      chalk.cyan(`
      path: \t\t${pathPattern}
      language: \t${info.languages}
      total lines: \t${String(info.lines.total)}
      code lines: \t${String(info.lines.code)}
      comment lines: \t${String(info.lines.comment)}
    `),
    );
  });

const formatInfo = (
  info: LineInfo,
  languages: {
    [key: string]: LineInfo & {
      sum: number;
    };
  },
) => `
  \ttotal lines: \t${String(info.total)}
  \tcode lines: \t${String(info.code)}
  \tcomment lines: \t${String(info.comment)}
  \t--------------------${Object.keys(languages)
    .map((key) => {
      const languageInfo = languages[key];
      return `\n\t${key.padEnd(10)} \t sum:${String(languageInfo.sum)} \ttotal:${String(
        languageInfo.total,
      )}  \tcomment:${String(languageInfo.comment)}  \tcode:${String(languageInfo.code)}`;
    })
    .join('')}`;

program.arguments('<cmd> [env]').action((cmd) => {
  const { info, languages } = new LocDir(slash(path.join(process.cwd(), cmd))).loadInfo();
  // eslint-disable-next-line no-console
  console.log(chalk.cyan(formatInfo(info, languages)));
});

program.parse(process.argv);

const loc = (
  fileOrDir: string,
): {
  info: LineInfo;
  files: string[];
  languages: {
    [key: string]: LineInfo & {
      sum: number;
    };
  };
} => {
  const stat = fs.statSync(slash(fileOrDir));
  if (stat.isFile()) {
    const locFile = new LocFile(slash(fileOrDir));
    const info = locFile.getFileInfo();
    const filePath = locFile.getPath();
    return {
      info: info.lines,
      files: [filePath],
      languages: { [info.languages]: { ...info.lines, sum: 1 } },
    };
  }
  const locDir = new LocDir(slash(fileOrDir));
  return locDir.loadInfo();
};

loc.locDir = LocDir;
loc.locFile = LocFile;

module.exports = loc;

export default loc;
