const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

const stopRecording = async () => {
    try {
        console.log('stopRecording.');
        recordBtn.innerHTML = 'Start Recording';
        recordBtn.addEventListener('click', startReCording);
    } catch (error) {
        console.error(error);
        recordBtn.removeEventListener('click', stopRecording)
    }
}
const startReCording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                height: 720,
                width: 1280
            }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = 'Stop Recording';
        recordBtn.addEventListener('click', stopRecording);
    } catch (error) {
        console.error(error);
        recordBtn.innerHTML = '😟 cant record';
        recordBtn.removeEventListener('click', startReCording);
    }
}

function init() {
    recordBtn.addEventListener('click', startReCording);
}

if (recorderContainer) {
    init();
}