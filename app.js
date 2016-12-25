#!/usr/bin/env node

/**
 * https://github.com/tj/commander.js/
 */

var package = require('./package.json');
var program = require('commander');
var actions = require('./src/action');

try {
    // console.log("version:", package.version);
    // console.log(program);
    program.version(package.version)
    .usage('cup [option]')

    .option('-c, --config', 'use config to run the server', actions.runConfig)
    .option('-c <path>', 'use config and indicate path to run the server', actions.help)
    .option('-v --version', 'show version number', actions.version)
    .option('-l --list', 'list out all server', actions.list);

    program
    .command('run')
    .description('use current path to run a server application')
    .action(actions.runServer)

    // This command is excute to stop someone server progress.
    program.
    command('stop <serverId>')
    .description('stop a server application.')
    .action(actions.stopServer)

    // This command is excute to stop someone server progress.
    program.command('stop all')
    .description('stop all servers')
    .action(actions.stopAll)

    // This command is excute to stop someone server progress.
    program.command('restart <id>')
    .description('restart a server application')
    .action(actions.restart)

    program.on('--help', function() {
        console.log(' Examples:');
        console.log('');
        console.log('$ cup --help');
        console.log('$ cup -h');
        console.log('');
    });

    program.parse(process.argv);

} catch(e) {
    console.error("Exec error.", e);
}
