/* jshint node:true */
// var RSVP = require('rsvp');

// For details on each option run `ember help release` or check https://github.com/lytics/ember-cli-release#options.
module.exports = {
  annotation: "Release %@",
  message: "Bumped version to %@",
  manifest: [ 'package.json' ],
  // Don't publish to npm
  publish: false,
};