angular.module('iteam-dashboard').service('colors', function () {
  'use strict';

  var i = 0;
  function Colors () {
    this.users =  ['abo',     'acr',     'cln',     'dpn',     'jgn',     'jok',     'mln',     'ram',     'rln'];
    this.colors = ['#FF3B30', '#FF9500', '#FFCC00', '#8E8E93', '#34AADC', '#007AFF', '#5856D6', '#E94BC0', '#4CD964'];
  }

  Colors.prototype.getColor = function (user) {
    var color = this.colors[this.users.indexOf(user.toLowerCase())] || '#000';
    return color;
  };

  Colors.prototype.shade = function (color, percent) {
    var num = parseInt(color.slice(1), 16);
    var amt = Math.round(2.55 * percent);
    var R = (num >> 16) + amt;
    var G = (num >> 8 & 0x00FF) + amt;
    var B = (num & 0x0000FF) + amt;
    return "#" +
           (0x1000000 +
             (Math.max(Math.min(R, 255), 0)) * 0x10000 +
             (Math.max(Math.min(G, 255), 0)) * 0x100 +
             (Math.max(Math.min(B, 255), 0))
           ).toString(16).slice(1);
  };

  return new Colors();
});