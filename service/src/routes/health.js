/*eslint-env node */
"use strict";

var mod = {};

var SERVICE_START_TIME = Date.now();
mod.healthCheck = function healthCheck(req_, res, next) {
    var upTimeMs = Date.now() - SERVICE_START_TIME;
    var health = {
        name: "Example Schedule Callback Service",
        isUp: true,
        startTime1970ms: SERVICE_START_TIME,
        startTime: (new Date(SERVICE_START_TIME)).toLocaleString(),
        uptime: {
            milliseconds: upTimeMs,
            seconds: upTimeMs/1000,
            minutes: upTimeMs/1000/60,
            hours: upTimeMs/1000/60/60,
            days: upTimeMs/1000/60/60/24
        }
    };
    res.json(200, health);
    next();
};

var exports = module.exports = mod;
