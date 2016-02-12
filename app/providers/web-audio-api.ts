import {Injectable} from 'angular2/core';


@Injectable()
export class WebAudioAPI {
    private audioContext: AudioContext;
    private stream: MediaStream;
    private mediaRecorder: MediaRecorder;
    private blobs: Array<any>;

    constructor() {
        console.log('constructor():WebAudioApi');
        this.initializeAudio();
    }

    initializeAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let strm: MediaStream = null;
        if (navigator.mediaDevices.getUserMedia) {
            // console.log('getUserMedia == mediaDevices.getUserMedia()');
            // newer Firefox - we know it has MediaRecorder
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream: MediaStream) => {
                    strm = stream;
                    console.log('strm: '+strm);
                    this.stream = stream;
                    this.mediaRecorder = new MediaRecorder(this.stream);
                    console.log('mediaDevices.getUserMedia(): SUCCESS! mediaRecorder == ' + this.mediaRecorder);
                    /*
                    mediaRecorder.ondataavailable(function(event) {
                        console.log('ondataavailable ...');
                        this.blobs.push(event.data);
                    })
                    mediaRecorder.onstop(function(event) {
                        console.log('onstop ...');  
                    })
                    */
                    // console.log('audioStream 0: ' + stream);
                })
                .catch(function(error) {
                    console.log('mediaDevices.getUserMedia(): ERROR: ' + JSON.stringify(error));
                });
        }
        else if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ audio: true },
                    function(stream) {
                        this.stream = stream;
                        console.log('strm: '+strm);
                        try {
                            this.mediaRecorder = new MediaRecorder(this.stream);
                            console.log('getUserMedia(): SUCCESS! mediaRecorder == ' + this.mediaRecorder);
                        }
                        catch (error) {
                            console.log('ERROR: Cannot instantiate a MediaRecorder object: ' + error.message);
                        }
                        // console.log('getUserMedia(): SUCCESS!');
                    },
                    function(error) {
                        console.log('ERROR: getUserMedia(): ' + JSON.stringify(error));
                    });
            }

            else {
                console.log('ERROR: getUserMedia not supported in this browser.');
            }
        }
        console.log('initAudio(): audioContext=' + this.audioContext + ', audioStream: ' + this.stream +
            ', mediaRecorder: ' + this.mediaRecorder);
        console.log('initAudio(): audioContext=' + this.audioContext + ', audioStream: ' + strm +
            ', mediaRecorder: ' + this.mediaRecorder);
        // console.dir(this);
    }

    startRecording() {
        console.log('WebAudioAPI:startRecording()');
        if (!this.mediaRecorder) {
            console.log('ERROR: startRecording(): no this.mediaRecorder');
            return;
        }
        this.mediaRecorder.start();
    }

    pauseRecording() {
        console.log('WebAudioAPI:pauseRecording()');
        if (!this.mediaRecorder) {
            console.log('ERROR: pauseRecording(): no this.mediaRecorder');
            return;
        }
        this.mediaRecorder.pause();
    }

    resumeRecording() {
        console.log('WebAudioAPI:resumeRecording()');
        if (!this.mediaRecorder) {
            console.log('ERROR: resumeRecording(): no this.mediaRecorder');
            return;
        }
        this.mediaRecorder.resume();
    }

    stopRecording() {
        console.log('WebAudioAPI:stopRecording() - blobs.length = ' + this.blobs.length);
        if (!this.mediaRecorder) {
            console.log('ERROR: stopRecording(): no this.mediaRecorder');
            return;
        }
        this.mediaRecorder.stop();
    }
}
