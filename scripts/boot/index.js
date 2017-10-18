/**
 * Check if the environmemnt is satisfying for current package.
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , os = require('os')
    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , logger = noda.inRequire('lib/logger')
    ;

try {
    noda.osRequire(__dirname);
}
catch (ex) {
    if (ex.code === 'PLATFORM_NOT_SUPPORTED') {
        logger.warn(`current platform not fully supported: ${os.platform()}`);
        logger.warn('Some functions may be not available.');
    }
}