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
