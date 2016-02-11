import {Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {AppState} from '../../providers/app-state';


@Page({
    templateUrl: 'build/pages/record/record.html',
    directives: [VuGauge]
})
export class RecordPage {
    sliderValue: number;
    notYetStarted: boolean;
    recordingTime: string;
    recordButtonIcon: string;
    stopButtonIcon: string;
    stopButtonDisabled: boolean;
    gain: number;
    constructor() {
        console.log('constructor():RecordPage');

        this.gain = 29;
        this.sliderValue = 33;
        this.notYetStarted = true;
        this.recordingTime = "00:00:00:00";

        this.stopRecord();
    }

    onSliderDrag($event) {
        $event.stopPropagation();
    }

    onSliderChange($event) {
        this.gain = 1.0 * $event.target.value;

        console.log('onSliderChange(): value = ' + $event.target.value +
            ', gain = ' + this.gain);
    }

    isRecording() {
        return this.recordButtonIcon === 'pause';
    }

    toggleRecord() {
        if (this.isRecording()) {
            console.log('--> is recording');
            this.pauseRecord();
        }
        else {
            console.log('--> not recording');
            this.startRecord();
        }
    }

    pauseRecord() {
        console.log('stopRecord()');
        this.recordButtonIcon = 'mic';
    }

    stopRecord() {
        console.log('stopRecord()');
        this.notYetStarted = true;
        this.recordButtonIcon = 'mic';
    }

    startRecord() {
        console.log('startRecord()');
        this.notYetStarted = null;
        this.recordButtonIcon = 'pause';
    }

}
