'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , confWin32 = noda.inRequire('conf/win32')
    , tryExec = noda.inRequire('lib/tryExec')
    ;

/**
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    // Root is certificate store name.
    // Pre-defined store names includes:
    // * Root - to store trusted root certificate authority.
    // * CA - to store intermediate certificate authority, instead of trusted root ones.
    // * My
    // Run `certutil -store -?` for more details.

    let ret = tryExec(`certutil -addstore Root ${certPath}"`);
    if (!ret) {
        throw new Error(`failed to import cert into Root store: ${certPath}`);
    }

    return 'certificate trusted successfully';
}

module.exports = main;