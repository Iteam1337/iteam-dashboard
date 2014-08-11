angular.module('iteam-dashboard').service('colors', function () {
  'use strict';
  function hue(string) {
    return Math.round(string.split('').reduce(function (numb, character, index) {
      numb = (numb * character.charCodeAt(0) * (index + 0.7));
      return numb;
    }, 1) % 360);
  }
  function component(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  function hsbToHEX(h) {
    h = Math.max(1, Math.min(360, h)) / 60;
    var s = saturation;
    var b = brightness;
    var i = Math.floor(h);
    var f = h - i;
    var p = b * (1 - s);
    var q = b * (1 - s * f);
    var t = b * (1 - s * (1 - f));
    var R, G, B;
    switch (i) {
       case 0: R = b; G = t; B = p; break;
       case 1: R = q; G = b; B = p; break;
       case 2: R = p; G = b; B = t; break;
       case 3: R = p; G = q; B = b; break;
       case 4: R = t; G = p; B = b; break;
      default: R = b; G = p; B = q;
    }
    return '#' +
      component(Math.round(R * 255)) +
      component(Math.round(G * 255)) +
      component(Math.round(B * 255));
  }
  function generateColor(string) {
    return hsbToHEX(hue(string));
  }
  function sanitizeValue(val) {
    return Math.max(1, Math.min(100, val)) / 100;
  }

  var saturation = sanitizeValue(94);
  var brightness = sanitizeValue(90);

  function Colors () {
    this.users =  {
      // Must be a proper HEX code.
      'acr': '#07AFCA',
      'abo': '#000',
      'apn': '#918C8E',
      'cln': '#001337',
      'dpn': '#666',
      'hrn': '#55ae3a',
      'jbn': '#0ff1ce',
      'jok': '#FAB',
      'mrs': '#830309',
      'ram': '#bada55',
      'rfn': '#8ab362',
      'rln': '#8fe991',
      'sru': '#e63132',
      'mln': '#BA1B0A'
    };
  }

  Colors.prototype.getColor = function (user) {
    user = (user || '').toLowerCase();
    var predefined = this.users[user];
    if (!!predefined) {
      return predefined;
    }
    return generateColor(user);
  };

  Colors.prototype.shade = function (color, percent) {
    function addTwice(string, value) {
      return string + value + value;
    }
    color = color.slice(1);
    var length = color.length;
    if (length === 3) {
      color = color.split().reduce(addTwice, '');
    }
    var num = parseInt(color, 16);
    var amount = Math.round(2.55 * percent);
    var R = (num >> 16) + amount;
    var G = (num >> 8 & 0x00FF) + amount;
    var B = (num & 0x0000FF) + amount;
    return '#' +
           (0x1000000 +
             (Math.max(Math.min(R, 255), 0)) * 0x10000 +
             (Math.max(Math.min(G, 255), 0)) * 0x100 +
             (Math.max(Math.min(B, 255), 0))
           ).toString(16).slice(1);
  };

  return new Colors();
});