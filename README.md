# pixel

Get or set individual pixels in an ImageData

## install

`npm install @rgba-image/pixel`

## usage

### getPixel

Get the color at a pixel:

```js
const { getPixel } = require( '@rgba-image/pixel' )

const x = 3
const y = 2

// ...create image here

// an array of four bytes
const [ r, g, b, a ] = getPixel( image, x, y )
```

### setPixel

Set the color at a pixel:

```js
const { setPixel } = require( '@rgba-image/pixel' )

const x = 3
const y = 2
const r = 51
const g = 153
const b = 255
const a = 127

// ...create image here

setPixel( image, x, y, r, g, b, a )
```

### getPixelUint32

Get the pixel as a Uint32:

```js
const { getPixelUint32 } = require( '@rgba-image/pixel' )

const x = 3
const y = 2

// ...create image here

// a number between 0 and 4294967295
const v = getPixelUint32( image, x, y )
```

### setPixelUint32

Set the color to a Uint32:

```js
const { setPixelUint32 } = require( '@rgba-image/pixel' )

const x = 3
const y = 2
const v = 2164234547

// ...create image here

setPixelUint32( image, x, y, v )
```

### plot

Plot an array of pixels where each pixel is an array with six members,
eg `[ x, y, r, g, b, a ]` to an image - useful for drawing lines etc.

```js
const { plot } = require( '@rgba-image/pixel' )

// ...create image here

const pixels = [
  //x, y, r,  g,   b,   a
  [ 0, 0, 51, 153, 255, 128 ],
  [ 1, 1, 51, 153, 255, 128 ],
  [ 2, 2, 51, 153, 255, 128 ]
]

plot( image, pixels )
```

### plotUint32

Plot an array of pixels where each pixel is an array with 3 members,
eg `[ x, y, v ]` to an image - useful for drawing lines etc.

```js
const { plotUint32 } = require( '@rgba-image/pixel' )

// ...create image here

const pixels = [
  //x, y, v
  [ 0, 0, 2164234547 ],
  [ 1, 1, 2164234547 ],
  [ 2, 2, 2164234547 ]
]

plotUint32( image, pixels )
```

### setRegion

Set each pixel in a region to a color using a custom callback that takes the
current color, the location within the region and location within the original
image and returns an array with four members, eg `[ r, g, b, a ]`

```js
const { setRegion } = require( '@rgba-image/pixel' )

// ...create image here

const x = 2
const y = 2
const width = 12
const height = 12

const stepX = 255 / width
const stepY = 255 / height

const callback = ( r, g, b, a, regionX, regionY, sourceX, sourceY ) => {
  if( a === 0 ){
    return [ 255, 153, 51, 224 ]
  }

  const newR = regionX * stepX
  const newG = regionY * stepY
  const newB = sourceX * sourceY
  const newA = ( r + g + b + a ) / 4

  return [ newR, newG, newB, newA ]
}

setRegion( image, callback, x, y, width, height )
```

Arguments following `callback` are optional

If omitted, `x` is `0`, `y` is `0`, `width` is `image.width - x`, and `height`
is `image.height - y`

### mapRegion

Map pixels from one image to another using a custom callback that takes the
current color in the source image, the current color in the destination image,
the location within the region, location within the source image, location
within the destination image and returns an array with four members, eg
`[ r, g, b, a ]`

```js
const { mapRegion } = require( '@rgba-image/pixel' )

// ...create two images here

const sourceX = 2
const sourceY = 2
const sourceWidth = 12
const sourceHeight = 12
const destX = 4
const destY = 4

const stepX = 255 / sourceWidth
const stepY = 255 / sourceHeight

const callback = (
  sourceR, sourceG, sourceB, sourceA,
  destR, destG, destB, destA,
  regionX, regionY,
  sx, sy,
  dx, dy
) => {
  if( sourceA === 0 ){
    return [ 255, 153, 51, 224 ]
  }

  const newR = regionX * stepX
  const newG = regionY * stepY
  const newB = sourceX * sourceY
  const newA = ( sourceR + sourceG + sourceB + sourceA + destR + destG + destB + destA ) / 8

  return [ newR, newG, newB, newA ]
}

mapRegion( source, dest, callback, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY )
```

Arguments following `callback` are optional

If omitted, `sourceX` is `0`, `sourceY` is `0`, `sourceWidth` is
`source.width - sourceX`, `sourceHeight` is `source.height - sourceY`, `destX`
is `0` and `destY` is `0`

## License

MIT License

Copyright (c) 2018 Nik Coughlin

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