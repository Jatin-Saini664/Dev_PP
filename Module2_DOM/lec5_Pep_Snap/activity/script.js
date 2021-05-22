let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let recordingState = false;

let constraints = {video:true};

let mediaRecorder;
let recordedData;


(async function(){
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(mediaStream);
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstop = function(e){
        // console.log(e);
    }

    mediaRecorder.onstart = function(e){
        // console.log(e);
    }

    mediaRecorder.ondataavailable = function(e){
        // console.log(e);
        let chunks = [];
        chunks.push(e.data);
        let blob = new Blob(chunks, {type:"video/mp4"}); // how to change content type of blob
        recordedData = blob;
        console.log(recordedData);
        saveVideoFS();
    }

    recordButton.addEventListener("click", function(e){
        if(recordingState){
            mediaRecorder.stop();
            recordButton.innerHTML = "Record";
        }else{
            mediaRecorder.start();
            recordButton.innerHTML = "Recording";
        }
        recordingState = !recordingState;
        
    })

    photoButton.addEventListener("click", function(){
        capturePhoto();
    })


    videoPlayer.srcObject=mediaStream;
})();


function saveVideoFS(){
    let videoUrl = URL.createObjectURL(recordedData);
    console.log(videoUrl);
    let aTag = document.createElement("a");

    aTag.download = "video.mp4";
    aTag.href = videoUrl;

    aTag.click();
    aTag.remove();
}

function capturePhoto(){
    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0);
    let imageUrl = canvas.toDataURL("image/jpg");

    let aTag = document.createElement("a");
    aTag.download = "photos.jpg";
    aTag.href = imageUrl;
    aTag.click();
}