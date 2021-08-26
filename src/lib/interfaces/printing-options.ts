import { Half } from './half';
import { Scale } from './scale';
import { PaperSize } from './paper-size';
import { CmdPrinter } from '../cmd-printer';
import { Orientation } from './orientation';
import { PageInterval } from './page-interval';
import { PrintingMode } from './printing-mode';


export interface PrintingOptions {
    /**
     * Silences any error messages related to command line printing.
     */
    silent?: boolean;

    /**
     * Prints all files indicated on this command line to the named
     * printer. After printing, SumatraPDF exits immediately. If this
     * parameter is not specified, the default system setted printer
     * will be used.
     */
    printTo?: CmdPrinter;

    /**
     * The size adjustment of the document into the paper. Values are
     * `"noscale"`, `"shrink"` or `"fit"`.
     */
    scale?: Scale;

    /**
     * Prints the document in black and white. By default, this option
     * is `false`.
     */
    monochrome?: boolean;

    /**
     * Can provide 90 degree rotation of contents _(NOT the rotation of
     * paper which must be pre-set by the choice of printer defaults)._
     * The values accepted are `"portrait"` and `"landscape"`.
     */
    orientation?: Orientation;

    /**
     * Available printing modes:
     * - `"duplex"`: Prints the paper in both sides.
     * - `"duplexshort"`: Duplex mode using the shortest edge as flip axis.
     * - `"duplexlong"`: Duplex mode using the longest edge as flip axis.
     * - `"simplex"`: One side printing mode.
     */
    printingMode?: PrintingMode;

    /**
     * Select a specific paper tray (by index number or by name) for use.
     */
    paperTray?: string | number;

    /** 
     * Override the paper size of the document, applying this one instead.
     * The values accepted are `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`,
     * `"letter"`, `"legal"`, `"tabloid"` or `"statement"`.
     */
    paperSize?: PaperSize;

    /**
     * Prints only `"odd"` or `"even"` pages of the document.
     */
    half?: Half;

    /**
     * Sets the specific pages do you want to print, for example:
     * ```ts
     * // Prints only the pages 1, 2 and 4
     * const opt: PrintOptions = {
     *   pages: [ 1, 2, 4 ]
     * };
     * 
     * // Prints only the pages 1, 2 and from 5 to 10
     * const opt: PrintOptions = {
     *   pages: [ 1, 2, { from: 5, to: 10 } ]
     * };
     * ```
     */
    pages?: (number | PageInterval)[];
}
