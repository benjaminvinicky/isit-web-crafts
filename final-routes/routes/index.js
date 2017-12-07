var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'final-routes' });
});

router.get('/route01', function(req, res) { 'use strict';
    var myresponse = { "result" : "route01"};
    return res.send(myresponse);
});

router.get('/route02', function(req, res) { 'use strict';
    var myresponse = { "result" : "route02"};
    return res.send(myresponse);
});

router.get('/route03', function(req, res) { 'use strict';
    var myresponse = { "result" : "route03"};
    return res.send(myresponse);
});

module.exports = router;
