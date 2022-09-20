//! copy-folder-cli v0.0.1 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

export declare type Options = {
    fileExtensions?: string[];
};
export declare type Result = {
    source: string;
    target: string;
};
declare const copyFolder: {
    cp(source: string, target: string, options: Options): Result;
};
export { copyFolder };
