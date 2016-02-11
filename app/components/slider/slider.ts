import {Component} from 'angular2/core';

@Component({
    selector: 'slider',
    inputs: ['min', 'max', 'value'],
    template: [
        '<input type="range"',
        '       [attr.min]="min"',
        '       [attr.max]="max"',
        '       [attr.value]="value"',
        '       (touchstart)="onDrag($event)"',
        '       (mousedown)="onDrag($event)">'
    ].join('')
})
export class Slider {
    private min: number;
    private max: number;
    private value: number;

    constructor() {
        // console.log('Slider:constructor()');
    }

    onDrag($event) {
        $event.stopPropagation();
    }

    ngOnInit() {
        // console.log('slider:ngOnInit()');
    }
}