// copy-folder-cli ~~ MIT License

export type Options = {
   fileExtensions?: string[],  //filter files by supplied file extensions
   };
export type Result = {
   source: string,  //path of origination folder
   target: string,  //path of destination folder
   };

const copyFolder = {

   cp(source: string, target: string, options: Options): Result {
      const defaults = {
         fileExtensions: [],
         };
      const settings = { ...defaults, ...options };
      if (!source)
         throw Error('[copy-folder-cli] Must specify the "source" folder path.');
      console.log('[copy-folder-cli]', source, target);
      return {
         source: source + ' [' + settings.fileExtensions.join('/') + ']',
         target: target,
         };
      },

   };

export { copyFolder };
