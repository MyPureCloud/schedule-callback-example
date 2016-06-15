/*eslint-disable no-console */
(function (global, $, _, Promise, RestApi) { // eslint-disable-line no-unused-vars
    "use strict";

    // This URI should be the URI to your website's back-end service.  In this
    //   case it is the service we have created locally.
    var serviceApi = new RestApi("https://127.0.0.1:8009");

    // Schedules a callback with the PureCloud Api
    var scheduleCallback = function (scheduledCallbackData) {
        return serviceApi.post("/purecloud/scheduledcallback", scheduledCallbackData)
        .then(function (data) {
            console.log("Created a scheduledCallback!", data);
        })
        .catch(function (err) {
            console.log("No scheduledCallback for you!", err);
        });
    };

    var getBottomRightCoordinates = function (el) {
        var $el = $(el);
        var offset = $el.offset();
        var x = offset.left + $el.outerWidth();
        var y = offset.top + $el.outerHeight();
        var res = {
            x: x,
            y: y
        };
        return res;
    };

    var mergeDateAndTime = function (date, time) {
        var iso = new Date(date + " " + time).toISOString();
        return iso;
    };

    var getScheduleCallbackDataFromDialogDomElement = function ($dialog) {
        var name = $dialog.find(".sch-cbk-dialog-name").val();
        var date = $dialog.find(".sch-cbk-dialog-date").val();
        var time = $dialog.find(".sch-cbk-dialog-time").val();
        var dateTime = mergeDateAndTime(date, time);
        var number = $dialog.find(".sch-cbk-dialog-number").val();

        var data = {
            // name of the individual we are calling back
            callbackUserName: name,
            // time at which we will callback the individual
            callbackScheduledTime: dateTime,
            // number(s) to try to call to reach individual
            callbackNumbers: [ number ],
            // country code (for dialing purposes)
            countryCode: "US",
            // queueId of the queue onto which this callback will be placed
            queueId: "ae82e4e6-898e-2227-8979-49c9a4fbc1f8",
            // Should use default script if `null`
            scriptId: null
        };
        scheduleCallback(data);
    };

    var ScheduleCallbackWidget = function (domEl) {
        var self = this;

        self.widget = domEl;

        self.$widget = $(self.widget);

        self.toggleShowDialog = function () {
            var pos = getBottomRightCoordinates(self.$widget);
            pos.x -= self.$dialog.outerWidth();
            self.$dialog.css("top", pos.y).css("left", pos.x);
            self.$dialog.toggle();
        };

        var id = _.uniqueId();

        self.$dialog = $('<div class="sch-cbk-dialog" id="sch-cbk-dialog'+id+'"/>');
        self.$dialog.append('<span class="sch-cbk-dialog-title">Schedule a support call!</span>');

        self.$dialog.append('<span class="sch-cbk-dialog-label">Name to ask for:</span>');
        self.$dialog.append('<input type="text" class="sch-cbk-dialog-input sch-cbk-dialog-name"/>');

        self.$dialog.append('<span class="sch-cbk-dialog-label">Date to call:</span>');
        self.$dialog.append('<input type="date" class="sch-cbk-dialog-input sch-cbk-dialog-date"/>');

        self.$dialog.append('<span class="sch-cbk-dialog-label">Time to call:</span>');
        self.$dialog.append('<input type="time" class="sch-cbk-dialog-input sch-cbk-dialog-time"/>');

        self.$dialog.append('<span class="sch-cbk-dialog-label">Phone Number (10-digit):</span>');
        self.$dialog.append('<input type="text" class="sch-cbk-dialog-input sch-cbk-dialog-number"/>');

        var $controls = $('<div class="sch-cbk-dialog-ctls"></div>');
        var $cancel = $('<div class="sch-cbk-dialog-ctls-cancel">Cancel</div>');
        $cancel.on("click", self.toggleShowDialog);
        var $confirm = $('<div class="sch-cbk-dialog-ctls-confirm">Confirm</div>');

        $confirm.on("click", function () {
            getScheduleCallbackDataFromDialogDomElement(self.$dialog);
            self.toggleShowDialog();
        });

        $controls.append($cancel);
        $controls.append($confirm);
        self.$dialog.append($controls);
        self.$dialog.hide(0);

        $("body").append(self.$dialog);

        self.$widget.on("click", self.toggleShowDialog);
    };

    // Example of scheduling a callback from customer's site with static data
    //   (no information from client site fields, like phone number and name).
    global.scheduleCallbackWithStaticData = function () {
        return global.scheduleCallback({
            // name of the individual we are calling back
            callbackUserName: "John Smith",
            // time at which we will callback the individual
            callbackScheduledTime: new Date(Date.now() + 1000*60*60), // 1 hr into the future
            // number(s) to try to call to reach individual
            callbackNumbers: [ "3173449777" ],
            // country code (for dialing purposes)
            countryCode: "US",
            // queueId of the queue onto which this callback will be placed
            queueId: "ae82e4e6-989e-4427-8979-49c9a3fbc1f8",
            // Should use default script if `null`
            scriptId: null
        });
    };

    global.ScheduleCallbackWidget = ScheduleCallbackWidget;



})(window, $, _, Promise, RestApi); // eslint-disable-line no-undef
