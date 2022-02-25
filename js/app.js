const constraint = {
    audio: true,
    video: true
}




window.onload = function() {
    const videoChunks = [];
    let mediaRecorder;


    navigator.mediaDevices.getUserMedia(constraint).then(stream => {

        const videoElement = document.querySelector('.video');
        const recorderButton = document.querySelector('.recorder-btn');
        const recorderStopButton = document.querySelector('.stop-btn');


        videoElement.srcObject = stream;

        recorderButton.addEventListener('click', function() {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start(1000);

            mediaRecorder.ondataavailable = function(e) {
                videoChunks.push(e.data);
            }
        });

        recorderStopButton.addEventListener('click', function() {
            mediaRecorder.stop();

            const blob = new Blob(videoChunks,  {
                type: 'video/webm'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");

            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = 'matt_stream.webm';
            a.click();
        })

        videoElement.onloadedmetadata = function(e) {
            videoElement.play();
        };
    })
}