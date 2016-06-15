/*eslint-env node */
"use strict";

// local
var pureCloudApi = require("./pureCloudApi");

// module
var mod = {};
mod.createScheduledCallback = function (scheduleCallbackData) {
    return pureCloudApi.post("/conversations/callbacks", scheduleCallbackData);
};

var exports = module.exports = mod;
