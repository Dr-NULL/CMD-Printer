import test from 'ava';

import { spawnPS } from './spawn-ps.js';

test('Execute "npm --v"', async t => {
    t.timeout(10000);
    const resp = await spawnPS('npm', [ '--v' ]);

    t.is(typeof resp.stdout, 'string');
    t.regex(resp.stdout ?? '', /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\s*$/gi);
});

test('Execute "ls __dirname/../../bin"', async t => {
    t.timeout(10000);
    const resp = await spawnPS('powershell.exe', [ '-Command', 'ls ./bin']);

    t.is(typeof resp.stdout, 'string');
    t.regex(resp.stdout ?? '', /sumatra-pdf-x64\.exe/gi);
    t.regex(resp.stdout ?? '', /sumatra-pdf-x86\.exe/gi);
});