export declare type PixelData = [number, number, number, number, number, number];
export declare type PixelUint32Data = [number, number, number];
export declare type Rgba = [number, number, number, number];
export declare type SetCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, regionX: number, regionY: number, sourceX: number, sourceY: number) => Rgba;
export declare type MapCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, destR: number, destG: number, destB: number, destA: number, regionX: number, regionY: number, sourceX: number, sourceY: number, destX: number, destY: number) => Rgba;
export declare const getPixel: (source: ImageData, x: number, y: number) => number[];
export declare const setPixel: (dest: ImageData, x: number, y: number, r?: number, g?: number, b?: number, a?: number) => void;
export declare const getPixelUint32: (source: ImageData, x: number, y: number) => number;
export declare const setPixelUint32: (dest: ImageData, x: number, y: number, v: number) => void;
export declare const plot: (dest: ImageData, pixels: [number, number, number, number, number, number][]) => void;
export declare const plotUint32: (dest: ImageData, pixels: [number, number, number][]) => void;
export declare const setRegion: (dest: ImageData, callback: SetCallback, sx?: number, sy?: number, sw?: number, sh?: number) => void;
export declare const mapRegion: (source: ImageData, dest: ImageData, callback: MapCallback, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number) => void;