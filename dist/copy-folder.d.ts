//! copy-folder-util v1.0.0 ~~ https://github.com/center-key/copy-folder-util ~~ MIT License

export type Settings = {
    basename: string;
    cd: string;
    fileExtensions: string[];
};
export type Options = Partial<Settings>;
export type Results = {
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
