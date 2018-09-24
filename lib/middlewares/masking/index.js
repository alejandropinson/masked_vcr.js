"use strict";
var decompress_1 = require("../proxy/decompress");
var getProperty = function (obj, path) {
    if (path.length === 1) {
        if (obj.constructor === Array) {
            console.log(obj[0][path[0]]);
            return obj[0][path[0]];
        }
        return obj[path[0]];
    }
    else {
        path.unshift();
        if (obj.constructor === Array) {
            getProperty(obj[0][path[0]], path);
        }
        getProperty(obj[path[0]], path);
    }
};
function mask(originalURL, proxyRes, resources) {
    var foundEndpoint = resources.find(function (_a) {
        var endpoint = _a.endpoint;
        return originalURL.includes(endpoint);
    });
    if (foundEndpoint) {
        var path = foundEndpoint.path;
        var x = '';
        proxyRes.pipe(decompress_1.default(proxyRes.headers['content-encoding'])).pipe(x);
        console.log(x);
        getProperty(proxyRes, path).set('XXX');
        return proxyRes;
    }
    return proxyRes;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mask;
//# sourceMappingURL=index.js.map