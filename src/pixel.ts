import { rgbaToUint32, isLittleEndian, CompositeMode, clampUint32, CompositeRgba, CompositeRgbaUint32 } from '@rgba-image/common'
import { compositeRgbaUint32 } from '@rgba-image/color'

export const getPixel = ( source: ImageData, x: number, y: number ) => {
  x = x | 0
  y = y | 0

  const index = ( y * source.width + x ) * 4

  if ( index < 0 || index >= source.data.length ) return [ 0, 0, 0, 0 ]

  const r = source.data[ index ]
  const g = source.data[ index + 1 ]
  const b = source.data[ index + 2 ]
  const a = source.data[ index + 3 ]

  return [ r, g, b, a ]
}

export const setPixel = ( dest: ImageData, x: number, y: number, r = 0, g = 0, b = 0, a = 255, composite: CompositeMode | CompositeRgbaUint32 = -1 ) => {
  x = x | 0
  y = y | 0

  const dataIndex = y * dest.width + x
  const index = dataIndex * 4

  if ( index < 0 || index >= dest.data.length ) return

  const data = new Uint32Array( dest.data.buffer )

  if( composite === -1 ){
    data[ dataIndex ] = rgbaToUint32( r, g, b, a, isLittleEndian )
  } else {
    const dR = dest.data[ index ]
    const dG = dest.data[ index + 1 ]
    const dB = dest.data[ index + 2 ]
    const dA = dest.data[ index + 3 ]

    data[ dataIndex ] = typeof composite === 'function' ?
      ( <CompositeRgbaUint32>composite)( r, g, b, a, dR, dG, dB, dA ) :
      compositeRgbaUint32( r, g, b, a, dR, dG, dB, dA, composite )
  }
}

export const getPixelUint32 = ( source: ImageData, x: number, y: number ) => {
  x = x | 0
  y = y | 0

  const size = source.width * source.height
  const index = y * source.width + x

  if ( index < 0 || index >= size ) return 0

  const data = new Uint32Array( source.data.buffer )

  return data[ index ]
}

export const setPixelUint32 = ( dest: ImageData, x: number, y: number, v: number, composite: CompositeMode | CompositeRgbaUint32 = -1 ) => {
  x = x | 0
  y = y | 0

  const size = dest.width * dest.height
  const index = y * dest.width + x

  if ( index < 0 || index >= size ) return

  v = clampUint32( v )

  const data = new Uint32Array( dest.data.buffer )
  const rgbaUint32 = new Uint32Array( 1 )
  const rgbaUint8Clamped = new Uint8ClampedArray( rgbaUint32.buffer )

  if ( composite === -1 ) {
    data[ index ] = v
  } else {
    const currentIndex = index * 4
    const dR = dest.data[ currentIndex ]
    const dG = dest.data[ currentIndex + 1 ]
    const dB = dest.data[ currentIndex + 2 ]
    const dA = dest.data[ currentIndex + 3 ]

    rgbaUint32[ 0 ] = v

    const r = rgbaUint8Clamped[ 0 ]
    const g = rgbaUint8Clamped[ 1 ]
    const b = rgbaUint8Clamped[ 2 ]
    const a = rgbaUint8Clamped[ 3 ]

    data[ index ] = typeof composite === 'function' ?
      ( <CompositeRgbaUint32>composite )( r, g, b, a, dR, dG, dB, dA ) :
      compositeRgbaUint32( r, g, b, a, dR, dG, dB, dA, composite )
  }
}
