//! copy-folder-cli v0.1.5 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs-extra", "path", "slash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copyFolder = void 0;
    const fs_extra_1 = __importDefault(require("fs-extra"));
    const path_1 = __importDefault(require("path"));
    const slash_1 = __importDefault(require("slash"));
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
                fs_extra_1.default.ensureDirSync(target);
            const errorMessage = !sourceFolder ? 'Must specify the source folder path.' :
                !targetFolder ? 'Must specify the target folder path.' :
                    !fs_extra_1.default.pathExistsSync(source) ? 'Source folder does not exist: ' + source :
                        !fs_extra_1.default.pathExistsSync(target) ? 'Target folder cannot be created: ' + target :
                            !fs_extra_1.default.statSync(source).isDirectory() ? 'Source is not a folder: ' + source :
                                !fs_extra_1.default.statSync(target).isDirectory() ? 'Target is not a folder: ' + target :
                                    null;
            if (errorMessage)
                throw Error('[copy-folder-cli] ' + errorMessage);
            const filterOff = {
                base: !settings.basename,
                ext: !settings.fileExtensions || settings.fileExtensions.length === 0,
            };
            const files = [];
            const filter = (origin, dest) => {
                const isFile = fs_extra_1.default.statSync(origin).isFile();
                const keep = !isFile || ((filterOff.base || path_1.default.basename(origin).replace(/[.].*/, '') === settings.basename) &&
                    (filterOff.ext || settings.fileExtensions.includes(path_1.default.extname(origin))));
                if (isFile && keep)
                    files.push({
                        origin: origin.substring(source.length + 1),
                        dest: dest.substring(target.length + 1),
                    });
                return keep;
            };
            fs_extra_1.default.copySync(source, target, { filter });
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
