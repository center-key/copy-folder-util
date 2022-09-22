// copy-folder-cli ~~ MIT License

import fs from 'fs-extra';
import path from 'path';
import slash from 'slash';

export type Options = {
   fileExtensions?: string[],  //filter files by supplied file extensions, example: ['.js']
   };
export type Results = {
   source:   string,  //path of origination folder
   target:   string,  //path of destination folder
   count:    number,  //number of files copied
   skipped:  number,  //files filtered out
   duration: number,  //execution time in milliseconds
   files:   { origin: string, dest: string }[],
   };

const copyFolder = {

   cp(sourceFolder: string, targetFolder: string, options?: Options): Results {
      const defaults = {
         fileExtensions: [],
         };
      const settings = { ...defaults, ...options };
      const startTime = Date.now();
      const normalize = (folder: string) =>
         !folder ? '' : slash(path.normalize(folder)).replace(/\/$/, '');
      const source = normalize(sourceFolder);
      const target = normalize(targetFolder);
      if (target)
         fs.ensureDirSync(target);
      const errorMessage =
         !source ?                            'Must specify the source folder path.' :
         !target ?                            'Must specify the target folder path.' :
         !fs.pathExistsSync(source) ?         'Source folder does not exist: ' + source :
         !fs.pathExistsSync(target) ?         'Target folder cannot be created: ' + target :
         !fs.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
         !fs.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
         null;
      if (errorMessage)
         throw Error('[copy-folder-cli] ' + errorMessage);
      const filterEnabled = { ext: settings.fileExtensions && settings.fileExtensions.length > 0 }
      const info = { skipped: 0 };
      const files: Results["files"] = [];
      const filter = (origin: string, dest: string) => {
         const isFile = fs.statSync(origin).isFile();
         const skip = isFile && filterEnabled.ext &&
            !settings.fileExtensions.includes(path.extname(origin));
         if (skip)
            info.skipped++;
         else if (isFile)
            files.push({
               origin: origin.substring(source.length + 1),
               dest:   dest.substring(target.length + 1),
               });
         return !skip;
         };
      fs.copySync(source, target, { filter: filter })
      return {
         source:   source,
         target:   target,
         count:    files.length,
         skipped:  info.skipped,
         duration: Date.now() - startTime,
         files:    files,
         };
      },

   };

export { copyFolder };
