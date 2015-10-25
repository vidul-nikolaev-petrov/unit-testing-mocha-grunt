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
