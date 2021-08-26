import * as cp from 'child_process';
import { SpawnResponse } from './interfaces';

export async function spawn(program: string): Promise<SpawnResponse>;
export async function spawn(program: string, args: string[]): Promise<SpawnResponse>;
export async function spawn(program: string, options: cp.SpawnOptionsWithoutStdio): Promise<SpawnResponse>;
export async function spawn(program: string, args: string[], options: cp.SpawnOptionsWithoutStdio): Promise<SpawnResponse>;
export async function spawn(program: string, arg1?: any, arg2?: any): Promise<SpawnResponse> {
    return new Promise<SpawnResponse>((resolve, reject) => {
        const proc = cp.spawn(program, arg1, arg2);
        
        const dataOut: Buffer[] = [];
        proc.stdout.on('data', (chunk: Buffer) => {
            dataOut.push(chunk);
        });
        
        const dataErr: Buffer[] = [];
        proc.stderr.on('data', (chunk: Buffer) => {
            dataErr.push(chunk);
        });

        let execErr: Error;
        proc.on('close', () => {
            if (!execErr) {
                const resp: SpawnResponse = {};
                if (dataOut.length > 0) {
                    resp.stdout = Buffer.concat(dataOut);
                }

                if (dataErr.length > 0) {
                    resp.stderr = Buffer.concat(dataErr);
                }

                resolve(resp);
            } else {
                reject(execErr);
            }
        });

        proc.on('error', (err) => {
            execErr = err;
        });
    });
}