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
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    // CA is certificate store name.
    // Pre-defined store names includes:
    // * Root - to store trusted root certificate authority.
    // * CA - to store intermediate certificate authority, instead of trusted root ones.
    // * My
    // Run `certutil -store -?` for more details.

    let ret = tryExec(`certutil -addstore CA "${certPath}"`);
    if (!ret) {
        throw new Error(`failed to add cert into CA store: ${certPath}`);
    }

    return 'certificate imported successfully';
}

module.exports = main;