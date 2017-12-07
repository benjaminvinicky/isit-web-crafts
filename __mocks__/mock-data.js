const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                foo: 'url-mock-bar',
                file: 'url-mock-api.js'
            };

        case '/makers/config':
            const configSummary = {
                'base-dir': '/home/bcuser/',
                'bootswatch': 'cosmo',
                'most-recent-date': '2017-08-14',
                'highlight': true,
                'siteDirs': [
                    'Documents/AllTest',
                    'Git/CloudNotes/Isit320'
                ],
                'destinationDirs': [
                    '/var/www/html/AllSite/',
                    '/home/charlie/Git/CloudNotes/Isit320/'
                ],
                'destination-dirs-extra': [{
                    'base': '/var/www/html/',
                    'extra': ''
                }, {
                    'base': '/var/www/html/Assignments/',
                    'extra': 'Assignments'
                }]
            };
            return configSummary;

        case '/makers/walk?siteDirsIndex=1':
            const walkResult = {
                result: 'success',
                baseDir: undefined,
                mostRecentDate: undefined,
                destinationDir: '/home/charlie/Git/CloudNotes/tips/',
                directories: ['/home/charlie/Git/CloudNotes/Tips'],
                masterListOfNames: ['* [Summary.html](Summary.html)'],
                htmlFilesWritten:
                    ['/home/charlie/Git/CloudNotes/tips/Summary.html',
                        '/home/charlie/Git/CloudNotes/tips/master-list.html']
            };

            return walkResult;

        default:
            return {};
    }
};

export default getData;