//! copy-folder-util v0.2.0 ~~ https://github.com/center-key/copy-folder-util ~~ MIT License

export declare type Settings = {
    basename: string;
    cd: string;
    fileExtensions: string[];
};
export declare type Options = Partial<Settings>;
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
