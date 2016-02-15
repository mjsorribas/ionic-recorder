import {Injectable} from 'angular2/core';

@Injectable()
export class Utils {
    constructor() {
        console.log('constructor(): HSV');
    }

    hsv2rgb(h: number, s: number, v: number) {
        var r, g, b, i, f, p, q, t;

        h = h / 60.0;
        i = Math.floor(h);
        f = h - i;
        p = v * (1.0 - s);
        q = v * (1.0 - s * f);
        t = v * (1.0 - s * (1.0 - f));

        switch (i) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return ['rgb(', Math.floor(r * 255.0), ',', Math.floor(g * 255.0), ',',
            Math.floor(b * 255.0), ')'].join('');
    }

    ratio2dB(ratio: number) {
        return 10.0 * Math.log10(ratio);
    }

    num2str(num: number, nDecimals: number) {
        let floorNum: number = Math.floor(num),
            frac: number = num - floorNum,
            pow10: number = Math.pow(10, nDecimals),
            wholeFrac: number = Math.round(frac * pow10),
            fracLen: number = wholeFrac.toString().length,
            leadingZeros: string = Array(nDecimals - fracLen + 1).join('0');
        return floorNum.toString() + '.' + leadingZeros + wholeFrac.toString();
    }
}
