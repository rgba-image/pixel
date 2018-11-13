import { CompositePixel, CompositePixelUint32, CompositeMode } from './types';
export declare const COMPOSITE_NONE = -1;
export declare const COMPOSITE_NORMAL = 0;
export declare const COMPOSITE_MULTIPLY = 1;
export declare const COMPOSITE_SCREEN = 2;
export declare const COMPOSITE_OVERLAY = 3;
export declare const COMPOSITE_DARKEN = 4;
export declare const COMPOSITE_LIGHTEN = 5;
export declare const COMPOSITE_HARD_LIGHT = 6;
export declare const COMPOSITE_DIFFERENCE = 7;
export declare const COMPOSITE_EXCLUSION = 8;
export declare const compositePixel: (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number, mode: CompositeMode) => [number, number, number, number];
export declare const compositePixelUint32: (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number, mode: CompositeMode) => number;
export declare const compositeNormal: CompositePixel;
export declare const compositeNormalUint32: CompositePixelUint32;
export declare const compositeMultiply: CompositePixel;
export declare const compositeMultiplyUint32: CompositePixelUint32;
export declare const compositeScreen: CompositePixel;
export declare const compositeScreenUint32: CompositePixelUint32;
export declare const compositeOverlay: CompositePixel;
export declare const compositeOverlayUint32: CompositePixelUint32;
export declare const compositeDarken: CompositePixel;
export declare const compositeDarkenUint32: CompositePixelUint32;
export declare const compositeLighten: CompositePixel;
export declare const compositeLightenUint32: CompositePixelUint32;
export declare const compositeHardLight: CompositePixel;
export declare const compositeHardLightUint32: CompositePixelUint32;
export declare const compositeDifference: CompositePixel;
export declare const compositeDifferenceUint32: CompositePixelUint32;
export declare const compositeExclusion: CompositePixel;
export declare const compositeExclusionUint32: CompositePixelUint32;