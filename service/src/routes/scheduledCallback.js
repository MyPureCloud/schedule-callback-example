/*eslint-env node */
/*eslint-disable no-console */
"use strict";

// local
var scheduledCallbackService = require("../services/pureCloud/scheduledCallback");

// module
var mod = {};
mod.createScheduledCallback = function (req, res, next) {

    scheduledCallbackService.createScheduledCallback(req.body)
    .then(function (data) {
        res.json(200, data);
    })
    .catch(function (err) {
        var result = {
            message: "Upstream Service Error",
            error: err
        };
        res.json(502, result);
        console.error("Upstream Service Error", err);
    });
    next();
};

var exports = module.exports = mod;
