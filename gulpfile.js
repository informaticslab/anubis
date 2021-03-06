var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('generate-service-worker', function(callback) {
  var fs = require('fs');
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache({
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, function(error, swFileContents) {
    if (error) {
      return callback(error);
    }
    fs.writeFile(path.join(rootDir, 'service-worker.js'), swFileContents, callback);
  });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
  gulp.run('server')
  gulp.run('generate-service-worker')
  gulp.watch(['./app.js', './lib/**/*.js'], function() {
    gulp.run('server')
  })
  
  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})