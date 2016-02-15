import {IonicApp, Page, Modal, Alert, NavController, Platform} from 'ionic-framework/ionic';
import {LibraryFilterPage} from '../library-filter/library-filter';


@Page({
    templateUrl: 'build/pages/library/library.html',
    providers: []
})
export class LibraryPage {
    constructor(private app: IonicApp, private nav: NavController, private platform: Platform) {
        console.log('constructor():LibraryPage');
    }

    updateLibrary() {
    }
    
    presentFilter() {
    }
}
