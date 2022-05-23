import { PrintingOptions } from './interfaces/index.js';

export function parseOptions(paths: string[], options: PrintingOptions): string[] {
    const args: string[] = [ ...paths ];
    // No show errors
    if (options.silent) {
        args.push('-silent');
    }

    // Printer destination
    if (options.printTo) {
        const print = options.printTo;
        let name: string;
        if (print.shared) {
            name = `\\\\${print.computerName}\\${print.shareName}`;
        } else {
            name = print.name;
        }

        args.push('-print-to', name);
    } else {
        args.push('-print-to-default');
    }

    // Add settings
    if (
        (options['scale'] != null) ||
        (options['monochrome'] != null) ||
        (options['orientation'] != null) ||
        (options['printingMode'] != null) ||
        (options['paperTray'] != null) ||
        (options['paperSize'] != null) ||
        (options['half'] != null) ||
        (options['pages'] != null)
    ) {
        // Prepare settings
        args.push('-print-settings');
        let settings: string[] = [];
        
        // The size adjustment of the content
        if (options.scale) {
            settings.push(options.scale);
        }

        // Print as monochrome or color
        if (options.monochrome) {
            settings.push('monochrome');
        } else {
            settings.push('color');
        }

        // The orientation of the content
        if (options.orientation) {
            settings.push(options.orientation);
        }

        // The printing mode to use
        if (options.printingMode) {
            settings.push(options.printingMode);
        }

        // The paper tray
        if (options.paperTray) {
            settings.push(`bin=${options.paperTray}`);
        }

        // The paper size
        if (options.paperSize) {
            settings.push(`paper=${options.paperSize}`);
        }

        // Half pages
        if (options.half) {
            settings.push(options.half);
        }

        // Custom pages
        if(options.pages) {
            for (const item of options.pages) {
                if (typeof item === 'number') {
                    // Single page
                    settings.push(item.toString(10));
                } else if (
                    (typeof item?.from === 'number') &&
                    (typeof item?.to === 'number')
                ) {
                    // Page interval
                    settings.push(`${item.from}-${item.to}`);
                }
            }
        }

        // Add to the main arguments
        const raw = settings.reduce((prev, curr, i) => {
            return i ? `${prev}, ${curr}` : curr;
        })
        args.push(raw);
    }

    return args;
}
