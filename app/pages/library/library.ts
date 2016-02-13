import {IonicApp, Page, Modal, Alert, NavController, Platform} from 'ionic-framework/ionic';
import {RecordPage} from '../record/record';
import {LibraryFilterPage} from '../library-filter/library-filter';

// import {Observable} from 'rxjs/Observable';

// import {WikipediaService} from '../../providers/wikipedia-service';
// import {URLLibraryParams, Jsonp, ConnectionBackend} from 'angular2/http';

// Based on LibraryPage and LibraryFilterPage

@Page({
    templateUrl: 'build/pages/library/library.html',
    providers: []
})
export class LibraryPage {
    items: Array<any>;
    nResults: number;
    dayIndex: number;
    queryText: string;
    prevQueryText: string;
    excludeTracks: Array<any>;
    filterTracks: Array<any>;
    placeholder: string;
    segment: string;
    platformClass: string;

    constructor(private app: IonicApp, private nav: NavController, private platform: Platform) {
        console.log('constructor():LibraryPage');

        if (this.platform.is('core')) {
            this.platformClass = 'browser';
        } else if (this.platform.is('ios')) {
            this.platformClass = 'ios';
        } else if (this.platform.is('android')) {
            this.platformClass = 'android';
        }

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
