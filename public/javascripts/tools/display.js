/**
 * Created by charlie on 2/22/16.
 */

define(function() {
    'use strict';

    return {
        clear: function() {
            $('#displayArea').empty();
            $('#displayList').empty();
        },

        clearConfig: function() {
            $('#dirsToWalk').empty();
            $('#destinationDirs').empty();
        },

        fillDisplayArea: function(stringToDisplay) {
            $('#displayArea').html(stringToDisplay);
        },

        showApacheFiles: function(files, destinationDir) {
            files.forEach(function(file) {
                var base = '/var/www/html/';
                var extra = destinationDir.slice(base.length, destinationDir.length);
                var hostName = window.location.hostname + '/';
                var url = 'http://' + hostName + extra + file.slice(destinationDir.length, file.length);
                $('#displayList').append('<li><a href=\"' + url + '\" target=\"_blank\">' + url + '</a></li>');
            });
        },

        showHtmlFiles: function(files, destinationDir) {
            files.forEach(function(file) {
                // var index = file.lastIndexOf('/');
                var host = window.location.origin + '/';
                // var url = 'http://localhost/' + file.slice(destinationDir.length, file.length);
                var url = host + file.slice(destinationDir.length, file.length);
                $('#displayList').append('<li><a href=\"' + url + '\" target=\"_blank\">' + url + '</a></li>');
            });
        },

        showDebug: function(value) {
            $('#debug').append('<li>' + value + '</li>');
        }

    };

});