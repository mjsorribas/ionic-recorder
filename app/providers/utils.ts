import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-framework/ionic';

@Injectable()
export class Env extends Platform {
    name: string;

    constructor(private platform: Platform) {
        super();
        console.log('constructor():Env');
        if (this.platform.is('core')) {
            this.name = 'browser';
        }
        else if (this.platform.is('ios')) {
            this.name = 'ios';
        }
        else if (this.platform.is('android')) {
            this.name = 'android';
        }
    }
}
