using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

namespace CMD_Printer.Tool {

    public class Console {
        [DllImport("kernel32.dll")]
        private static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        public static void Show() {
            IntPtr handle = GetConsoleWindow();
            ShowWindow(handle, 5);
        }
        public static void Hide() {
            IntPtr handle = GetConsoleWindow();
            ShowWindow(handle, 0);
        }
    }
}
