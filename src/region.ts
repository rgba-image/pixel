import { rgbaToUint32, isLittleEndian } from '@rgba-image/common'
import { SetCallback, MapCallback, SetUint32Callback, MapUint32Callback } from './types'

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

export const setRegionUint32 = ( dest: ImageData, callback: SetUint32Callback, sx = 0, sy = 0, sw = dest.width - sx, sh = dest.height - sy ) => {
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

      data[ dataIndex ] = callback( sourceR, sourceG, sourceB, sourceA, x, y, destX, destY )
    }
  }
}

export const mapRegionUint32 = ( source: ImageData, dest: ImageData, callback: MapUint32Callback, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0 ) => {
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

      destData[ destUint32Index ] = callback( sourceR, sourceG, sourceB, sourceA, destR, destG, destB, destA, x, y, sourceX, sourceY, destX, destY )
    }
  }
}
