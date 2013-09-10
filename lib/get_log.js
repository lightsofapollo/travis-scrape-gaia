function getLog(id, callback) {
  var api = require('./api')();

  api.jobs.log({
    job_id: id
  }, function(err, resp) {
    callback(err, resp);
  });
}

module.exports = getLog;
