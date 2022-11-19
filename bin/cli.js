#!/usr/bin/env node
//////////////////////
// copy-folder-util //
// MIT License      //
//////////////////////

// Usage in package.json:
//    "scripts": {
//       "make-dist": "copy-folder build dist"
//    },
//
// Usage from command line:
//    $ npm install --global copy-folder-util
//    $ copy-folder build dist
//    $ copy-folder src/web --ext=.js,.html docs
//
// Contributors to this project:
//    $ cd copy-folder-util
//    $ npm install
//    $ npm test
//    $ node bin/cli.js --cd=spec/fixtures source --ext=.js target/ext-js

// Imports
import { cliArgvUtil } from 'cli-argv-util';
import { copyFolder } from '../dist/copy-folder.js';
import chalk from 'chalk';
import log   from 'fancy-log';

// Parameters and flags
const validFlags = ['cd', 'ext', 'note', 'quiet', 'summary'];
const cli =        cliArgvUtil.parse(validFlags);
const source =     cli.params[0];
const target =     cli.params[1];

// Reporting
const printReport = (results) => {
   const name =      chalk.gray('copy-folder');
   const source =    chalk.blue.bold(results.source);
   const target =    chalk.magenta(results.target);
   const arrow =     { big: chalk.gray.bold(' ⟹  '), little: chalk.gray.bold('→') };
   const infoColor = results.count ? chalk.white : chalk.red.bold;
   const info =      infoColor(`(files: ${results.count}, ${results.duration}ms)`);
   const logFile =   (file) => log(name, chalk.white(file.origin), arrow.little, chalk.green(file.dest));
   log(name, source, arrow.big, target, info);
   if (!cli.flagOn.summary)
      results.files.forEach(logFile);
   };

// Copy Folder
const error =
   cli.invalidFlag ?     cli.invalidFlagMsg :
   !source ?             'Missing source folder.' :
   !target ?             'Missing target folder.' :
   cli.paramsCount > 2 ? 'Extraneous parameter: ' + cli.params[2] :
   null;
if (error)
   throw Error('[copy-folder-util] ' + error);
const options = {
   cd:             cli.flagMap.cd ?? null,
   fileExtensions: cli.flagMap.ext?.split(',') ?? [],
   };
const results = copyFolder.cp(source, target, options);
if (!cli.flagOn.quiet)
   printReport(results);
