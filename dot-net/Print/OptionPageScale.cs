using Spire.Pdf.Print;

namespace CMD_Printer.Print {
    public enum OptionPageScale {
        ActualSize = PdfSinglePageScalingMode.ActualSize,
        CustomScale = PdfSinglePageScalingMode.CustomScale,
        FitSize = PdfSinglePageScalingMode.FitSize,
        ShrinkOversized = PdfSinglePageScalingMode.ShrinkOversized
    }
}
