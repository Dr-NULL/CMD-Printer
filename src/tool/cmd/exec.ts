import { SpawnOptions } from 'child_process';
import cptable from 'codepage';

import { GetCodePageError } from './errors';
import { ExecResponse } from './interfaces';
import { spawn } from './spawn';

export async function exec(program: string): Promise<ExecResponse>;
export async function exec(program: string, args: string[]): Promise<ExecResponse>;
export async function exec(program: string, options: SpawnOptions): Promise<ExecResponse>;
export async function exec(program: string, args: string[], options: SpawnOptions): Promise<ExecResponse>;
export async function exec(program: string, arg1?: any, arg2?: any): Promise<ExecResponse> {
    // Read the codepage field
    let codePage: number;
    try {
        const raw = await spawn('powershell.exe', [ '[console]::InputEncoding.CodePage' ]);
        if (raw?.stdout) {
            const txt = raw.stdout.toString('utf-8');
            const num = txt.replace(/[^0-9]/gi, '');
            codePage = parseInt(num, 10);
        } else {
            throw new GetCodePageError();
        }
    } catch (err) {
        if (err instanceof GetCodePageError) {
            throw err;
        } else {
            throw new GetCodePageError();
        }
    }

    // Execute the command
    const raw = await spawn(program, arg1, arg2);
    const res: ExecResponse = { };
    if (raw.stdout) {
        res.stdout = cptable.utils.decode(codePage, raw.stdout);
    }
    if (raw.stderr) {
        res.stderr = cptable.utils.decode(codePage, raw.stderr);
    }
    return res;
}