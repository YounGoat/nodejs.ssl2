'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    // -d means to remove from admin cert store.
    let ret = tryExec(`security remove-trusted-cert -d "${certPath}"`);
    if (!ret) {
        throw new Error(`failed to distrust cert: ${certPath}`);
    }
    
    return 'certificate distrusted successfully';
}

module.exports = main;