suite('authenticate', function() {
  this.timeout('100s');
  var getBuilds = require('../lib/get_builds');
  var getLog = require('../lib/get_log');
  var parseLog = require('../lib/parse_log');

  test('setup auth', function(done) {
    getBuilds(function(err, builds) {
      var buildOrder = Object.keys(builds).sort();
      var last = builds[buildOrder[buildOrder.length - 1]];

      console.log(last);
      getLog(last.build.job_ids.pop(), function(err, log) {
        console.log(log);
        //parseLog(log.log.body);
        done();
      });

    });
  });
});
