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
    logger.warn('*OpenSSL* not available.');
    logger.warn('Related functions may be not avaiable.');
}

if (!tryExec('certutil -?')) {
    logger.warn('command *certutil* not available.');
    logger.warn('Related functions may be not avaiable.');
}


