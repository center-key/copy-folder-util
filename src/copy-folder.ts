// copy-folder-util ~~ MIT License
//
// Usage in package.json:
//    "scripts": {
//       "make-dist": "copy-folder build dist"
//    },
//
// Usage from command line:
//    $ npm install --save-dev copy-folder-util
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
import chalk from 'chalk';
import fs    from 'fs';
import log   from 'fancy-log';
import path  from 'path';
import slash from 'slash';

// Types
export type Settings = {
   basename:       string | null,  //filter files by filename ignoring the file extension
   cd:             string | null,  //change working directory before starting copy
   fileExtensions: string[],       //filter files by file extensions, example: ['.js', '.css']
   };
export type Results = {
   source:   string,  //path of origination folder
   target:   string,  //path of destination folder
   count:    number,  //number of files copied
   duration: number,  //execution time in milliseconds
   files:    { origin: string, dest: string }[],
   };
export type ReporterSettings = {
   summaryOnly: boolean,  //only print out the single line summary message
   };

const copyFolder = {

   extraneous: {
      files:  ['.DS_Store', 'Thumbs.db', 'desktop.ini'],
      folders: ['.git', 'node_modules'],
      },

   assert(ok: unknown, message: string | null) {
      if (!ok)
         throw new Error(`[copy-folder-util] ${message}`);
      },

   cli() {
      const validFlags = ['basename', 'cd', 'ext', 'note', 'quiet', 'summary'];
      const cli =        cliArgvUtil.parse(validFlags);
      const source =     cli.params[0];
      const target =     cli.params[1];
      const error =
         cli.invalidFlag ?    cli.invalidFlagMsg :
         !source ?            'Missing source folder.' :
         !target ?            'Missing target folder.' :
         cli.paramCount > 2 ? 'Extraneous parameter: ' + cli.params[2]! :
         null;
      copyFolder.assert(!error, error);
      const options: Settings = {
         basename:       cli.flagMap.basename ?? null,
         cd:             cli.flagMap.cd ?? null,
         fileExtensions: cli.flagMap.ext?.split(',') ?? [],
         };
      const results = copyFolder.cp(source!, target!, options);
      if (!cli.flagOn.quiet)
         copyFolder.reporter(results, { summaryOnly: cli.flagOn.summary! });
      },

   cp(sourceFolder: string, targetFolder: string, options?: Partial<Settings>): Results {
      const defaults: Settings = {
         basename:       null,
         cd:             null,
         fileExtensions: [],
         };
      const settings = { ...defaults, ...options };
      const startTime = Date.now();
      const cleanPath = (folder: string) =>
         !folder ? '' : slash(path.normalize(folder)).replace(/\/$/, '');
      const startFolder = settings.cd ? cleanPath(settings.cd) + '/' : '';
      const source =      cleanPath(startFolder + sourceFolder);
      const target =      cleanPath(startFolder + targetFolder);
      if (targetFolder)
         fs.mkdirSync(target, { recursive: true });
      const error =
         !sourceFolder ?                      'Must specify the source folder path.' :
         !targetFolder ?                      'Must specify the target folder path.' :
         !fs.existsSync(source) ?             'Source folder does not exist: ' + source :
         !fs.existsSync(target) ?             'Target folder cannot be created: ' + target :
         !fs.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
         !fs.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
         null;
      copyFolder.assert(!error, error);
      const filterOff = {
         base: !settings.basename,
         ext:  !Array.isArray(settings.fileExtensions) || !settings.fileExtensions.length,
         };
      const files: Results["files"] = [];
      const posixPath = (nativePath: string) => slash(nativePath.replace(/.*:/, ''));
      const relativePath = (fullPath: string, start: string): string =>
         fullPath.substring(fullPath.indexOf(start) + start.length + 1);
      const filter = (origin: string, dest: string) => {
         const isFile =     fs.statSync(origin).isFile();
         const name =       path.basename(origin);
         const ext =        path.extname(origin);
         const keepFolder = !isFile && !copyFolder.extraneous.folders.includes(name);
         const keepFile = isFile &&
            (filterOff.base || name.replace(/[.].*/, '') === settings.basename) &&
            (filterOff.ext ||  settings.fileExtensions.includes(ext)) &&
            !copyFolder.extraneous.files.includes(name);
         if (keepFile)
            files.push({
               origin: relativePath(posixPath(origin), source),
               dest:   relativePath(posixPath(dest),   target),
               });
         return keepFolder || keepFile;
         };
      fs.cpSync(source, target, { filter: filter, recursive: true })
      return {
         source:   source,
         target:   target,
         count:    files.length,
         duration: Date.now() - startTime,
         files:    files,
         };
      },

   reporter(results: Results, options?: Partial<ReporterSettings>): Results {
      const defaults: ReporterSettings = {
         summaryOnly: false,
         };
      const settings = { ...defaults, ...options };
      const name =      chalk.gray('copy-folder');
      const source =    chalk.blue.bold(results.source);
      const target =    chalk.magenta(results.target);
      const arrow =     { big: chalk.gray.bold(' ⟹  '), little: chalk.gray.bold('→') };
      const infoColor = results.count ? chalk.white : chalk.red.bold;
      const info =      infoColor(`(files: ${results.count}, ${results.duration}ms)`);
      log(name, source, arrow.big, target, info);
      const logFile = (file: Results["files"][number]) =>
         log(name, chalk.white(file.origin), arrow.little, chalk.green(file.dest));
      if (!settings.summaryOnly)
         results.files.forEach(logFile);
      return results;
      },

   };

export { copyFolder };
