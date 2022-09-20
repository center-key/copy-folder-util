//! copy-folder-cli v0.0.1 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copyFolder = void 0;
    const copyFolder = {
        cp(source, target, options) {
            const defaults = {
                fileExtensions: [],
            };
            const settings = Object.assign(Object.assign({}, defaults), options);
            if (!source)
                throw Error('[copy-folder-cli] Must specify the "source" folder path.');
            console.log('[copy-folder-cli]', source, target);
            return {
                source: source + ' [' + settings.fileExtensions.join('/') + ']',
                target: target,
            };
        },
    };
    exports.copyFolder = copyFolder;
});
