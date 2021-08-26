import { exec } from '../tool/cmd';

/**
 * Represents a printer installed in the local system.
 */
export class CmdPrinter {
    /**
     * Get all installed printers in the local system as an array of CmdPrinter.
     */
    public static async getAll(): Promise<CmdPrinter[]> {
        const arg = 'Get-Printer | Select-Object Name, ComputerName, Type, '
                +   'DriverName, PortName, Shared, ShareName, Published | ConvertTo-Json';

        const raw = await exec('powershell.exe', [ arg ]);
        const out: any[] = JSON.parse(raw.stdout);
        return out.map(x => {
            const obj: any = {};
            const keys = Object.keys(x);

            for (const key of keys) {
                let other = key[0]?.toLowerCase();
                other += key.slice(1);
                obj[other] = x[key];
            }

            return new CmdPrinter(obj);
        });
    }

    readonly name: string;
    readonly computerName: string;
    readonly type: number;
    readonly driverName: string;
    readonly portName: string;
    readonly shared: boolean;
    readonly shareName: string;
    readonly published: boolean;

    private constructor(data: any) {
        this.name = data.name;
        this.computerName = data.computerName;
        this.type = data.type;
        this.driverName = data.driverName;
        this.portName = data.portName;
        this.shared = data.shared;
        this.shareName = data.shareName;
        this.published = data.published;
    }
}
