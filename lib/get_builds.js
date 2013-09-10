var REPO = 'gaia';
var OWNER = 'mozilla-b2g';
var MASTER = 'master';

function getBuilds(callback) {
  var api = require('./api')();

  api.repos.builds({
    owner_name: OWNER,
    name: REPO,
    event_type: 'push'
  }, function(err, resp) {
    if (err) return callback(err);

    // map jobs to completed/landed builds
    var committed = {};

    // walk the list of committed things
    resp.commits.forEach(function(commit) {
      console.log(commit);
      if (commit.branch === MASTER) {
        committed[commit.id] = {
          commit: commit
        };
      }
    });

    // relate builds to commits
    resp.builds.forEach(function(build) {
      if (committed[build.commit_id]) {
        if (!build.finished_at) {
          delete committed[build.commit_id];
          return;
        }
        committed[build.commit_id].build = build;
      }
    });

    callback(null, committed);
  });
}

module.exports = getBuilds;
