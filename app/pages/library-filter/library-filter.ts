import {Page, NavParams, ViewController} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/library-filter/library-filter.html'
})
export class LibraryFilterPage {
    tracks: Array<any>;
    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.tracks = [];

        // passed in array of tracks that should be excluded (unchecked)
        let excludeTracks = this.navParams.data;
    }

    resetFilters() {
        // reset all of the toggles to be checked
        this.tracks.forEach(track => {
            track.isChecked = true;
        });
    }

    applyFilters() {
        // Pass back a new array of track names to exclude
        let excludeTracks = this.tracks.filter(c => !c.isChecked).map(c => c.name);
        this.dismiss(excludeTracks);
    }

    dismiss(data) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewCtrl.dismiss(data);
    }
}
