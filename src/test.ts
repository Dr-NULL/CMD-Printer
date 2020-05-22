import { CmdPrinter } from '.';
import { join } from 'path';

const printer = CmdPrinter.getByNameSync('ZDesigner ZT410 203dpi 100 x 150')
printer.print(
  [
    join(__dirname, '..', 'test', '100x150.pdf')
  ]
)