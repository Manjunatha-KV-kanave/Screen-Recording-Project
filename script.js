const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoPlayback = document.getElementById('videoPlayback');

let mediaRecorder;
let recordedChunks = [];

startBtn.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
    });

    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9'
    });

    mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
        videoPlayback.src = url;
        videoPlayback.style.display = 'block';
        recordedChunks = [];
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
