"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@rgba-image/common");
const color_1 = require("@rgba-image/color");
exports.plot = (dest, pixels, composite = -1) => {
    const { length } = pixels;
    if (!length)
        return;
    const size = dest.width * dest.height;
    const data = new Uint32Array(dest.data.buffer);
    for (let i = 0; i < length; i++) {
        let [x, y, r, g, b, a] = pixels[i];
        x = x | 0;
        y = y | 0;
        const index = y * dest.width + x;
        if (index < 0 || index >= size)
            continue;
        if (composite === -1) {
            data[index] = common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
        }
        else {
            const currentIndex = index * 4;
            const dR = dest.data[currentIndex];
            const dG = dest.data[currentIndex + 1];
            const dB = dest.data[currentIndex + 2];
            const dA = dest.data[currentIndex + 3];
            data[index] = typeof composite === 'function' ?
                composite(r, g, b, a, dR, dG, dB, dA) :
                color_1.compositeRgbaUint32(r, g, b, a, dR, dG, dB, dA, composite);
        }
    }
};
exports.plotUint32 = (dest, pixels, composite = -1) => {
    const { length } = pixels;
    if (!length)
        return;
    const size = dest.width * dest.height;
    const data = new Uint32Array(dest.data.buffer);
    const rgbaUint32 = new Uint32Array(1);
    const rgbaUint8Clamped = new Uint8ClampedArray(rgbaUint32.buffer);
    for (let i = 0; i < length; i++) {
        let [x, y, v] = pixels[i];
        x = x | 0;
        y = y | 0;
        const index = y * dest.width + x;
        if (index < 0 || index >= size)
            continue;
        if (composite === -1) {
            v = common_1.clampUint32(v);
            data[index] = v;
        }
        else {
            const currentIndex = index * 4;
            const dR = dest.data[currentIndex];
            const dG = dest.data[currentIndex + 1];
            const dB = dest.data[currentIndex + 2];
            const dA = dest.data[currentIndex + 3];
            rgbaUint32[0] = v;
            const r = rgbaUint8Clamped[0];
            const g = rgbaUint8Clamped[1];
            const b = rgbaUint8Clamped[2];
            const a = rgbaUint8Clamped[3];
            data[index] = typeof composite === 'function' ?
                composite(r, g, b, a, dR, dG, dB, dA) :
                color_1.compositeRgbaUint32(r, g, b, a, dR, dG, dB, dA, composite);
        }
    }
};
//# sourceMappingURL=plot.js.map