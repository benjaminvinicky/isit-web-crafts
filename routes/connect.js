/**
 * Created by charlie on 6/9/15.
 */

var mongoose = require('mongoose');

var connect = {

    connected: false,

    simpleConnect: function() {
        'use strict';
        console.log('Connecting with simple.');
        var url = 'mongodb://127.0.0.1:27017/elven';
        connect.connected = true;
        mongoose.connect(url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    mlabConnect: function() {
        'use strict';
        console.log('Connecting with mlab.');
        connect.connected = true;
        var userName = 'YOUR-USER-NAME';
        var password = 'YOUR-PASSWORD';
        var siteAndPort = 'YOUR-MONGODB-SITE-AND-PORT';
        var databaseName = 'YOUR-DATABASE-NAME';
        var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
        console.log(url);
        mongoose.connect(url);

        // This part is optional
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    doConnection: function(useSimple) {
        'use strict';
        console.log('Call doConnection with:', useSimple);

        if (useSimple) {
            connect.simpleConnect();
        } else {
            connect.mlabConnect();
        }
    }
};

module.exports = connect;