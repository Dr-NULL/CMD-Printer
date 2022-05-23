import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import * as fsPromises from 'fs/promises';
import * as os from 'os';

import { TmpFile } from './tmp-file.js';

export class TmpFolder {
    private _path?: string;
    public get path(): string | undefined {
        return this._path;
    }

    constructor() {}

    private async _onExit(): Promise<void> {
        if (this._path) {
            // Delete recursively the folder and the content
            await fsPromises.rm(this._path, {
                recursive: true,
                force: true
            });

            // Clean the folder name
            this._path = undefined;
        }
    }

    async generate(buffer: Buffer): Promise<TmpFile> {
        // Create the folder if not exists
        if (!this._path) {
            // Create the folder
            const prefix = join(os.tmpdir(), 'cmd-printer-');
            this._path = await fsPromises.mkdtemp(prefix);
    
            // Destroy the folder
            process.on('beforeExit', this._onExit.bind(this));
        }

        // Create the temporal file
        let file: TmpFile;
        do {
            const name = `tmp-${uuidv4()}.pdf`;
            file = new TmpFile(this._path, name);
        } while (await file.exist());

        // Save the data and returns the instance
        await file.save(buffer);
        return file;
    }
}
