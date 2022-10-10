//! copy-folder-util v0.2.0 ~~ https://github.com/center-key/copy-folder-util ~~ MIT License

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path", "slash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copyFolder = void 0;
    const fs_1 = __importDefault(require("fs"));
    const path_1 = __importDefault(require("path"));
    const slash_1 = __importDefault(require("slash"));
    const extraneousFiles = ['.DS_Store', 'Thumbs.db', 'desktop.ini'];
    const extraneousFolders = ['.git', 'node_modules'];
    const copyFolder = {
        cp(sourceFolder, targetFolder, options) {
            const defaults = {
                basename: null,
                cd: null,
                fileExtensions: [],
            };
            const settings = Object.assign(Object.assign({}, defaults), options);
            const startTime = Date.now();
            const normalize = (folder) => !folder ? '' : (0, slash_1.default)(path_1.default.normalize(folder)).replace(/\/$/, '');
            const startFolder = settings.cd ? normalize(settings.cd) + '/' : '';
            const source = normalize(startFolder + sourceFolder);
            const target = normalize(startFolder + targetFolder);
            if (targetFolder)
                fs_1.default.mkdirSync(target, { recursive: true });
            const errorMessage = !sourceFolder ? 'Must specify the source folder path.' :
                !targetFolder ? 'Must specify the target folder path.' :
                    !fs_1.default.existsSync(source) ? 'Source folder does not exist: ' + source :
                        !fs_1.default.existsSync(target) ? 'Target folder cannot be created: ' + target :
                            !fs_1.default.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
                                !fs_1.default.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
                                    null;
            if (errorMessage)
                throw Error('[copy-folder-util] ' + errorMessage);
            const filterOff = {
                base: !settings.basename,
                ext: !settings.fileExtensions || settings.fileExtensions.length === 0,
            };
            const files = [];
            const filter = (origin, dest) => {
                const isFile = fs_1.default.statSync(origin).isFile();
                const name = path_1.default.basename(origin);
                const ext = path_1.default.extname(origin);
                const keepFolder = !isFile && !extraneousFolders.includes(name);
                const keepFile = isFile &&
                    (filterOff.base || name.replace(/[.].*/, '') === settings.basename) &&
                    (filterOff.ext || settings.fileExtensions.includes(ext)) &&
                    !extraneousFiles.includes(name);
                if (keepFile)
                    files.push({
                        origin: origin.substring(source.length + 1),
                        dest: dest.substring(target.length + 1),
                    });
                return keepFolder || keepFile;
            };
            fs_1.default.cpSync(source, target, { filter: filter, recursive: true });
            return {
                source: source,
                target: target,
                count: files.length,
                duration: Date.now() - startTime,
                files: files,
            };
        },
    };
    exports.copyFolder = copyFolder;
});
