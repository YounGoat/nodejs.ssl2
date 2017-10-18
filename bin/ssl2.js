#!/usr/bin/env node

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , minimist = require('minimist')
    , noda = require('noda')

    /* in-package */
    , boot = noda.inRequire('scripts/boot')
    , logger = noda.inRequire('lib/logger')
    , ignores = noda.inRequire('ignores')
    ;
    
const args = minimist(process.argv.slice(2));

let names = args._;
let command = null;
let status = 0;

if (args._.length == 0) {
    command = noda.inRequire('help');
    status = 1;
}
else if (ignores.includes(args._[0])) {
    // DO NOTHING.
}
else {
    let remainder = [];
    do {
        command = noda.inRequire(names.join('/'), true);
        if (!command) {
            remainder.unshift(names.pop());
        }
    } while (!command && names.length > 0);
    args._ = remainder;
}

if (command) {
    try {
        let ret = command(args);
        if (typeof ret != 'undefined') {
            console.log(ret);
        }
    } catch(ex) {
        logger.error(`command failed: ${names.join(' ')}`);
        if (args.verbose) {
            console.log(ex);
        }
        else {
            logger.error(ex.message);
        }
        status = 1;
    }
}
else {
    logger.error(`sub command *${args._[0]}* not found`);
    status = 1;
}

process.exit(status);
