import { rgbaToUint32, isLittleEndian } from '@rgba-image/common'

export type PixelData = [ number, number, number, number, number, number ]

export type PixelUint32Data = [ number, number, number ]

export type Rgba = [ number, number, number, number ]

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

const clampUint32 = v => v = v < 0 ? 0 : v > 4294967295 ? 4294967295 : v

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

export const setPixel = ( dest: ImageData, x: number, y: number, r = 0, g = 0, b = 0, a = 255 ) => {
  x = x | 0
  y = y | 0

  const dataIndex = y * dest.width + x
  const index = dataIndex * 4

  if ( index < 0 || index >= dest.data.length ) return

  const data = new Uint32Array( dest.data.buffer )

  data[ dataIndex ] = rgbaToUint32( r, g, b, a, isLittleEndian )
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

export const setPixelUint32 = ( dest: ImageData, x: number, y: number, v: number ) => {
  x = x | 0
  y = y | 0

  const size = dest.width * dest.height
  const index = y * dest.width + x

  if ( index < 0 || index >= size ) return

  v = clampUint32( v )

  const data = new Uint32Array( dest.data.buffer )

  data[ index ] = v
}

export const plot = ( dest: ImageData, pixels: PixelData[] ) => {
  const { length } = pixels

  if( !length ) return

  const size = dest.width * dest.height
  const data = new Uint32Array( dest.data.buffer )

  for( let i = 0; i < length; i++ ){
    let [ x, y, r, g, b, a ] = pixels[ i ]

    x = x | 0
    y = y | 0

    const index = y * dest.width + x

    if ( index < 0 || index >= size ) continue

    data[ index ] = rgbaToUint32( r, g, b, a, isLittleEndian )
  }
}

export const plotUint32 = ( dest: ImageData, pixels: PixelUint32Data[] ) => {
  const { length } = pixels

  if ( !length ) return

  const size = dest.width * dest.height
  const data = new Uint32Array( dest.data.buffer )

  for ( let i = 0; i < length; i++ ) {
    let [ x, y, v ] = pixels[ i ]

    x = x | 0
    y = y | 0

    const index = y * dest.width + x

    if ( index < 0 || index >= size ) continue

    v = clampUint32( v )

    data[ index ] = v
  }
}

export const setRegion = ( dest: ImageData, callback: SetCallback, sx = 0, sy = 0, sw = dest.width - sx, sh = dest.height - sy ) => {
  sx = sx | 0
  sy = sy | 0
  sw = sw | 0
  sh = sh | 0

  if ( sw <= 0 || sh <= 0 ) return

  const data = new Uint32Array( dest.data.buffer )

  for ( let y = 0; y < sh; y++ ) {
    const destY = sy + y

    if ( destY < 0 || destY >= dest.height ) continue

    for ( let x = 0; x < sw; x++ ) {
      const destX = sx + x

      if ( destX < 0 || destX >= dest.width ) continue

      const dataIndex = destY * dest.width + destX
      const index = dataIndex * 4

      const sourceR = dest.data[ index ]
      const sourceG = dest.data[ index + 1 ]
      const sourceB = dest.data[ index + 2 ]
      const sourceA = dest.data[ index + 3 ]

      const [ r, g, b, a ] = callback( sourceR, sourceG, sourceB, sourceA, x, y, destX, destY )

      data[ dataIndex ] = rgbaToUint32( r, g, b, a, isLittleEndian )
    }
  }
}

export const mapRegion = ( source: ImageData, dest: ImageData, callback: MapCallback, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0 ) => {
  sx = sx | 0
  sy = sy | 0
  sw = sw | 0
  sh = sh | 0
  dx = dx | 0
  dy = dy | 0

  if ( sw <= 0 || sh <= 0 ) return

  const destData = new Uint32Array( dest.data.buffer )

  for ( let y = 0; y < sh; y++ ) {
    const sourceY = sy + y

    if ( sourceY < 0 || sourceY >= source.height ) continue

    const destY = dy + y

    if ( destY < 0 || destY >= dest.height ) continue

    for ( let x = 0; x < sw; x++ ) {
      const sourceX = sx + x

      if ( sourceX < 0 || sourceX >= source.width ) continue

      const destX = dx + x

      if ( destX < 0 || destX >= dest.width ) continue

      const sourceIndex = ( sourceY * source.width + sourceX ) * 4
      const destIndex = ( destY * dest.width + destX ) * 4
      const destUint32Index = destY * dest.width + destX

      const sourceR = source.data[ sourceIndex ]
      const sourceG = source.data[ sourceIndex + 1 ]
      const sourceB = source.data[ sourceIndex + 2 ]
      const sourceA = source.data[ sourceIndex + 3 ]

      const destR = dest.data[ destIndex ]
      const destG = dest.data[ destIndex + 1 ]
      const destB = dest.data[ destIndex + 2 ]
      const destA = dest.data[ destIndex + 3 ]

      const [ r, g, b, a ] = callback( sourceR, sourceG, sourceB, sourceA, destR, destG, destB, destA, x, y, sourceX, sourceY, destX, destY )

      destData[ destUint32Index ] = rgbaToUint32( r, g, b, a, isLittleEndian )
    }
  }
}
