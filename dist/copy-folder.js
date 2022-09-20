//! copy-folder-cli v0.0.2 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

import fs from 'fs-extra';
const copyFolder = {
    cp(source, target, options) {
        const defaults = {
            fileExtensions: [],
        };
        const settings = Object.assign(Object.assign({}, defaults), options);
        if (target)
            fs.ensureDirSync(target);
        const errorMessage = settings.fileExtensions.length ? 'File extension filtering not yet implemented.' :
            !source ? 'Must specify the "source" folder path.' :
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
        const filter = (origin, destination) => {
            const skip = false;
            if (skip)
                skipped++;
            else if (!fs.statSync(origin).isDirectory())
                files.push({ origin, destination });
            return !skip;
        };
        fs.copySync(source, target, { filter: filter });
        return {
            source: source,
            target: target,
            count: files.length,
            skipped: skipped,
            files: files
        };
    },
};
export { copyFolder };
