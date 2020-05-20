using System;
using System.Threading.Tasks;

namespace CMD_Printer.Tool {
    public class Promise {
        public static async Task<T> Run<T>(Action<Action<T>, Action<System.Exception>> callback) {
            T response = default(T);
            bool running = true;
            System.Exception exception = null;

            Action<T> resolve = (T value) => {
                running = false;
                response = value;
            };

            Action<System.Exception> reject = (System.Exception error) => {
                running = false;
                exception = error;
            };

            await Task.Run(() => {
                try {
                    callback(
                        resolve,
                        reject
                    );
                } catch (System.Exception error) {
                    reject(error);
                }

                while (running) { }
            });

            if (exception != null) {
                throw exception;
            } else {
                return response;
            }
        }
        public static async Task Run(Action<Action, Action<System.Exception>> callback) {
            bool running = true;
            System.Exception exception = null;

            Action resolve = () => {
                running = false;
            };

            Action<System.Exception> reject = (System.Exception error) => {
                running = false;
                exception = error;
            };

            await Task.Run(() => {
                try {
                    callback(resolve, reject);
                } catch (System.Exception error) {
                    reject(error);
                }

                while (running) { }
            });

            if (exception != null) {
                throw exception;
            } else {
                return;
            }
        }
    }
}
