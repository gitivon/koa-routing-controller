const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

const cmd = `./node_modules/.bin/`;
const appName = 'api';

gulp.task('tsc', shell.task([
  `tsc`
]));

gulp.task('pm2-start', shell.task([
  `${cmd}pm2 start ./process.config.js`
]));

gulp.task('pm2-stop', shell.task([
  `${cmd}pm2 stop ${appName}`
]));

gulp.task('restart', shell.task([
  `${cmd}pm2 restart ${appName} --update-env`
]));

gulp.task('watch', () => {
  gulp.watch('./src/**/*', () => {
    runSequence(
      'tsc',
      'restart'
    );
  });
});

gulp.task('show-log', shell.task([
  `pm2 monit`
]));

gulp.task('run-app', () => {
  runSequence(
    'restart',
    'watch',
    'show-log'
  );
})