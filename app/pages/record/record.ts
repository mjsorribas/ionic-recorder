import {Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {AppState} from '../../providers/app-state';
import {WebAudioAPI} from '../../providers/web-audio-api';
import {Env} from '../../providers/utils';


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
    private currentVolume: number;
    private maxVolume: number;
    private platformClass: string;
    private nSamplesAnalysed: number;
    private nMaxPeaks: number;

    constructor(private waa: WebAudioAPI, private platform: Env) {
        console.log('constructor():RecordPage - running in ' + this.platform.name);
        
        this.platformClass = this.platform.name;
        this.gain = 29;
        this.sliderValue = 33;
        this.notYetStarted = true;
        this.recordingTime = "00:00:00:00";
        this.recordButtonIcon = 'mic';
        this.nSamplesAnalysed = 0;
        this.nMaxPeaks = 0;
        this.waa.onChangeCallback = () => {
            this.currentVolume = this.waa.currentVolume;
            this.maxVolume = this.waa.maxVolume;
            this.nSamplesAnalysed = this.waa.nSamplesAnalysed;
            this.nMaxPeaks = this.waa.nMaxPeaks;
        }
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
            this.notYetStarted = false;
        }
        else {
            this.waa.resumeRecording();
        }
        this.recordButtonIcon = 'pause';
    }

}
