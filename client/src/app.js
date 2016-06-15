/*eslint-disable no-console */
(function (global, $, ScheduleCallbackWidget) { // eslint-disable-line no-unused-vars
    "use strict";

    console.log("Starting client...");


    // get dom element with which you want to make the widget
    var $el = $(".sch-cbk-widget");
    var widget = new ScheduleCallbackWidget($el[0]);

    global.widget = widget;

})(window, $, ScheduleCallbackWidget); // eslint-disable-line no-undef
