export class ArchitectureNotSupportedError extends Error {
    constructor(arch: string = process.arch) {
        super(
                `The current architecture "${arch}" it's not supported by this library. `
            +   'The CPU architectures supported are x86 and x64.'
        );
    }
}
