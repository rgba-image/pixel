import { CompositeMode } from '@rgba-image/common';
export declare const plot: (dest: ImageData, pixels: [number, number, number, number, number, number][], compositeMode?: CompositeMode) => void;
export declare const plotUint32: (dest: ImageData, pixels: [number, number, number][], compositeMode?: CompositeMode) => void;
