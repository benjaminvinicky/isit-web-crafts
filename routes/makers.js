var express = require('express');
var router = express.Router();
var walker = require('isit-site-tools-vinicky').walker;
var walkRunner = require('isit-site-tools-vinicky').walkRunner;
var imagesTest = require('isit-site-tools-vinicky').imagesTest;
var fs = require('fs');
var utils = require('isit-code-vinicky').elfUtils;
var imageHelp = require('isit-site-tools-vinicky').imageHelp;
var elfLog = require('isit-code-vinicky').elvenLog('makers');
elfLog.setLevel(elfLog.logLevelDetails);

const config = require('isit-code-vinicky').elfConfig;

router.get('/makeHtml', function(request, response) {
    'use strict';
    response.render('make-html', {
        title: 'Make HTML',
        author: 'Charlie Calvert'
    });
});

router.get('/pixPicker', function(request, response) {
    'use strict';
    response.render('pix-picker', {
        title: 'Pix Picker',
        author: 'Charlie Calvert'
    });
});

router.get('/get-config', function(req, res) {
    'use strict';
    //var user = 'calvert';
    config.loadAsync()
        .then(function(configuration) {
            res.status(200).send(configuration);
        })
        .catch(function(err) {
            throw err;
        });
});

router.get('/config', function(request, response) {
    'use strict';
    config.useLocalConfig = false;
    var user = 'calvert';
    config.loadAsync()
        .then(function(configData) {
            elfLog.nano('CONFIG DATA: ', JSON.stringify(configData, null, 4));
            var baseDir = config.get('users', user, 'base-dir');
            var siteDirs = config.get('users', user, 'site-dirs');
            var mostRecentDate = config.get('users', user, 'most-recent-date');
            var destinationDirs = config.get('users', user, 'destination-dirs');
            var configSummary = {
                'baseDir': baseDir,
                'mostRecentDate': mostRecentDate,
                'siteDirs': siteDirs,
                'destinationDirs': destinationDirs
            };
            response.status(200).send(configSummary);
        })
        .catch(function(err) {
            throw err;
        });
});

router.get('/makeImages', function(request, response) {
    imagesTest.run()
        .then(function(reports) {
            reports.forEach(function(report) {
                console.log(report.markdownFileWithImages);
            });
            response.send(reports);
        })
        .catch(function(err) {
            response.send(err);
        });
});

router.get('/makeMarkdown', function(request, response) {
    'use strict';
    console.log('makeMarkdown route called');
    var makeMarkdown = new imageHelp.MakeMarkdown();

    makeMarkdown.loadAndRun(function(report) {
        if (report.spacesInFileNames) {
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('You have spaces in one or more file names.');
            console.log('The problem is probably in your images directory.');
            console.log('FileNames or Directories with spaces in their ');
            console.log('names is not a good idea. Run this command in ');
            console.log('the offending directory and then restart:');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('find -name "* *" -type f | rename "s/ /_/g"');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            response.send({
                error: 'spaces in file name'
            });
        } else if (report.markdownFileExists) {
            response.send({
                error: 'Markdown file exists: ' + report.markdownFileWithImages
            });
        } else {
            response.send({
                'success': 'makeMarkdown',
                'report': report
            });
        }
        console.log(report);
    });
});

router.get('/deleteMarkdown', function(request, response) {
    'use strict';
    var makeMarkdown = new imageHelp.MakeMarkdown();
    makeMarkdown.deleteMarkdownFileWithImages(function(result) {
        console.log(result);
        response.send({
            'result': 'file deleted'
        });
    });
});

router.get('/walkFaster', function(req, res) { 'use strict';
    var myresponse = { "result" : "route03" + req.query};
    return res.status(200).send(myresponse);
});

router.get('/walk', function(req, res, next) {
    'use strict';
    const user = 'calvert';
    walkRunner( user, req.query.index, false)
        .then(function(configSummary) {
            res.status(200).send(configSummary);
        })
        .catch(function(err) {
            throw err;
        });
});

router.get('/walk-old', function(request, response) {
    'use strict';
    console.log('In walk', request.query);
    var directoryToWalk = request.query.directoryToWalk;
    var destinationDir = request.query.destinationDir;
    var highlight = request.query.highlight || true;
    var bootswatchTheme = request.query.theme || 'darkly';
    var mostRecentDate = request.query.mostRecentDate;

    fs.access(directoryToWalk, fs.F_OK | fs.R_OK, function(err) {
        if (err) {
            console.log('Could not find', directoryToWalk);
            response.sendStatus(401);
        } else {
            console.log('start', request.query, directoryToWalk);
            walker.buildFileReport(directoryToWalk, '.md', mostRecentDate, function(report) {
                console.log('build');
                var directories = walker.getDirectories(report);
                var settings = {
                    report: report,
                    directoryToWalk: directoryToWalk,
                    destinationDir: destinationDir,
                    directories: directories,
                    highlight: highlight === 'true',
                    testRun: false,
                    bootswatch: bootswatchTheme
                };
                try {
                    walker.makePage(settings, function(masterListOfNames, htmlFilesWritten) {
                        response.send({
                            result: 'success',
                            destinationDir: destinationDir,
                            directories: directories,
                            masterListOfNames: masterListOfNames,
                            htmlFilesWritten: htmlFilesWritten
                        });

                        utils.writeFile('RunReport.txt', JSON.stringify(report, null, 4), function() {
                            elfLog.log(elfLog.logLevelInfo, 'Wrote report to: RunReport.txt');
                        });
                    });

                } catch (e) {
                    console.log('The error:', e);
                    // response.sendStatus(500);
                    response.status(500).send(e.toString());
                }
            });
        }
    });

});

module.exports = router;