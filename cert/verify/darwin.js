'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , confDarwin = noda.inRequire('conf/darwin')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    let ret = tryExec(`security verify-cert -c "${certPath}" -k "${confDarwin.keychain.system}"`);
    if (!ret) {
        throw new Error(`failed to verify cert: ${certPath}`);
    }
    return 'certificate verification successful';
}

module.exports = main;