export declare type PixelData = [number, number, number, number, number, number];
export declare type PixelUint32Data = [number, number, number];
export declare type Rgba = [number, number, number, number];
export declare type SetCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, regionX: number, regionY: number, sourceX: number, sourceY: number) => Rgba;
export declare type MapCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, destR: number, destG: number, destB: number, destA: number, regionX: number, regionY: number, sourceX: number, sourceY: number, destX: number, destY: number) => Rgba;
export declare type SetUint32Callback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, regionX: number, regionY: number, sourceX: number, sourceY: number) => number;
export declare type MapUint32Callback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, destR: number, destG: number, destB: number, destA: number, regionX: number, regionY: number, sourceX: number, sourceY: number, destX: number, destY: number) => number;
export declare type CompositeMode = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare type CompositePixel = (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number) => Rgba;
export declare type CompositePixelUint32 = (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number) => number;
