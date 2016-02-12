import {Injectable} from 'angular2/core';

@Injectable()
export class HSV {
    toRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;

        h = h / 60.0;
        i = Math.floor(h);
        f = h - i;
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));

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
}
