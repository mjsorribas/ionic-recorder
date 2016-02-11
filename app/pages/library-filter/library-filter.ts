import {Page, NavParams, ViewController} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/library-filter/library-filter.html'
})
export class LibraryFilterPage {
    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        console.log('constructor():LibraryFilterPage');
    }

    resetFilters() {
        console.log('resetFilters():LibraryFilterPage');
    }

    applyFilters() {
        console.log('applyFilters():LibraryFilterPage');
    }

    dismiss(data) {
        console.log('dismissFilters():LibraryFilterPage');        
    }
}
