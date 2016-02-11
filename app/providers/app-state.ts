import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-framework/ionic'

@Injectable()
export class AppState {
    localStorage: Storage;
    
    constructor() {
        console.log('constructor():AppState');

        this.localStorage = new Storage(LocalStorage);
    }
    
    get(varName, defaultValue) {
    }
    
}