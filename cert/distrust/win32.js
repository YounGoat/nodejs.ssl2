'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , confWin32 = noda.inRequire('conf/win32')
    , tryExec = noda.inRequire('lib/tryExec')
    , fingerprint = require('../fingerprint')
    ;

/**
 * @param {string} certPath path of certificate to be imported
 */
function main(certPath) {
    // On Windows platform, we define "distrust" as to move the certificate from Root store into CA store.

    // Pre-defined store names includes:
    // * Root - to store trusted root certificate authority.
    // * CA - to store intermediate certificate authority, instead of trusted root ones.
    // * My
    // Run `certutil -store -?` for more details.

    let hash = fingerprint(certPath);

    let ret, foundInRoot;

    ret = tryExec(`certutil -store Root "${hash}"`);
    foundInRoot = !!ret;
    
    ret = tryExec(`certutil -delstore Root "${hash}"`);
    if (!ret) {
        throw new Error(`failed to delete cert from Root store: ${hash}`);
    }

    // If the certificate was stored in Root store before then,
    // we should move it into CA store.
    if (foundInRoot) {
        ret = tryExec(`certutil -addstore CA "${certPath}`);
        if (!ret) {
            throw new Error(`failed to add cert into CA store: ${hash}`);
        }
    }
    
    return 'certificate distrusted successfully';
}

module.exports = main;