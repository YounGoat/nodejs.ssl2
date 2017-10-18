'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , logger = noda.inRequire('lib/logger')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

if (!tryExec('openssl version')) {
    logger.error('*OpenSSL* not available.');
}

if (!tryExec('security help')) {
    logger.error('command *security* not available.');
}


