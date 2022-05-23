import { join } from 'path';
import { getPath } from './tool/get-path.js';

const thisPath = getPath();
export const EXEC_PATH_X64 = join(thisPath.dirname, '../../bin/sumatra-pdf-x64.exe');
export const EXEC_PATH_X86 = join(thisPath.dirname, '../../bin/sumatra-pdf-x86.exe');
export const EXEC_VERSION = '3.3.3';

export { CmdPrinter } from './lib/cmd-printer.js';
export { CmdQueue } from './lib/cmd-queue.js';
export * from './lib/interfaces/index.js';
export * from './lib/errors/index.js';
