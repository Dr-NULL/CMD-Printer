# CMD-Printer

This package contains utilities for locate and print pdf documents, using SumatraPDF. The library works on Windows, and internally it's a command wrapper for SumatraPDF. Support multiple documents at a same printer and sending arguments for a custom configuration. 

For implement this module into your project, install using **npm**:
```
npm install --save cmd-printer
```

## Usage

This module has 2 ways of work, a linear methods collection, or and async operation. By default this module works in async mode, but also has equivalent methods en sync mode.

### Get Printers Async

```typescript
import { CmdPrinter } from "cmd-printer"

//test Async
let testAsync = async () => {
  //List all printers
  let list = await CmdPrinter.getAll()

  //Getting a especified printer
  let zebra = await CmdPrinter.getByName("ZDesigner_Test")

  //Print a Document (always sync)
  await zebra.print([ `test/100x150.pdf` ])
}
testAsync()
```

### Get Printers Sync

```typescript
import { CmdPrinter } from "cmd-printer"

//test Async
let testSync = () => {
  //List all printers
  let list = CmdPrinter.getAllSync()

  //Getting a especified printer
  let zebra = CmdPrinter.getByNameSync("ZDesigner_Test")

  //Print a Document (always sync)
  zebra.print([ `test/100x150.pdf` ])
}
testSync()
```

### Printing with a Remote printer

If your printer is installed in another device, and it's available on the network, you can use that printer satisfacing some requeriments:
- The drivers must be installed in the current device.
- The IP (or machine name) has to been known.
- You have to know the name of the priner.

In that case:
```typescript
import { CmdPrinter } from "cmd-printer";

CmdPrinter.printRemote(
  'location/printer-name',
  [
    'path/of/file/01',
    'path/of/file/02',
    'path/of/file/03'
  ]
)
```

### Using a custom SumatraPDF build

If do you want to use a custom SumatraPDF build, you can set an environment variable with the path of your custom build. In this example, the environment varable will be called as __"SUMATRA_PDF_PATH"__:
```ts
import { CmdPrinter } from 'cmd-printer';
import { resolve } from 'path';

async function task() {
  // Optionally, you can set or edit the value of
  // this environment variable programatically
  process.env['SUMATRA_PDF_PATH'] = join('path/to/the/custom/SumatraPDF.exe');

  // Set the variable name as a static property
  CmdPrinter.envVar = 'SUMATRA_PDF_PATH';

  // Use the library
  const printer = await CmdPrinter.getByName('Microsoft Print to PDF');
  await printer.print([ resolve('./test/100x150.pdf') ]);
}

task();
```

### Printer Options
The methods `instance.print()` and `class.printRemote()` can receive an optional parameter called options. This parameter implements an interface called `iOptions`, and their properties (all optionals) are:
- __adjust__: `"noscale"`, `"shrink"` or `"fit"`.
- __color__: `"color"` or `"monocrome"`.
- __mode__: `"duplex"`, `"duplexshort"`, `"duplexlong"` or `"simplex"`.
- __skip__: `"odd"` or `"even"`.
- __cant__: A number, if is not provided, the cant = 1.

Example of use:
```typescript
import { CmdPrinter } from "cmd-printer";

let test = CmdPrinter.getByNameSync("BIXOLON SRP-350III")
test.print(
  [ 'C:\\Users\\test_user\\Desktop\\test.pdf' ],
  {
    adjust: 'noscale',
    color: 'monocrome',
    mode: 'simplex',
    skip: 'odd',
    cant: 1
  }
)
```
