import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges} from 'angular2/core';
import {HSV} from '../../providers/hsv';


interface LEDRect {
    x: string;
    fill: string;
    strokeWidth: string;
}


/**
 * @name VuGauge
 * @description
 * An LED lights display that light up to monitor a changing signal in real-time.
 * This display is a 100% width horizontal rectangle willed with small vertical
 * rectangles that are the LEDs.  Thes LEDs show up either dark state or lit up,
 * depending on the input value.
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
        '           <rect *ngFor="#led of ledRects"',
        '                 [attr.width]="ledWidth"',
        '                 [attr.height]="height"',
        '                 [attr.x]="led.x"',
        '                 [attr.stroke-width]="led.strokeWidth"',
        '                 stroke="rgb(255, 255, 255)"',
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
    private ledRects: Array<LEDRect>;
    private hStep: number;
    private valueStep: number;

    private maxValue: number;
    private maxValueIndex: number;

    constructor(private hsv: HSV, private ref: ChangeDetectorRef) {
        console.log('constructor():VuGauge');
        this.ledRects = [];
        this.maxValue = 0;
        this.maxValueIndex = 0;
    }

    resetInterval() {
        if (this.rate) {
            let intervalMsec: number = 1000.0 / (1.0 * this.rate);

            setInterval(() => {
                this.ref.markForCheck();
            }, intervalMsec);

        }
        else {
            console.log('WARNING: no this.rate!');
        }
    }

    ngOnInit() {
        let percentWidth: number = 100.0 / (2 * this.nbars - 1);
        this.ledWidth = percentWidth + '%';
        let xStep: number = 2.0 * percentWidth;
        this.hStep = 120.0 / (this.nbars - 1.0);
        for (let i: number = 0; i < this.nbars; i++) {
            this.ledRects.push({
                x: (i * xStep) + '%',
                fill: this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 0.3),
                strokeWidth: "0"
            });
        }
        this.valueStep = (1.0 * (this.max - this.min)) / (this.nbars - 1.0);
    }

    ngOnChanges(changeRecord) {
        for (var change in changeRecord) {
            if (change === 'value' && this.ledRects.length > 0) {
                for (let i: number = 0; i < this.nbars; i++) {
                    let fill: string;
                    let strokeWidth: string;

                    if (this.min + this.valueStep * i <= this.value) {
                        fill = this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 1.0);
                    }
                    else {
                        fill = this.hsv.toRGB(120.0 - i * this.hStep, 1.0, 0.3);
                    }
                    this.ledRects[i].fill = fill;
                    this.ledRects[i].strokeWidth = "0";
                }
                if (this.value >= this.maxValue) {
                    this.maxValue = this.value;
                    this.maxValueIndex = Math.floor((this.value - this.min) / this.valueStep);
                }
                this.ledRects[this.maxValueIndex].strokeWidth = "1";
            }
            else if (change === 'max') {
            }
            else if (change === 'rate') {
                this.resetInterval();
            }
        }
    }
}
