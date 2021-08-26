/**
 * Available printing modes:
 * - `duplex`: Prints the paper in both sides.
 * - `duplexshort`: Duplex mode using the shortest edge as flip axis.
 * - `duplexlong`: Duplex mode using the longest edge as flip axis.
 * - `simplex`: One side printing mode.
 */
export type PrintingMode = 'duplex' | 'duplexshort' | 'duplexlong' | 'simplex';