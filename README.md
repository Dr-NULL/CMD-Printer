# CMD-Printer

This module contains some utilities for print PDF. It's written in Typescript and has its own declaration files (*.d.ts). This project for now runs only on Windows.

For implement this module into your project, install using **npm**:
```
npm install --save cmd-printer
```


## Usage

This module has 2 ways of work, a linear methods collection, or and async operation. By default this module works in async mode, but also has equivalent methods en sync mode.

### Async

```typescript
import CmdPrinter from "cmd-printer"

//test Async
let testAsync = async () => {
    //List all printers
    let list = await CmdPrinter.getAll()

    //Getting a especified printer
    let zebra = await CmdPrinter.getByName("ZDesigner_Test")

    //Print a Document
    await zebra.print(`test/test.pdf`)
}
testAsync()
```

### Sync

```typescript
import CmdPrinter from "cmd-printer"

//test Async
let testSync = () => {
    //List all printers
    let list = CmdPrinter.getAllSync()

    //Getting a especified printer
    let zebra = CmdPrinter.getByNameSync("ZDesigner_Test")

    //Print a Document
    zebra.printSync(`test/test.pdf`)
}
testSync()
```