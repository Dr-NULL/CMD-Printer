using System;
using System.Drawing.Printing;
using System.Collections.Generic;

using System.Threading.Tasks;

namespace CMD_Printer {
    class Program {
        
        public static async Task Main(string[] args) {
            Tool.Parser data = new Tool.Parser(args);
            data.ParamData.TryGetValue("files", out List<string> files);
            data.ParamData.TryGetValue("printers", out List<string> printers);
            data.ParamData.TryGetValue("verbose", out List<string> verbose);

            try {
                // No File Found
                ArgumentException fileErr = new ArgumentException(
                    "You must to set at least 1 file to print.",
                    "files"
                );
                if (files == null) {
                    throw fileErr;
                } else if (files.Count == 0) {
                    throw fileErr;
                }

                // System Printer
                PrinterSettings.StringCollection sysPr = PrinterSettings.InstalledPrinters;
                if (sysPr.Count == 0) {
                    throw new NotSupportedException("The System doesn't has installed printers.");
                } else if (printers == null) {
                    printers = new List<string> { sysPr[0] };
                } else if (printers.Count == 0) {
                    printers = new List<string> { sysPr[0] };
                }

                files.ForEach(file => {
                    printers.ForEach(printer => {
                        Print.PrinterWrapper wrapper = new Print.PrinterWrapper(
                            file,
                            printer
                        );

                        // Events
                        if (verbose != null) {
                            wrapper.OnBeginPrint = OnBeginPrint;
                            wrapper.OnEndPrint = OnEndPrint;
                        }

                        // Prepare
                        wrapper.ReadArgs(data);
                        wrapper.Print();
                    });
                });
            } catch (Exception err) {
                if (verbose != null) {
                    Console.WriteLine("ERROR:");
                    Console.WriteLine(err.Message);
                }
            }


            await Task.Delay(5000);
        }

        public static void OnBeginPrint(object sender, PrintEventArgs e) {
            Console.WriteLine("EVENT:");
            Console.WriteLine("Initializing Printing Job.\n");
        }

        public static void OnEndPrint(object sender, PrintEventArgs e) {
            Console.WriteLine("SUCCESS:");
            Console.WriteLine("Printing Job Completed Successfully.\n");
        }
    }
}
