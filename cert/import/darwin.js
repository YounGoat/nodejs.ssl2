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
    let ret = tryExec(`sudo security import "${certPath}" -k "${confDarwin.keychain.system}"`);
    if (!ret) {
        throw new Error(`failed to import cert into system keychain: ${certPath}`);
    }

    return 'certificate imported successfully';
}

module.exports = main;