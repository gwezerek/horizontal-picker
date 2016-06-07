'use strict';

//
// app.js is the entry point for the entire client-side
// application. All of the top-level views should be
// instantiated here.

var pageconfig = require('../data/pageconfig.json');
var $ = require('jquery');
var swiper = require('swiper');

$(document).ready(function () {

  var cards = new Swiper('.state-cards', {
    slidesPerView: 1,
    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumRatio: 0.1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 50
  });

  var picker = new Swiper('.state-picker', {
    slidesPerView: 4,
    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumRatio: 0.2,
    centeredSlides: true,
    loop: true,
    loopedSlides: 50
  });

  cards.params.control = picker;
  picker.params.control = cards;

});
