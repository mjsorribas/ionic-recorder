import {Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {AppState} from '../../providers/app-state';
import {WebAudioAPI} from '../../providers/web-audio-api';


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

    constructor(private waa: WebAudioAPI) {
        console.log('constructor():RecordPage');

        this.gain = 29;
        this.sliderValue = 33;
        this.notYetStarted = true;
        this.recordingTime = "00:00:00:00";
        this.recordButtonIcon = 'mic';
    }

    onSliderDrag($event) {
        $event.stopPropagation();
    }

    onSliderChange($event) {
        this.gain = 1.0 * $event.target.value;
    }

    isRecording() {
        return this.recordButtonIcon === 'pause';
    }

    toggleRecord() {
        if (this.isRecording()) {
            this.pauseRecord();
        }
        else {
            this.startRecord();
        }
    }

    pauseRecord() {
        this.waa.pauseRecording();
        this.recordButtonIcon = 'mic';
    }

    stopRecord() {
        this.waa.stopRecording();
        this.notYetStarted = true;
        this.recordButtonIcon = 'mic';
    }

    startRecord() {
        if (this.notYetStarted) {
            this.waa.startRecording();
            this.notYetStarted = null;
        }
        else {
            this.waa.resumeRecording();
        }
        this.recordButtonIcon = 'pause';
    }

}
