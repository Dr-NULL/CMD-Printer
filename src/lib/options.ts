export interface Options {
  scale?: 'noscale' | 'shrink' | 'fit';
  color?: 'color' | 'monocrome';
  mode?: 'duplex' | 'duplexshort' | 'duplexlong' | 'simplex';
  skip?: 'odd' | 'even';
  cant?: number;
}