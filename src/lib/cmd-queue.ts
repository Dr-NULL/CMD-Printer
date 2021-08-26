import { ArchitectureNotSupportedError, EmptyPrintArrayError } from './errors';
import { EXEC_PATH_X64, EXEC_PATH_X86 } from '..';
import { parseOptions } from './parse-options';
import { PrintingOptions } from './interfaces';
import { TmpFolder } from './tmp-folder';
import { TmpFile } from './tmp-file';
import { exec } from '../tool/cmd';

import { resolve } from 'path';

/**
 * Manages the printing tasks, and the printing configuration.
 */
export class CmdQueue {
    private static _tmp = new TmpFolder();

    private _path: string;
    private _options: PrintingOptions;
    public get options(): PrintingOptions {
        return this._options;
    }

    /**
     * Creates a new instance of `CmdQueue`, which can prints a lot of documents
     * using the current settings. 
     * @param options Printing options to override the default configuration.
     */
    constructor(options?: PrintingOptions) {
        this._options = options ?? {};
        switch (process.arch) {
            case 'x64':
                this._path = EXEC_PATH_X64;
                break;

            case 'x32':
                this._path = EXEC_PATH_X86;
                break;

            default:
                throw new ArchitectureNotSupportedError();
        }
    }

    /**
     * Prints PDF documents using the current configuration.
     * @param data An array of strings or buffers. The string must be paths
     * of pdf files. In case of buffers, there are be pdf data.
     */
    async print(data: (string | Buffer)[]): Promise<void> {
        const files: TmpFile[] = [];
        const paths: string[] = [];

        // Gets the paths
        for (const obj of data) {
            if (typeof obj === 'string') {
                // Add the path
                paths.push(resolve(obj));
            } else if (Buffer.isBuffer(obj)) {
                // Create the temp file
                const file = await CmdQueue._tmp.generate(obj);
                paths.push(file.path);
            }
        }

        // Abort if the array is empty
        if (paths.length === 0) {
            throw new EmptyPrintArrayError();
        }

        // Build the command
        const opt = parseOptions(paths, this._options);
        const res = await exec(this._path, opt);
        if (res.stderr) {
            throw new Error(res.stderr);
        }

        // Delete the temporal file
        await Promise.all(files.map(x => x.kill()));
    }
}
