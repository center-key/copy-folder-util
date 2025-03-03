// copy-folder-util ~~ MIT License

// Imports
import chalk from 'chalk';
import fs    from 'fs';
import log   from 'fancy-log';
import path  from 'path';
import slash from 'slash';

// Types
export type Settings = {
   basename:       string,    //filter files by filename ignoring the file extension
   cd:             string,    //change working directory before starting copy
   fileExtensions: string[],  //filter files by file extensions, example: ['.js', '.css']
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

const extraneousFiles =   ['.DS_Store', 'Thumbs.db', 'desktop.ini'];
const extraneousFolders = ['.git', 'node_modules'];

const copyFolder = {

   cp(sourceFolder: string, targetFolder: string, options?: Partial<Settings>): Results {
      const defaults = {
         basename:       null,
         cd:             null,
         fileExtensions: [],
         };
      const settings = { ...defaults, ...options };
      const startTime = Date.now();
      const normalize = (folder: string) =>
         !folder ? '' : slash(path.normalize(folder)).replace(/\/$/, '');
      const startFolder = settings.cd ? normalize(settings.cd) + '/' : '';
      const source =      normalize(startFolder + sourceFolder);
      const target =      normalize(startFolder + targetFolder);
      if (targetFolder)
         fs.mkdirSync(target, { recursive: true });
      const errorMessage =
         !sourceFolder ?                      'Must specify the source folder path.' :
         !targetFolder ?                      'Must specify the target folder path.' :
         !fs.existsSync(source) ?             'Source folder does not exist: ' + source :
         !fs.existsSync(target) ?             'Target folder cannot be created: ' + target :
         !fs.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
         !fs.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
         null;
      if (errorMessage)
         throw new Error('[copy-folder-util] ' + errorMessage);
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
         const keepFolder = !isFile && !extraneousFolders.includes(name);
         const keepFile = isFile &&
            (filterOff.base || name.replace(/[.].*/, '') === settings.basename) &&
            (filterOff.ext ||  settings.fileExtensions.includes(ext)) &&
            !extraneousFiles.includes(name);
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
      const defaults = {
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
      const logFile = (file: Results["files"][0]) =>
         log(name, chalk.white(file.origin), arrow.little, chalk.green(file.dest));
      if (!settings.summaryOnly)
         results.files.forEach(logFile);
      return results;
      },

   };

export { copyFolder };
