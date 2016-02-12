import {Injectable} from 'angular2/core';

@Injectable()
export class WebAudioAPI {
    private audioContext: any;
    private stream: any;
    private mediaRecorder: any;

    constructor() {
        console.log('constructor():WebAudioApi');
        this.initializeAudio();
    }

    initializeAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        if (navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia == mediaDevices.getUserMedia()');
            // newer Firefox - we know it has MediaRecorder
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    this.stream = stream;
                    this.mediaRecorder = new MediaRecorder(this.stream);
                    console.log('mediaDevices.getUserMedia(): SUCCESS! mediaRecorder == ' + mediaRecorder);
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
                        this.mediaRecorder = null;
                        try {
                            this.mediaRecorder = new MediaRecorder(this.stream);
                        }
                        catch (error) {
                            console.log('ERROR: Cannot instantiate a MediaRecorder object: ' + error.message);
                        }
                        console.log('getUserMedia(): SUCCESS!');
                    },
                    function(error) {
                        console.log('getUserMedia(): ERROR: ' + JSON.stringify(error));
                    });
            }

            else {
                alert('getUserMedia not supported in this browser.');
            }

        }
    }
    
    startRecording() {
        console.log('WebAudioAPI:startRecording()');
    }
    
    pauseRecording() {
        console.log('WebAudioAPI:pauseRecording()');
    }
    
    resumeRecording() {
        console.log('WebAudioAPI:resumeRecording()');        
    }

    stopRecording() {
        console.log('WebAudioAPI:stopRecording()');        
    }
}
