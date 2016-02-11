import {Component} from 'angular2/core';
import {HSV} from '../../providers/colormap';

/**
 * @name VuGauge
 * @description
 * Looks like an LED display on mixer boards and stereo receivers that has LEDS which light up to monitor a changing signal, e.g. microphone audio volume, in real-time.
 */
@Component({
    selector: 'vu-gauge',
    inputs: ['bgcolor', 'width', 'height', 'nbars'],
    template: ['<svg [style.fill]="bgcolor" width="100%" [attr.height]="height">',
        '           <rect width="100%" [attr.height]="height" />',
        '           <rect *ngFor="#led of leds"',
        '                 [attr.width]="ledWidth"',
        '                 [attr.height]="height"',
        '                 [attr.x]="led.x"',
        '                 [attr.fill]="led.fill" />',
        '      </svg>'].join('')
})
export class VuGauge {
    private bgcolor: string;
    private width: string;
    private height: string;
    private nbars: number;
    private ledWidth: string;
    private leds: Array<Object>;

    constructor(private hsv: HSV) { 
        console.log('constructor():VuGauge');
    }

    ngOnInit() {
        let percentWidth: number = 100.0 / (2 * this.nbars - 1);
        this.ledWidth = percentWidth + '%';
        let xStep: number = 2.0 * percentWidth;
        let hStep: number = 120.0 / (this.nbars - 1);
        this.leds = [];
        for (let i: number = 0; i < this.nbars; i++) {
            this.leds.push({
                x: (i * xStep) + '%',
                fill: this.hsv.toRGB(120.0 - i * hStep, 1.0, 0.3)
            });
        }
    }
}