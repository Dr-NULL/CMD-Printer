# CMD-Printer

This is a package for print PDF to printers settled in the local machine. Uses [SumatraPDF v3.4.6](https://www.sumatrapdfreader.org) for print documents, and __Powershell__ commands for lists the available printers. Works with async methods for not block tha main execution thread. For install the package:
```
npm i --save cmd-printer
```

Now this package works in Windows and WSL/WSL2 (thanks [hugodecasta](https://github.com/hugodecasta)). Besides is compatible with __CommonJS__ and __ESM__ projects too.


## Disclaimer

This library uses an executable to print the documents, so it's not designed to be used in frontend applications. Instead, create a backend application, then add a custom endpoint with an implementation of the library. 

## Usage
### __Classes__

The library contains 2 classes, that works together:
- `CmdPrinter` represents a __Printer__. Has some static methods to get printer instances.
- `CmdQueue` executes the print jobs, and determines the behavior of the printer queue.

### __Print a PDF file__

This is the simplest use of this library. Basically, create a new instance of `CmdQueue`, and execute the method `this.print();`, giving the path's array of the pdfs do you want to print as parameter. If the array given is empty, the `CmdQueue` will throws an `EmptyPrintArrayError` exception.

```ts
import { CmdQueue } from 'cmd-printer';

export async function main(): Promise<void> {
  // Create a new CmdQueue instance
  const cmd = new CmdQueue();
  
  // Print the document using a path array
  await cmd.print([
    './test/100x100.pdf',
    './test/100x150.pdf'
  ]);
}
```

### __Print a PDF Buffer__

If you have a pdf data in a Buffer, you can pass directly the buffer to the `this.print();` method as parameter. _The library will be load the buffer as a __temporaly file___, and destroy the file when the printing process ends.
```ts
import { CmdQueue } from 'cmd-printer';

export async function print(byteDctos: Buffer[]): Promise<void> {
  // Create a new CmdQueue instance
  const cmd = new CmdQueue();
  
  // Print the buffer
  await cmd.print(byteDctos);
}
```

### __Using a custom printer__

By default, a `CmdQueue` instance prints documents to the default system printer, using the default printer configuration. If do you want to change the printer, you can use `CmdPrinter` class to get all installed printers, and select one programatically.
```ts
import { CmdPrinter, CmdQueue } from 'cmd-printer';

export async function main(): Promise<void> {
  // Get all printers installed in the system as Array
  const printers = await CmdPrinter.getAll();

  // Select one using "this.map();" method
  const printer = printers.find(x => x.shared);

  // Create a new CmdQueue instance with the desired printer
  const cmd = new CmdQueue({ printTo: printer });

  // Print the document
  await cmd.print([ './test/100x100.pdf' ]);
}
```

### __Override the default configuration__

If you want to set the printing options, you can change the default settings in the constructor, or manipulating the `this.options` property.
```ts
import { CmdQueue } from 'cmd-printer';

export async function main(): Promise<void> {
  // Create a new CmdQueue instance
  const cmd = new CmdQueue({
    orientation: 'landscape',   // The orientation of the page
    silent: true,               // Don't show errors or warnings
    scale: 'fit'                // Size adjustment
  });
  
  // Print the document
  await cmd.print([ './test/100x100.pdf' ]);
}
```

## Printing options

The options available to configure are the following:

- __`silent`: boolean__.
Silences any error messages related to command line printing. By default is `false`.

- __`printTo`: CmdPrinter__.
Prints all files indicated to the given printer. After printing, SumatraPDF exits immediately. If this parameter is not specified, the default system setted printer will be used.

- __`scale`: Scale__.
The size adjustment of the document into the paper. The values admitted are `"noscale"`, `"shrink"` and `"fit"`.

- __`monochrome`: boolean__.
Prints the document in black and white. By default, this option
is `false`.

- __`orientation`: Orientation__.
Can provide 90 degree rotation of contents _(NOT the rotation of
paper which must be pre-set by the choice of printer defaults)_.
The values accepted are `"portrait"` and `"landscape"`.

- __`printingMode`: PrintingMode__.
Available printing modes:
  - `"duplex"`: Prints the paper in both sides.
  - `"duplexshort"`: Duplex mode using the shortest edge as flip axis.
  - `"duplexlong"`: Duplex mode using the longest edge as flip axis.
  - `"simplex"`: One side printing mode.

- __`paperTray`: string | number__.
Select a specific paper tray (by index number or by name) for use.

- __`paperSize`: PaperSize__.
Override the paper size of the document, applying this one instead. The values accepted are `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`, `"letter"`, `"legal"`, `"tabloid"` or `"statement"`.

- __`half`: Half__.
Prints only `"odd"` or `"even"` pages of the document.

- __`pages`: (number | PageInterval)[]__.
Sets the pages do you want to print. Some examples:
```ts
// Prints the pages 1, 4, 5
const cmd = new CmdQueue({
  pages: [ 1, 4, 5 ]
});

// Prints page 1, and pages from 3 to 6
const cmd = new CmdQueue({
  pages: [ 1, { from: 3, to: 6 } ]
});
```

## About CmdPrinter class
This class represents an individual printer, however also has some static methods to get the desired printers:

### `CmdPrinter.getAll`
This function returns a promise of `CmdPrinter[]`. In other terms, returns a promise with all printers installed in the current machine. For example:
```ts
import { CmdPrinter } from 'cmd-printer';

export async function main(): Promise<void> {
  // Get all printers installed in the system as Array
  const printers = await CmdPrinter.getAll();
  console.log(printers);
}
```

### `CmdPrinter.find`
This function makes a search using a delegate function asynchronously. Returns a promise with the first `CmdPrinter` instance found, or `null` if doesn't found. For example:
```ts
import { CmdPrinter } from 'cmd-printer';

export async function main(): Promise<void> {
  // Get a printer called "Zebra Printer"
  const printer = await CmdPrinter.find(x => x.name === 'Zebra Printer');
  console.log(printer);
}
```
