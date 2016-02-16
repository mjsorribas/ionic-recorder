import {Page, IonicApp} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryPage} from '../library/library';
import {Type} from 'angular2/core';


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
}
