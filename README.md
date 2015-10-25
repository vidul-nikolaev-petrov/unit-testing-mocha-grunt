Quick HOWTO: Unit Testing with Mocha and Grunt
======

Step 1
----------
In the root directory of your project create `package.json` with the following content:

```
{
    "name": "helpers",
    "description": "helpers testing",
    "version": "0.0.1",
    "devDependencies": {
        "expect.js": "^0.3.1",
        "grunt": "latest",
        "grunt-mocha-cli": "^2.0.0",
        "phantomjs": "^1.9.8"
    }
}
```

Step 2
----------
Install the depenedencies:
```
npm install
npm install -g grunt
# if the above command requires root access, prepend "sudo" 
```

Step 3
----------
In the root directory of your project create `Gruntfile.js` with the following content:
```
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochacli: {
            all: ['tests/*/*/*.js'] // the path to the tests
        }
    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.registerTask('default', ['mochacli']);
};
```


Step 4
----------
Write and run the unit tests. Sample code:

* The code to be tested: create the directory `./helpers/geo/` and the file
`common.js` in it with this content:
```
// get the distance between two geolocations
var radius$ = 6371; // the Earth radius

function getDistance(location1, location2) {
    var lat1 = deg2rad(location1.latitude),
        lng1 = deg2rad(location1.longitude),
        lat2 = deg2rad(location2.latitude),
        lng2 = deg2rad(location2.longitude),
        distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2));

    // distance in human-readable format:
    return radius$ * distance;
};

function deg2rad(angle) {
    return angle * .017453292519943295; // (angle / 180) * Math.PI
}

function rad2deg(angle) {
    return angle * 57.29577951308232; // angle / Math.PI * 180
}

module.exports = {getDistance: getDistance};
```

* The unit tests for the code: create the directory `./tests/helpers/geo` and the file
`common.js` in it with this content:
```
describe('GeoLocation', function () {
    var Geo = require('../../../helpers/geo/common.js'),
        expect = require('expect.js'),
        data = {
            london: {
                latitude: 51.507351,
                longitude: -0.127758,
            },
            moscow: {
                latitude: 55.755826,
                longitude: 37.617300,
            },
            paris: {
                latitude: 48.858093,
                longitude: 2.294694,
            },
            plovdiv: {
                latitude: 42.1417875,
                longitude: 24.7493919,
            },
            tokyo: {
                latitude: 35.689487,
                longitude: 139.691706,
            }
        };

    it('estimate the correct distance between two geolocations', function () {
        var plovdiv_london = Geo.getDistance(data.plovdiv, data.london),
            plovdiv_moscow = Geo.getDistance(data.plovdiv, data.moscow),
            plovdiv_paris = Geo.getDistance(data.plovdiv, data.paris),
            plovdiv_tokyo = Geo.getDistance(data.plovdiv, data.tokyo),
            paris_london = Geo.getDistance(data.paris, data.london);

        expect(round(plovdiv_london)).to.equal(2145);
        expect(round(plovdiv_moscow)).to.equal(1775);
        expect(round(plovdiv_paris)).to.equal(1894);
        expect(round(plovdiv_tokyo)).to.equal(9129);
        expect(round(paris_london)).to.equal(341);

        function round(number) {
            return +parseFloat(number).toFixed(0);
        }
    });
});
```

Run `grunt` which should return:

> Running "mochacli:all" (mochacli) task
>
> GeoLocation
> 
>  ✓ estimate the distance between two geolocations
>
>
> 1 passing (23ms)
>
> Done, without errors.

This is all.