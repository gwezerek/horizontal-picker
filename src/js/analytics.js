'use strict';
var interactiveName = require('../../package').name;

var sendMap = {};

module.exports = {

    /**
     * send a custom event to google analytics
     * sends optional parameters of page and title to allow for easy filtering in analytics views
     * overrides default GA behavior to not send search params with 'page' option
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    sendEvent: function(action, label, value) {
        window.ga('send', 'event',
          interactiveName, action, label, value,
          { 'page': '/' + interactiveName, 'title': interactiveName }
        );
    },

    _getIdentifier: function(action, label) {
        return action + ':' + label;
    },

    /**
     * sendEventOnce is meant for events like hover that we want to record
     * but don't necessarily want to overload the network with.
     *
     * Calling it N times with the same parameters will only ever send that event once per session.
     */
    sendEventOnce: function(action, label, value) {

        var self = this;
        if(typeof(sendMap[self._getIdentifier(action, label, value)]) === 'undefined') {
            self.sendEvent(action, label, value);
            sendMap[self._getIdentifier(action, label, value)] = 1;
        }
        sendMap[self._getIdentifier(action, label, value)]++;
    },

    /**
     * send a pageview event to google analytics
     * overrides default GA behavior to not send search params with 'page' option
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
     */
    pageview: function() {
      window.ga('send', 'pageview', {
        'page': '/' + interactiveName,
        'title': interactiveName
      });
    }
};
