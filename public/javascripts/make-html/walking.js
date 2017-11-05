/**
 * Created by charlie on 2/22/16.
 */

define(['display', 'utilities'], function(display, utilities) {
    //    'use strict';

    function Walking() {

    }

    Walking.prototype.configurePageOne = function() {
        utilities.handleSubmit();

        var themes = ['cerulean', 'cosmos', 'cyborg',
            'darkly', 'flatly', 'journal', 'lumen', 'sandstone', 'slate',
            'spacelab', 'superhero', 'united', 'yeti'
        ];

        themes.forEach(function(value) {
            $('#themes').append('<option value="' + value + '">' + value + '</option>');
        });
    };

    function getRequestQueryByIndices(siteDirsIndex, destinationIndex, themeIndex) {
        var dirsToWalk = document.getElementById('dirsToWalk');
        var directory = dirsToWalk.options[siteDirsIndex].value;
        var destinationDirs = document.getElementById('destinationDirs');
        var destinationDir = destinationDirs.options[destinationIndex].value;
        var themes = document.getElementById('themes');
        var theme = themes.options[themeIndex].value;
        var mostRecentDate = document.getElementById('mostRecentDate').innerHTML;

        var highlight = $('#highlight').prop('checked');
        display.showDebug('Highlight: ' + highlight);
        return {
            siteDirsIndex: siteDirsIndex,
            directoryToWalk: directory,
            destinationDir: destinationDir,
            highlight: highlight,
            mostRecentDate: mostRecentDate,
            theme: theme
        };

    }

    function walkSingle() {
        var siteDirsIndex = dirsToWalk.selectedIndex;
        var destinationIndex = destinationDirs.selectedIndex;
        var themeIndex = themes.selectedIndex;
        return getRequestQueryByIndices(siteDirsIndex, destinationIndex, themeIndex);
    }

    function walkPaired() {
        var length = $('#dirsToWalk').children('option').length;
        var requestQueries = [];
        for (var i = 0; i < length; i++) {
            requestQueries.push(getRequestQueryByIndices(i, i));
        }
        return requestQueries;
    }

    function makersWalk(requestQuery, requestIndex, callback) {
        $.getJSON('/makers/walk', requestQuery, function(result) {
            display.showApacheFiles(result.htmlFilesWritten, result.destinationDir);
            display.fillDisplayArea(JSON.stringify(result, null, 4));
        }).done(function() {
            display.showDebug('Walk loaded second success');
        }).fail(function(jqxhr, textStatus, error) {
            display.showDebug('Walk loaded error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
        }).always(function() {
            display.showDebug('Walk loaded complete');
            if (callback) {
                callback(requestIndex + 1);
            }
        });

    }

    Walking.prototype.runWalk = function(radioWalkType) {
        display.clear();
        switch (radioWalkType) {
            case 'qSingle':
                var requestQuery = walkSingle(radioWalkType);
                makersWalk(requestQuery);
                break;
            case 'qPaired':
                var requestQueries = walkPaired();

                function pairCallback(requestIndex) {
                    if (requestIndex < requestQueries.length) {
                        makersWalk(requestQueries[requestIndex], requestIndex, pairCallback);
                    }
                }

                makersWalk(requestQueries[0], 0, pairCallback);
                break;
            default:
                display.showDebug('Walk type not found');
        }
    };

    return new Walking();

});