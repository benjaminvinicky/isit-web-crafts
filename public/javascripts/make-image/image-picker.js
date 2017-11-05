/**
 * Created by charlie on 3/7/16.
 */

define(['display', 'utilities'], function(display, utilities) {
    'use strict';

    function ImagePicker() {

    }

    ImagePicker.prototype.configure = function() {
        utilities.handleSubmit();
        $('#createMarkdown').click(createMarkdown);
        $('#deleteMarkdown').click(deleteMarkdown);
    };

    function deleteMarkdown() {
        $.getJSON('/makers/deleteMarkdown', function(result) {
                display.showDebug(JSON.stringify(result));
            }).done(function() {
                display.showDebug('Delete Markdown loaded second success');
            })
            .fail(function(jqxhr, textStatus, error) {
                display.showDebug('Delete Markdown load error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
            })
            .always(function() {
                display.showDebug('Delete Markdown loaded complete');
            });
    }

    function createMarkdown() {
        $.getJSON('/makers/makeImages', function(result) {
                display.showDebug(JSON.stringify(result, null, 4));
            }).done(function() {
                display.showDebug('Make Markdown loaded second success');
            })
            .fail(function(jqxhr, textStatus, error) {
                display.showDebug('Make Markdown load error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
            })
            .always(function() {
                display.showDebug('Make Markdown loaded complete');
            });
    }

    function createMarkdownOld() {
        $.getJSON('/makers/makeMarkdown', function(result) {
                display.showDebug(JSON.stringify(result));
            }).done(function() {
                display.showDebug('Make Markdown loaded second success');
            })
            .fail(function(jqxhr, textStatus, error) {
                display.showDebug('Make Markdown load error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
            })
            .always(function() {
                display.showDebug('Make Markdown loaded complete');
            });
    }

    return new ImagePicker();

});