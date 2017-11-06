/**
 * Created by charlie on 7/9/16.
 */

define(['imagePicker'], function(imagePicker) {
    'use strict';

    function publishRectMakeImage() {
        $.publish('reactMakeImage', {
            message: "Publisher Constructor Called"
        });
    }

    return {
        init: function() {
            $('#pageLoad').load('/makers/pixPicker', function() {
                imagePicker.configure();
                publishRectMakeImage();
            });
        }
    };
});