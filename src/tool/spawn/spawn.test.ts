import test from 'ava';
import { spawn } from './spawn.js';

test('Execute "echo test"', async t => {
    const resp = await spawn('powershell.exe', [ 'echo', 'test' ]);
    t.true(resp.stdout != null);
    
    const text = resp.stdout?.toString('utf-8');
    t.true(text?.match(/test/) != null);
});

test('Execute "echo test string in PS"', async t => {
    const resp = await spawn('powershell.exe', [ 'echo', 'test', 'string', 'in', 'PS' ]);
    t.true(resp.stdout != null);
    
    const text = resp.stdout?.toString('utf-8');
    t.true(text?.match(/test/) != null);
    t.true(text?.match(/string/) != null);
    t.true(text?.match(/in/) != null);
    t.true(text?.match(/PS/) != null);
});