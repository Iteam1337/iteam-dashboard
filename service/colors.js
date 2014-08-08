angular.module('iteam-dashboard').service('colors', function () {
  'use strict';

  function Colors () {
    this.users =  ['abo',     'acr',     'cln',     'dpn',     'jgn',     'jok',  'mln',     'ram',     'rln',     'jbn'];
    this.colors = ['#4A87EE', '#66CC33', '#FFCC00', '#444444', '#34AADC', '#FAB', '#EF4E3A', '#8A6DE9', '#50DC82', '#F0B840'];
  }

  Colors.prototype.getColor = function (user) {
    var color = this.colors[this.users.indexOf(user.toLowerCase())] || '#000';
    return color;
  };

  Colors.prototype.shade = function (color, percent) {
    var num = parseInt(color.slice(1), 16);
    var amount = Math.round(2.55 * percent);
    var R = (num >> 16) + amount;
    var G = (num >> 8 & 0x00FF) + amount;
    var B = (num & 0x0000FF) + amount;
    return "#" +
           (0x1000000 +
             (Math.max(Math.min(R, 255), 0)) * 0x10000 +
             (Math.max(Math.min(G, 255), 0)) * 0x100 +
             (Math.max(Math.min(B, 255), 0))
           ).toString(16).slice(1);
  };

  return new Colors();
});