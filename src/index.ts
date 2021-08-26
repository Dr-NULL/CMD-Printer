import { join } from 'path';

export const EXEC_PATH_X64 = join(__dirname, '../bin/sumatra-pdf-x64.exe');
export const EXEC_PATH_X86 = join(__dirname, '../bin/sumatra-pdf-x86.exe');
export const EXEC_VERSION = '3.3.3';

export { CmdPrinter } from './lib/cmd-printer';
export { CmdQueue } from './lib/cmd-queue';
export * from './lib/interfaces';
export * from './lib/errors';
