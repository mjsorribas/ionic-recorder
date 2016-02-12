import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {HSV} from '../../providers/colormap';

interface LED {
    x: string;
    fill: string;
}

/**
 * @name VuGauge
 * @description
 * Looks like an LED display on mixer boards and stereo receivers that has LEDS which light up to monitor a changing signal, e.g. microphone audio volume, in real-time.
 */
@Component({
    // using OnPush strategy to keep a big chunk of the change-detection tree
    // disabled most of the time, since this component depends only on its
    // input properties and they are all immutable - this component can
    // change if and only if any of its input properties change.
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'vu-gauge',
    template: ['<svg fill="rgba(0,0,0,0)" width="100%" [attr.height]="height">',
        '           <rect width="100%" [attr.height]="height" />',
        '           <rect *ngFor="#led of leds"',
        '                 [attr.width]="ledWidth"',
        '                 [attr.height]="height"',
        '                 [attr.x]="led.x"',
        '                 [attr.fill]="led.fill" />',
        '      </svg>'].join('')
})
export class VuGauge {
    @Input() private height: string;
    @Input() private nbars: number;
    @Input() private min: number;
    @Input() private max: number;
    @Input() private value: number;
    private ledWidth: string;
    private leds: Array<LED>;
    private hStep: number;
    private valueStep: number;

    constructor(private hsv: HSV) {
        console.log('constructor():VuGauge: value = ' + this.value);
        this.leds = [];
    }

    ngOnInit() {
        let percentWidth: number = 100.0 / (2 * this.nbars - 1);
        this.ledWidth = percentWidth + '%';
        let xStep: number = 2.0 * percentWidth;
        this.hStep = 120.0 / (this.nbars - 1.0);
        for (let i: number = 0; i < this.nbars; i++) {
            this.leds.push({
                x: (i * xStep) + '%',
                fill: this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 0.3)
            });
        }
        this.valueStep = (1.0 * (this.max - this.min)) / (this.nbars - 1.0);

        this.ngOnChanges();

        console.log('ngOnInit():VuGauge: value = ' + this.value +
            ', valueStep = ' + this.valueStep +
            ', min = ' + this.min + ', max = ' + this.max);
    }

    ngOnChanges() {
        // console.log('ngOnChange():VuGauge: value = ' + this.value);
        if (this.leds.length === 0) {
            return;
        }
        for (let i: number = 0; i < this.nbars; i++) {
            let fill: string;
            if (this.min + this.valueStep * i <= this.value) {
                fill = this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 1.0);
            }
            else {
                fill = this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 0.3);
            }
            this.leds[i].fill = fill;
        }
    }

}
