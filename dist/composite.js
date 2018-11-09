"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@rgba-image/common");
exports.COMPOSITE_NONE = -1;
exports.COMPOSITE_NORMAL = 0;
exports.COMPOSITE_MULTIPLY = 1;
exports.COMPOSITE_SCREEN = 2;
exports.COMPOSITE_OVERLAY = 3;
exports.COMPOSITE_DARKEN = 4;
exports.COMPOSITE_LIGHTEN = 5;
exports.COMPOSITE_HARD_LIGHT = 6;
exports.COMPOSITE_DIFFERENCE = 7;
exports.COMPOSITE_EXCLUSION = 8;
exports.compositePixel = (sR, sG, sB, sA, dR, dG, dB, dA, mode) => {
    mode = (mode | 0);
    const fn = fns[mode];
    if (!fn)
        throw Error(`Bad composite mode ${mode}`);
    return fn(sR, sG, sB, sA, dR, dG, dB, dA);
};
exports.compositePixelUint32 = (sR, sG, sB, sA, dR, dG, dB, dA, mode) => {
    mode = (mode | 0);
    const fn = fnsUint32[mode];
    if (!fn)
        throw Error(`Bad composite mode ${mode}`);
    return fn(sR, sG, sB, sA, dR, dG, dB, dA);
};
exports.compositeNormal = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    let a = dA + sA - dA * sA;
    let r = (sR * sA + dR * dA * (1 - sA)) / a;
    let g = (sG * sA + dG * dA * (1 - sA)) / a;
    let b = (sB * sA + dB * dA * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeNormalUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    let a = dA + sA - dA * sA;
    let r = (sR * sA + dR * dA * (1 - sA)) / a;
    let g = (sG * sA + dG * dA * (1 - sA)) / a;
    let b = (sB * sA + dB * dA * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeMultiply = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dra + sra * (1 - dA) + dra * (1 - sA)) / a;
    let g = (sga * dga + sga * (1 - dA) + dga * (1 - sA)) / a;
    let b = (sba * dba + sba * (1 - dA) + dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeMultiplyUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dra + sra * (1 - dA) + dra * (1 - sA)) / a;
    let g = (sga * dga + sga * (1 - dA) + dga * (1 - sA)) / a;
    let b = (sba * dba + sba * (1 - dA) + dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeScreen = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dA +
        dra * sA -
        sra * dra +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (sga * dA +
        dga * sA -
        sga * dga +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (sba * dA +
        dba * sA -
        sba * dba +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeScreenUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dA +
        dra * sA -
        sra * dra +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (sga * dA +
        dga * sA -
        sga * dga +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (sba * dA +
        dba * sA -
        sba * dba +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeOverlay = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (2 * dra <= dA ?
        2 * sra * dra + sra * (1 - dA) + dra * (1 - sA) :
        sra * (1 + dA) + dra * (1 + sA) - 2 * dra * sra - dA * sA) / a;
    let g = (2 * dga <= dA ?
        2 * sga * dga + sga * (1 - dA) + dga * (1 - sA) :
        sga * (1 + dA) + dga * (1 + sA) - 2 * dga * sga - dA * sA) / a;
    let b = (2 * dba <= dA ?
        2 * sba * dba + sba * (1 - dA) + dba * (1 - sA) :
        sba * (1 + dA) + dba * (1 + sA) - 2 * dba * sba - dA * sA) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeOverlayUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (2 * dra <= dA ?
        2 * sra * dra + sra * (1 - dA) + dra * (1 - sA) :
        sra * (1 + dA) + dra * (1 + sA) - 2 * dra * sra - dA * sA) / a;
    let g = (2 * dga <= dA ?
        2 * sga * dga + sga * (1 - dA) + dga * (1 - sA) :
        sga * (1 + dA) + dga * (1 + sA) - 2 * dga * sga - dA * sA) / a;
    let b = (2 * dba <= dA ?
        2 * sba * dba + sba * (1 - dA) + dba * (1 - sA) :
        sba * (1 + dA) + dba * (1 + sA) - 2 * dba * sba - dA * sA) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeDarken = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (Math.min(sra * dA, dra * sA) +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (Math.min(sga * dA, dga * sA) +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (Math.min(sba * dA, dba * sA) +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeDarkenUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (Math.min(sra * dA, dra * sA) +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (Math.min(sga * dA, dga * sA) +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (Math.min(sba * dA, dba * sA) +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeLighten = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (Math.max(sra * dA, dra * sA) +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (Math.max(sga * dA, dga * sA) +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (Math.max(sba * dA, dba * sA) +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeLightenUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (Math.max(sra * dA, dra * sA) +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (Math.max(sga * dA, dga * sA) +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (Math.max(sba * dA, dba * sA) +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeHardLight = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (2 * sra <= sA ?
        2 * sra * dra + sra * (1 - dA) + dra * (1 - sA) :
        sra * (1 + dA) + dra * (1 + sA) - 2 * dra * sra - dA * sA) / a;
    let g = (2 * sga <= sA ?
        2 * sga * dga + sga * (1 - dA) + dga * (1 - sA) :
        sga * (1 + dA) + dga * (1 + sA) - 2 * dga * sga - dA * sA) / a;
    let b = (2 * sba <= sA ?
        2 * sba * dba + sba * (1 - dA) + dba * (1 - sA) :
        sba * (1 + dA) + dba * (1 + sA) - 2 * dba * sba - dA * sA) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeHardLightUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (2 * sra <= sA ?
        2 * sra * dra + sra * (1 - dA) + dra * (1 - sA) :
        sra * (1 + dA) + dra * (1 + sA) - 2 * dra * sra - dA * sA) / a;
    let g = (2 * sga <= sA ?
        2 * sga * dga + sga * (1 - dA) + dga * (1 - sA) :
        sga * (1 + dA) + dga * (1 + sA) - 2 * dga * sga - dA * sA) / a;
    let b = (2 * sba <= sA ?
        2 * sba * dba + sba * (1 - dA) + dba * (1 - sA) :
        sba * (1 + dA) + dba * (1 + sA) - 2 * dba * sba - dA * sA) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeDifference = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra + dra - 2 * Math.min(sra * dA, dra * sA)) / a;
    let g = (sga + dga - 2 * Math.min(sga * dA, dga * sA)) / a;
    let b = (sba + dba - 2 * Math.min(sba * dA, dba * sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeDifferenceUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra + dra - 2 * Math.min(sra * dA, dra * sA)) / a;
    let g = (sga + dga - 2 * Math.min(sga * dA, dga * sA)) / a;
    let b = (sba + dba - 2 * Math.min(sba * dA, dba * sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
exports.compositeExclusion = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dA +
        dra * sA -
        2 * sra * dra +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (sga * dA +
        dga * sA -
        2 * sga * dga +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (sba * dA +
        dba * sA -
        2 * sba * dba +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return [r | 0, g | 0, b | 0, a | 0];
};
exports.compositeExclusionUint32 = (sR, sG, sB, sA, dR, dG, dB, dA) => {
    sR = sR | 0;
    sG = sG | 0;
    sB = sB | 0;
    sA = sA | 0;
    dR = dR | 0;
    dG = dG | 0;
    dB = dB | 0;
    dA = dA | 0;
    sR /= 255;
    sG /= 255;
    sB /= 255;
    sA /= 255;
    dR /= 255;
    dG /= 255;
    dB /= 255;
    dA /= 255;
    const sra = sR * sA;
    const sga = sG * sA;
    const sba = sB * sA;
    const dra = dR * dA;
    const dga = dG * dA;
    const dba = dB * dA;
    let a = dA + sA - dA * sA;
    let r = (sra * dA +
        dra * sA -
        2 * sra * dra +
        sra * (1 - dA) +
        dra * (1 - sA)) / a;
    let g = (sga * dA +
        dga * sA -
        2 * sga * dga +
        sga * (1 - dA) +
        dga * (1 - sA)) / a;
    let b = (sba * dA +
        dba * sA -
        2 * sba * dba +
        sba * (1 - dA) +
        dba * (1 - sA)) / a;
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 255;
    return common_1.rgbaToUint32(r, g, b, a, common_1.isLittleEndian);
};
const fns = [
    exports.compositeNormal, exports.compositeMultiply, exports.compositeScreen, exports.compositeOverlay,
    exports.compositeDarken, exports.compositeLighten, exports.compositeHardLight, exports.compositeDifference,
    exports.compositeExclusion
];
const fnsUint32 = [
    exports.compositeNormalUint32, exports.compositeMultiplyUint32, exports.compositeScreenUint32,
    exports.compositeOverlayUint32, exports.compositeDarkenUint32, exports.compositeLightenUint32,
    exports.compositeHardLightUint32, exports.compositeDifferenceUint32, exports.compositeExclusionUint32
];
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
//# sourceMappingURL=composite.js.map