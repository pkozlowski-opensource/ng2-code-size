var fs = require('fs');
var path = require('path');

var startPath = '/home/pk/work/gitrepos/gh/pkozlowski-opensource/angular/dist/js/dev/es5/angular2/src';

function includeFile(name, stats) {
    return path.extname(name) === '.js';
}

var excludeDirs = ['transform', 'mock', 'testing', 'tools'];
function includeDir(name, stats) {
    return excludeDirs.indexOf(name) === -1;
}

function getDataForADirectory(startPath) {
    var data = [];
    var fileNames = fs.readdirSync(startPath);

    fileNames.forEach(function(name) {
        var stats = fs.statSync(startPath + '/' + name);
        if (!stats.isDirectory()) {
            if (includeFile(name, stats)) {
                data.push({name: name, size: stats.size});
            }
        } else {
            if (includeDir(name, stats)) {
                data.push({name: name, children: getDataForADirectory(startPath + '/' + name)})
            }
        }
    });

    return data;
}

console.log(JSON.stringify({name: 'angular2', 'children': getDataForADirectory(startPath)}));
