import {Page} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {RecordPage} from '../record/record';
import {LibraryPage} from '../library/library';


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    private tab1Root: Type = RecordPage;
    private tab2Root: Type = LibraryPage;

    constructor() {
        console.log('constructor():TabsPage');
        this.tab1Root = RecordPage;
        this.tab2Root = LibraryPage;
    }
}
