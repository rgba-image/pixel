import { Rgba } from '@rgba-image/common'

export type SetCallback = (
  sourceR: number, sourceG: number, sourceB: number, sourceA: number,
  regionX: number, regionY: number,
  sourceX: number, sourceY: number
) => Rgba

export type MapCallback = (
  sourceR: number, sourceG: number, sourceB: number, sourceA: number,
  destR: number, destG: number, destB: number, destA: number,
  regionX: number, regionY: number,
  sourceX: number, sourceY: number,
  destX: number, destY: number
) => Rgba

export type SetUint32Callback = (
  sourceR: number, sourceG: number, sourceB: number, sourceA: number,
  regionX: number, regionY: number,
  sourceX: number, sourceY: number
) => number

export type MapUint32Callback = (
  sourceR: number, sourceG: number, sourceB: number, sourceA: number,
  destR: number, destG: number, destB: number, destA: number,
  regionX: number, regionY: number,
  sourceX: number, sourceY: number,
  destX: number, destY: number
) => number

export type PlotData = [ number, number, number, number, number, number ]

export type PlotUint32Data = [ number, number, number ]
