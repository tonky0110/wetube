const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;
const handleVideoData = (event) => {
    console.log(event);
    const {
        data: videoFile
    } = event;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoFile);
    link.download = 'recorded.webm';
    document.body.appendChild(link);
    link.click();
}

const stopRecording = () => {
    console.log('stopRecording button click');
    videoPreview.pause();
    videoRecorder.stop();

    // reset record button txt, function
    recordBtn.removeEventListener('click', stopRecording);
    recordBtn.innerHTML = 'Start Recording';
    recordBtn.addEventListener('click', getVideo);
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start(); // 주기적으로 실행.
    videoRecorder.addEventListener('dataavailable', handleVideoData);
    recordBtn.addEventListener('click', stopRecording);
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