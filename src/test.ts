import { CmdPrinter } from '.';
import { join } from 'path';

const easyCode100x100 = CmdPrinter.getByNameSync('EasyCoder PF4i (203 dpi) - DP 100 x 100')
const easyCode100x150 = CmdPrinter.getByNameSync('EasyCoder PX4i (203 dpi) - DP 100 x 150')
const zDesigner100x150 = CmdPrinter.getByNameSync('ZDesigner ZT410 203dpi 100 x 150')

easyCode100x100.print(
  [
    join(__dirname, '..', 'test', '100x100.pdf')
  ]
)
easyCode100x150.print(
  [
    join(__dirname, '..', 'test', '100x150.pdf')
  ]
)
zDesigner100x150.print(
  [
    join(__dirname, '..', 'test', '100x150.pdf')
  ]
)