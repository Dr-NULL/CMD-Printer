import { CmdPrinter } from '.';
import { join, resolve } from 'path';


const exec = async () => {
  try {
    console.log('TEST -> Testing wrong environment variable');
    CmdPrinter.envVar = 'SUMATRA_PATH_LOL';
    console.log('');
    
    const printer = await CmdPrinter.getByName('Microsoft Print to PDF');
    await printer.print([ join(__dirname, '..', 'test', '100x150.pdf') ]);

  } catch (err) {
    console.log(err.message);
    console.log('');
  }

  try {
    console.log('TEST -> Testing an existent environment variable');
    process.env['SUMATRA_PATH'] = resolve('./bin/SumatraPDF.exe');

    CmdPrinter.envVar = 'SUMATRA_PATH';
    const printer = await CmdPrinter.getByName('Microsoft Print to PDF');
    await printer.print([ resolve('./test/100x150.pdf') ]);

  } catch (err) {
    console.log(err.message);
  }
};

exec();