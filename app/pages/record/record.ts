import {Page, Modal, Alert, NavController} from 'ionic-framework/ionic';
import {LibraryPage} from '../library/library';
import {VuGauge} from '../../components/vu-gauge/vu-gauge';
import {Slider} from '../../components/slider/slider';
import {AppState} from '../../providers/app-state';


@Page({
    templateUrl: 'build/pages/record/record.html',
    directives: [VuGauge, Slider]
})
export class RecordPage {
    preStart: boolean;
    recordingTime: string;
    recordButtonIcon: string;
    stopButtonIcon: string;
    stopButtonDisabled: boolean;
    constructor() {
        console.log('constructor():RecordPage');

        this.preStart = true;
        this.recordingTime = "00:00:00:00";

        this.stopRecord();
    }

    isRecording() {
        return this.recordButtonIcon === 'pause';
    }

    toggleRecord() {
        // console.log('onRecord()');
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
        this.preStart = true;
        this.recordButtonIcon = 'mic';
    }

    startRecord() {
        console.log('startRecord()');
        this.preStart = null;
        this.recordButtonIcon = 'pause';
    }

}
