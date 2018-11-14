import { CompositeMode } from '@rgba-image/common';
export declare const getPixel: (source: ImageData, x: number, y: number) => number[];
export declare const setPixel: (dest: ImageData, x: number, y: number, r?: number, g?: number, b?: number, a?: number, compositeMode?: CompositeMode) => void;
export declare const getPixelUint32: (source: ImageData, x: number, y: number) => number;
export declare const setPixelUint32: (dest: ImageData, x: number, y: number, v: number, compositeMode?: CompositeMode) => void;
