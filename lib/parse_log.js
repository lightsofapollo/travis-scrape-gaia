require('colors');
var util = require('util');

var INTEGRATION_REGEX_PASS = /([0-9]+) passing/;
var INTEGRATION_REGEX_FAILING = /([0-9]+) failing/;

function parseIntegration(lines) {
  var output = {};

  lines.forEach(function(line) {
    var pass = INTEGRATION_REGEX_PASS.exec(line);
    var fail = INTEGRATION_REGEX_FAILING.exec(line);
    if (pass) {
      output.passed = parseInt(pass[0], 10);
    }

    if (fail) {
      output.failed = parseInt(fail[0], 10);
    }
  });

  output.failed = output.failed || 0;

  return output;
}

var UNIT_LINE = /tests (failed|complete)/m;
var UNIT_LINE_PASS = /^([0-9]+)/m;

function parseUnit(lines) {
  var unitTest;
  lines.forEach(function(line) {
    var exec = UNIT_LINE.exec(line);
    if (exec) {
      unitTest = exec.input.trim();
    }
  });

  unitTest = UNIT_LINE_PASS.exec(unitTest);

  return {
    passed: parseInt(unitTest[0], 10),
    failed: 0
  };
}

/**
 * Parses the body of the travis log output.
 */
function parseLog(body) {
  var output = {};
  var lines = body.stripColors.split('\n');

  output.unit = parseUnit(lines);
  output.integration = parseIntegration(lines);

  return output;
}

module.exports = parseLog;
