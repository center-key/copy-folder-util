//! copy-folder-util v1.1.6 ~~ https://github.com/center-key/copy-folder-util ~~ MIT License

export type Settings = {
    basename: string;
    cd: string;
    fileExtensions: string[];
};
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
export type ReporterSettings = {
    summaryOnly: boolean;
};
declare const copyFolder: {
    cp(sourceFolder: string, targetFolder: string, options?: Partial<Settings>): Results;
    reporter(results: Results, options?: Partial<ReporterSettings>): Results;
};
export { copyFolder };
