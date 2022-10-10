#!/usr/bin/env node
/////////////////////
// copy-folder-cli //
// MIT License     //
/////////////////////

// Usage in package.json:
//    "scripts": {
//       "make-dist": "copy-folder build dist"
//    },
//
// Usage from command line:
//    $ npm install --global copy-folder-cli
//    $ copy-folder build dist
//    $ copy-folder src/web --ext=.js,.html docs
//
// Contributors to this project:
//    $ cd copy-folder-cli
//    $ npm install
//    $ npm test
//    $ node bin/cli.js --cd=spec/fixtures source --ext=.js target/ext-js

// Imports
import { copyFolder } from '../dist/copy-folder.js';
import chalk from 'chalk';
import log   from 'fancy-log';

// Parameters
const validFlags =  ['cd', 'ext', 'quiet', 'summary'];
const args =        process.argv.slice(2);
const flags =       args.filter(arg => /^--/.test(arg));
const flagMap =     Object.fromEntries(flags.map(flag => flag.replace(/^--/, '').split('=')));
const flagOn =      Object.fromEntries(validFlags.map(flag => [flag, flag in flagMap]));
const invalidFlag = Object.keys(flagMap).find(key => !validFlags.includes(key));
const params =      args.filter(arg => !/^--/.test(arg));

// Data
const source = params[0];
const target = params[1];

// Reporting
const printReport = (results) => {
   const name =      chalk.gray('copy-folder');
   const source =    chalk.blue.bold(results.source);
   const target =    chalk.magenta(results.target);
   const arrow =     { big: chalk.gray.bold('➤➤➤'), little: chalk.gray.bold(' ⟹  ') };  //extra space for alignment
   const infoColor = results.count ? chalk.white : chalk.red.bold;
   const info =      infoColor(`(files: ${results.count}, ${results.duration}ms)`);
   const logFile =   (file) => log(name, chalk.white(file.origin), arrow.little, chalk.green(file.dest));
   log(name, source, arrow.big, target, info);
   if (!flagOn.summary)
      results.files.forEach(logFile);
   };

// Copy Folder
const error =
   invalidFlag ?       'Invalid flag: ' + invalidFlag :
   !source ?           'Missing source folder.' :
   !target ?           'Missing target folder.' :
   params.length > 2 ? 'Extraneous parameter: ' + params[2] :
   null;
if (error)
   throw Error('[copy-folder-cli] ' + error);
const options = {
   cd:             flagMap.cd ?? null,
   fileExtensions: flagMap.ext?.split(',') ?? [],
   };
const results = copyFolder.cp(source, target, options);
if (!flagOn.quiet)
   printReport(results);
