/*eslint-env node */
/*eslint-disable no-console */
"use strict";

// npm
var _ = require("lodash");
var Promise = require("bluebird");

// local
var fooService = require("../services/foo");

var mod = {};

mod.createFoo = function (req, res, next) {

    fooService.createFoo(req.body)
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
