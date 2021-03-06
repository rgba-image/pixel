import * as assert from 'assert'
import * as fs from 'fs'
import { fromPng } from '@rgba-image/png'
import { createImage } from '@rgba-image/create-image'
import {
  getPixel, setPixel, getPixelUint32, setPixelUint32, PlotData, plot,
  PlotUint32Data, plotUint32, setRegion, mapRegion
} from '..'

import { mapRegionUint32, setRegionUint32 } from '../region'
import { rgbaToUint32, isLittleEndian, COMPOSITE_NORMAL } from '@rgba-image/common'

const patternPng = fs.readFileSync( './src/test/fixtures/pattern.png' )
const overlayPng = fs.readFileSync( './src/test/fixtures/overlay.png' )
const expectPlotPng = fs.readFileSync( './src/test/fixtures/plot.png' )
const expectFillRegionPng = fs.readFileSync( './src/test/fixtures/fill-region.png' )
const expectSetRegionPng = fs.readFileSync( './src/test/fixtures/set-region.png' )
const expectMapRegionPng = fs.readFileSync( './src/test/fixtures/map-region.png' )

const pattern = fromPng( patternPng )
const overlay = fromPng( overlayPng )
const expectPlot = fromPng( expectPlotPng )
const expectFillRegion = fromPng( expectFillRegionPng )
const expectSetRegion = fromPng( expectSetRegionPng )
const expectMapRegion = fromPng( expectMapRegionPng )

const getNoise = () => {
  const width = 1024
  const height = 1024
  const noise = createImage( width, height )

  for ( let y = 0; y < height; y++ ) {
    for ( let x = 0; x < width; x++ ) {
      const index = ( y * width + x ) * 4
      noise.data[ index ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 1 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 2 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 3 ] = ( Math.random() * 256 ) | 0
    }
  }

  return noise
}

const noise = getNoise()

describe( 'pixel', () => {
  it( 'getPixel', () => {
    const c = getPixel( pattern, 2, 3 )

    assert.deepEqual( c, [ 255, 0, 0, 128 ] )
  })

  it( 'getPixel out of bounds', () => {
    const c = getPixel( pattern, 9, 9 )

    assert.deepEqual( c, [ 0, 0, 0, 0 ] )
  } )

  it( 'setPixel', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 2, 3, 255, 0, 0, 128 )

    const c = getPixel( dest, 2, 3 )

    assert.deepEqual( c, [ 255, 0, 0, 128 ] )
  })

  it( 'setPixel with a mode', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 2, 3, 255, 0, 0, 128, COMPOSITE_NORMAL )

    const c = getPixel( dest, 2, 3 )

    assert.deepEqual( c, [ 255, 0, 0, 128 ] )
  } )

  it( 'setPixel with CompositeRgbaUint32', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 2, 3, 255, 0, 0, 128, ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ) )

    const c = getPixel( dest, 2, 3 )

    assert.deepEqual( c, [ 255, 0, 0, 128 ] )
  } )

  it( 'setPixel default params', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 2, 3 )

    const c = getPixel( dest, 2, 3 )

    assert.deepEqual( c, [ 0, 0, 0, 255 ] )
  } )

  it( 'setPixel out of bounds', () => {
    const dest = createImage( 8, 8, pattern.data )

    setPixel( dest, 9, 9, 255, 0, 0, 128 )

    assert.deepEqual( dest, pattern )
  } )

  it( 'getPixelUint32', () => {
    const v = getPixelUint32( pattern, 5, 4 )

    assert.strictEqual( v, 2164234547 )
  })

  it( 'getPixel out of bounds', () => {
    const c = getPixelUint32( pattern, 9, 9 )

    assert.strictEqual( c, 0 )
  } )

  it( 'setPixelUint32', () => {
    const dest = createImage( 8, 8 )

    setPixelUint32( dest, 5, 4, 2164234547 )

    const c = getPixel( dest, 5, 4 )

    assert.deepEqual( c, [ 51, 153, 255, 128 ] )
  })

  it( 'setPixelUint32 with a mode', () => {
    const dest = createImage( 8, 8 )

    setPixelUint32( dest, 5, 4, 2164234547, COMPOSITE_NORMAL )

    const c = getPixel( dest, 5, 4 )

    assert.deepEqual( c, [ 51, 153, 255, 128 ] )
  } )

  it( 'setPixelUint32 with CompositeRgbaUint32', () => {
    const dest = createImage( 8, 8 )

    setPixelUint32( dest, 5, 4, 2164234547, ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ) )

    const c = getPixel( dest, 5, 4 )

    assert.deepEqual( c, [ 51, 153, 255, 128 ] )
  } )

  it( 'setPixelUint32 out of bounds', () => {
    const dest = createImage( 8, 8, pattern.data )

    setPixelUint32( dest, 9, 9, 2164234547 )

    assert.deepEqual( dest, pattern )
  } )

  it( 'setPixelUint32 clamps lower value', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 0, 0, 255, 0, 0, 255 )
    setPixelUint32( dest, 0, 0, -1 )

    const c = getPixelUint32( dest, 0, 0 )

    assert.strictEqual( c, 0 )
  } )

  it( 'setPixelUint32 clamps upper value', () => {
    const dest = createImage( 8, 8 )

    setPixel( dest, 0, 0, 255, 0, 0, 255 )
    setPixelUint32( dest, 0, 0, 4294967296 )

    const c = getPixelUint32( dest, 0, 0 )

    assert.strictEqual( c, 4294967295 )
  } )

  it( 'plot', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotData[] = [
      [ 0, 0, 51, 153, 255, 128 ],
      [ 1, 1, 51, 153, 255, 128 ],
      [ 2, 2, 51, 153, 255, 128 ]
    ]

    plot( dest, pixels )

    assert.deepEqual( dest, expectPlot )
  })

  it( 'plot with a mode', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotData[] = [
      [ 0, 0, 51, 153, 255, 128 ],
      [ 1, 1, 51, 153, 255, 128 ],
      [ 2, 2, 51, 153, 255, 128 ]
    ]

    plot( dest, pixels, COMPOSITE_NORMAL )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'plot with CompositeRgbaUint32', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotData[] = [
      [ 0, 0, 51, 153, 255, 128 ],
      [ 1, 1, 51, 153, 255, 128 ],
      [ 2, 2, 51, 153, 255, 128 ]
    ]

    plot( dest, pixels, ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ) )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'early return on plot with no pixels', () => {
    const dest = createImage( 3, 3 )
    const empty = createImage( 3, 3 )

    plot( dest, [] )

    assert.deepEqual( dest, empty )
  })

  it( 'does not plot out of bounds', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotData[] = [
      [ 0, 0, 51, 153, 255, 128 ],
      [ 1, 1, 51, 153, 255, 128 ],
      [ 2, 2, 51, 153, 255, 128 ],
      [ 3, 3, 255, 0, 0, 255 ]
    ]

    plot( dest, pixels )

    assert.deepEqual( dest, expectPlot )
  })

  it( 'plotUint32', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotUint32Data[] = [
      [ 0, 0, 2164234547 ],
      [ 1, 1, 2164234547 ],
      [ 2, 2, 2164234547 ]
    ]

    plotUint32( dest, pixels )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'plotUint32 with a mode', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotUint32Data[] = [
      [ 0, 0, 2164234547 ],
      [ 1, 1, 2164234547 ],
      [ 2, 2, 2164234547 ]
    ]

    plotUint32( dest, pixels, COMPOSITE_NORMAL )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'plotUint32 with CompositeRgbaUint32', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotUint32Data[] = [
      [ 0, 0, 2164234547 ],
      [ 1, 1, 2164234547 ],
      [ 2, 2, 2164234547 ]
    ]

    plotUint32( dest, pixels, ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ) )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'early return on plot with no pixels', () => {
    const dest = createImage( 3, 3 )
    const empty = createImage( 3, 3 )

    plotUint32( dest, [] )

    assert.deepEqual( dest, empty )
  } )

  it( 'does not plot out of bounds', () => {
    const dest = createImage( 3, 3 )

    const pixels: PlotUint32Data[] = [
      [ 0, 0, 2164234547 ],
      [ 1, 1, 2164234547 ],
      [ 2, 2, 2164234547 ],
      [ 3, 3, 4294967295 ]
    ]

    plotUint32( dest, pixels )

    assert.deepEqual( dest, expectPlot )
  } )

  it( 'setRegion', () => {
    const dest = createImage( 16, 16 )

    setRegion( dest, () => [ 51, 153, 255, 127 ], 4, 4, 8, 8 )

    assert.deepEqual( dest, expectFillRegion )
  })

  it( 'setRegionUint32', () => {
    const dest = createImage( 16, 16 )

    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ), 4, 4, 8, 8 )

    assert.deepEqual( dest, expectFillRegion )
  } )

  it( 'setRegion early return when 0 size', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    setRegion( dest, () => [ 51, 153, 255, 127 ], 4, 4, 0, 8 )
    setRegion( dest, () => [ 51, 153, 255, 127 ], 4, 4, 8, 0 )

    assert.deepEqual( dest, empty )
  })

  it( 'setRegionUint32 early return when 0 size', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ), 4, 4, 0, 8 )
    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ), 4, 4, 8, 0 )

    assert.deepEqual( dest, empty )
  } )

  it( 'setRegion default params', () => {
    const dest = createImage( 16, 16 )

    setRegion( dest, () => [ 51, 153, 255, 127 ] )
    setRegion( dest, () => [ 0, 0, 0, 0 ], 0, 0, 16, 4 )
    setRegion( dest, () => [ 0, 0, 0, 0 ], 0, 12, 16, 4 )
    setRegion( dest, () => [ 0, 0, 0, 0 ], 0, 0, 4, 16 )
    setRegion( dest, () => [ 0, 0, 0, 0 ], 12, 0, 4, 16 )

    assert.deepEqual( dest, expectFillRegion )
  })

  it( 'setRegionUint32 default params', () => {
    const dest = createImage( 16, 16 )

    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ) )
    setRegionUint32( dest, () => 0, 0, 0, 16, 4 )
    setRegionUint32( dest, () => 0, 0, 12, 16, 4 )
    setRegionUint32( dest, () => 0, 0, 0, 4, 16 )
    setRegionUint32( dest, () => 0, 12, 0, 4, 16 )

    assert.deepEqual( dest, expectFillRegion )
  } )

  it( 'setRegion does not draw out of bounds', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    setRegion( dest, () => [ 51, 153, 255, 127 ], 15, 17, 32, 32 )
    setRegion( dest, () => [ 51, 153, 255, 127 ], 17, 15, 32, 32 )

    assert.deepEqual( dest, empty )
  } )

  it( 'setRegionUint32 does not draw out of bounds', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ), 15, 17, 32, 32 )
    setRegionUint32( dest, () => rgbaToUint32( 51, 153, 255, 127, isLittleEndian ), 17, 15, 32, 32 )

    assert.deepEqual( dest, empty )
  } )

  it( 'setRegion callback arguments', () => {
    const dest = createImage( 16, 16, expectFillRegion.data.slice() )

    const width = 12
    const height = 12

    const stepX = 255 / width
    const stepY = 255 / height

    setRegion( dest, ( r, g, b, a, rX, rY, sX, sY ) => {
      if( a === 0 ){
        return [ 255, 153, 51, 224 ]
      }

      r = rX * stepX
      g = rY * stepY
      b = sX * sY
      a = 224

      return [ r, g, b, a ]
    }, 2, 2, width, height )

    assert.deepEqual( dest, expectSetRegion )
  })


  it( 'setRegionUint32 callback arguments', () => {
    const dest = createImage( 16, 16, expectFillRegion.data.slice() )

    const width = 12
    const height = 12

    const stepX = 255 / width
    const stepY = 255 / height

    setRegionUint32( dest, ( r, g, b, a, rX, rY, sX, sY ) => {
      if ( a === 0 ) {
        return rgbaToUint32( 255, 153, 51, 224, isLittleEndian )
      }

      r = rX * stepX
      g = rY * stepY
      b = sX * sY
      a = 224

      return rgbaToUint32( r, g, b, a, isLittleEndian )
    }, 2, 2, width, height )

    assert.deepEqual( dest, expectSetRegion )
  } )

  it( 'mapRegion', () => {
    const dest = createImage( 16, 16 )

    setRegion( dest, () => [ 255, 153, 51, 127 ] )
    mapRegion(
      expectFillRegion, dest,
      ( r, g, b, a ) => [ r, g, b, a ],
      2, 2, 14, 14,
      4, 4
    )

    assert.deepEqual( dest, expectMapRegion )
  } )

  it( 'mapRegionUint32', () => {
    const dest = createImage( 16, 16 )

    setRegion( dest, () => [ 255, 153, 51, 127 ] )
    mapRegionUint32(
      expectFillRegion, dest,
      ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ),
      2, 2, 14, 14,
      4, 4
    )

    assert.deepEqual( dest, expectMapRegion )
  } )

  it( 'mapRegion default params', () => {
    const dest = createImage( 16, 16 )

    mapRegion( expectFillRegion, dest, ( r, g, b, a ) => [ r, g, b, a ] )

    assert.deepEqual( dest, expectFillRegion )
  } )

  it( 'mapRegionUint32 default params', () => {
    const dest = createImage( 16, 16 )

    mapRegionUint32( expectFillRegion, dest, ( r, g, b, a ) => rgbaToUint32( r, g, b, a, isLittleEndian ) )

    assert.deepEqual( dest, expectFillRegion )
  } )

  it( 'mapRegion early return when 0 size', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    mapRegion( expectFillRegion, dest, () => [ 51, 153, 255, 127 ], 4, 4, 0, 8 )
    mapRegion( expectFillRegion, dest, () => [ 51, 153, 255, 127 ], 4, 4, 8, 0 )

    assert.deepEqual( dest, empty )
  } )

  it( 'mapRegionUint32 early return when 0 size', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    mapRegionUint32( expectFillRegion, dest, () => rgbaToUint32( 255, 153, 51, 224, isLittleEndian ), 4, 4, 0, 8 )
    mapRegionUint32( expectFillRegion, dest, () => rgbaToUint32( 255, 153, 51, 224, isLittleEndian ), 4, 4, 8, 0 )

    assert.deepEqual( dest, empty )
  } )

  it( 'mapRegion does not draw out of bounds', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    mapRegion( expectFillRegion, dest, () => [ 51, 153, 255, 127 ], 15, 17, 32, 32 )
    mapRegion( expectFillRegion, dest, () => [ 51, 153, 255, 127 ], 17, 15, 32, 32 )

    assert.deepEqual( dest, empty )
  } )

  it( 'mapRegionUint32 does not draw out of bounds', () => {
    const dest = createImage( 16, 16 )
    const empty = createImage( 16, 16 )

    mapRegionUint32( expectFillRegion, dest, () => rgbaToUint32( 255, 153, 51, 224, isLittleEndian ), 15, 17, 32, 32 )
    mapRegionUint32( expectFillRegion, dest, () => rgbaToUint32( 255, 153, 51, 224, isLittleEndian ), 17, 15, 32, 32 )

    assert.deepEqual( dest, empty )
  } )

  // no test, just lazy benchmarking
  it( 'big mapRegion', done => {
    const dest = createImage( 768, 768 )

    mapRegion( noise, dest, ( r, g, b, a ) => [ r, g, b, a ], 0, 0, 1280, 1280, 0, 0 )
    done()
  } ).timeout( 5000 )
})
