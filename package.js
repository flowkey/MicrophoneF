Package.describe({
    summary: "a js wrapper to get Microphone input from user through flash.",
    git: "https://github.com/flowkey/MicrophoneF.git",
    version: "0.1.0",
    name: "flowkey:flashmic"
});

Package.onUse(function(api, where) {
    var path = Npm.require('path');
    api.use('less@1.0.0', 'client');
    api.use('underscore@1.0.0', 'client');

    // api.add_files(path.join('MicrophoneMain.swf'), 'client'); // not wokring this way but it should :(
    api.add_files(['swfobject.js', 'microphone.js', 'flashObj.less'], 'client');

    if (api.export)
        api.export(['MicrophoneF']);
});
