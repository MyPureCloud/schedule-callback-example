/*eslint-env node */
"use strict";

// Normally, a service file would reach out to an external REST service to
//   retrieve data, but this is simply a mock imitating existing customer code.

// npm
var _ = require("lodash");
var Promise = require("bluebird");

var mod = {};

mod.createFoo = function (data) {
    data = data || {};
    var serviceResponse = new Promise(function (resolve, reject_) {
        var created = {
            id: _.uniqueId(),
            name: data.name || "skippidy",
            datatype: "foo"
        };
        return resolve(created);
    });
    return serviceResponse;
};

var exports = module.exports = mod;
