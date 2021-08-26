import { assert } from 'chai';
import { exec } from './exec';
import { join } from 'path';

describe('Testing "./tool/cmd/exec"', () => {
    it('Execute "npm --v"', async () => {
        const resp = await exec('powershell.exe', [ 'npm', '--v' ]);
        assert.match(resp.stdout, /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\s*$/gi);
    }).timeout(4000);

    it('Execute "ls __dirname/../../../bin"', async () => {
        const path = join(__dirname, '../../../bin');
        const resp = await exec('powershell.exe', [ 'ls', path ]);
        assert.match(resp.stdout, /sumatra-pdf-x64\.exe/gi);
        assert.match(resp.stdout, /sumatra-pdf-x86\.exe/gi);
    });
});