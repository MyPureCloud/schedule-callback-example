/*eslint-env node */
/*eslint-disable no-console */
"use strict";

// node
var fs = require("fs");

// npm
var _ = require("lodash");
var restify = require("restify");

// local
var fooRoutes = require("./routes/foo");
var healthRoutes = require("./routes/health");
var scheduledCallbackRoutes = require("./routes/scheduledCallback");

var server;
var IP = "127.0.0.1";
var PORT = "8009";

var startServer = function () {

    // These keys are for demo purposes and are NOT FOR PRODUCTION!!!!
    // DO NOT USE IN PRODUCTION CODE!!!
    var httpsKey = fs.readFileSync("./dist/service/https/server.key");
    var httpsCert = fs.readFileSync("./dist/service/https/server.crt");

    server = restify.createServer({
        key: httpsKey,
        certificate: httpsCert,
        rejectUnauthorized: false,
        name : "schedule-callback-example-service"
    });

    // restify tutorial:
    //     https://www.openshift.com/blogs/day-27-restify-build-correct-rest-web-services-in-nodejs

    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.CORS());

    //---------------------------------------------------------------------------
    // scheduledCallback routes (The core routes of this entire example project)
    //---------------------------------------------------------------------------
    server.post("/purecloud/scheduledcallback", scheduledCallbackRoutes.createScheduledCallback);
    server.post("/purecloud/scheduledcallback", scheduledCallbackRoutes.createScheduledCallback);
    server.post("/purecloud/scheduled-callback", scheduledCallbackRoutes.createScheduledCallback);

    //-------------------------------------------------------
    // foo routes (exmaple of existing customer site routes)
    //-------------------------------------------------------
    server.post("/foo", fooRoutes.createFoo);

    //-------------------------------------------------------------------------
    // health-check / default (common / example existing customer site routes)
    //-------------------------------------------------------------------------
    server.get("/health", healthRoutes.healthCheck);
    server.get("/health/check", healthRoutes.healthCheck);
    server.get("/health-check", healthRoutes.healthCheck);
    server.get("/healthcheck", healthRoutes.healthCheck);
    // default
    server.get("/", healthRoutes.healthCheck);

    server.listen(PORT , IP);
};

//===================
// Process Messaging
//===================
process.on("message", function (msg) {
    if (msg === "start") {
        startServer();
    }
    if (msg === "stop") {
        server.close();
        process.exit(); // end program
    }
});

// start server if not running through child_process like in gulpfile.js
//   (e.g. node service/src/app.js)
if (!process.send) {
    startServer();
    console.log(server.name + " listening at " + server.url);
}
