'use strict';

const Core = require('@tuniu/core');
let config = require('@tuniu/light-config')(__dirname + '/app/config/');

let logo = '  ___  ______  _____ \n / _ \\ | ___ \\|_   _|\n/ /_\\ \\| |_/ /  | |  \n|  _  ||  __/   | |  \n| | | || |     _| |_ \n\\_| |_/\\_|     \\___/  ';

let bootstrap = Core.bootstrap(config, {logo});
bootstrap.start();

module.exports = bootstrap;