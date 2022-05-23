import { assert } from 'chai';
import { join } from 'path';

import { getPath } from "../get-path.js";
import { exec } from './exec.js';

describe('Testing "./tool/cmd/exec"', () => {
    it('Execute "npm --v"', async () => {
        const resp = await exec('npm', [ '--v' ]);

        assert.typeOf(resp.stdout, 'string');
        assert.match(resp.stdout ?? '', /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\s*$/gi);
    }).timeout(4000);

    it('Execute "ls __dirname/../../bin"', async () => {
        const resp = await exec('powershell.exe', [ 'ls', '.' ], {
            cwd: join(getPath().dirname, '../../bin')
        });

        assert.typeOf(resp.stdout, 'string');
        assert.match(resp.stdout ?? '', /sumatra-pdf-x64\.exe/gi);
        assert.match(resp.stdout ?? '', /sumatra-pdf-x86\.exe/gi);
    }).timeout(Number.MAX_SAFE_INTEGER);
});
