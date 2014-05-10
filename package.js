Package.describe({
    summary: "a js wrapper to get Microphone input from user trough flash."
});

Package.on_use(function(api, where) {
    var path = Npm.require('path');
    api.use(['less', 'underscore'], 'client');

    // api.add_files(path.join('MicrophoneMain.swf'), 'client'); // not wokring this way but it should :(
    api.add_files(['swfobject.js', 'microphone.js', 'flashObj.less'], 'client');

    if (api.export)
        api.export(['MicrophoneF']);
});

// Package.on_test(function(api) {
//     api.use(['underscore', 'ejson', 'deps', 'settings-manager', 'ui', 'tinytest', 'test-helpers']);
//     api.add_files(['tests/basictests.js'], 'client');
// })