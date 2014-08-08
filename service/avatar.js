angular.module('iteam-dashboard').service('avatar', function (md5) {
  'use strict';

  function Avatar() {}

  function sanitizeOptions (opt) {
    opt = opt || {};
    opt.base = opt.base || 'http://www.gravatar.com/avatar/';
    opt.domain = opt.domain || '@iteam.se';
    opt.size = opt.size ? '?size=' + opt.size : '';
    return opt;
  }

  Avatar.prototype.generate = function (user, opt) {
    opt = sanitizeOptions(opt);
    return opt.base + md5.createHash((user || '') + opt.domain) + opt.size;
  };

  return new Avatar();
});