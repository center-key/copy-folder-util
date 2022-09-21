//! copy-folder-cli v0.1.0 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

import fs from 'fs-extra';
import path from 'path';
import slash from 'slash';
const copyFolder = {
    cp(sourceFolder, targetFolder, options) {
        const normalize = (folder) => !folder ? '' : slash(path.normalize(folder)).replace(/\/$/, '');
        const source = normalize(sourceFolder);
        const target = normalize(targetFolder);
        const startTime = Date.now();
        const defaults = {
            fileExtensions: [],
        };
        const settings = Object.assign(Object.assign({}, defaults), options);
        if (target)
            fs.ensureDirSync(target);
        const errorMessage = !source ? 'Must specify the "source" folder path.' :
            !target ? 'Must specify the "target" folder path.' :
                !fs.pathExistsSync(source) ? 'Source folder does not exist: ' + source :
                    !fs.pathExistsSync(target) ? 'Target folder cannot be created: ' + target :
                        !fs.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
                            !fs.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
                                null;
        if (errorMessage)
            throw Error('[copy-folder-cli] ' + errorMessage);
        let skipped = 0;
        const files = [];
        const filter = (origin, dest) => {
            const stats = fs.statSync(origin);
            const skip = stats.isFile() && settings.fileExtensions.length > 0 &&
                !settings.fileExtensions.includes(path.extname(origin));
            if (skip)
                skipped++;
            else if (!stats.isDirectory())
                files.push({
                    origin: origin.substring(source.length + 1),
                    dest: dest.substring(target.length + 1),
                });
            return !skip;
        };
        fs.copySync(source, target, { filter: filter });
        return {
            source: source,
            target: target,
            count: files.length,
            skipped: skipped,
            duration: Date.now() - startTime,
            files: files,
        };
    },
};
export { copyFolder };
