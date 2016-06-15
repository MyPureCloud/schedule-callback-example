/*eslint-env node */
/*eslint-disable no-console */
"use strict";

// npm
var _ = require("lodash");
var request = require("request");


var requestHeaders;
// These are fake, but yours should look similar
var oauthSecret = "h7xpDbPl7dXrznG0cck00AeZpWWRPaQ8_VVbf7xCeh8";
var oauthClientId = "119c688b-3a95-4fe6-9ff7-8ee5adc1c7c7";


// module
var mod = {};
mod.getRequestHeaders = function () {
    return _.clone(requestHeaders);
};

mod.login = function () {
    var options = {
        url: "https://login.mypurecloud.com/oauth/token",
        form: {
            grant_type: "client_credentials"
        }
    };
    // this function is called after the request goes through
    var onCompletion = function (err, response_, body) {
        if(err) {
            console.error(err);
            return;
        }
        var parsedBody = JSON.parse(body);
        // These headers will be used on all future PureCloud API requests
        requestHeaders = {
            "Authorization": parsedBody.token_type + " " + parsedBody.access_token
        };
    };
    return request.post(options, onCompletion)
    .auth(oauthClientId, oauthSecret, true);
};

var exports = module.exports = mod;
