/*eslint-env node */
"use strict";

// This module delegates to the npm module named "request" after first ensuring
//   that you are authenticated with PureCloud.

// npm
var _ = require("lodash");
var Promise = require("bluebird");
var request = require("request");
var requestAsync = Promise.promisify(request);

// local
var pureCloudAppLogin = require("./pureCloudAppLogin");


// for production purecloud, this should be "https://api.mypurecloud.com/api/v2"
var API_ROOT = "https://api.inindca.com/api/v2";

// This login will eventually expire so you may want to add in some retry login
//   logic if a request fails due to no longer being unauthenticated.
pureCloudAppLogin.login();


// module
var mod = {
    // returns a promise
    get: function (route) {
        var options = {
            method: "GET",
            url: API_ROOT + route,
            headers: pureCloudAppLogin.getRequestHeaders()
        };
        return requestAsync(options);
    },
    put: function (route, data) {
        var options = {
            method: "PUT",
            url: API_ROOT + route,
            headers: pureCloudAppLogin.getRequestHeaders(),
            'content-type': 'application/json',
            json: true,
            body: data
        };
        return requestAsync(options);
    },
    post: function (route, data) {
        var options = {
            method: "POST",
            url: API_ROOT + route,
            headers: pureCloudAppLogin.getRequestHeaders(),
            'content-type': 'application/json',
            json: true,
            body: data
        };
        return requestAsync(options);
    },
    delete: function (route) {
        var options = {
            method: "DELETE",
            url: API_ROOT + route,
            headers: pureCloudAppLogin.getRequestHeaders()
        };
        return requestAsync(options);
    },
    patch: function (route, data) {
        var options = {
            method: "PATCH",
            url: API_ROOT + route,
            headers: pureCloudAppLogin.getRequestHeaders(),
            'content-type': 'application/json',
            json: true,
            body: data
        };
        return requestAsync(options);
    }
};

var exports = module.exports = mod;
