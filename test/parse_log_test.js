suite('parse log', function() {
  var assert = require('assert');
  var fs = require('fs');
  var parseLog = require('../lib/parse_log');

  suite('pass', function() {
    var fixture = fs.readFileSync(__dirname + '/fixtures/pass.txt', 'utf8');

    var subject;
    setup(function() {
      subject = parseLog(fixture);
    });

    test('unit tests', function() {
      assert.deepEqual(subject, {
        unit: { passed: 4954, failed: 0 },
        integration: { passed: 17, failed: 0 }
      });
    });
  });
});
