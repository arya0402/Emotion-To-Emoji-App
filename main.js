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
    Webcam.snap(function (data_uri) {
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

function predict_emotion() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        predicition_1 = results[0].label;
        predicition_2 = results[1].label;
        speak();
        if(predicition_1 == "happy") {
            document.getElementById("result_emoji").innerHTML = "&#128522;";
        }
        if(predicition_1 == "sad") {
            document.getElementById("result_emoji").innerHTML = "&#128532;";
        }
        if(predicition_1 == "angry") {
            document.getElementById("result_emoji").innerHTML = "&#128548;";
        }
        if(results[0].label == "crying") {
            document.getElementById("result_emoji").innerHTML = "&#128546;";
        }
        if(predicition_2 == "happy") {
            document.getElementById("result_emoji_2").innerHTML = "&#128522;";
        }
        if(predicition_2 == "sad") {
            document.getElementById("result_emoji_2").innerHTML = "&#128532;";
        }
        if(predicition_2 == "angry") {
            document.getElementById("result_emoji_2").innerHTML = "&#128548;";
        }
        if(results[1].label == "crying") {
            document.getElementById("result_emoji_2").innerHTML = "&#128546;";
        }
    }
}