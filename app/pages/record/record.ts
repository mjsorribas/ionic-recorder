import {Page, Modal, Alert, NavController, Platform} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {WebAudioAPI} from '../../providers/web-audio-api';
import {Utils} from '../../providers/utils';

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
    private dB: string;
    
    constructor(private webAudioAPI: WebAudioAPI, private platform: Platform, private utils: Utils) {
        console.log('constructor():RecordPage');
        this.gain = 100;
        this.dB = '0.00 dB';
        this.sliderValue = 100;
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
        this.gain = $event.target.value;
        let factor: number = this.gain/100.0;
        if (factor === 0) {
            this.dB = 'Muted'
        }
        else {
            this.dB = this.utils.num2str(this.utils.ratio2dB(factor), 2)+' dB';        
        }
        this.webAudioAPI.setGain(factor);
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
