/*eslint-env node */
/*eslint-disable no-console*/
"use strict";

// node
var childProcess = require("child_process");

// npm
var gulp = require("gulp");
var gulpWatch = require("gulp-watch");
var gulpConnect = require("gulp-connect");

var del = require("del");

// local
var SERVICE_APP_PATH = "./service/src/app";

//--------------
// client tasks
//--------------
gulp.task("client-build", function () {
    del.sync("dist/client");
    var stream = gulp.src(
        "client/src/**/*",
        { base: "client/src" }
    )
    .pipe(gulp.dest("dist/client"));
    return stream;
});

gulp.task("client-watch", function () {
    gulpWatch([
        "client/**/*"
    ], function () {
        gulp.start("client-build", function () {
            gulpConnect.reload();
            console.log("Client hosting server reloaded: https://localhost:8008/");
        });
    });
});

gulp.task("client", ["client-build"], function () {
    gulpConnect.server({
        root: "dist/client",
        livereload: true,
        https: true,
        port: 8008
    });
    gulp.start("client-watch");
    console.log("Client web-host started - Go to the following url in your browser to load the client:");
    console.log("    https://localhost:8008/");
});

//---------------
// service-tasks
//---------------
gulp.task("service-build", function () {
    del.sync("dist/service");
    var stream = gulp.src(
        "service/src/**/*",
        { base: "service/src" }
    )
    .pipe(gulp.dest("dist/service"));
    return stream;
});

var serviceApp;
var startService = function () {
    if (serviceApp) {
        serviceApp.send("stop");
    }
    serviceApp = childProcess.fork(SERVICE_APP_PATH, {
        // cwd: process.cwd()
    });

    serviceApp.send("start");
};

gulp.task("service-watch", function () {
    gulpWatch([
        "service/**/*"
    ], function () {
        gulp.start("service-build", function () {
            startService();
            console.log("Service reloaded: https://localhost:8009/");
        });
    });
});

gulp.task("service", ["service-build"], function () {
    startService();
    gulp.start("service-watch");
    console.log("Service REST app started - Go to the following url in your browser to test it:");
    console.log("    https://localhost:8009/");
});

//------------
// start task
//------------
gulp.task("start", ["service", "client"]);

//---------------------
// default / help task
//---------------------
gulp.task("default", function () {
    var taskInfo = [];
    taskInfo.push({
        name: "client",
        description: "Runs the client (customer site)."
    });
    taskInfo.push({
        name: "service",
        description: "Runs the rest service to interact with PureCloud."
    });
    taskInfo.push({
        name: "start",
        description: "Runs both the rest service and the web client."
    });
    console.log("Usage: ");
    console.log("    gulp <task-name>");
    console.log();
    console.log("Tasks:");
    taskInfo.forEach(function (info) {
        console.log("    "+info.name);
        console.log("        "+info.description);
    });
});
