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
//    $ npm install copy-folder-cli
//    $ npx copy-folder build dist
//    $ npx copy-folder build --ext=js dist
//
// Contributors to this project:
//    $ cd copy-folder-cli
//    $ npm install
//    $ npm test
//    $ node bin/cli.js spec/fixtures/source spec/fixtures/target

// Imports
import { copyFolder }           from '../dist/copy-folder.js';
import { existsSync, statSync } from 'fs';
import chalk                    from 'chalk';
import log                      from 'fancy-log';

// Parameters
const args =     process.argv.slice(2);
const flags =    args.filter(arg => /^-/.test(arg));
const flagMap =  Object.fromEntries(flags.map(flag => flag.replace(/^[-]*/, '').split('=')));
const folders =  args.filter(arg => !/^-/.test(arg));
const source =   folders[0];
const target =   folders[1];

// Copy Folder
const exit =     (message) => (console.error('[copy-folder]', message), process.exit(1));
const isFolder = existsSync(source) && statSync(source).isDirectory();
const name =     chalk.gray('copy-folder-cli');
const arrow =    { big: chalk.bold.gray('➤➤➤'), little: chalk.bold.gray(' ⟹ ') };
const error =
   flagMap.ext ?         'File extension filtering not yet implemented.' :
   !source ?             'Missing source folder.' :
   !existsSync(source) ? 'Source folder does not exist or is inacessible: ' + source :
   !isFolder ?           'Source is not a valid folder: ' + source :
   !target ?             'Missing target folder.' :
   null;
if (error)
   exit(error);
const options = {};
const result = copyFolder.cp(source, target, options);
log(name, chalk.blue.bold(result.source), arrow.big, chalk.magenta(result.target));
result.files.forEach(file => log(name, chalk.white(file.origin), arrow.little, chalk.green(file.destination)));
