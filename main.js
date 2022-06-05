predicition_1 = "";
predicition_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture_image() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "'>";
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_ArEi9jD0/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function speak() {
var synth = window.speechSynthesis;
speak_data_1 = "the first prediction is " + predicition_1;
speak_data_2 = "and the second prediction is " + predicition_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis);
}