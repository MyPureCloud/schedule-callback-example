/*eslint-disable no-console */
(function (global, $, _, Promise) { // eslint-disable-line no-unused-vars
    "use strict";

    var REQUEST_TIMEOUT =  10000;

    var RestApi = function (apiRoot) {
        var self = this;

        self.apiRoot = apiRoot;

        // rest methods
        // GET, PUT, POST, DELETE, PATCH
        restMethodsMixin(self);
    };

    var queryStr = function (parameters) {
        var query = '';
        var arrayParameterCollection = {};
        var params;

        if (parameters && !_.isEmpty(parameters)) {
            // Get all parameters that are simple key-value pairs and where the value is
            // NOT an array
            params = _.reduce(parameters, function (result, value, key) {
                if ( _.isArray(parameters[key])) {
                    arrayParameterCollection[key] = value;
                } else {
                    result[key] = value;
                }
                return result;
            }, {});

            // serialize the parameters
            query = '?' + $.param(params);

            _.forIn(arrayParameterCollection, function (arr, key) {
                // convert the array values into query parameters that will result in:
                //   ?key=value1&key=value2&...
                _.each(arr, function (item) {
                    if (query === "?") {
                        query += key + "=" + item;
                    } else {
                        query += "&" + key + "=" + item;
                    }
                });
            });
        }
        return query;
    };

    var call = function (target, method, path, data, parameters) {
        var options;

        var url;
        if (path.indexOf("http") === 0) {
            // If the path argument is a full URL, then don't prefix it with the api root
            url = path;
        }
        else if (path.indexOf("/") === 0) {
            url = target.apiRoot + path;
        }
        else {
            url = target.apiRoot + "/" + path;
        }

        options = {
            type: method,
            url: url + queryStr(parameters),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'text',
            processData: false,
            timeout: REQUEST_TIMEOUT //,
            // xhrFields: {
            //     withCredentials: true
            // }
        };

        if (data) {
            options.data = JSON.stringify(data);
        }

        var jqXHR = $.ajax(options);

        var promise = Promise.cast(jqXHR)
        .then(function(response) {
            if (response) {
                return Promise.resolve(JSON.parse(response));
            } else {
                return Promise.resolve();
            }
        });

        return promise;

    };

    var restMethodsMixin = function (target) {

        /**
         * Gets a resource at the provided path.
         * @param {string} path the path to the object to get
         * @param {object} parameters a key-value object containing any query parameters
         *   to use in the request
         * @return {promise} a promise that resolves with the response from the server
         */
        target.get = function (path, parameters) {
            return call(target, "GET", path, undefined, parameters);
        };

        /**
         * Patches a resource at the provided path.
         * @param {string} path the path to the object to get
         * @param {object} data the data that should be sent to the server
         * @param {object} parameters a key-value object containing any query parameters
         *   to use in the request
         * @return {promise} a promise that resolves with the response from the server
         */
        target.patch = function (path, data, parameters) {
            return call(target, "PATCH", path, data, parameters);
        };

        /**
         * Puts a resource at the provided path.
         * @param {string} path the path to the object to get
         * @param {object} data the data that should be sent to the server
         * @param {object} parameters a key-value object containing any query parameters
         *   to use in the request
         * @return {promise} a promise that resolves with the response from the server
         */
        target.put = function (path, data, parameters) {
            return call(target, "PUT", path, data, parameters);
        },

        /**
         * Posts a resource at the provided path.
         * @param {string} path the path to the object to get
         * @param {object} data the data that should be sent to the server
         * @param {object} parameters a key-value object containing any query parameters
         *   to use in the request
         * @return {promise} a promise that resolves with the response from the server
         */
        target.post = function (path, data, parameters) {
            return call(target, "POST", path, data, parameters);
        };

        /**
         * Deletes a resource at the provided path.
         * @param {string} path the path to the object to get
         * @param {object} parameters a key-value object containing any query parameters
         *   to use in the request
         * @return {promise} a promise that resolves with the response from the server
         */
        target.delete = function (path, parameters) {
            return call(target, "DELETE", path, undefined, parameters);
        };
    };

    global.RestApi = RestApi;

})(window, $, _, Promise); // eslint-disable-line no-undef
