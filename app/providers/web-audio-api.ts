import {Injectable} from 'angular2/core';


@Injectable()
export class WebAudioAPI {
    private audioContext: AudioContext;
    private stream: MediaStream;
    private mediaRecorder: MediaRecorder;
    private chunks: Array<Float32Array>;

    constructor() {
        console.log('constructor():WebAudioApi');
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.chunks = [];
        if (navigator.mediaDevices.getUserMedia) {
            this.getStreamAndRecorderNew();
        }
        else if (!navigator.getUserMedia) {
            this.getStreamAndRecorderLegacy();
        }
    }

    getStreamAndRecorderNew() {
        // console.log('getUserMedia == mediaDevices.getUserMedia()');
        // newer Firefox - we know it has MediaRecorder
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream: MediaStream) => {
                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(this.stream);
                console.log('mediaDevices.getUserMedia(): SUCCESS! mediaRecorder == ' + this.mediaRecorder);
            })
            .catch(function(error) {
                console.log('mediaDevices.getUserMedia(): ERROR: ' + JSON.stringify(error));
            });
    }

    getStreamAndRecorderLegacy() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true },
                function(stream) {
                    this.stream = stream;
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
        } // if (navigator.getUserMedia) {
        else {
            console.log('ERROR: getUserMedia not supported in this browser.');
        }
    }

    startRecording() {
        console.log('WebAudioAPI:startRecording()');
        if (!this.mediaRecorder) {
            console.log('ERROR: startRecording(): no this.mediaRecorder');
            return;
        }

        let chunks: Array<Float32Array> = this.chunks;
        this.mediaRecorder.ondataavailable = function(event) {
            chunks.push(event.data);
            console.log('data available: # of chunks: ' + chunks.length);
        }

        this.mediaRecorder.onstop = function(event) {
            console.log('data available after MediaRecorder.stop() called. chunks.length = ' + chunks.length);
        };

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
        console.log('WebAudioAPI:stopRecording()');
        if (!this.mediaRecorder) {
            console.log('ERROR: stopRecording(): no this.mediaRecorder');
            return;
        }
        this.mediaRecorder.stop();
    }
}
