import { CompositeRgbaUint32 } from '@rgba-image/common';
export declare const plot: (dest: ImageData, pixels: [number, number, number, number, number, number][], composite?: 0 | 2 | 8 | 7 | 6 | 5 | 4 | 3 | 1 | -1 | CompositeRgbaUint32) => void;
export declare const plotUint32: (dest: ImageData, pixels: [number, number, number][], composite?: 0 | 2 | 8 | 7 | 6 | 5 | 4 | 3 | 1 | -1 | CompositeRgbaUint32) => void;
