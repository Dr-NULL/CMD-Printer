import { assert } from 'chai';
import { CmdPrinter } from './cmd-printer';

describe('Testing "./lib/cmd-printer"', () => {
    it('Get all printers', async () => {
        const printers = await CmdPrinter.getAll();
        assert.exists(printers.find(x => x.name.match(/print\s+to\s+pdf/gi)));
    }).timeout(5000);

    it('Get the printer "Microsoft Print to PDF"', async () => {
        const printer = await CmdPrinter.find(x => {
            return !!x.name.match(/print\s+to\s+pdf/gi);
        });

        assert.isNotNull(printer);
    }).timeout(5000);
});
