//! copy-folder-cli v0.0.1 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

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
export { copyFolder };
