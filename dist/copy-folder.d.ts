//! copy-folder-cli v0.0.3 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

export declare type Options = {
    fileExtensions?: string[];
};
export declare type Results = {
    source: string;
    target: string;
    count: number;
    skipped: number;
    duration: number;
    files: {
        origin: string;
        dest: string;
    }[];
};
declare const copyFolder: {
    cp(sourceFolder: string, targetFolder: string, options: Options): Results;
};
export { copyFolder };
