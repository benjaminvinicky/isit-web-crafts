/**
 * Created by charlie on 3/7/16.
 */

define(['display'], function(display) {
    'use strict';
    return {
        handleSubmit: function() {
            $('#elfform').submit(function(event) {
                var userFormData = $(this).serialize();
                display.showDebug('Handler for .submit() called.' + userFormData);
                event.preventDefault();
            });
        }
    };
});