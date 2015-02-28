"use strict";

var _bluebird = require("bluebird");

let recursiveReaddir = _bluebird.coroutine(function* (dir) {
  let files = yield fs.promise.readdir(dir);
  let promises = [];
  for (let file in files) {
    promises.push(processFile(dir, files[file]));
  }
  return _.flatten((yield Promise.all(promises)), true);
});

let processFile = _bluebird.coroutine(function* (dir, fileName) {
  let ret = [];
  let absolutePath = path.join(dir, fileName);
  let stat = yield fs.promise.stat(absolutePath);
  if (stat.isDirectory()) {
    ret.push((yield recursiveReaddir(absolutePath)));
  }
  ret.push(absolutePath);
  return ret;
});

let path = require("path");
let fs = require("fs");
let _ = require("lodash");
require("songbird");

recursiveReaddir(__dirname).then(console.log);

