const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;

const startRecording = () => {
    console.log('startRecording', streamObject);
    const videoRecorder = new MediaRecorder(streamObject);
    console.log('videoRecorder', videoRecorder);

    videoRecorder.start();
    // videoRecorder.addEventListener('')
}
const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720
            }
        });
        streamObject = stream;
        videoPreview.srcObject = streamObject;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = 'Stop Recording';
        startRecording();
    } catch (error) {
        console.error(error);
        recordBtn.innerHTML = ''
    } finally {
        recordBtn.removeEventListener('click', getVideo);
    }

}
const init = () => {
    recordBtn.addEventListener('click', getVideo);
}

if (recorderContainer) {
    init();
}