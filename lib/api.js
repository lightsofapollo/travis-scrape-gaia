module.exports = function api() {
  var Travis = require('travis-ci');
  return new Travis({
    version: '2.0.0'
  });
}
