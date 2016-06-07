// define pymChild
var pym = require('pym.js');
var interactiveName = require('../../package').name;
var pymChild = new pym.Child({id: 'framediv'});

// synchronize url of pymChild with pymParent
window.onhashchange = function () {
  pymChild.sendMessage('urlHash', window.location.hash);
};

module.exports = pymChild;
