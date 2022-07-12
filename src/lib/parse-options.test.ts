import test from 'ava';

import { CmdPrinter } from './cmd-printer.js';
import { parseOptions } from './parse-options.js';
import { PrintingOptions } from './interfaces/index.js';

function fakePrinter(name: string, ip?: string) {
    const shared = !!ip;
    const computerName = ip;
    const shareName = name;

    const out: CmdPrinter = {
        name, computerName, type: 0, driverName: 'jajaj',
        portName: 'jajaja', shared, shareName, published: false
    };

    return out;
}

test('Default printer', t => {
    const opt: PrintingOptions = {};
    const out = parseOptions([ ], opt);
    t.is(out?.length, 1);
    t.is(out[0], '-print-to-default');
});

test('Custom local printer', t => {
    const opt: PrintingOptions = {
        printTo: fakePrinter('test-print')
    };

    const out = parseOptions([ ], opt);
    t.is(out?.length, 2);
    t.is(out[0], '-print-to');
    t.is(out[1], 'test-print');
});

test('Custom remote printer', t => {
    const opt: PrintingOptions = {
        printTo: fakePrinter('test-print', '127.0.0.1')
    };

    const out = parseOptions([ ], opt);
    t.is(out?.length, 2);
    t.is(out[0], '-print-to');
    t.is(out[1], '\\\\127.0.0.1\\test-print');
});

test('Pages 1, 2, 5-10, 15, 16, 17', t => {
    const opt: PrintingOptions = {
        pages: [ 1, 2, { from: 5, to: 10 }, 15, 16, 17 ]
    };

    const out = parseOptions([ ], opt);
    t.is(out?.length, 3);
    t.is(out[0], '-print-to-default');
    t.is(out[1], '-print-settings');
    t.is(out[2], 'color, 1, 2, 5-10, 15, 16, 17');
});