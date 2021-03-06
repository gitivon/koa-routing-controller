const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const exec = require('child_process').exec;

const cmd = `./node_modules/.bin/`;
const appName = 'api';

let pm2_args = '--watch --source-map-support';
let env = process.env.NODE_ENV || 'dev';

// 设置服务器 log 目录
if(process.env.npm_lifecycle_event.indexOf('run') >= 0) {
  pm2_args += ` --log-date-format=\"YYYY-MM-DD HH:mm:ss.SSS\" -i 1 -o /opt/tuniu/logs/app/${appName}-out.log -e /opt/tuniu/logs/app/${appName}-error.log`;
  env = process.env.npm_lifecycle_event.split(':')[1];
}
const pm2Cmd = `${cmd}pm2 start ./bin/pm2.${env}.config.js --name "${appName}" ${pm2_args}`

gulp.task('tsc', shell.task([
  `tsc`
]));
gulp.task('pm2-start', ['tsc'], () => {
  exec(pm2Cmd)
});
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