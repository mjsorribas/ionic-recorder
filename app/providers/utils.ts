import {Injectable} from 'angular2/core';

@Injectable()
export class Utils {
    constructor() {
        console.log('constructor(): Utils');
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
