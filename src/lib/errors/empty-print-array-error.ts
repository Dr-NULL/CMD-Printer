export class EmptyPrintArrayError extends Error {
    constructor() {
        super('The array provided to "this.print();" method was empty.');
    }
}
