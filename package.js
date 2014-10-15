Package.describe({
    summary: "a js wrapper to get Microphone input from user trough flash.",
    version: "0.1.1",
    name: "flowkey:flashmic",
    git: "/* PUBLIC */",
});

Package.on_use(function(api, where) {
    var path = Npm.require('path');
    api.use(['less', 'underscore', 'flowkey:swfobject'], 'client');

    // api.add_files(path.join('MicrophoneMain.swf'), 'client'); // not working this way but it should :(
    api.add_files(['lib/microphone.js', 'style/flashObj.less'], 'client');

    if (api.export)
        api.export(['MicrophoneF']);
});

// Package.on_test(function(api) {
//     api.use(['underscore', 'ejson', 'deps', 'settings-manager', 'ui', 'tinytest', 'test-helpers']);
//     api.add_files(['tests/basictests.js'], 'client');
// })