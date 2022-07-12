import { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export function getPath(): { filename: string; dirname: string; } {
    const err = new Error();
    const stack = err.stack?.split(/\n/gi) ?? [];

    const line = stack[2] ?? 'at ' + pathToFileURL(process.execPath);
    const xurl = line
        .replace(/\s+at\s+(?=file)/gi, '')
        .replace(/:[0-9]+:[0-9]+\)?$/gi, '');

    const filename = fileURLToPath(xurl)
    const dirname = join(filename, '..');

    return {
        filename,
        dirname,
    };
}