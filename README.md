A Javascript wrapper around AS3 Microphone.

Original non-meteor-wrapper: https://github.com/luciferous/Microphone

#Usage

```javascript

MicrophoneF.initialize();
MicrophoneF.onready(function() {
    MicrophoneF.enable();
    MicrophoneF.ondata(function(data) {
        console.log(data.length); // Typically 2048 bytes.
    });
});

#Warning

Often too laggy for real time audio analysis, because the audio buffer size varies and gets too big.
Any ActionScript/Flash developers, who want to take a look at this?