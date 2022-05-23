import { resolve } from 'path';
import { readFile } from 'fs/promises';

import { CmdQueue } from './cmd-queue.js';
import { CmdPrinter } from './cmd-printer.js';

describe('Testing "./lib/cmd-queue"', () => {
    it('Print "100x100.pdf" using the file path -> "Default printer"', async () => {
        const cmd = new CmdQueue();
        await cmd.print([ './test/100x100.pdf' ]);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it('Print "100x100.pdf" using a Buffer -> "Default printer"', async () => {
        const cmd = new CmdQueue();
        await cmd.print([
            await readFile(resolve('./test/100x100.pdf'))
        ]);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it('Print "100x100.pdf" and "100x150.pdf" using the file path -> "Default printer"', async () => {
        const cmd = new CmdQueue();
        await cmd.print([
            './test/100x100.pdf',
            './test/150x100.pdf',
        ]);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it('Print "100x100.pdf" and "100x150.pdf" using a Buffer -> "Default printer"', async () => {
        const cmd = new CmdQueue();
        await cmd.print([
            await readFile(resolve('./test/100x100.pdf')),
            await readFile(resolve('./test/150x100.pdf')),
        ]);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it.skip('Print "100x100.pdf" using the file path -> "Shared printer"', async () => {
        // Prepare printers
        const prints = await CmdPrinter.getAll();

        // Init printing job
        const comm = new CmdQueue({
            printTo: prints.find(x => x.shared),
            orientation: 'landscape',
            silent: true,
            scale: 'fit'
        });

        // Print the document
        await comm.print([ './test/100x100.pdf' ]);
    }).timeout(3500);

    it.skip('Print "100x100.pdf" using a Buffer -> "Shared printer"', async () => {
        // Prepare printer
        const prints = await CmdPrinter.getAll();

        // Prepare file
        const path = resolve('./test/100x100.pdf');
        const byte = await readFile(path);

        // Init printing job
        const comm = new CmdQueue({
            printTo: prints.find(x => x.shared),
            orientation: 'landscape',
            silent: true,
            scale: 'fit'
        });
        await comm.print([ byte ]);
    }).timeout(3500);
});
