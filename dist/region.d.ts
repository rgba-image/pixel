import { SetCallback, MapCallback, SetUint32Callback, MapUint32Callback } from './types';
export declare const setRegion: (dest: ImageData, callback: SetCallback, sx?: number, sy?: number, sw?: number, sh?: number) => void;
export declare const mapRegion: (source: ImageData, dest: ImageData, callback: MapCallback, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number) => void;
export declare const setRegionUint32: (dest: ImageData, callback: SetUint32Callback, sx?: number, sy?: number, sw?: number, sh?: number) => void;
export declare const mapRegionUint32: (source: ImageData, dest: ImageData, callback: MapUint32Callback, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number) => void;
