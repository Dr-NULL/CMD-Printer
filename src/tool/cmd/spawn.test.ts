import { assert } from 'chai';
import { spawn } from './spawn';

describe('Testing "./tool/cmd/spawn"', () => {
    it('Execute "echo test"', async () => {
        const resp = await spawn('powershell.exe', [ 'echo', 'test' ]);
        assert.exists(resp.stdout);
        
        const text = resp.stdout.toString('utf-8');
        assert.exists(text.match(/test/));
    });
    
    it('Execute "echo test string in PS"', async () => {
        const resp = await spawn('powershell.exe', [ 'echo', 'test', 'string', 'in', 'PS' ]);
        assert.exists(resp.stdout);
        
        const text = resp.stdout.toString('utf-8');
        assert.exists(text.match(/test/));
        assert.exists(text.match(/string/));
        assert.exists(text.match(/in/));
        assert.exists(text.match(/PS/));
    });
});