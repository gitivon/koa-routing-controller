const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const exec = require('child_process').exec;

const cmd = `./node_modules/.bin/`;
const appName = 'api';
console.log(process.env.npm_lifecycle_event)
gulp.task('tsc', shell.task([
  `tsc`
]));
gulp.task('pm2-start', ['tsc'], shell.task([
  `${cmd}pm2 start ./process.config.js --watch --source-map-support`
]));
gulp.task('pm2-delete', () => {
  exec(`pm2 delete ${appName}`);
})
gulp.task('watch', () => {
  gulp.watch('./src/**/*', ['tsc'])
})
gulp.task('show-log', shell.task([
  `pm2 log ${appName}`
]));

gulp.task('dev', () => {
  runSequence(
    'pm2-delete',
    'tsc', 
    'pm2-start', 
    'watch', 
    'show-log'
  )
})

gulp.task('run', ['tsc', 'pm2-start'])
