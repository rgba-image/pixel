import { CompositeRgbaUint32 } from '@rgba-image/common';
export declare const getPixel: (source: ImageData, x: number, y: number) => number[];
export declare const setPixel: (dest: ImageData, x: number, y: number, r?: number, g?: number, b?: number, a?: number, composite?: 0 | 2 | 8 | 7 | 6 | 5 | 4 | 3 | 1 | -1 | CompositeRgbaUint32) => void;
export declare const getPixelUint32: (source: ImageData, x: number, y: number) => number;
export declare const setPixelUint32: (dest: ImageData, x: number, y: number, v: number, composite?: 0 | 2 | 8 | 7 | 6 | 5 | 4 | 3 | 1 | -1 | CompositeRgbaUint32) => void;
