using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace CMD_Printer.Tool {
    public class Parser {
        public List<string> MainData { get; }
        public Dictionary<string, List<string>> ParamData { get; }

        public Parser(string[] args) {
            // Se usará para chequear los parámetros
            Regex isKey = new Regex(
                @"^\-+",
                RegexOptions.ECMAScript &
                RegexOptions.IgnoreCase
            );

            // Mantener pares llave/valor
            string key = null;
            List<string> val = new List<string>();
            
            int i = 0;
            this.ParamData = new Dictionary<string, List<string>>();
            while (i < args.Length) {
                if (isKey.IsMatch(args[i])) {
                    if (key == null) {
                        this.MainData = val;
                    } else {
                        this.ParamData.Add(key, val);
                    }

                    key = isKey.Replace(args[i], "").ToLower();
                    val = new List<string>();
                } else {
                    val.Add(args[i]);
                }

                i++;
            }

            if (key == null) {
                this.MainData = val;
            } else if (!this.ParamData.ContainsKey(key)) {
                this.ParamData.Add(key, val);
            }
        }
    }
}
