"use strict";
require("babel/polyfill");
var path = require("path");
var fs = require("fs");
var _ = require("lodash");
require("songbird");

function recursiveReaddir(dir) {
  var files, promises;
  return regeneratorRuntime.async(function recursiveReaddir$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return fs.promise.readdir(dir);

      case 2:
        files = context$1$0.sent;
        promises = files.map(function callee$1$0(file) {
          var absolutePath, stat;
          return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                absolutePath = path.join(dir, file);
                context$2$0.next = 3;
                return fs.promise.stat(absolutePath);

              case 3:
                stat = context$2$0.sent;

                if (!stat.isDirectory()) {
                  context$2$0.next = 8;
                  break;
                }

                context$2$0.next = 7;
                return recursiveReaddir(absolutePath);

              case 7:
                return context$2$0.abrupt("return", context$2$0.sent);

              case 8:
                return context$2$0.abrupt("return", absolutePath);

              case 9:
              case "end":
                return context$2$0.stop();
            }
          }, null, this);
        });
        context$1$0.next = 6;
        return Promise.all(promises);

      case 6:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", _.flatten(context$1$0.t0));

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
}

recursiveReaddir(__dirname).then(console.log);

// console.log(absolutePath)

