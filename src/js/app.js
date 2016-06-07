'use strict';

//
// app.js is the entry point for the entire client-side
// application. All of the top-level views should be
// instantiated here.

var pageconfig = require('../data/pageconfig.json');
var $ = require('jquery');
var slick = require('slick-carousel');
var swiper = require('swiper');

// $('.slick-ol').slick({

//   // the magic
//   responsive: [{

//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         infinite: true
//       }

//     }, {

//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         dots: true
//       }

//     }, {

//       breakpoint: 300,
//       settings: 'unslick' // destroys slick

//     }]
// });




$('.slick-ol').slick({
  arrows: false,
  centerMode: true,
  variableWidth: true,
  slidesToShow: 3,
  centerPadding: '100px'
});
