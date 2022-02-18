const constraint = {
    audio: true,
    video: true
}




window.onload = function() {
    navigator.mediaDevices.getUserMedia(constraint).then(stream => {

        const videoElement = document.querySelector('video');


        videoElement.srcObject = stream;

        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
}