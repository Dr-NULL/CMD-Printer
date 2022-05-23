import { join } from 'path';

export function getPath(): { filename: string; dirname: string; } {
    const err = new Error();
    const stack = err.stack?.split(/\n/gi) ?? [];
    const slash = process.platform === 'win32' ? '' : '/';

    const line = stack[2] ?? 'at file:' + process.execPath;
    const xurl = line
        .replace(/\s+at[^\\\/]+(\\|\/)+/gi, slash)
        .replace(/:[0-9]+:[0-9]+\)?$/gi, '');

    const filename = decodeURIComponent(xurl);
    const dirname = join(filename, '..');

    return {
        filename,
        dirname,
    };
}