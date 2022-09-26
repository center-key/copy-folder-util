//! copy-folder-cli v0.1.5 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

export declare type Options = {
    basename?: string;
    cd?: string;
    fileExtensions?: string[];
};
export declare type Results = {
    source: string;
    target: string;
    count: number;
    duration: number;
    files: {
        origin: string;
        dest: string;
    }[];
};
declare const copyFolder: {
    cp(sourceFolder: string, targetFolder: string, options?: Options): Results;
};
export { copyFolder };
