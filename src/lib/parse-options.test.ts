import { assert } from 'chai';
import { CmdPrinter } from './cmd-printer';
import { parseOptions } from './parse-options';
import { PrintingOptions } from './interfaces';

function fakePrinter(name: string, ip?: string) {
    const shared = !!ip;
    const computerName = ip;
    const shareName = name;

    const out: CmdPrinter = {
        name, computerName, type: null, driverName: null,
        portName: null, shared, shareName, published: null
    };

    return out;
}

describe('Testing "./lib/parse-options"', () => {
    it('Default printer', () => {
        const opt: PrintingOptions = {};
        const out = parseOptions([ ], opt);
        assert.lengthOf(out, 1);
        assert.strictEqual(out[0], '-print-to-default');
    });

    it('Custom local printer', () => {
        const opt: PrintingOptions = {
            printTo: fakePrinter('test-print')
        };

        const out = parseOptions([ ], opt);
        assert.lengthOf(out, 2);
        assert.strictEqual(out[0], '-print-to');
        assert.strictEqual(out[1], 'test-print');
    });

    it('Custom remote printer', () => {
        const opt: PrintingOptions = {
            printTo: fakePrinter('test-print', '127.0.0.1')
        };

        const out = parseOptions([ ], opt);
        assert.lengthOf(out, 2);
        assert.strictEqual(out[0], '-print-to');
        assert.strictEqual(out[1], '\\\\127.0.0.1\\test-print');
    });

    it('Pages 1, 2, 5-10, 15, 16, 17', () => {
        const opt: PrintingOptions = {
            pages: [ 1, 2, { from: 5, to: 10 }, 15, 16, 17 ]
        };

        const out = parseOptions([ ], opt);
        assert.lengthOf(out, 3);
        assert.strictEqual(out[0], '-print-to-default');
        assert.strictEqual(out[1], '-print-settings');
        assert.strictEqual(out[2], 'color, 1, 2, 5-10, 15, 16, 17');
    });
});
