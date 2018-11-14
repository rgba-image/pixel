import { Rgba } from '@rgba-image/common';
export declare type SetCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, regionX: number, regionY: number, sourceX: number, sourceY: number) => Rgba;
export declare type MapCallback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, destR: number, destG: number, destB: number, destA: number, regionX: number, regionY: number, sourceX: number, sourceY: number, destX: number, destY: number) => Rgba;
export declare type SetUint32Callback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, regionX: number, regionY: number, sourceX: number, sourceY: number) => number;
export declare type MapUint32Callback = (sourceR: number, sourceG: number, sourceB: number, sourceA: number, destR: number, destG: number, destB: number, destA: number, regionX: number, regionY: number, sourceX: number, sourceY: number, destX: number, destY: number) => number;
export declare type PlotData = [number, number, number, number, number, number];
export declare type PlotUint32Data = [number, number, number];
