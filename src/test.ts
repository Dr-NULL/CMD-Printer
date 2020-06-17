import { CmdPrinter } from '.';
import { join } from 'path';

const printer = CmdPrinter.getByNameSync('Microsoft Print to PDF')
printer.print(
  [
    join(__dirname, '..', 'test', '100x150.pdf')
  ]
).catch(err => {
  console.log(err);
})