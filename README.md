# CMD-Printer

This package contains utilities for locate and print pdf documents, using a own dotNET client (implements Free Spire NuGET lib). The client is located into the `.\dot-net` folder, and the npm package is into `.\node-js` folder.

For implement this module into your project, install using **npm**:
```
npm install --save cmd-printer
```

## Build

Before compile the project, you must install some dependencies:

### Prerequisites:
- Visual Studio 2019 or higher.
- dotNET Core 3.1
- Node.js
- Typescript 

### Build:

Transpile *.ts files and compile the executables:
```console
foo@bar:~$ cd ./node-js
foo@bar:~$ npm run prepare
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
    await zebra.print([ `test/test.pdf` ])
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
    zebra.print(`test/test.pdf`)
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
    [
      'path/of/file/01',
      'path/of/file/02',
      'path/of/file/03'
    ],
    [
      'location/printer-name-01',
      'location/printer-name-02',
      'location/printer-name-03'
    ]
)
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
    "C:\\Users\\test_user\\Desktop\\test.pdf",
    {
        adjust: 'noscale',
        color: 'monocrome',
        mode: 'simplex',
        skip: 'odd',
        cant: 1
    }
)
```
