import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges} from 'angular2/core';
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
    // TODO: height, nbars, min are all to be set only once - remove data binding on them
    @Input() private height: string;
    @Input() private nbars: number;
    @Input() private min: number;
    @Input() private max: number;
    @Input() private value: number;
    @Input() private rate: number;
    private ledWidth: string;
    private leds: Array<LED>;
    private hStep: number;
    private valueStep: number;

    constructor(private hsv: HSV, private ref: ChangeDetectorRef) {
        this.rate = 30;
        let intervalMsec: number = 1.0 / (1.0 * this.rate);
        console.log('constructor():VuGauge - refreshing every: ' + intervalMsec + ' msec');
        setInterval(() => {
            this.ref.markForCheck();
        }, intervalMsec);
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
    }

    ngOnChanges(changeRecord) {
        for (var change in changeRecord) {
            if (change === 'value' && this.leds.length > 0) {
                console.log('VuGauge:ngOnChanges: value');
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
            else if (change === 'max') {
                console.log('VuGauge:ngOnChanges: max');
            }
            else if (change === 'rate') {
                console.log('VuGauge:ngOnChanges: rate');
            }
        }
    }
}
