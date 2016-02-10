import {IonicApp, Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {Slider} from '../../components/slider/slider';

const START_RECORD_ICON: string = 'mic';
const START_RECORD_TEXT: string = 'Record';

const START_UPLOAD_ICON: string = 'cloud-upload';
const START_UPLOAD_TEXT: string = 'Upload';

const STOP_RECORD_ICON: string = 'square';
const STOP_RECORD_TEXT: string = 'Stop';

const STOP_UPLOAD_ICON: string = 'pause';
const STOP_UPLOAD_TEXT: string = 'Pause';

@Page({
    templateUrl: 'build/pages/record/record.html',
    directives: [VuGauge, Slider]
})
export class RecordPage {
    segment: string;
    tracks: Array<any>;
    recordingTime: string;
    recordButtonIcon: string;
    recordButtonText: string;
    uploadButtonIcon: string;
    uploadButtonText: string;

    constructor(private app: IonicApp) {
        this.segment = 'record';
        this.tracks = [];
        this.recordingTime = "00:00:00:00";

        // initialize state to not be recording
        this.stopRecord();
    }

    isRecording() {
        return this.recordButtonIcon === STOP_RECORD_ICON;
    }

    toggleRecord() {
        // console.log('onRecord()');
        if (this.isRecording()) {
            console.log('--> is recording');
            this.stopRecord();
        }
        else {
            console.log('--> not recording');
            this.startRecord();
        }
    }

    stopRecord() {
        console.log('stopRecord()');
        this.recordButtonIcon = START_RECORD_ICON;
        this.recordButtonText = START_RECORD_TEXT;
        this.uploadButtonIcon = START_UPLOAD_ICON;
        this.uploadButtonText = START_UPLOAD_TEXT;
        // TODO: if recording time > 0, go to recording preview page, otherwise
        // reset everything
    }

    startRecord() {
        console.log('startRecord()');
        this.recordButtonIcon = STOP_RECORD_ICON;
        this.recordButtonText = STOP_RECORD_TEXT;
        this.uploadButtonIcon = STOP_UPLOAD_ICON;
        this.uploadButtonText = STOP_UPLOAD_TEXT;
        // TODO: blur upload button
    }

    onPageDidEnter() {
        this.app.setTitle('Ionic Record');
    }

    changeSegment() {
        this.app.getComponent('nav').setRoot(LibraryPage);
    }

}
