import {IonicApp, Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryFilterPage} from '../library-filter/library-filter';
import {Env} from '../../providers/utils';


@Page({
    templateUrl: 'build/pages/library/library.html',
    providers: []
})
export class LibraryPage {
    constructor(private app: IonicApp, private nav: NavController, private platform: Env) {
        console.log('constructor():LibraryPage');
    }

    updateLibrary() {
    }
    
    presentFilter() {
        /*
        let modal = Modal.create(LibraryFilterPage, this.excludeTracks);
        modal.onDismiss(data => {
            if (data) {
                this.excludeTracks = data;
                this.updateLibrary();
            }
        });
        this.nav.present(modal);
        */
    }
}
