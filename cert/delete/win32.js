'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , if2 = require('if2')
    , noda = require('noda')
    , overload2 = require('overload2')

    /* in-package */
    , confWin32 = noda.inRequire('conf/win32')
    , logger = noda.inRequire('lib/logger')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath SHA-1 hash of certificate to be deleted
 */
function main(hash) {
    let ret;

    // Pre-defined store names includes:
    // * Root - to store trusted root certificate authority.
    // * CA - to store intermediate certificate authority, instead of trusted root ones.
    // * My
    // Run `certutil -store -?` for more details.

    ret = tryExec(`certutil -delstore CA "${hash}"`);
    if (!ret) {
        throw new Error(`failed to delete cert from CA store: ${hash}`);
    }

    ret = tryExec(`certutil -delstore Root "${hash}"`);
    if (!ret) {
        throw new Error(`failed to delete cert from Root store: ${hash}`);
    }

    return 'certificate deleted successfully';
}

module.exports = main;