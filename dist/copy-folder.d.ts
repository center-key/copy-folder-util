//! copy-folder-cli v0.0.2 ~~ https://github.com/center-key/copy-folder-cli ~~ MIT License

export declare type Options = {
    fileExtensions?: string[];
};
export declare type Result = {
    source: string;
    target: string;
    count: number;
    skipped: number;
    files: {
        origin: string;
        destination: string;
    }[];
};
declare const copyFolder: {
    cp(source: string, target: string, options: Options): Result;
};
export { copyFolder };
