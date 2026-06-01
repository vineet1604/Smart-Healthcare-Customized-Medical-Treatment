const startSpeechRecognitionButton =
document.getElementById("startSpeechRecognition");

const transcriptionDiv =
document.getElementById("transcription");

if(startSpeechRecognitionButton){

    startSpeechRecognitionButton.addEventListener(
        "click",
        startSpeechRecognition
    );

}

function startSpeechRecognition(){

    if(!('webkitSpeechRecognition' in window)){

        alert(
            "Speech Recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = function(){

        transcriptionDiv.innerHTML =
        "🎤 Listening... Speak now";

    };

    recognition.onresult = function(event){

        const result =
        event.results[0][0].transcript;

        transcriptionDiv.innerHTML =
        "✅ Detected: " + result;

        const symptomsInput =
        document.getElementById("symptoms");

        if(symptomsInput){

            symptomsInput.value = result;

        }

    };

    recognition.onerror = function(event){

        transcriptionDiv.innerHTML =
        "❌ Error: " + event.error;

        console.log(event.error);

    };

    recognition.onend = function(){

        console.log(
            "Speech recognition ended."
        );

    };

    recognition.start();

}