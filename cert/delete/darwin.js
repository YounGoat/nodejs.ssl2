'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , confDarwin = noda.inRequire('conf/darwin')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath SHA-1 hash of certificate to be deleted
 */
function main(hash) {
    let ret;

    // DO NOT change arguments' positions.
    // -t means to also delete user trust settings for the certificate.
    ret = tryExec(`sudo security delete-certificate -Z ${hash} -t "${confDarwin.keychain.system}"`);

    // If there are no trust settings found, command with -t will fail.
    // So, re-try command without -t.
    if (!ret) {
        ret = tryExec(`sudo security delete-certificate -Z ${hash} "${confDarwin.keychain.system}"`);
    }

    if (!ret) {
        throw new Error(`failed to delete cert with SHA-1 hash: ${hash}`);
    }

    return 'certificate deleted successfully';
}

module.exports = main;
