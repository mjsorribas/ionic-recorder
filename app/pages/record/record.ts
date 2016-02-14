import {Page, Modal, Alert, NavController, Platform} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {WebAudioAPI} from '../../providers/web-audio-api';


@Page({
    templateUrl: 'build/pages/record/record.html',
    directives: [VuGauge]
})
export class RecordPage {
    private sliderValue: number;
    private notYetStarted: boolean;
    private recordingTime: string;
    private recordButtonIcon: string;
    private stopButtonIcon: string;
    private stopButtonDisabled: boolean;
    private gain: number;


    constructor(private webAudioAPI: WebAudioAPI, private platform: Platform) {
        console.log('constructor():RecordPage');
        this.gain = 29;
        this.sliderValue = 33;
        this.notYetStarted = true;
        this.recordingTime = "00:00:00:00";
        this.recordButtonIcon = 'mic';
    }

    onSliderDrag($event) {
        // Fixes slider not dragging in Firefox, as described in:
        // https://forum.ionicframework.com/t/range-input-input-type-range-slider-not-dragging-in-firefox/43186
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
        this.webAudioAPI.pauseRecording();
        this.recordButtonIcon = 'mic';
    }

    stopRecord() {
        this.webAudioAPI.stopRecording();
        this.notYetStarted = true;
        this.recordButtonIcon = 'mic';
    }

    startRecord() {
        if (this.notYetStarted) {
            this.webAudioAPI.startRecording();
            this.notYetStarted = false;
        }
        else {
            this.webAudioAPI.resumeRecording();
        }
        this.recordButtonIcon = 'pause';
    }

}
