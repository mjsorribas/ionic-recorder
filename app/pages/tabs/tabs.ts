import {Page, IonicApp} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryPage} from '../library/library';
import {Type} from 'angular2/core';


// since the original type definitions file does not have element.style
// we extend it here to avoid Typescript compile errors, use to cast
interface MyElement extends Element {
    style?: any;
}


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    private tab1Root: Type = RecordPage;
    private tab2Root: Type = LibraryPage;

    constructor(private app: IonicApp) {
        console.log('constructor():TabsPage');
        this.tab1Root = RecordPage;
        this.tab2Root = LibraryPage;
    }

    onPageDidEnter() {
        this.app.setTitle('Ionic Record');
        // globally hide the tab-bar - only use tabs programmatically, see:
        //     https://forum.ionicframework.com/t/ionic2-hide-tabs/37998/4
        (<MyElement>document.querySelector('#tabs ion-tabbar-section')).style.display = 'none';
    }
}
