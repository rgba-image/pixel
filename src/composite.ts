import { Rgba, CompositePixel, CompositePixelUint32, CompositeMode } from './types'
import { rgbaToUint32, isLittleEndian } from '@rgba-image/common'

export const COMPOSITE_NONE = -1
export const COMPOSITE_NORMAL = 0
export const COMPOSITE_MULTIPLY = 1
export const COMPOSITE_SCREEN = 2
export const COMPOSITE_OVERLAY = 3
export const COMPOSITE_DARKEN = 4
export const COMPOSITE_LIGHTEN = 5
export const COMPOSITE_HARD_LIGHT = 6
export const COMPOSITE_DIFFERENCE = 7
export const COMPOSITE_EXCLUSION = 8

export const compositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number,
  mode: CompositeMode
) => {
  mode = <CompositeMode>( mode | 0 )

  const fn: CompositePixel = fns[ mode ]

  if( !fn ) throw Error( `Bad composite mode ${ mode }` )

  return fn( sR, sG, sB, sA, dR, dG, dB, dA )
}

export const compositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number,
  mode: CompositeMode
) => {
  mode = <CompositeMode>( mode | 0 )

  const fn: CompositePixelUint32 = fnsUint32[ mode ]

  if ( !fn ) throw Error( `Bad composite mode ${ mode }` )

  return fn( sR, sG, sB, sA, dR, dG, dB, dA )
}

export const compositeNormal: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  let a = dA + sA - dA * sA
  let r = ( sR * sA + dR * dA * ( 1 - sA ) ) / a
  let g = ( sG * sA + dG * dA * ( 1 - sA ) ) / a
  let b = ( sB * sA + dB * dA * ( 1 - sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeNormalUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  let a = dA + sA - dA * sA
  let r = ( sR * sA + dR * dA * ( 1 - sA ) ) / a
  let g = ( sG * sA + dG * dA * ( 1 - sA ) ) / a
  let b = ( sB * sA + dB * dA * ( 1 - sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeMultiply: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA
  let r = ( sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) ) / a
  let g = ( sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) ) / a
  let b = ( sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeMultiplyUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA
  let r = ( sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) ) / a
  let g = ( sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) ) / a
  let b = ( sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeScreen: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    sra * dA +
    dra * sA -
    sra * dra +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    sga * dA +
    dga * sA -
    sga * dga +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    sba * dA +
    dba * sA -
    sba * dba +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeScreenUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    sra * dA +
    dra * sA -
    sra * dra +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    sga * dA +
    dga * sA -
    sga * dga +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    sba * dA +
    dba * sA -
    sba * dba +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeOverlay: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    2 * dra <= dA ?
    2 * sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) :
    sra * ( 1 + dA ) + dra * ( 1 + sA ) - 2 * dra * sra - dA * sA
  ) / a

  let g = (
    2 * dga <= dA ?
    2 * sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) :
    sga * ( 1 + dA ) + dga * ( 1 + sA ) - 2 * dga * sga - dA * sA
  ) / a

  let b = (
    2 * dba <= dA ?
    2 * sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) :
    sba * ( 1 + dA ) + dba * ( 1 + sA ) - 2 * dba * sba - dA * sA
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeOverlayUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    2 * dra <= dA ?
    2 * sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) :
    sra * ( 1 + dA ) + dra * ( 1 + sA ) - 2 * dra * sra - dA * sA
  ) / a

  let g = (
    2 * dga <= dA ?
    2 * sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) :
    sga * ( 1 + dA ) + dga * ( 1 + sA ) - 2 * dga * sga - dA * sA
  ) / a

  let b = (
    2 * dba <= dA ?
    2 * sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) :
    sba * ( 1 + dA ) + dba * ( 1 + sA ) - 2 * dba * sba - dA * sA
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeDarken: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    Math.min( sra * dA, dra * sA ) +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    Math.min( sga * dA, dga * sA ) +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    Math.min( sba * dA, dba * sA ) +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeDarkenUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    Math.min( sra * dA, dra * sA ) +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    Math.min( sga * dA, dga * sA ) +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    Math.min( sba * dA, dba * sA ) +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeLighten: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    Math.max( sra * dA, dra * sA ) +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    Math.max( sga * dA, dga * sA ) +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    Math.max( sba * dA, dba * sA ) +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeLightenUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    Math.max( sra * dA, dra * sA ) +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    Math.max( sga * dA, dga * sA ) +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    Math.max( sba * dA, dba * sA ) +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeHardLight: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    2 * sra <= sA ?
    2 * sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) :
    sra * ( 1 + dA ) + dra * ( 1 + sA ) - 2 * dra * sra - dA * sA
  ) / a

  let g = (
    2 * sga <= sA ?
    2 * sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) :
    sga * ( 1 + dA ) + dga * ( 1 + sA ) - 2 * dga * sga - dA * sA
  ) / a

  let b = (
    2 * sba <= sA ?
    2 * sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) :
    sba * ( 1 + dA ) + dba * ( 1 + sA ) - 2 * dba * sba - dA * sA
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeHardLightUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    2 * sra <= sA ?
      2 * sra * dra + sra * ( 1 - dA ) + dra * ( 1 - sA ) :
      sra * ( 1 + dA ) + dra * ( 1 + sA ) - 2 * dra * sra - dA * sA
  ) / a

  let g = (
    2 * sga <= sA ?
      2 * sga * dga + sga * ( 1 - dA ) + dga * ( 1 - sA ) :
      sga * ( 1 + dA ) + dga * ( 1 + sA ) - 2 * dga * sga - dA * sA
  ) / a

  let b = (
    2 * sba <= sA ?
      2 * sba * dba + sba * ( 1 - dA ) + dba * ( 1 - sA ) :
      sba * ( 1 + dA ) + dba * ( 1 + sA ) - 2 * dba * sba - dA * sA
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeDifference: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA
  let r = ( sra + dra - 2 * Math.min( sra * dA, dra * sA ) ) / a
  let g = ( sga + dga - 2 * Math.min( sga * dA, dga * sA ) ) / a
  let b = ( sba + dba - 2 * Math.min( sba * dA, dba * sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeDifferenceUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA
  let r = ( sra + dra - 2 * Math.min( sra * dA, dra * sA ) ) / a
  let g = ( sga + dga - 2 * Math.min( sga * dA, dga * sA ) ) / a
  let b = ( sba + dba - 2 * Math.min( sba * dA, dba * sA ) ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

export const compositeExclusion: CompositePixel = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    sra * dA +
    dra * sA -
    2 * sra * dra +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    sga * dA +
    dga * sA -
    2 * sga * dga +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    sba * dA +
    dba * sA -
    2 * sba * dba +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return <Rgba>[ r | 0, g | 0, b | 0, a | 0 ]
}

export const compositeExclusionUint32: CompositePixelUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => {
  sR = sR | 0
  sG = sG | 0
  sB = sB | 0
  sA = sA | 0
  dR = dR | 0
  dG = dG | 0
  dB = dB | 0
  dA = dA | 0

  sR /= 255
  sG /= 255
  sB /= 255
  sA /= 255
  dR /= 255
  dG /= 255
  dB /= 255
  dA /= 255

  const sra = sR * sA
  const sga = sG * sA
  const sba = sB * sA

  const dra = dR * dA
  const dga = dG * dA
  const dba = dB * dA

  let a = dA + sA - dA * sA

  let r = (
    sra * dA +
    dra * sA -
    2 * sra * dra +
    sra * ( 1 - dA ) +
    dra * ( 1 - sA )
  ) / a

  let g = (
    sga * dA +
    dga * sA -
    2 * sga * dga +
    sga * ( 1 - dA ) +
    dga * ( 1 - sA )
  ) / a

  let b = (
    sba * dA +
    dba * sA -
    2 * sba * dba +
    sba * ( 1 - dA ) +
    dba * ( 1 - sA )
  ) / a

  r *= 255
  g *= 255
  b *= 255
  a *= 255

  return rgbaToUint32( r, g, b, a, isLittleEndian )
}

const fns: CompositePixel[] = [
  compositeNormal, compositeMultiply, compositeScreen, compositeOverlay,
  compositeDarken, compositeLighten, compositeHardLight, compositeDifference,
  compositeExclusion
]

const fnsUint32: CompositePixelUint32[] = [
  compositeNormalUint32, compositeMultiplyUint32, compositeScreenUint32,
  compositeOverlayUint32, compositeDarkenUint32, compositeLightenUint32,
  compositeHardLightUint32, compositeDifferenceUint32, compositeExclusionUint32
]

/*
Adapted from Jimp:

https://github.com/oliver-moran/jimp

MIT License

Copyright (c) 2018 Oliver Moran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/