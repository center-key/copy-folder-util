// copy-folder-cli ~~ MIT License

import fs from 'fs-extra';
import path from 'path';
import slash from 'slash';

export type Options = {
   basename?:       string,    //filter files by filename ignoring the file extension
   fileExtensions?: string[],  //filter files by file extensions, example: ['.js', '.css']
   };
export type Results = {
   source:   string,  //path of origination folder
   target:   string,  //path of destination folder
   count:    number,  //number of files copied
   duration: number,  //execution time in milliseconds
   files:   { origin: string, dest: string }[],
   };

const copyFolder = {

   cp(sourceFolder: string, targetFolder: string, options?: Options): Results {
      const defaults = {
         basename:       null,
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
      const filterOff = {
         base: !settings.basename,
         ext:  !settings.fileExtensions || settings.fileExtensions.length === 0,
         };
      const files: Results["files"] = [];
      const filter = (origin: string, dest: string) => {
         const isFile = fs.statSync(origin).isFile();
         const keep = !isFile || (
            (filterOff.base || path.basename(origin).replace(/[.].*/, '') === settings.basename) &&
            (filterOff.ext ||  settings.fileExtensions.includes(path.extname(origin))));
         if (isFile && keep)
            files.push({
               origin: origin.substring(source.length + 1),
               dest:   dest.substring(target.length + 1),
               });
         return keep;
         };
      fs.copySync(source, target, { filter: filter })
      return {
         source:   source,
         target:   target,
         count:    files.length,
         duration: Date.now() - startTime,
         files:    files,
         };
      },

   };

export { copyFolder };
