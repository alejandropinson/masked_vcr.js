"use strict";
var setProperty = function (fixture, property, val) {
    var propertyFinder = new RegExp("(\"" + property + "\"\\s*:\\s*\")[\\s\\S]*?\"", 'g');
    return fixture.replace(propertyFinder, '$1' + val + '"');
};
function maskFixture(fixtureEndpoint, fixture, maskedFixtures) {
    var foundEndpoint = maskedFixtures.find(function (_a) {
        var endpoint = _a.endpoint;
        return fixtureEndpoint.includes(endpoint);
    });
    var stringifiedFixture = JSON.stringify(fixture);
    if (foundEndpoint) {
        var properties = foundEndpoint.properties;
        properties.forEach(function (property) {
            stringifiedFixture = setProperty(stringifiedFixture, property, 'YYY');
        });
        return JSON.parse(stringifiedFixture);
    }
    return fixture;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = maskFixture;
//# sourceMappingURL=maskFixture.js.map