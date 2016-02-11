import {Page, IonicApp} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryPage} from '../library/library';
// import {Input} from 'angular2/core';
import {Type} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    tab1Root: Type = RecordPage;
    tab2Root: Type = LibraryPage;
    
    constructor(private app: IonicApp) {
        // set the root pages for each tab
        this.tab1Root = RecordPage;
        this.tab2Root = LibraryPage;
    }
    
    onPageDidEnter() {
        this.app.setTitle('Ionic Record');
    }
}
