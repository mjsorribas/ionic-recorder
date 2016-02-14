import {IonicApp, Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryFilterPage} from '../library-filter/library-filter';
import {Env} from '../../providers/utils';


@Page({
    templateUrl: 'build/pages/library/library.html',
    providers: []
})
export class LibraryPage {
    private items: Array<any>;
    private nResults: number;
    private dayIndex: number;
    private queryText: string;
    private prevQueryText: string;
    private excludeTracks: Array<any>;
    private filterTracks: Array<any>;
    private placeholder: string;
    private segment: string;

    constructor(private app: IonicApp, private nav: NavController, private platform: Env) {
        console.log('constructor():LibraryPage - running in ' + this.platform.name);

        this.items = [];
        this.nResults = 0;
        this.dayIndex = 0;
        this.queryText = '';
        this.prevQueryText = '';
        this.excludeTracks = [];
        this.filterTracks = [];
        this.placeholder = 'Search library';
        this.segment = 'library';
        this.updateLibrary();
    }

    onPageDidEnter() {
        this.app.setTitle('Library');
    }

    updateLibrary() {

        if (this.prevQueryText == this.queryText) {
            // don't call consecutively on same input
            // console.log(msg);
            return;
        }

        console.log("updateLibrary() queryText='" + this.queryText + "'");
        this.prevQueryText = this.queryText;
        this.items = [this.queryText, this.queryText, this.queryText, this.queryText, this.queryText];
        // console.log(this.wikipediaService.library(this.queryText));
    }

    presentFilter() {
        let modal = Modal.create(LibraryFilterPage, this.excludeTracks);
        modal.onDismiss(data => {
            if (data) {
                this.excludeTracks = data;
                this.updateLibrary();
            }
        });
        this.nav.present(modal);
    }

    changeSegment() {
        console.log('library:changeSegment() - segment=' + this.segment);
        if (this.segment !== 'library') {
            this.app.getComponent('nav').push(RecordPage);
        }
    }
}
