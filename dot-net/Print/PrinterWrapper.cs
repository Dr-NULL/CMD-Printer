using System;
using System.Collections.Generic;
using System.Drawing.Printing;

using Spire.Pdf;
using Spire.Pdf.Print;

namespace CMD_Printer.Print {
    public class PrinterWrapper {
        public string Path { get; }
        public string Printer { get; }
        public OptionOrientation Orientation { get; set; }
        public OptionPageScale PageScale { get; set; }
        public int MarginTop { get; set; }
        public int MarginBottom { get; set; }
        public int MarginLeft { get; set; }
        public int MarginRight { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public PrintEventHandler OnBeginPrint { get; set; }
        public PrintEventHandler OnEndPrint { get; set; }

        public PrinterWrapper(string path, string printer) {
            // Reference
            PdfDocument self = new PdfDocument();
            self.LoadFromFile(path);

            // Main Reference
            Path = path;
            Printer = printer;

            // Set Default Adjustment
            PageScale = OptionPageScale.FitSize;
            switch (self.PageSettings.Orientation) {
                case PdfPageOrientation.Portrait:
                    Orientation = OptionOrientation.Portrait;
                    break;
                case PdfPageOrientation.Landscape:
                    Orientation = OptionOrientation.Landscape;
                    break;
            }

            // Set Margin
            MarginTop = 0;
            MarginBottom = 0;
            MarginLeft = 0;
            MarginRight = 0;

            // Set Size
            int[] dim = new int[2]{
                (int)self.PageSettings.Width,
                (int)self.PageSettings.Height
            };

            if (self.PageSettings.Transition.Dimension == PdfTransitionDimension.Horizontal) {
                Width = ToMilim((dim[0] > dim[1]) ? dim[0] : dim[1]);
                Height = ToMilim((dim[0] > dim[1]) ? dim[1] : dim[0]);
            } else {
                Width = ToMilim((dim[0] < dim[1]) ? dim[0] : dim[1]);
                Height = ToMilim((dim[0] < dim[1]) ? dim[1] : dim[0]);
            }

            self.Dispose();
        }

        public void Print() {
            PdfDocument self = new PdfDocument();
            self.LoadFromFile(Path);
            self.PrintSettings.PrinterName = this.Printer.Replace(@"/", @"\");

            // Set Page Scale
            PdfSinglePageScalingMode scale = PdfSinglePageScalingMode.ActualSize;
            switch (PageScale) {
                case OptionPageScale.ActualSize:
                    scale = PdfSinglePageScalingMode.ActualSize;
                    break;
                case OptionPageScale.CustomScale:
                    scale = PdfSinglePageScalingMode.CustomScale;
                    break;
                case OptionPageScale.FitSize:
                    scale = PdfSinglePageScalingMode.FitSize;
                    break;
                case OptionPageScale.ShrinkOversized:
                    scale = PdfSinglePageScalingMode.ShrinkOversized;
                    break;
            }
            self.PrintSettings.SelectSinglePageLayout(scale);

            // Set Margin
            self.PageSettings.Margins.Top = ToCentinch(MarginTop);
            self.PageSettings.Margins.Bottom = ToCentinch(MarginBottom);
            self.PageSettings.Margins.Left = ToCentinch(MarginLeft);
            self.PageSettings.Margins.Right = ToCentinch(MarginRight);
            self.PrintSettings.SetPaperMargins(
                ToCentinch(MarginTop),
                ToCentinch(MarginBottom),
                ToCentinch(MarginLeft),
                ToCentinch(MarginRight)
            );

            // Bindear Eventos
            if (OnBeginPrint != null) {
                self.PrintSettings.BeginPrint += OnBeginPrint;
            }
            if (OnEndPrint != null) {
                self.PrintSettings.EndPrint += OnEndPrint;
            }

            self.PrintSettings.PaperSize = new PaperSize {
                Width = ToCentinch(Width),
                Height = ToCentinch(Height)
            };

            // Print
            self.Print();
            self.Dispose();
        }

        public void ReadArgs(Tool.Parser args) {
            // Parsing Orientation
            args.ParamData.TryGetValue("orientation", out List<string> orientation);
            if (orientation == null) {
                Orientation = OptionOrientation.Portrait;
            } else if (orientation.Count == 0) {
                Orientation = OptionOrientation.Portrait;
            } else if (orientation[0].ToLower() == "portrait") {
                Orientation = OptionOrientation.Portrait;
            } else if (orientation[0].ToLower() == "landscape") {
                Orientation = OptionOrientation.Landscape;
            } else {
                throw new ArgumentException(
                    "Only can pass \"landscape\" o \"portrait\" as value.",
                    "orientation"
                );
            }

            // Parsing Margins
            args.ParamData.TryGetValue("margin", out List<string> rawMargin);
            if (rawMargin == null) {
                MarginTop = 0;
                MarginBottom = 0;
                MarginLeft = 0;
                MarginRight = 0;
            } else if (
                (rawMargin.Count != 1) &&
                (rawMargin.Count != 2) &&
                (rawMargin.Count != 4)
            ) {
                throw new ArgumentException(
                    "Only can pass 1 value (for 4 corners), 2 values (vertical and horizontal) or 4 values (top, right, bottom, left).",
                    "margin"
                );
            } else {
                List<int> margin = rawMargin.ConvertAll<int>(raw => {
                    int.TryParse(raw.Replace(",", "."), out int result);
                    return result;
                });

                if (margin.Count == 1) {
                    MarginTop = margin[0];
                    MarginLeft = margin[0];
                    MarginBottom = margin[0];
                    MarginRight = margin[0];
                } else if (margin.Count == 2) {
                    MarginTop = margin[0];
                    MarginLeft = margin[1];
                    MarginBottom = margin[0];
                    MarginRight = margin[1];
                } else {
                    MarginTop = margin[0];
                    MarginLeft = margin[1];
                    MarginBottom = margin[2];
                    MarginRight = margin[3];
                }
            }
        }

        private int ToCentinch(int input) {
            return (int)(((float)input / (float)15) * 842);
        }

        private int ToMilim(int input) {
            return (int)(((float)input / (float)842) * 15);
        }
    }
}
