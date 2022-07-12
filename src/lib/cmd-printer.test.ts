import test from 'ava';
import { CmdPrinter } from './cmd-printer.js';

test('Get all printers', async t => {
    const printers = await CmdPrinter.getAll();
    t.true(printers.some(x => x.name.match(/print\s+to\s+pdf/gi)));
});

test('Get the printer "Microsoft Print to PDF"', async t => {
    const printer = await CmdPrinter.find(x => {
        return !!x.name.match(/print\s+to\s+pdf/gi);
    });

    t.true(printer != null);
});
