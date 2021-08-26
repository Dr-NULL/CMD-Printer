import * as fsPromises from 'fs/promises';
import { join } from 'path';

export class TmpFile {
    private _path: string;
    public get path(): string {
        return this._path;
    }

    constructor(...pathParts: string[]) {
        this._path = join(...pathParts);
    }

    load(): Promise<Buffer> {
        return fsPromises.readFile(this._path);
    }

    save(buffer: Buffer): Promise<void> {
        return fsPromises.writeFile(this._path, buffer);
    }

    kill(): Promise<void> {
        return fsPromises.rm(this._path);
    }

    async exist(): Promise<boolean> {
        try {
            await fsPromises.access(this._path);
            return true;
        } catch (err) {
            return false;
        }
    }
}
