export class GetCodePageError extends Error {
    constructor() {
        super('Failed at read the code page value from windows powershell.');
    }
}