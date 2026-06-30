//! copy-folder-util v1.2.5 ~~ https://github.com/center-key/copy-folder-util ~~ MIT License

export type Settings = {
    basename: string | null;
    cd: string | null;
    fileExtensions: string[];
};
export type Results = {
    source: string;
    target: string;
    count: number;
    duration: number;
    files: {
        filename: string;
        origin: string;
        dest: string;
    }[];
};
export type ResultsFile = Results["files"][number];
export type ReporterSettings = {
    summaryOnly: boolean;
};
declare const copyFolder: {
    version: string;
    extraneous: {
        files: string[];
        folders: string[];
    };
    assertOk(ok: unknown, message: string | null): void;
    cli(): void;
    cp(sourceFolder: string, targetFolder: string, options?: Partial<Settings>): Results;
    reporter(results: Results, options?: Partial<ReporterSettings>): Results;
};
export { copyFolder };
